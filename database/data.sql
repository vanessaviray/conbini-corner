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
    (
      'Snacks',
      'Chocolate',
      'Pocky Tokyo Amazake',
      2000,
      'By adding sake lees to Tokyo Amazake, made with real malted rice, the taste of this Pocky is infused with mellow fragrance of Japanese sweet rice wine. This luxurious Pocky will fill your mouth with a sweet taste that has a refreshing, delicious quality.',
      '/images/snacks/chocolate/pocky-tokyo-amazake.png',
      '/images/snacks/chocolate/pocky-tokyo-amazake_2.jpg',
      false
    ), (
      'Snacks',
      'Chocolate',
      'Pocky Giant Yubari Melon',
      2499,
      'Pocky is one of Japan''s most universally loved snacks! This special Pocky is, as the name suggests, giant sized! One box comes with 13 giant sticks coated with Yubari Melon - one of Japan''s most famous and luxurious cantaloupe cultivar from Hokkaido.',
      '/images/snacks/chocolate/pocky-giant-yubari-melon.jpg',
      '/images/snacks/chocolate/pocky-giant-yubari-melon_2.jpg',
      true
    ), (
      'Snacks',
      'Chocolate',
      'KitKat Strawberry Cheesecake Mt. Fuji',
      1800,
      'This speciality KitKat is an extremely rare and tasty special edition Japan only KitKat. Designed to match Japan''s most impressive natural wonder, Mt. Fuji! This beautiful box contains individually wrapped mini Strawberry Cheesecake KitKats. Making it the perfect, one of a kind souvenir for any Japan lover!',
      '/images/snacks/chocolate/kitkat-strawberry-cheesecake-mt-fuji.webp',
      '/images/snacks/chocolate/kitkat-strawberry-cheesecake-mt-fuji_2.webp',
      true
    ), (
      'Snacks',
      'Chocolate',
      'Meiji Kinoko No Yama (Chocorooms)',
      449,
      'Kinoko no Yama (Chocorooms) are a delightfully fun milk and dark chocolate layered snack shaped like mushrooms. Released in 1975, the crispy biscuit stem capped with rich chocolate on top came after five years of manufacturing trials, along with other products inspired by nature like Takenoko no Sato (Chococones). Now, this sweet is sold in Japan, Singapore, the United States, and other countries, and is a long-selling sweet that is popular with all ages.',
      '/images/snacks/chocolate/meiji-kinoko-no-yama-chocorooms.jpg',
      '/images/snacks/chocolate/meiji-kinoko-no-yama-chocorooms_2.jpg',
      true
    );

insert into "products"
  ("category", "subcategory", "name", "price", "description", "defaultImageUrl", "secondaryImageUrl", "featuredProduct")
  values
  (
    'Snacks',
    'Chips',
    'Lay''s Potato Chips Tokyo Yakitori Grilled Chicken',
    249,
    'These Lay''s potato chips bring a unique flavor to the table - yakitori grilled chicken (a popular Japanese street food). The potato chips are dusted with seasoning that transports you to the street food vendors of Japan with a sweet and salty flavor.',
    '/images/snacks/chips/lays-potato-chips-tokyo-yakitori-flavor.webp',
    '/images/snacks/chips/lays-potato-chips-tokyo-yakitori-flavor_2.webp',
    false
  ), (
    'Snacks',
    'Chips',
    'Calbee Potato Chips: Seaweed & Salt',
    339,
    'The flavorful green laver goes well with the simple salty taste and brings out the deliciousness of the potatoes. In addition, in order to bring out the deliciousness of aonori, the well-roasted sesame oil and red pepper are used as a secret ingredient. The sharpness of the taste and the pleasant afterglow remain.',
    '/images/snacks/chips/calbee-potato-chips-seaweed-salt.webp',
    '/images/snacks/chips/calbee-potato-chips-seaweed-salt_2.webp',
    true
  ), (
    'Snacks',
    'Chips',
    'Calbee Cheese Jagarico',
    320,
    'Calbee Jagarico Cheese is a long-selling and one of the most popular Japanese snacks made by Calbee. The classic Jagarico potato sticks are flavored with rich cheddar and camembert cheese. These crispy, crunchy sticks from Japan will wow you with their rich cheesy and fried potato flavor. The potato sticks come in a convenient mobile cup so you can carry it around and snack at anytime.',
    '/images/snacks/chips/calbee-cheese-jagarico.jpg',
    '/images/snacks/chips/calbee-cheese-jagarico_2.jpg',
    true
  );

