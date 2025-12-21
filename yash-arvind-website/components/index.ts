/**
 * =============================================================================
 * COMPONENTS INDEX
 * =============================================================================
 * 
 * This file exports all components from a single location.
 * This allows for cleaner imports throughout the project:
 * 
 * Instead of:
 *   import { Navigation } from '@/components/Navigation';
 *   import { Footer } from '@/components/Footer';
 * 
 * You can write:
 *   import { Navigation, Footer } from '@/components';
 * 
 * HOW TO ADD NEW COMPONENTS:
 * 1. Create your component file (e.g., Button.tsx)
 * 2. Add an export line below: export { Button } from './Button';
 */

// Layout Components
export { Navigation } from './Navigation';
export { Footer } from './Footer';

// UI Components
export { Section } from './ui/Section';
export { Card } from './ui/Card';
export { Button } from './ui/Button';
export { Tag } from './ui/Tag';
export { AnimatedText } from './ui/AnimatedText';
export { Timeline } from './ui/Timeline';
export { StatCard } from './ui/StatCard';
export { ProjectCard } from './ui/ProjectCard';
