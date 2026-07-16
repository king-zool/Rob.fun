/**
 * Home Page - Landing Page
 * Features: Hero, statistics, trending tokens, features, testimonials, FAQ, newsletter
 */

import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronDown, Zap, Shield, Rocket, TrendingUp, Users, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { TokenCard } from '@/components/TokenCard';
import { StatCard } from '@/components/StatCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getTrendingTokens, mockTokens } from '@/lib/mockData';

export default function Home() {
  const [, setLocation] = useLocation();
  const trendingTokens = getTrendingTokens(6);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Launch a meme coin in minutes, not weeks. No coding required.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Audited',
      description: 'Built on proven bonding curve technology with security audits.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Driven',
      description: 'Fair launch mechanics ensure early supporters are rewarded.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Real-Time Analytics',
      description: 'Track market cap, volume, and holder distribution live.',
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Non-Custodial',
      description: 'You control your tokens. We never hold your assets.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Premium Experience',
      description: 'Enterprise-grade UI inspired by Stripe and Linear.',
    },
  ];

  const faqs = [
    {
      question: 'What is a bonding curve?',
      answer:
        'A bonding curve is a mathematical formula that determines token price based on supply. As more people buy, the price increases. This creates a fair launch mechanism where early supporters benefit.',
    },
    {
      question: 'How long does it take to launch a token?',
      answer:
        'You can launch a token in under 5 minutes. Simply fill out the launch wizard with your token details, upload a logo and banner, and deploy.',
    },
    {
      question: 'What are graduation requirements?',
      answer:
        'Tokens graduate when they reach a target market cap (set by the creator). At graduation, the token transitions to a decentralized exchange.',
    },
    {
      question: 'Is there a fee to launch?',
      answer:
        'Yes, there is a small platform fee (typically 2-5% of initial liquidity). This goes toward platform development and security.',
    },
    {
      question: 'Can I modify my token after launch?',
      answer:
        'Certain parameters like burn rate and wallet limits can be adjusted. However, core parameters like supply are immutable.',
    },
    {
      question: 'How do I withdraw my earnings?',
      answer:
        'Creator fees are automatically distributed to your wallet. You can withdraw at any time through the dashboard.',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Token Creator',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      quote: 'Launched my token in 3 minutes. The UI is so clean and the community response was incredible.',
    },
    {
      name: 'Jordan Smith',
      role: 'Early Investor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
      quote: 'Finally, a meme coin platform that feels premium. This is the future of token launches.',
    },
    {
      name: 'Casey Morgan',
      role: 'Community Manager',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=casey',
      quote: 'The analytics dashboard is incredible. Real-time data helps us make better decisions.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-block mb-6">
              <div className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold">
                🚀 Launch the Next Viral Meme Coin
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              The Most Beautiful
              <br />
              <span className="gradient-text">Meme Coin Launchpad</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Launch your token in minutes on Robinhood Chain. No coding, no complexity. Just beautiful design and
              powerful bonding curves.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground btn-glow gap-2"
                onClick={() => setLocation('/launch')}
              >
                <Rocket size={20} />
                Launch Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setLocation('/explore')}
              >
                Explore Tokens
              </Button>
            </div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center"
            >
              <ChevronDown className="text-primary" size={24} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              label="Tokens Launched"
              value={mockTokens.length}
              icon={<Rocket className="w-8 h-8" />}
              trend={24}
            />
            <StatCard
              label="Total Volume"
              value="$2.4B"
              suffix="24h"
              icon={<TrendingUp className="w-8 h-8" />}
              trend={18}
            />
            <StatCard
              label="Active Creators"
              value="2,847"
              icon={<Users className="w-8 h-8" />}
              trend={12}
            />
            <StatCard
              label="Total Holders"
              value="124K"
              icon={<Users className="w-8 h-8" />}
              trend={31}
            />
          </div>
        </div>
      </section>

      {/* Trending Tokens */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Trending Now</h2>
            <p className="text-muted-foreground">Hottest tokens launching on Robinhood Chain</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingTokens.map((token, index) => (
              <motion.div
                key={token.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TokenCard
                  token={token}
                  onView={() => setLocation(`/token/${token.id}`)}
                  onTrade={() => alert('Trading coming in Phase 2')}
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setLocation('/explore')}
            >
              View All Tokens
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Why Rob.fun?</h2>
            <p className="text-muted-foreground">Built for creators who demand premium design and zero friction</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 border-border hover:border-primary/50 transition-colors group">
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">How Rob.fun Works</h2>
            <p className="text-muted-foreground">Three simple steps to launch your meme coin</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Create Your Token',
                description: 'Fill out the launch wizard with your token details, logo, and social links.',
              },
              {
                step: '2',
                title: 'Set Bonding Curve',
                description: 'Configure your bonding curve parameters and graduation target.',
              },
              {
                step: '3',
                title: 'Launch & Trade',
                description: 'Deploy your token and watch the community trade on the bonding curve.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-6 -right-4 text-primary/30">
                    <ChevronDown size={24} className="rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">What Creators Say</h2>
            <p className="text-muted-foreground">Join thousands of successful token creators</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 border-border">
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about Rob.fun</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Launch?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of creators launching the next viral meme coin on Robinhood Chain.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground btn-glow gap-2"
              onClick={() => setLocation('/launch')}
            >
              <Rocket size={20} />
              Launch Your Token Now
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
