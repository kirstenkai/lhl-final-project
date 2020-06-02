# Kitchen Hero

A Full-stack web application that allows users to search for both food and cocktail recipes based on the ingredients that they have by either typing them in the search bar, or by uploading a picture of their food product. Users can save any recipes that were found, translate to another language, create own custom recipes . Lastly, it also allows users to add and keep track of their food product expiry dates

## Final Product

!["login"](images/login.gif)
!["image recognition feauture"](images/imagerecognition.gif)
!["recepi details"](images/recepiDetails.gif)

## Getting Started

1. To use DB:

A. you can run db using Vagrant

- add
  DBHOST = localhost
  DBUSER = development
  DBPASS = development
  DBNAME = final_project
  DBPORT = 5432
  to your .env file
- install dependancy (PG and dotenv) - run npm install

B. you can run db using PostgreSQL on your local machine:

- install postgreSQL - https://www.robinwieruch.de/postgres-sql-macos-setup
- install dependency (PG and dotenv)
- to start local db server - use command:
  pg_ctl -D /usr/local/var/postgres start
- to stop local db server - use command:
  pg_ctl -D /usr/local/var/postgres stop.

For connecting Express with Axios in both cases you need to add
"proxy": "http://localhost:5000"
to the package.json !!

For visualising data you can use Postico app. Credentials are from .env!

2. Install all dependencies: `npm i`
3. Add API keys for Clarifai and Spoonacular to your .env file
4. Run backend server with `nodemon server.js`
5. Run front-end server with `npm start`
