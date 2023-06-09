# Nextjs Express Redis(pub/sub) Microservice Architecture

## Introduction

<figure >
<p align="center">
  <img src="./assets/dataflow_diagram.jpg" alt="Dataflow Diagram" style="background-color:white" />
  <p align="center">Dataflow Diagram</p>
</p>
</figure>

Explanation:

- The nextjs client is the front end of the application and it communicates with the express api server to get and post data to the worker server and the mysql database.

- The express api server is the middle layer of the application. When it receives a post request from the nextjs client, it publishes a message to the redis pub/sub. When it receives a get request from the nextjs client, it checks the redis cache for the data. If the data is not in the redis cache, it sends a request to the database to get the data and caches the data in the redis cache for future requests. If the data is in the redis cache, it sends the data to the nextjs client. It is also responsible for sending responses to the nextjs client.

- The worker server is a microservice that subscribes to the redis pub/sub and receives messages from the express api server when a post request is made from the nextjs client. It is responsible for sending requests to the mysql database to store the data.

## Tools & Tech stack used:

1. Frontend Nextjs
1. Backend For APi Express
1. Backend For Worker (Nodejs)
1. Redis Cache and Pub/Sub
1. MySQL Database

## Following is a demonstration of the system:

<figure >
<p align="center">
  <img src="./assets/demo.gif" alt="Demo" style="background-color:white" />
  <figcaption>Demonstration of the system</figcaption>
</p>
</figure>

## Project installation instruction: 

- git clone https://github.com/riad1302/nextjs-express-redis-pub-sub-microservice-architecture
- Navigate to `cd nextjs-express-redis-pub-sub-microservice-architecture` folder
- Copy .env.example `cp .env.example .env`
- Build docker containers `docker compose build`
- Start docker containers `docker compose up` (add -d to run detached)

Thanks for reading!
