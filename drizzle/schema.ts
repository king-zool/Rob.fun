import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, bigint } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tokens deployed on the platform
 */
export const tokens = mysqlTable("tokens", {
  id: int("id").autoincrement().primaryKey(),
  tokenAddress: varchar("tokenAddress", { length: 42 }).notNull().unique(),
  bondingCurveAddress: varchar("bondingCurveAddress", { length: 42 }).notNull().unique(),
  creatorId: int("creatorId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  symbol: varchar("symbol", { length: 20 }).notNull(),
  description: text("description"),
  logoUrl: varchar("logoUrl", { length: 500 }),
  bannerUrl: varchar("bannerUrl", { length: 500 }),
  website: varchar("website", { length: 500 }),
  twitter: varchar("twitter", { length: 500 }),
  telegram: varchar("telegram", { length: 500 }),
  discord: varchar("discord", { length: 500 }),
  curveType: mysqlEnum("curveType", ["linear", "exponential", "sigmoid", "logarithmic"]).default("linear"),
  graduationTarget: decimal("graduationTarget", { precision: 38, scale: 18 }).notNull(),
  currentPrice: decimal("currentPrice", { precision: 38, scale: 18 }).notNull(),
  marketCap: decimal("marketCap", { precision: 38, scale: 18 }).notNull(),
  totalSupply: decimal("totalSupply", { precision: 38, scale: 18 }).notNull(),
  totalTokensSold: decimal("totalTokensSold", { precision: 38, scale: 18 }).notNull(),
  totalReserve: decimal("totalReserve", { precision: 38, scale: 18 }).notNull(),
  hasGraduated: boolean("hasGraduated").default(false),
  holders: int("holders").default(0),
  volume24h: decimal("volume24h", { precision: 38, scale: 18 }).default("0"),
  priceChange24h: decimal("priceChange24h", { precision: 10, scale: 2 }).default("0"),
  trustScore: int("trustScore").default(50),
  bondingCurveProgress: int("bondingCurveProgress").default(0),
  deployedAt: timestamp("deployedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Token = typeof tokens.$inferSelect;
export type InsertToken = typeof tokens.$inferInsert;

/**
 * Trading transactions
 */
export const trades = mysqlTable("trades", {
  id: int("id").autoincrement().primaryKey(),
  tokenId: int("tokenId").notNull(),
  trader: varchar("trader", { length: 42 }).notNull(),
  type: mysqlEnum("type", ["buy", "sell"]).notNull(),
  amount: decimal("amount", { precision: 38, scale: 18 }).notNull(),
  price: decimal("price", { precision: 38, scale: 18 }).notNull(),
  ethAmount: decimal("ethAmount", { precision: 38, scale: 18 }).notNull(),
  transactionHash: varchar("transactionHash", { length: 66 }).unique(),
  blockNumber: bigint("blockNumber", { mode: "number" }),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Trade = typeof trades.$inferSelect;
export type InsertTrade = typeof trades.$inferInsert;

/**
 * User portfolios
 */
export const portfolios = mysqlTable("portfolios", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  tokenId: int("tokenId").notNull(),
  balance: decimal("balance", { precision: 38, scale: 18 }).notNull(),
  averageEntryPrice: decimal("averageEntryPrice", { precision: 38, scale: 18 }).notNull(),
  totalInvested: decimal("totalInvested", { precision: 38, scale: 18 }).notNull(),
  unrealizedPnL: decimal("unrealizedPnL", { precision: 38, scale: 18 }).notNull(),
  realizedPnL: decimal("realizedPnL", { precision: 38, scale: 18 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Portfolio = typeof portfolios.$inferSelect;
export type InsertPortfolio = typeof portfolios.$inferInsert;

/**
 * Favorite tokens
 */
export const favorites = mysqlTable("favorites", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  tokenId: int("tokenId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Favorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;