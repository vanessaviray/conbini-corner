-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "users"
  ("emailAddress", "hashedPassword")
  values
    ('person@email.com', 'asdfjkl');

insert into "products"
  ("category", "subcategory", "name", "price", "description", "defaultImageUrl", "secondaryImageUrl", "featuredProduct")
  values
    ('category', 'subcategory', 'name', 100, 'description', 'default image', 'secondary image', false);

insert into "shoppingCarts"
  ("userId")
  values
    (1);

insert into "shoppingCartItems"
  ("cartId", "productId", "quantity")
  values
    (1, 1, 1);
