"use server";

import { Order, orders } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const getOrderFromPaymentIntent = async (paymentIntent: string) => {
  const order = await db.query.orders.findFirst({
    where: eq(orders.paymentIntentId, paymentIntent),
  });
  return order as Order | null;
};

export const listOrdersFromPaymentIntent = async (
  paymentIntent: string,
): Promise<Order[] | null> => {
  const foundOrders = await db.query.orders.findMany({
    where: eq(orders.paymentIntentId, paymentIntent),
  });
  return foundOrders as Order[] | null;
};

export const listOrdersFromEmail = async (
  email: string,
): Promise<Order[] | null> => {
  const foundOrders = await db.query.orders.findMany({
    where: eq(orders.email, email),
  });
  return foundOrders as Order[] | null;
};

export const listOrdersFromPhone = async (
  phone: string,
): Promise<Order[] | null> => {
  const foundOrders = await db.query.orders.findMany({
    where: eq(orders.phone, phone),
  });
  return foundOrders as Order[] | null;
};
