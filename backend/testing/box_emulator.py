#!/usr/bin/env python

# grpc imports
import grpc
# protobuff imports
import box_pb2
import box_pb2_grpc
from google.protobuf import empty_pb2

import numpy as np
import random
import datetime
import time
#import matplotlib.pyplot as plt

# usability alias
u = lambda x : np.heaviside(x,1)

def window_cut(start: float, end:float):
	return lambda x : u(x-start) - u(x-end)

def engine_simulation_speed(time_grid: np.ndarray) -> np.ndarray:
	# parameters 
	rev_time = random.randint(5,10)  # [s]
	max_speed = random.randint(55,65)  # [km/h]
	# cache
	slope = (max_speed/rev_time)
	ending_start = time_grid[-1]-rev_time
	# engine start
	start = window_cut(0, rev_time)(time_grid) * time_grid * slope
	# steady crusing
	crusing = window_cut(rev_time,ending_start)(time_grid) * max_speed
	# engine shut down
	end =  window_cut(ending_start, time_grid[-1])(time_grid) * (time_grid - time_grid[-1]) * -slope 
	return  start + crusing + end 

def generate_engine_data(start_time: datetime.datetime, end_time: datetime.datetime):
	# create time grid
	dt = 1  # [s]
	start_sec = time.mktime(start_time.timetuple())
	end_sec = time.mktime(end_time.timetuple())
	time_grid = np.arange(start_sec, end_sec, dt)
	# simulate data
	data = engine_simulation_speed(time_grid-start_sec)
	# create protobuff data:
	out = list()
	for t,v in zip(time_grid, data):
		point = box_pb2.DataPoint()
		point.timestamp.seconds = int(t)
		point.speed.value = int(v)
		out.append(point)
	return out

def generate_data(box_id):
	#init variables
	start_time_data = dict()
	# choose trip date
	start_time_data["year"] = 2025
	start_time_data["month"] = random.randint(1,12)
	start_time_data["day"] = random.randint(1,28)
	# choose trip start time
	start_time_data["hour"] = random.randint(0,23)
	start_time_data["minute"] = random.randint(0,59)
	# construct start object
	trip_start = datetime.datetime(**start_time_data)
	# choose trip length [min]
	trip_len_data = random.randint(30,40)
	trip_len_delta = datetime.timedelta(minutes=trip_len_data)
	trip_end = trip_start + trip_len_delta
	# generate sample data
	data_points = generate_engine_data(trip_start, trip_end)
	# Create trip object
	collected_data = box_pb2.CollectedData()
	collected_data.boxID = box_id
	collected_data.data.extend(data_points)
	return collected_data

def send_data(data):
	print("Connecting to server")
	with grpc.insecure_channel("localhost:50051") as channel:
		stub = box_pb2_grpc.DataCollectorStub(channel)
		print("Connected")
		ret = stub.sendData(data)
		print(ret)

if __name__ == "__main__":
	data = generate_data("123")
	send_data(data)