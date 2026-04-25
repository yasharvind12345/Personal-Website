'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerIndex?: number;
}

/**
 * ScrollReveal - Wraps content with a scroll-triggered fade-up + translate animation.
 * Respects prefers-reduced-motion via Framer Motion's built-in support.
 */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  staggerIndex = 0,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: delay + staggerIndex * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
