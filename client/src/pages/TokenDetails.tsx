/**
 * Token Details Page
 * Comprehensive token information with charts, trading, and community
 */

import { useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/Layout';
import { StatCard } from '@/components/StatCard';
import { getTokenById, getTokenTrades, mockTokens } from '@/lib/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TokenDetails() {
  const [, params] = useRoute('/token/:id');
  const [, setLocation] = useLocation();
  const [isFavorited, setIsFavorited] = useState(false);

  const tokenId = params?.id as string;
  const token = getTokenById(tokenId) || mockTokens[0];
  const trades = getTokenTrades(token.id);

  // Generate mock price chart data
  const chartData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    price: token.price * (0.8 + Math.random() * 0.4),
  }));

  const roadmapItems = [
    { phase: 'Phase 1', title: 'Launch', status: 'completed', date: 'Week 1' },
    { phase: 'Phase 2', title: 'Community Growth', status: 'in-progress', date: 'Week 2-3' },
    { phase: 'Phase 3', title: 'Exchange Listings', status: 'upcoming', date: 'Week 4' },
    { phase: 'Phase 4', title: 'Graduation', status: 'upcoming', date: 'Week 5+' },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="border-b border-border bg-background/50 backdrop-blur-sm sticky top-16 z-30">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => setLocation('/explore')}
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart
                  size={16}
                  className={isFavorited ? 'fill-primary text-primary' : ''}
                />
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 size={16} />
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <img
              src={token.logo}
              alt={token.ticker}
              className="w-16 h-16 rounded-lg border border-border"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{token.name}</h1>
              <p className="text-muted-foreground">{token.ticker}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">${token.price.toFixed(6)}</p>
              <p className={`text-sm font-semibold ${token.priceChange24h >= 0 ? 'text-success' : 'text-danger'}`}>
                {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="relative h-64 overflow-hidden">
        <img
          src={token.banner}
          alt={token.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Main Content */}
      <section className="py-12 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Charts and Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Price Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 border-border">
                  <h2 className="text-lg font-semibold mb-4">Price Chart (24h)</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#29513B" />
                      <XAxis dataKey="time" stroke="#B8D8C1" />
                      <YAxis stroke="#B8D8C1" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#102418',
                          border: '1px solid #29513B',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#C8FF3D"
                        dot={false}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </motion.div>

              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                    <TabsTrigger value="trades">Trades</TabsTrigger>
                    <TabsTrigger value="holders">Holders</TabsTrigger>
                  </TabsList>

                  {/* About Tab */}
                  <TabsContent value="about" className="space-y-4">
                    <Card className="p-6 border-border">
                      <h3 className="font-semibold mb-3">Description</h3>
                      <p className="text-muted-foreground">{token.description}</p>
                    </Card>

                    <Card className="p-6 border-border">
                      <h3 className="font-semibold mb-4">Social Links</h3>
                      <div className="flex gap-3 flex-wrap">
                        {token.website && (
                          <a
                            href={token.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
                          >
                            <ExternalLink size={16} />
                            Website
                          </a>
                        )}
                        {token.twitter && (
                          <a
                            href={token.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
                          >
                            <ExternalLink size={16} />
                            Twitter
                          </a>
                        )}
                        {token.telegram && (
                          <a
                            href={token.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
                          >
                            <ExternalLink size={16} />
                            Telegram
                          </a>
                        )}
                        {token.discord && (
                          <a
                            href={token.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
                          >
                            <ExternalLink size={16} />
                            Discord
                          </a>
                        )}
                      </div>
                    </Card>
                  </TabsContent>

                  {/* Roadmap Tab */}
                  <TabsContent value="roadmap">
                    <Card className="p-6 border-border">
                      <div className="space-y-4">
                        {roadmapItems.map((item, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-4 h-4 rounded-full border-2 ${
                                  item.status === 'completed'
                                    ? 'bg-success border-success'
                                    : item.status === 'in-progress'
                                      ? 'bg-primary border-primary'
                                      : 'border-muted'
                                }`}
                              />
                              {index < roadmapItems.length - 1 && (
                                <div className="w-1 h-12 bg-border my-2" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold">{item.phase}: {item.title}</p>
                              <p className="text-sm text-muted-foreground">{item.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>

                  {/* Trades Tab */}
                  <TabsContent value="trades">
                    <Card className="p-6 border-border">
                      <div className="space-y-3">
                        {trades.slice(0, 10).map((trade) => (
                          <div key={trade.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                            <div>
                              <p className="font-semibold text-sm">
                                {trade.type === 'buy' ? 'Buy' : 'Sell'} {trade.amount.toFixed(2)} tokens
                              </p>
                              <p className="text-xs text-muted-foreground">{trade.trader.slice(0, 10)}...</p>
                            </div>
                            <div className="text-right">
                              <p className={`font-semibold ${trade.type === 'buy' ? 'text-success' : 'text-danger'}`}>
                                {trade.type === 'buy' ? '+' : '-'}{(trade.amount * trade.price).toFixed(2)} RHINO
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(trade.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>

                  {/* Holders Tab */}
                  <TabsContent value="holders">
                    <Card className="p-6 border-border">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Top 10 Holders</p>
                          <div className="space-y-2">
                            {Array.from({ length: 10 }, (_, i) => {
                              const percentage = Math.random() * 20;
                              return (
                                <div key={i} className="flex items-center gap-3">
                                  <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                      <p className="text-sm font-semibold">Holder {i + 1}</p>
                                      <p className="text-sm text-muted-foreground">{percentage.toFixed(1)}%</p>
                                    </div>
                                    <div className="h-2 bg-background rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-gradient-to-r from-primary to-accent"
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            {/* Right Column - Stats and Actions */}
            <div className="space-y-6">
              {/* Key Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <StatCard
                  label="Market Cap"
                  value={`$${(token.marketCap / 1000000).toFixed(1)}`}
                  suffix="M"
                />
                <StatCard
                  label="24h Volume"
                  value={`$${(token.volume24h / 1000000).toFixed(1)}`}
                  suffix="M"
                />
                <StatCard
                  label="Holders"
                  value={token.holders.toLocaleString()}
                />
                <StatCard
                  label="Trust Score"
                  value={token.trustScore}
                  suffix="/100"
                />
              </motion.div>

              {/* Bonding Curve */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="p-6 border-border">
                  <h3 className="font-semibold mb-4">Bonding Curve Progress</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <p className="text-sm font-semibold text-primary">{token.bondingCurveProgress}%</p>
                      </div>
                      <div className="h-3 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                          style={{ width: `${token.bondingCurveProgress}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {token.bondingCurveProgress < 100
                        ? `${100 - token.bondingCurveProgress}% until graduation`
                        : 'Token has graduated!'}
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Trading Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="space-y-3"
              >
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground btn-glow"
                  onClick={() => alert('Trading coming in Phase 2')}
                >
                  Buy Token
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={() => alert('Trading coming in Phase 2')}
                >
                  Sell Token
                </Button>
              </motion.div>

              {/* Creator Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card className="p-6 border-border">
                  <h3 className="font-semibold mb-4">Creator</h3>
                  <div className="space-y-3">
                    <p className="font-semibold text-primary">{token.creator}</p>
                    <p className="text-xs text-muted-foreground break-all">0x{token.creatorId.slice(0, 16)}...</p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Creator Profile
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* Community */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Card className="p-6 border-border">
                  <h3 className="font-semibold mb-4">Community</h3>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <MessageCircle size={16} />
                    Join Discussion
                  </Button>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
