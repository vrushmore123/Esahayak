import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
  text,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Buyers table
export const buyers = pgTable("buyers", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 80 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 15 }).notNull(),
  city: varchar("city", { length: 50 }).notNull(),
  propertyType: varchar("property_type", { length: 50 }).notNull(),
  bhk: varchar("bhk", { length: 10 }),
  purpose: varchar("purpose", { length: 10 }).notNull(),
  budgetMin: integer("budget_min"),
  budgetMax: integer("budget_max"),
  timeline: varchar("timeline", { length: 20 }).notNull(),
  source: varchar("source", { length: 20 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("New"),
  notes: text("notes"),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Buyer Tags (Many-to-Many relationship)
export const buyerTags = pgTable("buyer_tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  buyerId: uuid("buyer_id")
    .notNull()
    .references(() => buyers.id, { onDelete: "cascade" }),
  tag: varchar("tag", { length: 50 }).notNull(),
});

// Buyer History table
export const buyerHistory = pgTable("buyer_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  buyerId: uuid("buyer_id")
    .notNull()
    .references(() => buyers.id, { onDelete: "cascade" }),
  changedById: uuid("changed_by_id")
    .notNull()
    .references(() => users.id),
  changedAt: timestamp("changed_at").defaultNow().notNull(),
  diff: text("diff").notNull(), // JSON stringified diff of changes
});

// Define relations
export const buyersRelations = relations(buyers, ({ one, many }) => ({
  owner: one(users, {
    fields: [buyers.ownerId],
    references: [users.id],
  }),
  tags: many(buyerTags),
  history: many(buyerHistory),
}));

export const buyerTagsRelations = relations(buyerTags, ({ one }) => ({
  buyer: one(buyers, {
    fields: [buyerTags.buyerId],
    references: [buyers.id],
  }),
}));

export const buyerHistoryRelations = relations(buyerHistory, ({ one }) => ({
  buyer: one(buyers, {
    fields: [buyerHistory.buyerId],
    references: [buyers.id],
  }),
  changedBy: one(users, {
    fields: [buyerHistory.changedById],
    references: [users.id],
  }),
}));
