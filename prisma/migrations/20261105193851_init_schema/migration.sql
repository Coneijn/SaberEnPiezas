-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('teacher', 'parent', 'institution', 'individual');

-- CreateEnum
CREATE TYPE "IdentityType" AS ENUM ('whatsapp', 'phone', 'email');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('held', 'converted', 'released', 'reconciled_late', 'reconciled_oversold');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'paid', 'preparing', 'shipped', 'delivered', 'cancelled');

-- CreateEnum
CREATE TYPE "TicketChannel" AS ENUM ('whatsapp', 'web', 'instagram');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('open', 'pending_customer', 'resolved', 'closed');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('low', 'medium', 'high', 'urgent');

-- CreateEnum
CREATE TYPE "WarrantyStatus" AS ENUM ('queued', 'in_production', 'ready_to_ship', 'dispatched');

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL,
    "full_name" VARCHAR(150),
    "email" VARCHAR(150),
    "institution" VARCHAR(200),
    "interest_area" VARCHAR(150),
    "customer_type" "CustomerType" NOT NULL DEFAULT 'individual',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_identities" (
    "id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "identity_type" "IdentityType" NOT NULL,
    "identity_value" VARCHAR(100) NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_identities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "sku" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "base_price" DECIMAL(10,2) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_inventory" (
    "product_id" UUID NOT NULL,
    "stock_on_hand" INTEGER NOT NULL DEFAULT 0,
    "stock_reserved" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_inventory_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "stock_reservations" (
    "id" UUID NOT NULL,
    "session_id" VARCHAR(100) NOT NULL,
    "customer_id" UUID,
    "order_id" UUID,
    "order_item_id" UUID,
    "product_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "external_reference" VARCHAR(150),
    "preference_id" VARCHAR(150),
    "status" "ReservationStatus" NOT NULL DEFAULT 'held',
    "release_reason" VARCHAR(50),
    "expires_at" TIMESTAMP(3) NOT NULL,
    "converted_at" TIMESTAMP(3),
    "released_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "order_number" SERIAL NOT NULL,
    "customer_id" UUID NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'pending',
    "subtotal" DECIMAL(10,2) NOT NULL,
    "shipping_cost" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "total" DECIMAL(10,2) NOT NULL,
    "shipping_address" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_transactions" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "gateway" VARCHAR(30) NOT NULL DEFAULT 'mercadopago',
    "external_payment_id" VARCHAR(100),
    "status" VARCHAR(50) NOT NULL,
    "payment_method" VARCHAR(50),
    "raw_response" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_shipments" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "carrier" VARCHAR(100) NOT NULL,
    "tracking_number" VARCHAR(150) NOT NULL,
    "tracking_url" TEXT,
    "shipped_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivered_at" TIMESTAMP(3),

    CONSTRAINT "order_shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_events" (
    "id" UUID NOT NULL,
    "customer_id" UUID,
    "session_id" VARCHAR(100) NOT NULL,
    "event_type" VARCHAR(50) NOT NULL,
    "event_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "support_tickets" (
    "id" UUID NOT NULL,
    "ticket_number" SERIAL NOT NULL,
    "customer_id" UUID NOT NULL,
    "order_id" UUID,
    "channel" "TicketChannel" NOT NULL DEFAULT 'whatsapp',
    "status" "TicketStatus" NOT NULL DEFAULT 'open',
    "priority" "TicketPriority" NOT NULL DEFAULT 'medium',
    "subject" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP(3),

    CONSTRAINT "support_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_notes" (
    "id" UUID NOT NULL,
    "ticket_id" UUID NOT NULL,
    "author_name" VARCHAR(100) NOT NULL,
    "is_internal" BOOLEAN NOT NULL DEFAULT true,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warranty_claims" (
    "id" UUID NOT NULL,
    "ticket_id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "part_description" TEXT NOT NULL,
    "status" "WarrantyStatus" NOT NULL DEFAULT 'queued',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dispatched_at" TIMESTAMP(3),

    CONSTRAINT "warranty_claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cx_surveys" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "csat_score" INTEGER,
    "nps_score" INTEGER,
    "feedback_text" TEXT,
    "answered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cx_surveys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_identities_identity_type_identity_value_key" ON "customer_identities"("identity_type", "identity_value");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "idx_reservations_external_ref" ON "stock_reservations"("external_reference");

-- CreateIndex
CREATE INDEX "idx_reservations_order_id" ON "stock_reservations"("order_id");

-- CreateIndex
CREATE INDEX "idx_reservations_cleanup" ON "stock_reservations"("status", "expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_number_key" ON "orders"("order_number");

-- CreateIndex
CREATE UNIQUE INDEX "payment_transactions_external_payment_id_key" ON "payment_transactions"("external_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "support_tickets_ticket_number_key" ON "support_tickets"("ticket_number");

-- AddForeignKey
ALTER TABLE "customer_identities" ADD CONSTRAINT "customer_identities_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_inventory" ADD CONSTRAINT "product_inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_reservations" ADD CONSTRAINT "stock_reservations_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_reservations" ADD CONSTRAINT "stock_reservations_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_reservations" ADD CONSTRAINT "stock_reservations_order_item_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "order_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_reservations" ADD CONSTRAINT "stock_reservations_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_shipments" ADD CONSTRAINT "order_shipments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_events" ADD CONSTRAINT "customer_events_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_notes" ADD CONSTRAINT "ticket_notes_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "support_tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warranty_claims" ADD CONSTRAINT "warranty_claims_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "support_tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warranty_claims" ADD CONSTRAINT "warranty_claims_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warranty_claims" ADD CONSTRAINT "warranty_claims_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cx_surveys" ADD CONSTRAINT "cx_surveys_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cx_surveys" ADD CONSTRAINT "cx_surveys_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
