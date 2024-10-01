# grpc imports
import grpc
# protobuff imports
import box_pb2
import box_pb2_grpc
from google.protobuf import empty_pb2
# server imports
from concurrent.futures import ThreadPoolExecutor
import logging
import os
import uuid

# main server class
class DataCollector(box_pb2_grpc.DataCollector):

    # basic configuration constructor
    def __init__(self):
        # data path configuration
        self.data_path = os.path.join("..","user_data")
        self._enusre_valid_path(self.data_path)
        # cache naming
        self._cache_name = "last_trip.txt"
        # sepparation delta
        self.separationDelta = 30*60  # [s]

    # helper with filestructure manipulation
    @staticmethod
    def _enusre_valid_path(path):
        if not os.path.isdir(path):
            os.mkdir(path)

    # servewr protobuff implementation
    def sendData(self, request, context):
        logging.info(f"Data recieved from box {request.boxID}")
        # get the box's folder
        file_path = os.path.join(self.data_path,request.boxID)
        self._enusre_valid_path(file_path)

        # find which trip this chunk is part of
        # get cache if exists
        cache_path = os.path.join(file_path,self._cache_name)  # constrct cache path
        last_trip = box_pb2.Trip()
        if os.path.isfile(cache_path):
            logging.debug("Cache found")
            # read cache
            with open(cache_path,'r') as f:
                last_trip_file_name = f.read()
            # construct last trip path
            last_trip_file_path = os.path.join(file_path,last_trip_file_name)
            # read last trip
            with open(last_trip_file_path,'rb') as f:
                last_trip.ParseFromString(f.read())
            # calculate time delta
            time_since = request.data[0].timestamp.seconds -  last_trip.end.seconds
            logging.debug(f"Time delta: {time_since}")
            # if within delta extend
            if(time_since <= self.separationDelta and time_since>=0):
                self.appendSaveFile(last_trip_file_name, last_trip, request)
            else:
                # else save
                self.saveTrip(request)
        else:
            # if no cache exists save as new trip
            self.saveTrip(request)

        # return as to spec
        return empty_pb2.Empty()

    def appendSaveFile(self, filename, trip, collectedData):
        logging.info("Extending last trip")
        # updating the object
        trip.data.extend(collectedData.data)
        trip.end.seconds = trip.data[-1].timestamp.seconds
        # save on drive
        file_path = os.path.join(self.data_path,collectedData.boxID,filename)
        with open(file_path,'wb') as f:
            f.write(trip.SerializeToString())


    def saveTrip(self, collectedData):
        logging.info("Savig trip")
        # constrct the trip object
        trip = box_pb2.Trip()
        trip.data.extend(collectedData.data)
        trip.start.seconds = trip.data[0].timestamp.seconds
        trip.end.seconds = trip.data[-1].timestamp.seconds
        # save on drive
        file_name = str(uuid.uuid4())
        file_path = os.path.join(self.data_path,collectedData.boxID,file_name)
        with open(file_path,'wb') as f:
            f.write(trip.SerializeToString())
        # update cache
        cache_path = os.path.join(self.data_path, collectedData.boxID, self._cache_name)
        with open(cache_path, "w") as f:
            f.write(file_name)



# start server
def serve():
    logging.info("Starting server")
    server = grpc.server(ThreadPoolExecutor(max_workers=10))
    box_pb2_grpc.add_DataCollectorServicer_to_server(
        DataCollector(), server)
    server.add_insecure_port("[::]:50051")
    logging.info("Server started")
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    serve()
