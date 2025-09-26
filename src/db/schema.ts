import {
  integer,
  pgTable,
  text,
  timestamp,
  real,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export const orderStatus = pgEnum("order_status", [
  "pending",
  "shipped",
  "completed",
  "cancelled",
]);

export const orders = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text().notNull(),
  phone: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
  status: orderStatus().notNull().default("pending"),
  shippedAt: timestamp(),
  total: real().notNull(),
  products: jsonb().notNull(),
  paymentIntentId: text().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
