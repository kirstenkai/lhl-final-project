DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS inventory_items CASCADE;
DROP TABLE IF EXISTS custom_recipes CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  auth_user_id VARCHAR(255) NOT NULL
);

-- need to add user_id column!!!!
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  spoonacular_id INTEGER,
  title VARCHAR(255),
  image VARCHAR(255)
);

CREATE TABLE inventory_items (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  daysleft INTEGER,
  expiry_date DATE
);

CREATE TABLE custom_recipes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
  name VARCHAR (255) NOT NULL,
  image VARCHAR (255),
  description TEXT,
  ingredients TEXT,
  instruction TEXT
);