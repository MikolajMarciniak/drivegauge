@echo off

:: Step 2: Navigate to the project directory
cd backend

:: Step 3: Navigate to the ingest directory
cd box_ingest_server

:: Step 4: Build the ingest Docker image
docker build --tag box_ingest .

:: Step 5: Navigate to frontend directory
cd ..\frontend_communication_server

:: Step 6: Build the frontend Docker image
docker build --tag box_frontend_api .

:: Step 7: Navigate to processing directory
cd ..\processing_server

:: Step 8: Build the processing Docker image
docker build --tag box_processing .

:: Step 9: Navigate to frontend prototype directory
cd ..\..\frontend_prototype

:: Step 10: Build the frontend prototype Docker image
docker build --tag frontend .

:: Step 11: Create a folder for binary data if using box_ingest
mkdir ..\backend\user_data

:: Final message
echo Setup complete. You can now run the app using Docker Compose.
