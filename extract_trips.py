import os
import math
import csv
import datetime
import random
import psycopg2
import uuid

# Weights for the scoring function:
WEIGHT_ACCEL = 0.3333
WEIGHT_SPEED = 0.3333
WEIGHT_TURN = 0.3333

# Accelration limits:
ACCELL_MAG_LIMIT = 5


def extract_users(folder_name):
    """
    Extracts the car or 'user' of the car and name of the trip file
    Returns a list of extracted filenames.
    """
    # get the current working directory
    current_dir = os.getcwd()
    # construct the full path to the folder
    folder_path = os.path.join(current_dir, folder_name)
    filenames, users = [], []
    for filename in os.listdir(folder_path):
        if filename.endswith(".csv"):
            # extract the part of the filename before the '@' sign
            extracted_name = filename.split("@")[0]
            users.append(extracted_name)
            filenames.append(folder_path + "/" + filename)
    return filenames, users


def get_db_connection():
    return psycopg2.connect(
        host=os.environ["POSTGRES_HOST"],
        user=os.environ["POSTGRES_USER"],
        password=os.environ["POSTGRES_PASSWORD"],
    )


def upload_trips(trips):
    trips = calc_score_impact(trips)
    for trip in trips:
        unique = uuid.uuid4()
        user, start, end, score, speed = trip

        with get_db_connection() as conn, conn.cursor() as curr:
            curr.execute(
                f"INSERT INTO Trips (tripID, boxID, userID, tripStart, tripStop, drivingScoreImpact, averageSpeed) VALUES ('{unique}', '{user}', '{user}', '{start}', '{end}', {score}, {speed});"
            )
            conn.commit()

    return


def upload_incidents(incidents):
    for incident_list in incidents:
        for incident in incident_list:
            type, lenght, time, score, user = incident
            with get_db_connection() as conn, conn.cursor() as curr:
                curr.execute(
                    f"INSERT INTO Incidents (userID, type, drivingScoreImpact, distance, incidentTIme) VALUES ('{user}', '{type}', '{score}', '{0}', '{time}');"
                )
                conn.commit()

    return


def calc_score_impact(trips):
    """
    sort the trips by stop date, then calculate the score change
    """
    sorted_data = []

    # Loop through each unique user in the data
    for user in set([x[0] for x in trips]):
        # Create a list of all the data for the current user
        user_data = [x for x in trips if x[0] == user]
        # Sort the user_data by the end date (index 2) in ascending order
        user_data_sorted = sorted(user_data, key=lambda x: x[2])
        current_score = user_data_sorted[0][3]
        for i in range(len(user_data_sorted) - 1):
            next_score = user_data_sorted[i + 1][3]
            # calculate the difference in score
            score_change = next_score - current_score
            current_score = user_data_sorted[i + 1][3]
            user_data_sorted[i + 1][3] = score_change
        # Add the sorted user_data to the sorted_data list
        sorted_data.extend(user_data_sorted)

    return sorted_data


def calc_datetime(real, random):
    # Add the random datetime to the start and end datetimes
    combined = real + (random - datetime.datetime(1970, 1, 1))

    # Convert datetime to string
    combined_str = combined.strftime("%Y-%m-%d %H:%M:%S")
    return combined_str


def generate_rand_datetime(startYear, endYear):
    """
    Generates a random datetime between 2020 and 2023
    """
    random_datetime = datetime.datetime(
        year=random.randint(startYear, endYear),
        month=random.randint(1, 12),
        day=random.randint(1, 28),
        hour=random.randint(0, 23),
        minute=random.randint(0, 59),
        second=random.randint(0, 59),
    )
    return random_datetime


def calc_avg_speed(total_speed, count):
    """
    Calculates average speed in km/h

    """
    return round((total_speed / count) * 3.6, 2)


def calc_accel_magnitude(aX, aY, aZ):
    """
    Calculates magnitude of acceleration vector

    Parameters
    ----------
      aX: float
      aY: float
      aZ: float
    """
    return math.sqrt(aX * aX + aY * aY + aZ * aZ)


def verify_speed(speed):
    """Verify that the speed does not exceed the UK speed limit of 70mph (roughly 120 km/h). Returns True if the speed is more than 120 kmh, False otherwise."""

    # Convert speed from m/s to km/h:
    kmh_speed = speed * 3.6

    if kmh_speed > 120:
        return True
    return False


def verify_sharp_turn(aX):
    """
    Acceleration in the x-axis greater than 2ms-2 for longer than 2s
    """
    if abs(aX) > 2:
        return True
    return False


