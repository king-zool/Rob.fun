/**
 * Mock Data Generator for Rob.fun
 * Generates realistic data for tokens, creators, leaderboards, and trading activity
 */

export interface Token {
  id: string;
  name: string;
  ticker: string;
  logo: string;
  banner: string;
  description: string;
  category: string;
  creator: string;
  creatorId: string;
  marketCap: number;
  volume24h: number;
  price: number;
  priceChange24h: number;
  bondingCurveProgress: number;
  trustScore: number;
  launchTime: Date;
  isVerified: boolean;
  isTrending: boolean;
  holders: number;
  supply: number;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  bio: string;
  wallet: string;
  followers: number;
  tradingVolume: number;
  marketCap: number;
  trustScore: number;
  achievements: string[];
  tokensLaunched: number;
}

export interface Trade {
  id: string;
  tokenId: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  timestamp: Date;
  trader: string;
}

export interface Notification {
  id: string;
  type: 'launch' | 'trade' | 'milestone' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  tokenId?: string;
}

const tokenNames = [
  'Doge Moon', 'Shib Rocket', 'Pepe Rising', 'Floki Inu', 'Bonk Token',
  'Dogwifhat', 'Wojak Finance', 'Giga Chad', 'Sigma Coin', 'Alpha Token',
  'Moon Runner', 'Rocket Fuel', 'Stellar Meme', 'Cosmic Doge', 'Galaxy Shib',
  'Lunar Pepe', 'Solar Flare', 'Nebula Token', 'Quantum Leap', 'Infinity Coin',
  'Echo Moon', 'Prism Token', 'Vortex Coin', 'Zenith Meme', 'Apex Doge',
  'Blaze Token', 'Surge Coin', 'Pulse Meme', 'Nova Shib', 'Titan Token',
  'Phoenix Rise', 'Dragon Coin', 'Kraken Token', 'Leviathan Meme', 'Behemoth Doge',
  'Colossus Coin', 'Goliath Token', 'Mammoth Meme', 'Juggernaut Shib', 'Titan Rise',
];

const categories = [
  'Meme', 'Gaming', 'DeFi', 'NFT', 'Metaverse', 'AI', 'Social', 'Utility',
  'Community', 'Art', 'Music', 'Sports', 'Celebrity', 'Anime', 'Movie',
];

const creatorNames = [
  'Alex Chen', 'Jordan Smith', 'Casey Morgan', 'Riley Taylor', 'Morgan Blake',
  'Sam Rivers', 'Quinn Parker', 'Dakota Stone', 'Phoenix Wright', 'Sage Green',
  'River Phoenix', 'Storm Cloud', 'Raven Black', 'Echo Sound', 'Nova Star',
  'Luna Moon', 'Solar Sun', 'Stellar Star', 'Cosmic Ray', 'Quantum Leap',
  'Infinity Loop', 'Prism Light', 'Vortex Wind', 'Zenith Peak', 'Apex Hunter',
  'Blaze Fire', 'Surge Wave', 'Pulse Beat', 'Nova Burst', 'Titan Force',
];

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateToken(index: number): Token {
  const name = tokenNames[index % tokenNames.length];
  const ticker = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const marketCap = randomBetween(50000, 50000000);
  const volume24h = randomBetween(10000, marketCap * 0.5);
  const price = randomFloat(0.0001, 1.5);
  const priceChange24h = randomFloat(-50, 150);
  const bondingCurveProgress = randomBetween(10, 95);
  const trustScore = randomBetween(40, 95);

  const launchTime = new Date(Date.now() - randomBetween(86400000, 86400000 * 30));

  return {
    id: generateId(),
    name,
    ticker,
    logo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    banner: `https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=400&fit=crop`,
    description: `${name} is a community-driven meme token on Robinhood Chain. Join the movement!`,
    category: randomElement(categories),
    creator: randomElement(creatorNames),
    creatorId: generateId(),
    marketCap,
    volume24h,
    price,
    priceChange24h,
    bondingCurveProgress,
    trustScore,
    launchTime,
    isVerified: randomBetween(0, 100) > 70,
    isTrending: randomBetween(0, 100) > 80,
    holders: randomBetween(100, 50000),
    supply: randomBetween(1000000, 1000000000),
    website: randomBetween(0, 100) > 50 ? `https://${name.toLowerCase().replace(' ', '')}.com` : undefined,
    twitter: randomBetween(0, 100) > 40 ? `https://twitter.com/${name.toLowerCase().replace(' ', '')}` : undefined,
    telegram: randomBetween(0, 100) > 40 ? `https://t.me/${name.toLowerCase().replace(' ', '')}` : undefined,
    discord: randomBetween(0, 100) > 40 ? `https://discord.gg/${generateId()}` : undefined,
  };
}

