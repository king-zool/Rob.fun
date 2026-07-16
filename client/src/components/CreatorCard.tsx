/**
 * CreatorCard Component
 * Displays creator profile with stats and achievements
 */

import { Creator } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Award } from 'lucide-react';

interface CreatorCardProps {
  creator: Creator;
  onView?: (creator: Creator) => void;
  rank?: number;
}

export function CreatorCard({ creator, onView, rank }: CreatorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group card-lift"
    >
      <div className="overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 transition-colors">
        {/* Banner */}
        <div className="relative h-24 overflow-hidden bg-gradient-to-br from-secondary to-background">
          <img
            src={creator.banner}
            alt={creator.name}
            className="h-full w-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          {rank && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-lg px-3 py-1 font-bold text-sm">
              #{rank}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative px-4 pb-4">
          {/* Avatar and name */}
          <div className="flex items-end gap-3 -mt-6 relative z-10 mb-3">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="h-12 w-12 rounded-lg border-2 border-card bg-background object-cover"
            />
            <div className="pb-1">
              <h3 className="font-semibold text-white">{creator.name}</h3>
              <p className="text-xs text-muted-foreground">{creator.tokensLaunched} tokens launched</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{creator.bio}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
            <div className="bg-background/50 rounded-lg p-2 text-center">
              <p className="text-muted-foreground text-xs mb-1">Followers</p>
              <p className="font-semibold text-white text-sm">
                {(creator.followers / 1000).toFixed(0)}K
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-2 text-center">
              <p className="text-muted-foreground text-xs mb-1">Volume</p>
              <p className="font-semibold text-white text-sm">
                ${(creator.tradingVolume / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-2 text-center">
              <p className="text-muted-foreground text-xs mb-1">Trust</p>
              <p className="font-semibold text-white text-sm">{creator.trustScore}</p>
            </div>
          </div>

          {/* Achievements */}
          {creator.achievements.length > 0 && (
            <div className="flex gap-1 mb-4 flex-wrap">
              {creator.achievements.slice(0, 2).map((achievement) => (
                <Badge key={achievement} variant="outline" className="text-xs">
                  <Award size={12} className="mr-1" />
                  {achievement}
                </Badge>
              ))}
            </div>
          )}

          {/* Action */}
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => onView?.(creator)}
          >
            View Profile
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