insert into "products"
  ("category", "subcategory", "name", "price", "description", "defaultImageUrl", "secondaryImageUrl", "featuredProduct")
  values
  (
    'Snacks',
    'Candy',
    'Bourbon Fettuccine Gummy: Lemon',
    199,
    'Meet the ultimate summery treat - these lemon-flavored gummies! Made to resemble fettuccine pasta, they''re fun to eat and tasty too. Each chewy lemon-flavored fettuccine gummy is dusted in sugar for a slight crunch.',
    '/images/snacks/candy/bourbon-fettucine-gummy-lemon.webp',
    '/images/snacks/candy/bourbon-fettucine-gummy-lemon_2.webp',
    true
  ), (
    'Snacks',
    'Candy',
    'Bourbon Fettuccine Gummy: Cola',
    224,
    'Calling all Coca-Cola lovers - here''s your chance to enjoy a delicious Cola-inspired candy! These gummies have a fun fettucine pasta appearance (hence their name - fettuccine gummy) and are a popular sweet treat in Japan. They''re chewy, light, and bold in flavor. Each sweet gummy candy is covered in a sour powder for the ultimate flavor combo. Don''t worry if you can''t eat them all in one sitting; they come in a resealable bag!',
    '/images/snacks/candy/bourbon-fettucine-gummy-cola.webp',
    '/images/snacks/candy/bourbon-fettucine-gummy-cola_2.webp',
    false
  ), (
    'Snacks',
    'Candy',
    'Mikakuto Puchao Gummy Candy: Ramune & Cola',
    399,
    'Have you ever had a chewy, fizzy, soft candy before? Here''s your chance to try the delicious Ramune and cola Puchao candy. Ramune is a Japanese soda with a lemon-lime flavor. You''re likely already familiar with the cola flavor! Each candy has a soft, juicy exterior with bits of fizzy candy inside. These fun candies are perfect for sharing with friends or as an afternoon snack.',
    '/images/snacks/candy/puchao-gummy-candy-ramune-cola.webp',
    '/images/snacks/candy/puchao-gummy-candy-ramune-cola_2.webp',
    true
  ), (
    'Snacks',
    'Candy',
    'Milkita Creamy Candy: Strawberry',
    399,
    'Chewy, rich, milky, and delicious, this Milkita Creamy Candy will be your new snacking obsession! Made with real milk, expect a creamy strawberry milkshake-esque flavor as you indulge in this candy. These bite-sized candies are deliciously chewy for an even more fun eating experience.',
    '/images/snacks/candy/milkita-strawberry.webp',
    '/images/snacks/candy/milkita-strawberry_2.webp',
    true
  );

insert into "products"
  ("category", "subcategory", "name", "price", "description", "defaultImageUrl", "secondaryImageUrl", "featuredProduct")
  values
  (
    'Pantry',
    'Noodles',
    'Hikari Menraku Ramen Bowl: Soup-Less Mazemen Spicy Miso Garlic',
    425,
    'Want a delicious instant noodle snack in three minutes? We''ve got you covered! These yummy umami-rich soup-less mazemen spicy miso garlic noodles are quick, easy, convenient, and uber-tasty! Every bite includes chewy noodles covered in a spicy, garlicky miso sauce. This ramen bowl packs a punch in the flavor department.',
    '/images/pantry/noodles/hikari-menraku-ramen-bowl-soup-less-mazemen-spicy-miso-garlic.webp',
    '/images/pantry/noodles/hikari-menraku-ramen-bowl-soup-less-mazemen-spicy-miso-garlic_2.webp',
    true
  ), (
    'Pantry',
    'Noodles',
    'Hikari Menraku Ramen Bowl: Spicy Sesame',
    425,
    'Feeling lazy but still want to eat well? We feel you. Try this spicy sesame ramen! Your mouth will fill with warm flavor as you slurp these dandan-style noodles and rich miso sesame broth. Spicy, savory, slightly sweet, and overall show-stopping ramen!',
    '/images/pantry/noodles/hikari-menraku-ramen-bowl-spicy-sesame.webp',
    '/images/pantry/noodles/hikari-menraku-ramen-bowl-spicy-sesame_2.webp',
    false
  ), (
    'Pantry',
    'Noodles',
    'Nissin Ra-Oh Thick Tan Tan Ramen',
    999,
    'As you bite into the noodles infused with Sichuan peppercorn, the rich soup clings to every strand, ensuring a delightful burst of taste in every bite.',
    '/images/pantry/noodles/nissin-japan-tan-tan-spicy-soup.webp',
    '/images/pantry/noodles/nissin-japan-tan-tan-spicy-soup_2.webp',
    true
  );

