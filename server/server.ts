/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

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

app.post('/api/shoppingCartItems', async (req, res, next) => {
  try {
    const { quantity, productId } = req.body;
    if (!quantity || !productId) {
      throw new ClientError(400, 'task and isCompleted are required');
    }
    const sql = `
      insert into "shoppingCartItems" ("userId", "productId", "quantity")
        values (1, $1, $2)
        returning *
    `;
    const params = [productId, quantity];
    const result = await db.query(sql, params);
    const item = result.rows[0];
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

app.put('/api/shoppingCartItems', async (req, res, next) => {
  try {
    const { quantity, productId } = req.body;
    if (!quantity || !productId) {
      throw new ClientError(400, 'quantity and productId are required');
    }
    const sql = `
      update "shoppingCartItems"
      set "quantity" = $1
      where "productId" = $2
      returning *
    `;

    const params = [quantity, productId];
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

app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
