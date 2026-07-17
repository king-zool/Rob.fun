import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, tokens, trades, portfolios, favorites } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Token queries
export async function getTokens(limit = 50, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(tokens)
    .orderBy(desc(tokens.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getTokenById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(tokens).where(eq(tokens.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getTokenByAddress(address: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(tokens).where(eq(tokens.tokenAddress, address)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getTrendingTokens(limit = 10) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(tokens)
    .orderBy(desc(tokens.volume24h))
    .limit(limit);
}

export async function createToken(data: typeof tokens.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(tokens).values(data);
  return result;
}

// Trade queries
export async function getTokenTrades(tokenId: number, limit = 50) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(trades)
    .where(eq(trades.tokenId, tokenId))
    .orderBy(desc(trades.createdAt))
    .limit(limit);
}

export async function createTrade(data: typeof trades.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(trades).values(data);
  return result;
}

// Portfolio queries
export async function getUserPortfolio(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(portfolios)
    .where(eq(portfolios.userId, userId));
}

export async function getPortfolioItem(userId: number, tokenId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db
    .select()
    .from(portfolios)
    .where(eq(portfolios.userId, userId) && eq(portfolios.tokenId, tokenId))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function upsertPortfolioItem(data: typeof portfolios.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getPortfolioItem(data.userId, data.tokenId);
  
  if (existing) {
    return await db
      .update(portfolios)
      .set(data)
      .where(eq(portfolios.id, existing.id));
  } else {
    return await db.insert(portfolios).values(data);
  }
}

// Favorites queries
export async function getUserFavorites(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db
    .select()
    .from(favorites)
    .where(eq(favorites.userId, userId));
}

export async function toggleFavorite(userId: number, tokenId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await db
    .select()
    .from(favorites)
    .where(eq(favorites.userId, userId) && eq(favorites.tokenId, tokenId))
    .limit(1);
  
  if (existing.length > 0) {
    return await db.delete(favorites).where(eq(favorites.id, existing[0].id));
  } else {
    return await db.insert(favorites).values({ userId, tokenId });
  }
}
