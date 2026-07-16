/**
 * Explore Page
 * Token discovery with filters, search, and sorting
 */

import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layout } from '@/components/Layout';
import { TokenCard } from '@/components/TokenCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockTokens, searchTokens } from '@/lib/mockData';

type SortOption = 'trending' | 'newest' | 'volume' | 'marketcap' | 'trust';
type CategoryFilter = 'all' | string;

const categories = ['all', 'Meme', 'Gaming', 'DeFi', 'NFT', 'Metaverse', 'AI', 'Social', 'Utility'];

export default function Explore() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('trending');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTokens = useMemo(() => {
    let results = searchQuery ? searchTokens(searchQuery) : mockTokens;

    // Filter by category
    if (category !== 'all') {
      results = results.filter((token) => token.category === category);
    }

    // Sort
    const sorted = [...results];
    switch (sortBy) {
      case 'trending':
        sorted.sort((a, b) => b.volume24h - a.volume24h);
        break;
      case 'newest':
        sorted.sort((a, b) => b.launchTime.getTime() - a.launchTime.getTime());
        break;
      case 'volume':
        sorted.sort((a, b) => b.volume24h - a.volume24h);
        break;
      case 'marketcap':
        sorted.sort((a, b) => b.marketCap - a.marketCap);
        break;
      case 'trust':
        sorted.sort((a, b) => b.trustScore - a.trustScore);
        break;
    }

    return sorted;
  }, [searchQuery, sortBy, category]);

  return (
    <Layout>
      {/* Header */}
      <section className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-16 z-30">
        <div className="container py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-2">Explore Tokens</h1>
            <p className="text-muted-foreground">Discover and trade trending meme coins on Robinhood Chain</p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="border-b border-border">
        <div className="container py-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search tokens by name or ticker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={showFilters ? 'default' : 'outline'}
                  size="sm"
                  className="gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter size={16} />
                  Filters
                </Button>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-full md:w-48 bg-card border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="volume">Highest Volume</SelectItem>
                    <SelectItem value="marketcap">Market Cap</SelectItem>
                    <SelectItem value="trust">Trust Score</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category Filter */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex gap-2 flex-wrap pt-4 border-t border-border"
              >
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={category === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategory(cat)}
                    className={category === cat ? 'bg-primary text-primary-foreground' : ''}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container">
          {filteredTokens.length > 0 ? (
            <>
              <div className="mb-8 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing {filteredTokens.length} token{filteredTokens.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTokens.map((token, index) => (
                  <motion.div
                    key={token.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <TokenCard
                      token={token}
                      onView={() => setLocation(`/token/${token.id}`)}
                      onTrade={() => alert('Trading coming in Phase 2')}
                    />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12"
            >
              <div className="inline-block p-4 rounded-lg bg-muted/50 mb-4">
                <Search size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No tokens found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setCategory('all');
                  setSortBy('trending');
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
}
