# Drivegauge
A restructured copy of the DriveGuage repository. Follow these instructions ONLY.

## Notes
You can read full documentation in the CS3028-notes folder. Make sure you have installed docker, docker-compose and Node.js. 


## Running the app

1. Once the system is setup, run the docker compose file from the root directory, using `sudo docker-compose -f docker-compose.dev.yml up` on Unix systems or `docker compose -f docker-compose.dev.yml up` on Windows
2. Naviage to localhost:3000 in your browser to view the web app
3. When running the app use the login 'ivan' with any 6 character password, or define your own employee accounts in init_db.sql under backend/database path

## Setting up the app

### Automatic setup

First try to run the setup script.

1. On macOS and Linux run setup_app.sh, on Windows run as administrator setup_app.bat
2. You are done! Follow the running instructions

If there are any issues executing the setup script, follow the manual instructions below, instead.

### Manual setup

To get the app to work you must first set up docker images.

1. In this folder, create a `.env` file with login enviroment variables for the database, choose your own (`DB_UNAME` and `DB_PSSWD`)
2. go into the project directory `cd backend`
3. navigate to box_ingest directory `cd ./box_ingest_server`
4. build the ingest docker image `docker build --tag box_ingest -f box_ingest_server/Dockerfile .`
5. change into frontend directory `cd ../frontend_communication_server `
6. build the frontend docker image `docker build --tag box_frontend_api .`
7. change into processing directory `cd ../processing_server`
8. build the processing image  `docker build --tag box_processing .`
9. change to the frontend directory `cd ../../frontend_prototype`
10. build the frontend image  `docker build --tag frontend .`
11. If you are using box_ingest to process the data, create a folder for binary data `mkdir user_data`
12. You are done! Follow the running instructions



