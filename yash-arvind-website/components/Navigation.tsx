/**
 * =============================================================================
 * NAVIGATION COMPONENT
 * =============================================================================
 * 
 * This component renders the main navigation bar at the top of every page.
 * 
 * FEATURES:
 * - Fixed header that stays visible while scrolling
 * - Responsive mobile menu (hamburger)
 * - Smooth scroll to sections
 * - Active state highlighting
 * - Backdrop blur effect for modern look
 * 
 * HOW TO MODIFY:
 * - Edit the `navLinks` array to add/remove navigation items
 * - Adjust colors in the className attributes
 * - Modify animations in the mobile menu
 */

'use client'; // This directive marks the component as client-side (required for useState, useEffect)

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/**
 * ---------------------------------------------------------------------------
 * NAVIGATION LINKS CONFIGURATION
 * ---------------------------------------------------------------------------
 * Edit this array to add, remove, or reorder navigation items.
 * Each item needs:
 * - href: The URL path (must match your page routes)
 * - label: The text displayed in the navigation
 */
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Ventures' },
  { href: '/trajectory', label: 'Trajectory' },
  { href: '/beyond', label: 'Outside the Screen' },
  { href: '/contact', label: 'Contact' },
];

/**
 * ---------------------------------------------------------------------------
 * NAVIGATION COMPONENT
 * ---------------------------------------------------------------------------
 */
export function Navigation() {
  // State to track if mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State to track if page has been scrolled (for header background)
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Get current pathname to highlight active link
  const pathname = usePathname();

  /**
   * Effect: Track scroll position
   * When user scrolls down, add background to header
   */
  useEffect(() => {
    const handleScroll = () => {
      // If scrolled more than 20px, consider it "scrolled"
      setIsScrolled(window.scrollY > 20);
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Effect: Close mobile menu when route changes
   */
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  /**
   * Effect: Prevent body scroll when mobile menu is open
   */
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Clean up
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* 
        Main Header Element
        - fixed: Stays at top while scrolling
        - backdrop-blur: Frosted glass effect
        - transition: Smooth animation when scrolled state changes
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-void-950/80 backdrop-blur-xl border-b border-steel-800/50'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* 
              Logo/Name Link
              Clicking this always goes to the homepage
            */}
            <Link
              href="/"
              className="relative z-10 font-display text-xl md:text-2xl hover:text-accent-400 transition-colors"
            >
              {/* First name with accent color on first letter */}
              <span className="text-accent-400">Y</span><span className="text-steel-50">ash</span>
              <span className="text-steel-50 font-normal"> Arvind</span>
            </Link>

            {/* 
              Desktop Navigation Links
              Hidden on mobile (md:flex shows it on medium screens and up)
            */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                // Check if this link is the current page
                const isActive = pathname === link.href;
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                      isActive
                        ? 'text-accent-400'
                        : 'text-steel-400 hover:text-steel-100 hover:bg-steel-800/30'
                    }`}
                  >
                    {link.label}
                    
                    {/* Active indicator dot */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-400 rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* 
              Mobile Menu Toggle Button
              Only visible on mobile (md:hidden hides it on larger screens)
            */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative z-10 md:hidden p-2 text-steel-100 hover:text-accent-400 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {/* Animate between hamburger and X icons */}
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* 
        Mobile Menu Overlay
        Full-screen menu that slides in from the right
      */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* 
              Backdrop (dark overlay behind the menu)
              Clicking this closes the menu
            */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-void-950/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* 
              Mobile Menu Content
              Slides in from the right side
            */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-void-900 border-l border-steel-800 z-40 md:hidden"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                {/* Navigation Links */}
                <div className="flex-1 space-y-2">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                            isActive
                              ? 'bg-accent-400/10 text-accent-400'
                              : 'text-steel-300 hover:bg-steel-800/50 hover:text-steel-100'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* 
                  Bottom Section with Social/Contact Info
                */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 border-t border-steel-800"
                >
                  <p className="text-sm text-steel-500 mb-2">Get in touch</p>
                  <a
                    href="mailto:yash@example.com"
                    className="text-steel-300 hover:text-accent-400 transition-colors"
                  >
                    yash@example.com
                  </a>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* 
        Spacer element
        Prevents content from going under the fixed header
      */}
      <div className="h-16 md:h-20" />
    </>
  );
}
