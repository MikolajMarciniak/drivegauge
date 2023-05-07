#!/usr/bin/env bash

# clear database
docker rm drivegauge-database-1
docker volume rm drivegauge_db

# clear binary data
sudo rm -rf user_data/*