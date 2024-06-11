set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "emailAddress" text,
  "hashedPassword" text,
  "createdAt" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "products" (
  "productId" serial PRIMARY KEY,
  "category" text,
  "subcategory" text,
  "name" text,
  "price" integer,
  "description" text,
  "defaultImageUrl" text,
  "secondaryImageUrl" text,
  "featuredProduct" boolean
);

CREATE TABLE "shoppingCarts" (
  "cartId" serial PRIMARY KEY,
  "userId" integer,
  "createdAt" timestamptz NOT NULL DEFAULT (now()),
  "updatedAt" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "shoppingCartItems" (
  "cartItemId" serial PRIMARY KEY,
  "cartId" integer,
  "productId" integer,
  "quantity" integer
);

ALTER TABLE "shoppingCarts" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "shoppingCartItems" ADD FOREIGN KEY ("cartId") REFERENCES "shoppingCarts" ("cartId");

ALTER TABLE "shoppingCartItems" ADD FOREIGN KEY ("productId") REFERENCES "products" ("productId");
