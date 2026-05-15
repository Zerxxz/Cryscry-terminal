import type { HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badge = cva('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', {
  variants: {
    tone: {
      default: 'bg-white/10 text-white/90',
      high: 'bg-red-500/20 text-red-200',
      medium: 'bg-yellow-500/20 text-yellow-200',
      low: 'bg-emerald-500/20 text-emerald-200'
    }
  },
  defaultVariants: { tone: 'default' }
});

export function Badge({ className, tone, ...props }: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badge>) {
  return <span className={cn(badge({ tone }), className)} {...props} />;
}
