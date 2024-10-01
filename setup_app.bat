@echo off

:: Step 2: Navigate to the project directory
cd backend

:: Step 3: Initialize Git submodules
git submodule init

:: Step 4: Clone Git submodules
git submodule update

:: Step 5: Build the ingest Docker image
cd box_ingest_server
docker build --tag box_ingest .

:: Step 6: Navigate to frontend directory
cd ..\frontend_communication_server

:: Step 7: Build the frontend Docker image
docker build --tag box_frontend_api .

:: Step 8: Navigate to processing directory
cd ..\processing_server

:: Step 9: Build the processing Docker image
docker build --tag box_processing .

:: Step 10: Navigate to frontend prototype directory
cd ..\..\frontend_prototype

:: Step 11: Build the frontend prototype Docker image
docker build --tag frontend .

:: Step 12: Create a folder for binary data if using box_ingest
mkdir ..\backend\user_data

:: Final message
echo Setup complete. You can now run the app using Docker Compose.
