INSERT INTO users
  (auth_user_id)
VALUES
  ('Charlie'),
  ('Morgan');


INSERT INTO inventory_items
  (user_id, name, daysleft, expiry_date)
VALUES
  ('1', 'milk', '5', '2020-05-18'),
  ('1', 'egg', '10', '2020-05-23'),
  ('1', 'cheese', '60', '2020-08-13'),
('1', 'sour cream', '7', '2020-05-20');

INSERT INTO custom_recipes
  (user_id, name, image, description, ingredients, instruction)
VALUES
  ('1', 'Waffles', 'https:
//webknox.com/recipeImages/1447373-556x370.jpg', 'Amazingly Fluffy Waffles', 'flour, eggs, milk, sugar, salt', 'mix everything and bake!');

