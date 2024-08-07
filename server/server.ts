/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { ClientError, errorMiddleware, authMiddleware } from './lib/index.js';

type Auth = {
  emailAddress: string;
  password: string;
};

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello, World!' });
// });

/*
 * Handles paths that aren't handled by any other route handler.
 * It responds with `index.html` to support page refreshes with React Router.
 * This must be the _last_ route, just before errorMiddleware.
 */

app.post('/api/auth/guest-login', async (req, res, next) => {
  try {
    const randomNumber = Math.floor(Math.random() * 10000);
    const emailAddress = `Guest${randomNumber}`;
    const hashedPassword = `guest${randomNumber}`;
    const sql = `
      insert into "users" ("emailAddress", "hashedPassword")
      values ($1, $2)
      returning *;
    `;
    const result = await db.query(sql, [emailAddress, hashedPassword]);
    const [user] = result.rows;
    const payload = {
      userId: user.userId,
      emailAddress: user.emailAddress,
    };
    const token = jwt.sign(payload, hashKey);
    res.status(201).send({ user: payload, token });
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { emailAddress, password } = req.body;
    if (!emailAddress || !password) {
      throw new ClientError(
        400,
        'email address and password are required fields'
      );
    }
    const hashedPassword = await argon2.hash(password);

    const sql = `
      insert into "users" ("emailAddress", "hashedPassword")
      values ($1, $2)
      returning "userId", "emailAddress", "createdAt";
    `;

    const result = await db.query(sql, [emailAddress, hashedPassword]);
    const user = result.rows[0];
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { emailAddress, password } = req.body as Partial<Auth>;
    if (!emailAddress || !password) {
      throw new ClientError(401, 'invalid login');
    }

    const sql = `
      select "userId", "hashedPassword", "emailAddress"
      from "users"
      where "emailAddress" = $1
    `;

    const result = await db.query(sql, [emailAddress]);
    if (!result) {
      throw new ClientError(401, 'invalid login');
    }
    const user = result.rows[0];

    const unhashedPassword = argon2.verify(user.hashedPassword, password);
    if (!unhashedPassword) {
      throw new ClientError(401, 'invalid login');
    }

    const userInfo = {
      userId: user.userId,
      username: user.username,
    };

    const token = jwt.sign(userInfo, hashKey);
    res.status(200).send({ user: userInfo, token });
  } catch (err) {
    next(err);
  }
});

app.get('/api/allProducts', async (req, res, next) => {
  try {
    const sql = `
      select *
      from "products"
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/featuredProductsPreview', async (req, res, next) => {
  try {
    const sql = `
      select *
      from "products"
      where "featuredProduct" = true
      limit 10
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/featuredProductsAll', async (req, res, next) => {
  try {
    const sql = `
      select *
      from "products"
      where "featuredProduct" = true
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/category/:category', async (req, res, next) => {
  try {
    const { category } = req.params;
    if (!category) {
      throw new ClientError(400, 'category is required');
    }
    const sql = `
      select *
      from "products"
      where "category" = $1
    `;

    const params = [category];
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/subcategory/:subcategory', async (req, res, next) => {
  try {
    const { subcategory } = req.params;
    if (!subcategory) {
      throw new ClientError(400, 'subcategory is required');
    }
    const sql = `
      select *
      from "products"
      where "subcategory" = $1
    `;

    const params = [subcategory];
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/searchResults/:searchInput', async (req, res, next) => {
  try {
    const { searchInput } = req.params;
    if (!searchInput) {
      throw new ClientError(400, 'Search input is required');
    }
    const sql = `
      SELECT *
      FROM "products"
      WHERE "category" ILIKE $1
         OR "name" ILIKE $1
         OR "subcategory" ILIKE $1
         OR "description" ILIKE $1
    `;

    const params = [`%${searchInput}%`];
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/products/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!Number.isInteger(+productId)) {
      throw new ClientError(400, `Non-integer productId: ${productId}`);
    }
    const sql = `
      select *
      from "products"
      where "productId" = $1
    `;

    const params = [productId];
    const result = await db.query(sql, params);
    const product = result.rows[0];
    if (!product) throw new ClientError(404, `grade ${productId} not found`);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

app.get('/api/initialCart', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
      select *
      from "products"
      join "shoppingCartItems" using ("productId")
      where "userId" = $1
    `;

    const params = [req.user?.userId];
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/shoppingCartItems', authMiddleware, async (req, res, next) => {
  try {
    const { quantity, productId } = req.body;
    if (!quantity || !productId) {
      throw new ClientError(400, 'quantity and productId are required');
    }
    const sql = `
      insert into "shoppingCartItems" ("userId", "productId", "quantity")
        values ($1, $2, $3)
        returning *
    `;

    const params = [req.user?.userId, productId, quantity];
    const result = await db.query(sql, params);
    const item = result.rows[0];
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

app.put('/api/shoppingCartItems', authMiddleware, async (req, res, next) => {
  try {
    const { quantity, productId } = req.body;
    if (!quantity || !productId) {
      throw new ClientError(400, 'quantity and productId are required');
    }
    const sql = `
      update "shoppingCartItems"
      set "quantity" = $1
      where "productId" = $2 and "userId" = $3
      returning *
    `;

    const params = [quantity, productId, req.user?.userId];
    const result = await db.query(sql, params);
    const [item] = result.rows;
    if (!item) {
      throw new ClientError(404, `Item with productId ${productId} not found`);
    }
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
});

app.delete(
  '/api/shoppingCartItems/:productId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      if (!productId) {
        throw new ClientError(400, 'productId is required');
      }
      const sql = `
      delete from "shoppingCartItems"
      where "productId" = $1 and "userId" = $2
      returning *;
    `;
      const params = [productId, req.user?.userId];
      const result = await db.query(sql, params);
      const product = result.rows[0];
      if (!product)
        throw new ClientError(404, `product ${productId} not found`);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

app.delete(
  '/api/shoppingCartItems/user/:userId',
  authMiddleware,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw new ClientError(400, 'userId is required');
      }
      const sql = `
        delete from "shoppingCartItems"
        where "userId" = $1
        returning *;
      `;
      const params = [userId];
      const result = await db.query(sql, params);
      const deletedItems = result.rows;
      if (deletedItems.length === 0) {
        throw new ClientError(404, `No items found for user ${userId}`);
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
