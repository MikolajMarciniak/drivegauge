# syntax=docker/dockerfile:1

FROM python:3

WORKDIR /app

# instal protoc compiler
ENV PROTOC_ZIP=protoc-3.13.0-linux-x86_64.zip
RUN apt-get update && apt-get install -y unzip
RUN curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v3.13.0/$PROTOC_ZIP \
    && unzip -o $PROTOC_ZIP -d /usr/local bin/protoc \
    && unzip -o $PROTOC_ZIP -d /usr/local 'include/*' \ 
    && rm -f $PROTOC_ZIP

# instal python packages
COPY box_ingest_server/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

# create grpcio models
COPY communication-protocols ../communication-protocols
#RUN which protoc
COPY box_ingest_server/code_gen.py code_gen.py
RUN which protoc
RUN python3 code_gen.py

# get server file
COPY box_ingest_server/server.py server.py

# start server on startup
CMD ["python3", "server.py"]