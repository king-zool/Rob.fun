import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { createTrade, getUserPortfolio, upsertPortfolioItem, getTokenById } from "../db";

export const tradingRouter = router({
  // Get user portfolio
  getPortfolio: protectedProcedure
    .query(async ({ ctx }) => {
      return await getUserPortfolio(ctx.user.id);
    }),

  // Buy tokens
  buy: protectedProcedure
    .input(z.object({
      tokenId: z.number(),
      ethAmount: z.string(),
      tokenAmount: z.string(),
      price: z.string(),
      transactionHash: z.string().optional(),
      blockNumber: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Create trade record
      const trade = await createTrade({
        tokenId: input.tokenId,
        trader: ctx.user.id.toString(), // Store user ID as trader
        type: "buy",
        amount: input.tokenAmount,
        price: input.price,
        ethAmount: input.ethAmount,
        transactionHash: input.transactionHash,
        blockNumber: input.blockNumber,
      });

      // Update portfolio
      const portfolio = await getUserPortfolio(ctx.user.id);
      const existingPosition = portfolio.find(p => p.tokenId === input.tokenId);

      if (existingPosition) {
        // Update existing position
        const newBalance = (parseFloat(existingPosition.balance.toString()) + parseFloat(input.tokenAmount)).toString();
        const newInvested = (parseFloat(existingPosition.totalInvested.toString()) + parseFloat(input.ethAmount)).toString();
        const newEntryPrice = (parseFloat(newInvested) / parseFloat(newBalance)).toString();

        await upsertPortfolioItem({
          userId: ctx.user.id,
          tokenId: input.tokenId,
          balance: newBalance,
          averageEntryPrice: newEntryPrice,
          totalInvested: newInvested,
          unrealizedPnL: "0",
          realizedPnL: existingPosition.realizedPnL,
        });
      } else {
        // Create new position
        await upsertPortfolioItem({
          userId: ctx.user.id,
          tokenId: input.tokenId,
          balance: input.tokenAmount,
          averageEntryPrice: input.price,
          totalInvested: input.ethAmount,
          unrealizedPnL: "0",
          realizedPnL: "0",
        });
      }

      return trade;
    }),

  // Sell tokens
  sell: protectedProcedure
    .input(z.object({
      tokenId: z.number(),
      tokenAmount: z.string(),
      ethAmount: z.string(),
      price: z.string(),
      transactionHash: z.string().optional(),
      blockNumber: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Create trade record
      const trade = await createTrade({
        tokenId: input.tokenId,
        trader: ctx.user.id.toString(),
        type: "sell",
        amount: input.tokenAmount,
        price: input.price,
        ethAmount: input.ethAmount,
        transactionHash: input.transactionHash,
        blockNumber: input.blockNumber,
      });

      // Update portfolio
      const portfolio = await getUserPortfolio(ctx.user.id);
      const existingPosition = portfolio.find(p => p.tokenId === input.tokenId);

      if (existingPosition) {
        const newBalance = (parseFloat(existingPosition.balance.toString()) - parseFloat(input.tokenAmount)).toString();
        
        if (parseFloat(newBalance) > 0) {
          // Update position
          const ethReceived = parseFloat(input.ethAmount);
          const tokensCost = parseFloat(input.tokenAmount) * parseFloat(existingPosition.averageEntryPrice.toString());
          const realizedPnL = (ethReceived - tokensCost).toString();
          
          await upsertPortfolioItem({
            userId: ctx.user.id,
            tokenId: input.tokenId,
            balance: newBalance,
            averageEntryPrice: existingPosition.averageEntryPrice,
            totalInvested: existingPosition.totalInvested,
            unrealizedPnL: "0",
            realizedPnL: (parseFloat(existingPosition.realizedPnL.toString()) + parseFloat(realizedPnL)).toString(),
          });
        } else {
          // Close position
          const realizedPnL = (parseFloat(input.ethAmount) - parseFloat(existingPosition.totalInvested.toString())).toString();
          
          await upsertPortfolioItem({
            userId: ctx.user.id,
            tokenId: input.tokenId,
            balance: "0",
            averageEntryPrice: "0",
            totalInvested: "0",
            unrealizedPnL: "0",
            realizedPnL: (parseFloat(existingPosition.realizedPnL.toString()) + parseFloat(realizedPnL)).toString(),
          });
        }
      }

      return trade;
    }),
});
