/**
 * TokenCard Component
 * Displays token information with market data and action buttons
 * Features: Logo, banner, market cap, volume, bonding curve progress, trust score
 */

import { Heart, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Token } from '@/lib/mockData';
import { motion } from 'framer-motion';

interface TokenCardProps {
  token: Token;
  onView?: (token: Token) => void;
  onTrade?: (token: Token) => void;
  onFavorite?: (token: Token) => void;
  isFavorited?: boolean;
}

export function TokenCard({
  token,
  onView,
  onTrade,
  onFavorite,
  isFavorited = false,
}: TokenCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group card-lift"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
        {/* Banner */}
        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-secondary to-background">
          <img
            src={token.banner}
            alt={token.name}
            className="h-full w-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        </div>

        {/* Content */}
        <div className="relative px-4 pb-4">
          {/* Logo and header */}
          <div className="flex items-start justify-between gap-3 -mt-8 relative z-10 mb-3">
            <div className="flex items-end gap-3">
              <img
                src={token.logo}
                alt={token.ticker}
                className="h-16 w-16 rounded-lg border-2 border-card bg-background object-cover"
              />
              <div className="pb-1">
                <h3 className="font-semibold text-white">{token.name}</h3>
                <p className="text-sm text-muted-foreground">{token.ticker}</p>
              </div>
            </div>
            <button
              onClick={() => onFavorite?.(token)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Heart
                size={18}
                className={isFavorited ? 'fill-primary text-primary' : 'text-muted-foreground'}
              />
            </button>
          </div>

          {/* Badges */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {token.isVerified && <Badge className="bg-success/20 text-success border-success/30">Verified</Badge>}
            {token.isTrending && <Badge className="bg-primary/20 text-primary border-primary/30">Trending</Badge>}
            <Badge variant="outline" className="text-xs">
              {token.category}
            </Badge>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="bg-background/50 rounded-lg p-2">
              <p className="text-muted-foreground text-xs mb-1">Market Cap</p>
              <p className="font-semibold text-white">
                ${(token.marketCap / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <p className="text-muted-foreground text-xs mb-1">24h Volume</p>
              <p className="font-semibold text-white">
                ${(token.volume24h / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <p className="text-muted-foreground text-xs mb-1">Price Change</p>
              <p className={`font-semibold flex items-center gap-1 ${token.priceChange24h >= 0 ? 'text-success' : 'text-danger'}`}>
                {token.priceChange24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(token.priceChange24h).toFixed(1)}%
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <p className="text-muted-foreground text-xs mb-1">Trust Score</p>
              <p className="font-semibold text-white">{token.trustScore}/100</p>
            </div>
          </div>

          {/* Bonding curve progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-muted-foreground">Bonding Curve</p>
              <p className="text-xs font-semibold text-primary">{token.bondingCurveProgress}%</p>
            </div>
            <div className="h-2 bg-background rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${token.bondingCurveProgress}%` }}
              />
            </div>
          </div>

          {/* Creator */}
          <p className="text-xs text-muted-foreground mb-4">
            Created by <span className="text-primary font-semibold">{token.creator}</span>
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onView?.(token)}
            >
              View
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground btn-glow"
              onClick={() => onTrade?.(token)}
            >
              Trade
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
