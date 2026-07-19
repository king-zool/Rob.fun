-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id BIGINT PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  open_id VARCHAR(64) UNIQUE NOT NULL,
  name TEXT,
  email VARCHAR(320),
  login_method VARCHAR(64),
  role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_signed_in TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tokens table
CREATE TABLE IF NOT EXISTS public.tokens (
  id BIGSERIAL PRIMARY KEY,
  token_address VARCHAR(42) NOT NULL UNIQUE,
  bonding_curve_address VARCHAR(42) NOT NULL UNIQUE,
  creator_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  description TEXT,
  logo_url VARCHAR(500),
  banner_url VARCHAR(500),
  website VARCHAR(500),
  twitter VARCHAR(500),
  telegram VARCHAR(500),
  discord VARCHAR(500),
  curve_type VARCHAR(20) NOT NULL DEFAULT 'linear' CHECK (curve_type IN ('linear', 'exponential', 'sigmoid', 'logarithmic')),
  graduation_target NUMERIC(38, 18) NOT NULL,
  current_price NUMERIC(38, 18) NOT NULL DEFAULT '0.0001',
  market_cap NUMERIC(38, 18) NOT NULL DEFAULT '0',
  total_supply NUMERIC(38, 18) NOT NULL,
  total_tokens_sold NUMERIC(38, 18) NOT NULL DEFAULT '0',
  total_reserve NUMERIC(38, 18) NOT NULL DEFAULT '0',
  has_graduated BOOLEAN DEFAULT FALSE,
  holders INTEGER DEFAULT 0,
  volume_24h NUMERIC(38, 18) DEFAULT '0',
  price_change_24h NUMERIC(10, 2) DEFAULT '0',
  trust_score INTEGER DEFAULT 50,
  bonding_curve_progress INTEGER DEFAULT 0,
  deployed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trades table
CREATE TABLE IF NOT EXISTS public.trades (
  id BIGSERIAL PRIMARY KEY,
  token_id BIGINT NOT NULL REFERENCES public.tokens(id) ON DELETE CASCADE,
  trader VARCHAR(42) NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('buy', 'sell')),
  amount NUMERIC(38, 18) NOT NULL,
  price NUMERIC(38, 18) NOT NULL,
  eth_amount NUMERIC(38, 18) NOT NULL,
  transaction_hash VARCHAR(66) UNIQUE,
  block_number BIGINT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create portfolios table
CREATE TABLE IF NOT EXISTS public.portfolios (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  token_id BIGINT NOT NULL REFERENCES public.tokens(id) ON DELETE CASCADE,
  balance NUMERIC(38, 18) NOT NULL,
  average_entry_price NUMERIC(38, 18) NOT NULL,
  total_invested NUMERIC(38, 18) NOT NULL,
  unrealized_pnl NUMERIC(38, 18) NOT NULL DEFAULT '0',
  realized_pnl NUMERIC(38, 18) NOT NULL DEFAULT '0',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, token_id)
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  token_id BIGINT NOT NULL REFERENCES public.tokens(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, token_id)
);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for tokens table (public read, authenticated create)
CREATE POLICY "Anyone can view tokens" ON public.tokens
  FOR SELECT USING (TRUE);

CREATE POLICY "Authenticated users can create tokens" ON public.tokens
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Token creators can update their tokens" ON public.tokens
  FOR UPDATE USING (auth.uid() = creator_id);

-- RLS Policies for trades table (public read, authenticated create)
CREATE POLICY "Anyone can view trades" ON public.trades
  FOR SELECT USING (TRUE);

CREATE POLICY "Authenticated users can create trades" ON public.trades
  FOR INSERT WITH CHECK (auth.uid()::text = trader);

-- RLS Policies for portfolios table
CREATE POLICY "Users can view their own portfolio" ON public.portfolios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create portfolio entries" ON public.portfolios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio" ON public.portfolios
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for favorites table
CREATE POLICY "Users can view their own favorites" ON public.favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create favorites" ON public.favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" ON public.favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_tokens_creator_id ON public.tokens(creator_id);
CREATE INDEX idx_tokens_symbol ON public.tokens(symbol);
CREATE INDEX idx_trades_token_id ON public.trades(token_id);
CREATE INDEX idx_trades_trader ON public.trades(trader);
CREATE INDEX idx_portfolios_user_id ON public.portfolios(user_id);
CREATE INDEX idx_portfolios_token_id ON public.portfolios(token_id);
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
