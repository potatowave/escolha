Readme.txt

# Setting up the database:
- "psql" then "CREATE DATABASE escolha" to create database
- Copy .env.example to .env
- Create tables running migrations: `knex migrate:latest`
- Insert data using seeds: `knex seed:run`

# Starting the application:
- npm install
- npm start

## Front-end and API servers
- Front-end will be running at localhost:3000
- Back-end API will be running at localhost:3001