insert into "products"
  ("category", "subcategory", "name", "price", "description", "defaultImageUrl", "secondaryImageUrl", "featuredProduct")
  values
  (
    'Pantry',
    'Condiments',
    'Kewpie Japanese Mayonnaise',
    949,
    'This is the iconic and beloved Kewpie mayo, easily recognized for its signature Kewpie baby doll design! What makes this mayo special is not only its artwork: this Japanese mayo is ultra-smooth and contains multiple vinegars that provide a complex umami flavor. Its packaging should also be noted for how truly easy it is to squeeze: you won''t lose a dollop of this super tasty mayo!',
    '/images/pantry/condiments/kewpie-mayo.webp',
    '/images/pantry/condiments/kewpie-mayo_2.webp',
    true
  ), (
    'Pantry',
    'Condiments',
    'Kikkoman Unagi Eel Sushi Sauce',
    599,
    'For those disinterested in eel, forget the name—you''ll want this thick, sweet, and savory sauce for just about everything else. Sandwich dressing, marinade, and all manner of Japanese dishes are universally improved by its presence. Missing Japan? Unagi shortages do occur, but if you have access to eel (it''s available frozen!) Kikkoman''s Unagi Tare is an absolute necessity for the complete dish.',
    '/images/pantry/condiments/kikkoman-unagi-eel-sushi-sauce.webp',
    '/images/pantry/condiments/kikkoman-unagi-eel-sushi-sauce_2.webp',
    true
  );

insert into "products"
  ("category", "subcategory", "name", "price", "description", "defaultImageUrl", "secondaryImageUrl", "featuredProduct")
  values
  (
    'Pantry',
    'Packaged Foods',
    'Maeda-en Matcha Green Tea Powder',
    1199,
    'This green tea powder is designed to be used in recipes. Compared to ceremonial matcha that one would drink, culinary-quality matcha is punchier: more bitter, astringent, and overall better suited for mixing with other flavors and ingredients. If you''ve got visions of green tea pastries dancing through your head, this is the matcha powder for you.',
    '/images/pantry/packaged-foods/maeda-en-match-green-tea-powder.webp',
    '/images/pantry/packaged-foods/maeda-en-match-green-tea-powder_2.jpg/',
    true
  ), (
    'Pantry',
    'Packaged Foods',
    'Iwate Sanma Kabayaki',
    399,
    'Enjoy sanma kabayaki easily at home! This Iwate-caught sanma (saury fish) is coated in a sweet and savory kabayaki sauce, broiled, and canned to preserve flavor. Best served over hot rice, it''s a classic Japanese comfort meal for a reason! It''s a great source of healthy fats and delicious umami goodness.',
    '/images/pantry/packaged-foods/iwate-sanma-kabayaki.webp',
    '/images/pantry/packaged-foods/iwate-sanma-kabayaki_2.webp',
    false
  ), (
    'Pantry',
    'Packaged Foods',
    'House Curry Sauce with Vegetables: Hot',
    599,
    'In Japan, it''s popular to eat hot and spicy foods during the summer to cool down, so many people eat curry! Savory, rich, and aromatic, Japanese curry is a favorite dish throughout the country. This thick curry has potatoes, carrots, and of course, hot spices - perfect for the summer heat (or as a warm hearty dish during the winter)! Ready in minutes, enjoy it with rice, pasta, or bread!',
    '/images/pantry/packaged-foods/house-curry-sauce-with-vegetables.webp',
    '/images/pantry/packaged-foods/house-curry-sauce-with-vegetables_2.web',
    true
  );

