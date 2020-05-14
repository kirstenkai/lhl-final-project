
DROP TABLE IF EXISTS recipes
CASCADE;
DROP TABLE IF EXISTS inventory_items
CASCADE;
DROP TABLE IF EXISTS custom_recipes
CASCADE;



-- need to add user_id column!!!!
CREATE TABLE recipes
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  spoonacular_id INTEGER,
  title VARCHAR(255),
  image VARCHAR(255)
);
CREATE TABLE inventory_items
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  expiry_date VARCHAR(255) NOT NULL,
  daysleft INTEGER
);

CREATE TABLE custom_recipes
(
  id SERIAL PRIMARY KEY NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  name VARCHAR (255) NOT NULL,
  image VARCHAR (255),
  description TEXT,
  ingredients TEXT,
  instruction TEXT
);