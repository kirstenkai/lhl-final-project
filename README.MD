
!["gif of app authorization"](images/test.gif)

To use DB:

A. you can run db using Vagrant
* add 
  DBHOST = localhost
  DBUSER = development
  DBPASS = development
  DBNAME = final_project
  DBPORT = 5432
  to your .env file
* install dependancy (PG and dotenv) - run npm install

B. you can run db using PostgreSQL on your local machine:
* install postgreSQL - https://www.robinwieruch.de/postgres-sql-macos-setup
* install dependency (PG and dotenv)
* to start local db server - use command:
        pg_ctl -D /usr/local/var/postgres start
* to stop local db server - use command:
        pg_ctl -D /usr/local/var/postgres stop.


For connecting Express with Axios in both cases you need to add
"proxy": "http://localhost:5000"
to the package.json !!

For visualising data you can use Postico app. Credentials are from .env!