function generateCreator(index: number): Creator {
  const name = creatorNames[index % creatorNames.length];
  const tradingVolume = randomBetween(100000, 10000000);
  const marketCap = randomBetween(500000, 100000000);
  const trustScore = randomBetween(60, 98);

  return {
    id: generateId(),
    name,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    banner: `https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=300&fit=crop`,
    bio: `Passionate crypto creator and meme enthusiast. Building the next viral token on Robinhood Chain.`,
    wallet: `0x${generateId()}${generateId()}`,
    followers: randomBetween(100, 100000),
    tradingVolume,
    marketCap,
    trustScore,
    achievements: ['Early Adopter', 'Top Creator', 'Community Champion'],
    tokensLaunched: randomBetween(1, 15),
  };
}

function generateTrade(tokenId: string): Trade {
  return {
    id: generateId(),
    tokenId,
    type: randomBetween(0, 100) > 50 ? 'buy' : 'sell',
    amount: randomFloat(0.1, 1000),
    price: randomFloat(0.0001, 1.5),
    timestamp: new Date(Date.now() - randomBetween(0, 86400000)),
    trader: `0x${generateId()}${generateId()}`,
  };
}

function generateNotification(): Notification {
  const types: Array<'launch' | 'trade' | 'milestone' | 'alert'> = ['launch', 'trade', 'milestone', 'alert'];
  const type = randomElement(types);

  const titles = {
    launch: 'New Token Launched',
    trade: 'Trade Executed',
    milestone: 'Milestone Reached',
    alert: 'Price Alert',
  };

  const messages = {
    launch: 'A new meme token has launched on Robinhood Chain',
    trade: 'Your trade has been executed successfully',
    milestone: 'Token reached $1M market cap',
    alert: 'Price alert triggered for your watchlist',
  };

  return {
    id: generateId(),
    type,
    title: titles[type],
    message: messages[type],
    timestamp: new Date(Date.now() - randomBetween(0, 86400000)),
    read: randomBetween(0, 100) > 50,
    tokenId: randomBetween(0, 100) > 30 ? generateId() : undefined,
  };
}

// Generate datasets
export const mockTokens: Token[] = Array.from({ length: 100 }, (_, i) => generateToken(i));
export const mockCreators: Creator[] = Array.from({ length: 25 }, (_, i) => generateCreator(i));
export const mockTrades: Trade[] = mockTokens.flatMap((token) =>
  Array.from({ length: randomBetween(5, 20) }, () => generateTrade(token.id))
);
export const mockNotifications: Notification[] = Array.from({ length: 20 }, () => generateNotification());

// Utility functions
export function getTrendingTokens(count: number = 10): Token[] {
  return [...mockTokens]
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, count);
}

export function getNewestTokens(count: number = 10): Token[] {
  return [...mockTokens]
    .sort((a, b) => b.launchTime.getTime() - a.launchTime.getTime())
    .slice(0, count);
}

export function getGraduatingSoonTokens(count: number = 10): Token[] {
  return [...mockTokens]
    .filter((token) => token.bondingCurveProgress > 80)
    .sort((a, b) => b.bondingCurveProgress - a.bondingCurveProgress)
    .slice(0, count);
}

export function getTopCreators(count: number = 10): Creator[] {
  return [...mockCreators]
    .sort((a, b) => b.marketCap - a.marketCap)
    .slice(0, count);
}

export function searchTokens(query: string): Token[] {
  const lowerQuery = query.toLowerCase();
  return mockTokens.filter(
    (token) =>
      token.name.toLowerCase().includes(lowerQuery) ||
      token.ticker.toLowerCase().includes(lowerQuery) ||
      token.description.toLowerCase().includes(lowerQuery)
  );
}

export function getTokenById(id: string): Token | undefined {
  return mockTokens.find((token) => token.id === id);
}

export function getCreatorById(id: string): Creator | undefined {
  return mockCreators.find((creator) => creator.id === id);
}

export function getTokensByCreator(creatorId: string): Token[] {
  return mockTokens.filter((token) => token.creatorId === creatorId);
}

export function getTokenTrades(tokenId: string): Trade[] {
  return mockTrades.filter((trade) => trade.tokenId === tokenId).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}
