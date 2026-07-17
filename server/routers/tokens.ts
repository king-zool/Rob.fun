import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getTokens, getTokenById, getTrendingTokens, createToken, getTokenTrades } from "../db";

export const tokensRouter = router({
  // Get all tokens with pagination
  list: publicProcedure
    .input(z.object({ limit: z.number().default(50), offset: z.number().default(0) }))
    .query(async ({ input }) => {
      return await getTokens(input.limit, input.offset);
    }),

  // Get trending tokens
  trending: publicProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ input }) => {
      return await getTrendingTokens(input.limit);
    }),

  // Get single token by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const token = await getTokenById(input.id);
      if (!token) throw new Error("Token not found");
      return token;
    }),

  // Get token trades
  getTrades: publicProcedure
    .input(z.object({ tokenId: z.number(), limit: z.number().default(50) }))
    .query(async ({ input }) => {
      return await getTokenTrades(input.tokenId, input.limit);
    }),

  // Deploy new token (protected)
  deploy: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(255),
      symbol: z.string().min(1).max(20),
      description: z.string().optional(),
      logoUrl: z.string().url().optional(),
      bannerUrl: z.string().url().optional(),
      website: z.string().url().optional(),
      twitter: z.string().optional(),
      telegram: z.string().optional(),
      discord: z.string().optional(),
      curveType: z.enum(["linear", "exponential", "sigmoid", "logarithmic"]).default("linear"),
      graduationTarget: z.string(), // Will be parsed as decimal
      initialSupply: z.string(),
      tokenAddress: z.string(),
      bondingCurveAddress: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Create token in database
      const token = await createToken({
        tokenAddress: input.tokenAddress,
        bondingCurveAddress: input.bondingCurveAddress,
        creatorId: ctx.user.id,
        name: input.name,
        symbol: input.symbol,
        description: input.description,
        logoUrl: input.logoUrl,
        bannerUrl: input.bannerUrl,
        website: input.website,
        twitter: input.twitter,
        telegram: input.telegram,
        discord: input.discord,
        curveType: input.curveType,
        graduationTarget: input.graduationTarget,
        currentPrice: "0.0001",
        marketCap: "0",
        totalSupply: input.initialSupply,
        totalTokensSold: "0",
        totalReserve: "0",
      });

      return token;
    }),
});
