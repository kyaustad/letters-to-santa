import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text().notNull(),
  message: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
  status: text().notNull().default("pending"),
  address: text().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  zip: text().notNull(),
  country: text().notNull(),
  phone: text().notNull(),
  shippedAt: timestamp(),
});
