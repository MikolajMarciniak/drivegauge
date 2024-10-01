# Frontend interface server
## Building docker image
To build the image run `docker build --tag box_frontend_api .` from this directory

## Running
It is reccomended to run this using the compose configuration from the main app repository!

## Switching to debug
To build the server in debug mode change the `"production"` on line 13 of the Dockerfile into `"debug"` and rebuild the image. 

## Exposed routes
- `/backend/dashboard` for dashboard requests
- `/backend/login` for login requests
- `/backend/hello` for sanit check hello world
