/**
 * =============================================================================
 * ANIMATED TEXT COMPONENT
 * =============================================================================
 * 
 * A component that animates text character-by-character or word-by-word.
 * Great for hero sections and dramatic reveals.
 * 
 * USAGE EXAMPLES:
 * 
 * Character animation:
 * <AnimatedText text="Hello World" />
 * 
 * Word animation:
 * <AnimatedText text="Hello World" animation="words" />
 * 
 * With custom delay:
 * <AnimatedText text="Hello" delay={0.5} />
 */

'use client';

import { motion, Variants } from 'framer-motion';

/**
 * ---------------------------------------------------------------------------
 * TYPE DEFINITIONS
 * ---------------------------------------------------------------------------
 */
interface AnimatedTextProps {
  text: string;
  className?: string;
  animation?: 'characters' | 'words' | 'fade';
  delay?: number;               // Initial delay before animation starts
  staggerDelay?: number;        // Delay between each character/word
  once?: boolean;               // Only animate once (on first view)
}

/**
 * ---------------------------------------------------------------------------
 * ANIMATION VARIANTS
 * ---------------------------------------------------------------------------
 */

// Container animation - controls when children animate
const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.03,    // Time between each child
      delayChildren: delay,     // Initial delay
    },
  }),
};

// Individual character/word animation
const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.2, 0.65, 0.3, 0.9], // Custom easing curve
    },
  },
};

// Simple fade animation (for words mode)
const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * ---------------------------------------------------------------------------
 * ANIMATED TEXT COMPONENT
 * ---------------------------------------------------------------------------
 */
export function AnimatedText({
  text,
  className = '',
  animation = 'characters',
  delay = 0,
  staggerDelay = 0.03,
  once = true,
}: AnimatedTextProps) {
  /**
   * Split text into array based on animation type
   */
  const getTextArray = () => {
    if (animation === 'words') {
      return text.split(' ');
    }
    // For characters, preserve spaces
    return text.split('');
  };

  const textArray = getTextArray();

  /**
   * Simple fade animation - no splitting
   */
  if (animation === 'fade') {
    return (
      <motion.span
        className={className}
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once }}
        custom={delay}
      >
        {text}
      </motion.span>
    );
  }

  /**
   * Character or word animation
   */
  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      custom={delay}
      aria-label={text}  // Accessibility: screen readers read full text
    >
      {textArray.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={childVariants}
          className="inline-block"
          style={{
            // Preserve spaces
            marginRight: animation === 'words' ? '0.25em' : undefined,
          }}
          aria-hidden="true" // Hide individual chars from screen readers
        >
          {/* Replace spaces with non-breaking space to preserve them */}
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * ---------------------------------------------------------------------------
 * ANIMATED HEADING COMPONENT
 * ---------------------------------------------------------------------------
 * A convenience wrapper for heading elements
 */
interface AnimatedHeadingProps extends AnimatedTextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function AnimatedHeading({
  as: Component = 'h2',
  text,
  className = '',
  ...props
}: AnimatedHeadingProps) {
  return (
    <Component className={className}>
      <AnimatedText text={text} {...props} />
    </Component>
  );
}
