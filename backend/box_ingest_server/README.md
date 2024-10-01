# Box Ingest server
The component of the backend server responsible for reciving data from boxes

## Building the docker image
This image depends on the communication-protocols submodule! So make sure it is initialized.

The image needs to be built ffrom the root project directoy, there this commands needs to be run `docker build --tag box_ingest -f box_ingest_server/Dockerfile .`


## Running
It is reccomended to run this using the compose configuration from the main app repository!


## Data save structure
Save data as serialized protobufs

Each box has it's own folder

Each file is a unique trip

Each time a new data pack is recived a compare is doen agianst last trip's end point if the delta is below a certain range, new datra gets appended otherwise new trip is started

Trips are saved as files with random filenames, the most recent trip file is kept by a cache reference

cache named `last_trip.txt` 
