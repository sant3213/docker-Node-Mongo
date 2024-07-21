# Documentation: Setting Up MongoDB and Node.js with Docker (Without Docker Compose)

This documentation outlines the steps to set up MongoDB and a Node.js application using Docker without using Docker Compose. 

The reason for not building a custom image for MongoDB is that MongoDB already provides an official and optimized image on Docker Hub, which includes all necessary configurations to run a MongoDB instance. Using the official image simplifies the process and ensures you are using a well-maintained and tested version.

In this project, we will use Docker to set up and run a Node.js application with a MongoDB database. Below are the commands necessary to create the Docker network, run MongoDB, build the Node.js application image, and run it in a container.

```sh
docker network create my-network
```

```sh
docker run -d --name mongodb --network my-network -v mongo-data:/data/db -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo:latest
```

```sh
docker build -t node-mongodb-app .
```

```sh
docker run -d --name node-app --network my-network -p 3000:3000 -v "D:\DevOps\Docker Node Mongo Practice:/usr/src/app" node-mongodb-app
```

### Created Images and Containers

### Node.js Application:

- Image: node-mongodb-app
- Container Name: node-app
- Port: 3000
- MongoDB:

### MongoDb
- Image: mongo:latest
- Container Name: mongodb
- Port: 27017

### Created Volumes
- mongo-data: Used to persist MongoDB data.

# Explanation

## Network Creation
```sh
docker network create my-network
```
- Creates a network to connect MongoDB and the Node.js application.

## MongoDB Setup
```sh
docker run -d --name mongodb --network my-network -v mongo-data:/data/db -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo:latest
```

- Starts MongoDB with the correct environment variables.
- The -d option runs the container in detached mode, meaning it runs in the background and does not block your terminal.
- **-v mongo-data:/data/db:** This command mounts a Docker volume named mongo-data to the container's /data/db directory. This directory is where MongoDB stores its data files. The volume ensures data persistence, meaning the data will be preserved even if the container is stopped or removed.
- **-e MONGO_INITDB_ROOT_USERNAME=root:**
This environment variable sets the root username for MongoDB. In this case, it is set to root.
- **-e MONGO_INITDB_ROOT_PASSWORD=example:**
This environment variable sets the root password for MongoDB. In this case, it is set to example.
- **mongo:latest:** This specifies the Docker image to use for the container. mongo is the official MongoDB image from Docker Hub, and latest specifies that the latest version of the image should be used.

#### Purpose of these Environment Variables:
<ins>Security Initialization:</ins>

- <ins>Security Initialization</ins>: These environment variables ensure that the MongoDB instance is initialized with a secure administrative user. Without specifying these variables, MongoDB might start without authentication, which is not recommended for production environments.
Automated Setup:

- <ins>Automated Setup</ins>: By specifying these environment variables, the MongoDB Docker container can automatically set up the root user without requiring manual intervention after the container starts. This is particularly useful for automated deployments and CI/CD pipelines.
Configuration Consistency:

- <ins>Configuration Consistency</ins>: Using environment variables helps maintain consistent configurations across different environments (e.g., development, testing, production) by allowing you to easily change the values without modifying the container configuration scripts.

## Accessing MongoDB
```sh
docker exec -it mongodb mongosh --host localhost --port 27017 -u root -p example --authenticationDatabase admin
```
- Access the MongoDB shell.
Inside the MongoDB shell:
```sh
use admin
db.system.users.find()
```

## Node.js Image Building
```sh
docker build -t node-mongodb-app .
```
- The -t option tags the image being built.

## Running the Node.js Application
```sh
docker run -d --name node-app --network my-network -p 3000:3000 -v "D:\DevOps\Docker Node Mongo Practice:/usr/src/app" node-mongodb-app
```
- Runs the Node.js application container within the same network as MongoDB

## Other Useful Commands
Check Running Containers
```sh
docker ps
```

Check Container Logs
```sh
docker logs node-app
```

Stop and Remove Containers
```sh
docker stop node-app mongodb
docker rm node-app mongodb
```


## Pausing and Resuming Containers without Data Loss

### Pause Containers
```sh
docker stop node-app mongodb
```
- This will stop the containers but retain all the data.

### List the volumes

```sh
docker volume ls
```

### Resume Containers
```sh
docker start node-app mongodb
```
- This will start the containers again with all the previous data intact.

## Volumes
### Remove volume

Once the containers using the volume are stopped and removed, you can delete the volume.
```sh
docker volume rm <volume_name>
```

### Inspect volume

```sh
docker volume inspect <volume_name>
```

### Remove all the volumes
```sh
docker volume prune -f
```

## Database Container
### Access Database
```sh
docker exec -it mongodb mongosh -u root -p example --authenticationDatabase admin
```

### List the databases
```sh
showdbs
```

### Use a specific database
```sh
use <databaseName>
```
### List the collections
```sh
show collections
```


# Definitions
## Docker Images
- Definition: A Docker image is a lightweight, standalone, and executable software package that includes everything needed to run a piece of - software: code, runtime, libraries, environment variables, and configuration files.
- Purpose: Images are used to create containers. They serve as a blueprint for containers.
- Characteristics:
Immutable: Once created, they do not change.
Layered: Built on layers, where each layer represents a set of file changes.
## Docker Containers
- Definition: A Docker container is an instance of an image. It is a runnable instance of an image that is created from one or more images and runs a specific program or service.
- Purpose: Containers provide an isolated environment for running applications.
- Characteristics:
Mutable: While running, the file system of a container can change.
Ephemeral: Containers can be stopped, started, and removed, often without persisting state.
Lightweight: Containers share the host system’s kernel and resources efficiently.
## Docker Volumes
- Definition: A Docker volume is a persistent data storage mechanism used by Docker containers. It is a special directory within the host file system that is accessible by containers.
- Purpose: Volumes provide a way to persist data generated and used by Docker containers.
- Characteristics:
Persistent: Data in volumes outlives the containers that use them.
Decoupled: Volumes are not part of the container's filesystem but are mounted at runtime.
Managed by Docker: Docker takes care of creating and managing volumes, making it easy to share data between containers or persist data across container restarts