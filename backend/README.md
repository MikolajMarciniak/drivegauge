# Backend Server
The repository containing all parts of the app's backend

## Building the containers
1. clone the repository `git clone git@github.com:cs3028-hotel/backend.git`
2. go into the project directory `cd backend`
3. initialize submodules `git submodule init`
4. clone submodules `git submodule update`
5. build the ingest docker image `docker build --tag box_ingest -f box_ingest_server/Dockerfile .`
6. change into frontend directory `cd frontend_communication_server `
7. build the frontend docker image `docker build --tag box_frontend_api .`
8. change into processing directory `cd ../processing_server`
9. build the processing image  `docker build --tag box_processing .`