insert into "products"
  ("category", "subcategory", "name", "price", "description", "defaultImageUrl", "secondaryImageUrl", "featuredProduct")
  values
  (
    'Drinks',
    'Bottled Drinks',
    'Sangaria Ramune Soda: Lychee',
    399,
    'Ramune is a favorite soda in Japan for a reason: the drink is bursting with fruity flavor, is made with real sugar, and the packaging can''t be beaten. To drink this marble soda, use the stopper to push down on the marble, which shoots into the neck of the bottle. It bounces up and down as you drink, making a fun tinkling sound. We hope the taste of lychee has you feeling tropical vibes!',
    '/images/drinks/bottled-drinks/sangaria-ramune-soda-lychee.webp',
    '/images/drinks/bottled-drinks/sangaria-ramune-soda-lychee_2.webp',
    true
  ), (
    'Drinks',
    'Bottled Drinks',
    'Kuze Fuku Strawberry Mixer',
    1299,
    'Strawberry lovers rejoice! This strawberry mixer is a best-selling product in Japan and is beloved by all ages! Whether crafting the nostalgic Japanese summertime taste of homemade strawberry milk (1:2 strawberry mixer to milk ratio), topping ice cream, spreading it on scones, or mixing drinks, you''ll surely love this berry much!',
    '/images/drinks/bottled-drinks/kuze-fuku-strawberry-mixer.webp',
    '/images/drinks/bottled-drinks/kuze-fuku-strawberry-mixer_2.webp',
    false
  ), (
    'Drinks',
    'Bottled Drinks',
    'Hatasoda Ramune: Peach',
    349,
    'Want to skip the struggle of getting the Ramune marble into the bottle? This Ramune soda from Hatasoda offers the Ramune flavor you love without the mess of popping the marble into the bottle. With each refreshing sip, you''ll find a juicy peach taste. Pack this in your lunch or drink one whenever you''re craving a Japanese soda.',
    '/images/drinks/bottled-drinks/hatasoda-ramune-peach.webp',
    '/images/drinks/bottled-drinks/hatasoda-ramune-peach_2.webp',
    false
  ), (
    'Drinks',
    'Bottled Drinks',
    'Otsuka Pocari Sweat Sports Drink',
    449,
    'While those new to Pocari Sweat may find the name odd, this Japanese sports drink is totally iconic! From convenience stores to animes, Pocari Sweat is all over Japan! So, what makes this Japanese beverage so popular? Its balance of ions (electrolytes)! It mimics the electrolyte concentration in the human body, so it can quickly replenish what your body needs after perspiration. Non-carbonated and having a slightly sweet and citrusy taste, this is the perfect refreshing drink!',
    '/images/drinks/bottled-drinks/otsuka-pocari-sweat-sports-drink.webp',
    '/images/drinks/bottled-drinks/otsuka-pocari-sweat-sports-drink_2.webp',
    true
  );

insert into "products"
  ("category", "subcategory", "name", "price", "description", "defaultImageUrl", "secondaryImageUrl", "featuredProduct")
  values
  (
    'Drinks',
    'Canned Drinks',
    'Sangaria Strawberry Milk Drink',
    349,
    'From the folks who brought you the iconic Sangaria royal milk tea, comes another spectacular sip: strawberry milk! To all the haters out there, don''t worry, this isn''t that watery, artificial tasting, too sweet strawberry milk you had when you were a kid. Rather it''s a beautiful creamy blended matrimony between strawberry and real milk. The perfect convenient canned beverage for those who can’t get enough strawberry!',
    '/images/drinks/canned-drinks/sangaria-strawberry-milk-drink.webp',
    '/images/drinks/canned-drinks/sangaria-strawberry-milk-drink_2.webp',
    true
  ), (
    'Drinks',
    'Canned Drinks',
    'Kimino Sparkling Water: Yuzu Japanese Citrus',
    349,
    'Yuzu is the most popular citrus flavor in Japan. This variation of canned sparkling water from Kimino contains the juice of an entire yuzu fruit, hand-picked on the island of Shikoku. With just two ingredients and no added sweeteners, it''s refreshing without being sweet.',
    '/images/drinks/canned-drinks/',
    '/images/drinks/canned-drinks/',
    false
  ), (
    'Drinks',
    'Canned Drinks',
    'Sangaria Royal Milk Tea',
    349,
    'You don''t need a palace to enjoy this Royal Milk Tea. Made with top-shelf black tea leaf, real sugar and 25% real milk, it''s like chai without the spice. This gently sweet beverage comes in a beautiful, regal looking can, has a caffeine content somewhere between green tea and coffee and is best served cold.',
    '/images/drinks/canned-drinks/sangaria-royal-milk-tea.webp',
    '/images/drinks/canned-drinks/sangaria-royal-milk-tea_2.webp',
    true
  ), (
    'Drinks',
    'Canned Drinks',
    'Choya Sparkling Ume Drink',
    349,
    'This sparkling ume (plum) drink was developed as a non-alcoholic alternative to ume shu plum liquor but has become a delicious and well-regarded Japanese beverage in its own right. Made with all-natural and simple ingredients like real ume fruit juice, each sip is tart, refreshing, and memorable!',
    '/images/drinks/canned-drinks/choya-sparkling-ume-drink.webp',
    '/images/drinks/canned-drinks/choya-sparkling-ume-drink_2.webp',
    false
  );

insert into "shoppingCarts"
  ("userId")
  values
    (1);

insert into "shoppingCartItems"
  ("cartId", "productId", "quantity")
  values
    (1, 1, 1);
