#!/usr/bin/env python

import os
import box_pb2
import time
import datetime

data_folder = "../user_data"

if not os.path.isdir(data_folder):
    print("Not data found")
    quit()

print("Found box saves:")
boxes = list()
for box in os.listdir(data_folder):
    print(box)
    boxes.append(box)

while True:
    print("choose a box to explore")
    chosen = input(">")
    if chosen in boxes:
        break
    print("Invalid choose from list")

trips = list()
for save_file in os.listdir(os.path.join(data_folder, chosen)):
    if save_file.endswith(".txt"):
        continue
    trip = box_pb2.Trip()
    with open(os.path.join(data_folder,chosen,save_file),'rb') as f:
        trip.ParseFromString(f.read())
    trips.append(trip)

print(f"found {len(trips)} trips")

for trip in trips:
    start = datetime.datetime.fromtimestamp( trip.start.seconds)
    end = datetime.datetime.fromtimestamp( trip.end.seconds)

    print(f"from: {start} to: {end}")
