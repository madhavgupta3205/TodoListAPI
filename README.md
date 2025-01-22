# My Project

This is a Node.js and TypeScript project with PostgreSQL, Redis, and MinIO.

## Prerequisites

- Docker and Docker Compose
- Node.js and npm

## Setup

1. Clone the repository:
   
   - git clone https://github.com/madhavgupta3205/TodoListAPI.git
   - cd TodoListAPI
   
2. Create .env file in root directory with following credentials:

   - POSTGRES_USER=postgres
   - POSTGRES_PASSWORD=postgres
   - POSTGRES_DB=spendsmart_db
   - POSTGRES_HOST=postgres
   - POSTGRES_PORT=5432
   - JWT_SECRET=mySuperSecretJwtKey

3. Build and run the Docker containers:
   - docker-compose up --build -d

4. Set up the database using Adminer:

    Open a web browser and go to http://localhost:8083.

    Log in with the following credentials:

    - System: PostgreSQL
    - Server: postgres
    - Username: postgres
    - Password: postgres
    - Database: spendsmart_db

5. Run the following SQL commands to create the necessary tables =>

  SQL

  CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
  );

  CREATE TABLE todos (
  user_id INTEGER REFERENCES users(id),
  todo_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (user_id, todo_id)
  );


6. Execute the following commands 

  - docker-compose down
  - docker-compose up --build -d


The API is now running on localhost:3000 and can be tested using Postman.
To learn about the available routes, send a GET request to the home route to receive a list of possible routes.
