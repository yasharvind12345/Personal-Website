import {
  Database,
  Bot,
  Smartphone,
  ShieldCheck,
  Users,
  PhoneCall,
  Eye,
  Mic,
  Wallet,
  BarChart3,
  Package,
  Briefcase,
  type LucideIcon,
} from 'lucide-react';

/** Icons for work items, keyed by case-study slug or project name. */
const icons: Record<string, LucideIcon> = {
  'zendesk-dib': Database,
  tam: Bot,
  TAM: Bot,
  flux: Smartphone,
  cortexa: ShieldCheck,
  mirofish: Users,
  AuraHealth: PhoneCall,
  EarningsLens: Eye,
  HelloNeighbour: Mic,
  'AI Hedge Fund': Wallet,
  'Stock Trading System': BarChart3,
  BoxMate: Package,
};

export function workIcon(key: string): LucideIcon {
  return icons[key] ?? Briefcase;
}
