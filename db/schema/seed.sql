INSERT INTO users
  (auth_user_id)
VALUES
  ('Charlie'),
  ('Morgan');


INSERT INTO inventory_items
  (user_id, name, expiry_date, daysleft)
VALUES
  ('1', 'milk', '2020-05-23', '5'),
  ('1', 'egg', '2020-05-28', '4');



INSERT INTO custom_recipes
  (user_id, name, image, description, ingredients, instruction)
VALUES
  ('1', 'Waffles', 'https:
//webknox.com/recipeImages/1447373-556x370.jpg', 'Amazingly Fluffy Waffles', 'flour, eggs, milk, sugar, salt', 'mix everything and bake!');

