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














La razón por la cual no se construye una imagen personalizada para MongoDB es porque MongoDB ya proporciona una imagen oficial y optimizada en Docker Hub, que incluye todas las configuraciones necesarias para ejecutar una instancia de MongoDB. Utilizar la imagen oficial simplifica el proceso y garantiza que estás utilizando una versión bien mantenida y probada.


docker network create my-network
- Creates a network to connect mongodb and node-app


docker run -d --name mongodb --network my-network -v mongo-data:/data/db -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo:latest
- Start MongoDB with Correct Environment Variables
- La opción -d se usa con el comando docker run para ejecutar el contenedor en segundo plano (detached mode). Esto significa que el contenedor se ejecutará en segundo plano y no bloqueará tu terminal

docker exec -it mongodb mongosh --host localhost --port 27017 -u root -p example --authenticationDatabase admin
- use admin
db.system.users.find()


Construcción de la imagen Node.js
docker build -t node-mongodb-app .
- La opción -t se usa con el comando docker build para etiquetar (tag) la imagen que estás construyendo.

docker run -d --name node-app --network my-network -p 3000:3000 -v "D:\DevOps\Docker Node Mongo Practice:/usr/src/app" node-mongodb-app
- Run the Node.js application container within the same network



## Otros comandos
```
docker ps
```
- Verificar Contenedores en Ejecución
```
docker logs node-app
```
- Revisa logs del contenedor
```
docker stop node-app mongodb
docker rm node-app mongodb
```
- Detener y eliminar contenedores


## Ejecución del contenedor Node.js
``` 
docker run -d --name node-app --link mongodb:mongodb -p 3000:3000 node-mongodb-app 
```
- La opción **-v** se usa con el comando docker run para montar un volumen. Los volúmenes en Docker se utilizan para persistir datos generados y utilizados por contenedores
- El parámetro **--link** en Docker se utiliza para conectar dos contenedores, permitiendo que uno de ellos pueda acceder al otro utilizando un nombre de alias. Este parámetro establece una conexión de red entre los contenedores para que puedan comunicarse entre sí. Sin embargo, es importante mencionar que el uso de --link está considerado **obsoleto** y Docker recomienda usar redes personalizadas para conectar contenedores.
- **--link mongodb:mongodb:** El contenedor node-app podrá resolver el nombre mongodb y conectarse al contenedor MongoDB en la red interna de Docker.
