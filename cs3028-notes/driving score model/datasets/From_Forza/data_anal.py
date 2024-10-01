import matplotlib.pyplot as plt
import csv
import os

speeds_max = dict()
powers = dict()
accels = dict()

clutchs = set()

for filename in os.listdir():

    if filename.count("@") != 2:
        continue

    if(not filename.endswith("safe_route.csv")):
        continue

    model, maker, _ = filename[:-4].split("@")

    if model not in speeds_max:
        speeds_max[model] = 0
        powers[model] = 0
        accels[model] = 0

    speeds = list()
    times = list()
    offset = None

    with open(filename,newline='') as f:
        reader = csv.DictReader(f)
        reader.__next__()
        for row in reader:
            speeds.append(float(row["Speed"])*3.6)
            speed = float(row["Speed"]) * 3.6 # KM/H
            power = float(row["Power"]) / 745.7 #hp
            #accel = (float(row["AccelerationX"])**2 +  float(row["AccelerationY"])**2 +  float(row["AccelerationZ"])**2)**0.5
            #accel *= 0.101971621
            accel = abs(float(row["AccelerationX"])) + abs(float(row["AccelerationY"])) + float(row["AccelerationZ"])
            accel/=9.81

            clutchs.add(int(row["Clutch"]))

            if speed > speeds_max[model]:
                speeds_max[model] = speed

            if power > powers[model]:
                powers[model] = power

            if accel > accels[model]:
                accels[model] = accel

            if not offset:
                offset = int(row["TimestampMS"])/(10**3)
            times.append(int(row["TimestampMS"])/(10**3) - offset)
            # times.append(float(row["Distance"])/(10**3))

    plt.plot(times, speeds, label=model)

#for car in speeds:
#    print(f"{car :40} max_speed: {speeds[car] :.2f}km/h max_power: {powers[car]:7.2f}hp max_accel: {accels[car]:5.2f}G")

#print(clutchs)

# quit()
slow = 30 - 5
plt.axhline(y=slow,color='green')
#plt.axhline(y=slow+5,color='green',linestyle='--')
#plt.axhline(y=slow-5,color='green',linestyle='--')

med = 50 - 10
plt.axhline(y=med,color='blue')
#plt.axhline(y=med+10,color='blue',linestyle='--')
#plt.axhline(y=med-10,color='blue',linestyle='--')

fast = 100 - 15
plt.axhline(y=fast,color='red')
#plt.axhline(y=fast+15,color='red',linestyle='--')
#plt.axhline(yfast-15,color='red',linestyle='--')

plt.grid(True)
plt.title("safe_route")
plt.ylabel("Speed [km/h]")
plt.xlabel("Distance[km]")
plt.legend()
plt.show()
