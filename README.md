# Documentation: Setting Up MongoDB and Node.js with Docker (Without Docker Compose)

This documentation outlines the steps to set up MongoDB and a Node.js application using Docker without using Docker Compose. The reason for not building a custom image for MongoDB is that MongoDB already provides an official and optimized image on Docker Hub, which includes all necessary configurations to run a MongoDB instance. Using the official image simplifies the process and ensures you are using a well-maintained and tested version.

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

### Resume Containers
```sh
docker start node-app mongodb
```
- This will start the containers again with all the previous data intact.


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


