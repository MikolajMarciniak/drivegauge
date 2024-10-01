import psycopg2


with open("credentials.txt") as f:
    DBlogin = f.readline().strip()
    DBpasswd = f.readline().strip()

with psycopg2.connect(
    host="localhost", database="playground_db", user=DBlogin, password=DBpasswd
) as conn:
    # fix permissions
    with conn.cursor() as curr:
        # User data table
        curr.execute("DROP TABLE IF EXISTS UserData;")
        # TODO: add auth tokens
        curr.execute(
            "CREATE TABLE UserData (userID serial PRIMARY KEY, name varchar(50) NOT NULL, surname varchar(50) NOT NULL, drivingScore float NOT NULL, boxID varchar(10) NOT NULL)"
        )

        # trip table
        curr.execute("DROP TABLE IF EXISTS Trips;")
        curr.execute(
            "CREATE TABLE Trips (tripID UUID PRIMARY KEY, userID serial NOT NULL, boxID varchar(10) NOT NULL, drivingScoreImpact float NOT NULL, averageSpeed float NOT NULL)"
        )

        # incident table
        curr.execute("DROP TABLE IF EXISTS Incidents;")
        curr.execute(
            "CREATE TABLE Incidents (incidentID serial PRIMARY KEY, userID serial NOT NULL, type varchar(50) NOT NULL, drivingScoreImpact float NOT NULL)"
        )

    conn.commit()
