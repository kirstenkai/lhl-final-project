DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS inventory_items CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
)

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_name VARCHAR(255) NOT NULL,
  picture VARCHAR(255),
  description TEXT,
  ingredients TEXT,
  instruction TEXT
)

CREATE TABLE inventory_items (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ingridient_name VARCHAR(255) NOT NULL,
  picture VARCHAR(255),
  expiry_date DATE
)