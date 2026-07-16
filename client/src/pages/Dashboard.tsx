/**
 * Dashboard Page
 * User dashboard with sidebar, portfolio, tokens, and analytics
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Home,
  Wallet,
  Zap,
  TrendingUp,
  Bell,
  Heart,
  Settings,
  LogOut,
  Menu,
  X,
  Eye,
  TrendingDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/StatCard';
import { TokenCard } from '@/components/TokenCard';
import { Layout } from '@/components/Layout';
import { mockTokens } from '@/lib/mockData';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: number;
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const navItems: NavItem[] = [
    { icon: <Home size={20} />, label: 'Overview', href: '#overview' },
    { icon: <Wallet size={20} />, label: 'Portfolio', href: '#portfolio' },
    { icon: <Zap size={20} />, label: 'My Tokens', href: '#my-tokens' },
    { icon: <TrendingUp size={20} />, label: 'Analytics', href: '#analytics' },
    { icon: <Bell size={20} />, label: 'Notifications', href: '#notifications', badge: 3 },
    { icon: <Heart size={20} />, label: 'Favorites', href: '#favorites' },
    { icon: <Settings size={20} />, label: 'Settings', href: '#settings' },
  ];

  const myTokens = mockTokens.slice(0, 3);
  const recentActivity = [
    { type: 'buy', token: 'Doge Moon', amount: 1000, price: 0.0234, time: '2 hours ago' },
    { type: 'sell', token: 'Shib Rocket', amount: 500, price: 0.0156, time: '4 hours ago' },
    { type: 'launch', token: 'Pepe Rising', amount: 0, price: 0, time: '1 day ago' },
    { type: 'buy', token: 'Floki Inu', amount: 2000, price: 0.0089, time: '2 days ago' },
  ];

  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-border bg-card overflow-y-auto z-40 ${
            !sidebarOpen && 'hidden'
          } lg:static lg:block`}
        >
          <div className="p-6 space-y-2">
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => {
                  setActiveTab(item.label.toLowerCase().replace(' ', '-'));
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.label.toLowerCase().replace(' ', '-')
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-1 rounded-full bg-danger text-white text-xs font-bold">
                    {item.badge}
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Logout Button */}
          <div className="p-6 border-t border-border">
            <Button variant="outline" size="sm" className="w-full gap-2">
              <LogOut size={16} />
              Disconnect Wallet
            </Button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Bar */}
          <div className="sticky top-16 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="flex items-center justify-between p-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h1 className="text-2xl font-bold capitalize">{activeTab.replace('-', ' ')}</h1>
              <div className="w-8" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Portfolio Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    label="Portfolio Value"
                    value="$24,582"
                    icon={<Wallet className="w-8 h-8" />}
                    trend={12}
                  />
                  <StatCard
                    label="24h Gain/Loss"
                    value="$1,234"
                    icon={<TrendingUp className="w-8 h-8" />}
                    trend={5}
                  />
                  <StatCard
                    label="Total Tokens"
                    value="12"
                    icon={<Zap className="w-8 h-8" />}
                    trend={2}
                  />
                  <StatCard
                    label="Tokens Launched"
                    value="3"
                    icon={<BarChart3 className="w-8 h-8" />}
                    trend={0}
                  />
                </div>

                {/* Recent Activity */}
                <Card className="p-6 border-border">
                  <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between py-3 border-b border-border last:border-0"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-lg ${
                              activity.type === 'buy'
                                ? 'bg-success/20 text-success'
                                : activity.type === 'sell'
                                  ? 'bg-danger/20 text-danger'
                                  : 'bg-primary/20 text-primary'
                            }`}
                          >
                            {activity.type === 'buy' ? (
                              <TrendingUp size={16} />
                            ) : activity.type === 'sell' ? (
                              <TrendingDown size={16} />
                            ) : (
                              <Zap size={16} />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold capitalize">{activity.type} {activity.token}</p>
                            <p className="text-sm text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {activity.amount > 0 && (
                            <>
                              <p className="font-semibold">{activity.amount.toLocaleString()}</p>
                              <p className="text-sm text-muted-foreground">${activity.price}</p>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 border-border">
                  <h2 className="text-lg font-semibold mb-4">Your Holdings</h2>
                  <div className="space-y-4">
                    {[
                      { token: 'Doge Moon', amount: 5000, value: 117.5, change: 12.5 },
                      { token: 'Shib Rocket', amount: 10000, value: 156, change: -2.3 },
                      { token: 'Pepe Rising', amount: 2000, value: 234.8, change: 45.2 },
                    ].map((holding, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-background border border-border"
                      >
                        <div>
                          <p className="font-semibold">{holding.token}</p>
                          <p className="text-sm text-muted-foreground">{holding.amount.toLocaleString()} tokens</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${holding.value.toFixed(2)}</p>
                          <p className={`text-sm font-semibold ${holding.change >= 0 ? 'text-success' : 'text-danger'}`}>
                            {holding.change >= 0 ? '+' : ''}{holding.change}%
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* My Tokens Tab */}
            {activeTab === 'my-tokens' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myTokens.map((token, index) => (
                    <motion.div
                      key={token.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <TokenCard token={token} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 border-border">
                    <h3 className="font-semibold mb-4">Trading Volume (7d)</h3>
                    <div className="h-64 flex items-end gap-2">
                      {Array.from({ length: 7 }, (_, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t opacity-80 hover:opacity-100 transition-opacity"
                          style={{ height: `${Math.random() * 100}%` }}
                        />
                      ))}
                    </div>
                  </Card>

                  <Card className="p-6 border-border">
                    <h3 className="font-semibold mb-4">Portfolio Distribution</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Doge Moon', percent: 45 },
                        { name: 'Shib Rocket', percent: 30 },
                        { name: 'Pepe Rising', percent: 25 },
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{item.percent}%</p>
                          </div>
                          <div className="h-2 bg-background rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-accent"
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 border-border">
                  <div className="space-y-3">
                    {[
                      { title: 'Price Alert', message: 'Doge Moon reached $0.025', time: '1 hour ago' },
                      { title: 'Token Graduated', message: 'Pepe Rising has graduated!', time: '3 hours ago' },
                      { title: 'New Follower', message: 'You have a new follower', time: '1 day ago' },
                    ].map((notification, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                          </div>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockTokens.slice(0, 6).map((token, index) => (
                    <motion.div
                      key={token.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <TokenCard token={token} isFavorited={true} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 border-border max-w-2xl">
                  <h2 className="text-lg font-semibold mb-6">Settings</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-border">
                      <div>
                        <p className="font-semibold">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-border">
                      <div>
                        <p className="font-semibold">Price Alerts</p>
                        <p className="text-sm text-muted-foreground">Get notified on price changes</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <div>
                        <p className="font-semibold">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">Use dark theme</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}
