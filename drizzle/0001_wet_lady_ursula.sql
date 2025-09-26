CREATE TYPE "public"."order_status" AS ENUM('pending', 'shipped', 'completed', 'cancelled');--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."order_status";--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "status" SET DATA TYPE "public"."order_status" USING "status"::"public"."order_status";--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "total" real NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "products" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "paymentIntentId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "message";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "address";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "city";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "state";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "zip";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "country";