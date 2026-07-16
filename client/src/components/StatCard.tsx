/**
 * StatCard Component
 * Displays a single statistic with icon and optional trend
 */

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: number;
  suffix?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon,
  trend,
  suffix,
  className = '',
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-white">{value}</p>
            {suffix && <span className="text-muted-foreground">{suffix}</span>}
          </div>
          {trend !== undefined && (
            <p className={`text-sm mt-2 font-semibold ${trend >= 0 ? 'text-success' : 'text-danger'}`}>
              {trend >= 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        {icon && (
          <div className="text-primary opacity-80">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