def extract_values(file):
    file_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(file_dir, file)

    accels = []
    speeding = []
    turns = []
    incidents = []
    with open(file_path) as f:
        reader = csv.DictReader(f)
        line_count = 0
        speed_count = 0
        accel_count = 0
        turn_count = 0
        for row in reader:
            # Get the timestamp and convert it to a datetime object:
            timestamp = int(row["TimestampMS"]) // 1000  # Convert from ms to s
            dt = datetime.datetime.utcfromtimestamp(timestamp)

            if line_count == 0:
                start_timestamp = dt
                total_speed = float(row["Speed"])
            end_timestamp = dt

            accel_magnitude = calc_accel_magnitude(
                float(row["AccelerationX"]),
                float(row["AccelerationY"]),
                float(row["AccelerationZ"]),
            )

            # record fast accel incident when acceleration stops
            if accel_magnitude > ACCELL_MAG_LIMIT:
                accels.append(True)
                accel_count += 1
            else:
                # record incident if it is longer than 4s and happening for the past
                if accel_count > 200 and all(accels[line_count - 50 : line_count]):
                    incidents.append(["fast acceleration", accel_count, dt])
                    accel_count = 0
                accels.append(False)

            if verify_sharp_turn(float(row["AccelerationX"])):
                turns.append(True)
                turn_count += 1
            else:
                if turn_count > 200 and all(turns[line_count - 50 : line_count]):
                    incidents.append(["sharp turn", turn_count, dt])
                    turn_count = 0
                turns.append(False)

            if verify_speed(float(row["Speed"])):
                speeding.append(True)
                speed_count += 1
            else:
                if speed_count > 200 and all(speeding[line_count - 50 : line_count]):
                    incidents.append(["speeding", speed_count, dt])
                    speed_count = 0
                speeding.append(False)

            total_speed += float(row["Speed"])
            line_count += 1

        average_speed = calc_avg_speed(total_speed, line_count)

    return (
        accels,
        speeding,
        turns,
        incidents,
        line_count,
        average_speed,
        start_timestamp,
        end_timestamp,
    )


def calc_approx_score(incident, line_count):
    """Approximates the impact of incident on score based on the ratio of
    length of the incident to the total length of the trip"""
    score = round((((-incident[1]) / line_count) / 3) * 1000)
    return score


def finish_incidents(incidents, line_count, user, rand_dt):
    for incident in incidents:
        # calculate approx score impact of incident
        incident.append(calc_approx_score(incident, line_count))
        # modify the incident time with the random datetime of the trip
        incident[2] = calc_datetime(incident[2], rand_dt)
        incident.append(user)
    return incidents


def calc_driver_score(accels, speeding, turns):
    """Calculate the driver score based on the acceleration and speed data."""

    # Calculate the portion of accels above the limit:
    safe_accels = [accel for accel in accels if accel == False]
    accel_ratio = round(
        len(safe_accels) / len(accels), 3
    )  # Ratio of safe accels to total accels. The higher the ratio, the better the driver.

    # Calculate the portion of speeding events:
    safe_speeds = [speed for speed in speeding if speed == False]
    speed_ratio = round(
        len(safe_speeds) / len(speeding), 3
    )  # Ratio of safe speeds to total speeds. The higher the ratio, the better the driver.

    # Calculate the portion of turning events:
    safe_turns = [turn for turn in turns if turn == False]
    turn_ratio = round(
        len(safe_turns) / len(turns), 3
    )  # Ratio of safe turns to total turns. The higher the ratio, the better the driver.

    drive_score = round(
        (
            accel_ratio * WEIGHT_ACCEL
            + speed_ratio * WEIGHT_SPEED
            + turn_ratio * WEIGHT_TURN
        )
        * 1000
    )
    return drive_score


def extract_trip(file):
    (
        accels,
        speeding,
        turns,
        incidents,
        line_count,
        average_speed,
        start_timestamp,
        end_timestamp,
    ) = extract_values(file)

    score = calc_driver_score(accels, speeding, turns)

    # assign certain trips to certain users (for sake of consistency)
    if score >= 0 and score < 200:
        user = 1
    elif score >= 200 and score < 400:
        user = 2
    elif score >= 400 and score < 600:
        user = 3
    elif score >= 600 and score < 800:
        user = 4
    elif score >= 800 and score <= 1000:
        user = 5

    random_datetime = generate_rand_datetime(2020, 2023)
    start_datetime = calc_datetime(start_timestamp, random_datetime)
    end_datetime = calc_datetime(end_timestamp, random_datetime)

    trip = []
    trip.extend((user, start_datetime, end_datetime, score, average_speed))

    # add missing incident info
    incidents = finish_incidents(incidents, line_count, user, random_datetime)

    return trip, incidents


if __name__ == "__main__":
    try:
        # get all forza trips
        files, users = extract_users("forza_data")
    except:
        files, users = extract_users("drivegauge/forza_data")

    trips, incidents = [], []
    # extract data for each trip
    for i in range(len(files)):
        trip, incident_list = extract_trip(files[i])
        trips.append(trip)
        incidents.append(incident_list)
    for i in range(len(trips)):
        if trips[i][0] == 5:
            print(trips[i][3])
    # upload_trips(trips)
    # upload_incidents(incidents)
