'use client';

import { Fragment, useRef } from 'react';
import { gsap, useGSAP, MOTION_OK, HOVER_OK } from '@/components/motion/gsap';
import { profile } from '@/content/profile';
import { createWidthField, WDTH_REST } from './widthField';

const { before, emphasis, after } = profile.statement;
const plain = `${before} ${emphasis} ${after}`;

// Line units. Each unit never wraps. On wide screens each pair shares a line:
//   I build / products people / actually use.
// On phones every unit is its own line.
const words = before.split(' ');
const lead = words.slice(0, -2).join(' ');
const pair = words.slice(-2);
const tail = after.endsWith('.') ? after.slice(0, -1) : after;
const stop = after.endsWith('.');

/** One span per letter; spaces stay plain text so word spacing is untouched. */
function Letters({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, w) => (
        <Fragment key={w}>
          {w > 0 && ' '}
          {Array.from(word).map((ch, i) => (
            <span key={i} data-l="">
              {ch}
            </span>
          ))}
        </Fragment>
      ))}
    </>
  );
}

function Unit({ children }: { children: React.ReactNode }) {
  return (
    <span className="hero-unit">
      <span className="hero-unit-in">{children}</span>
    </span>
  );
}

/**
 * The hero statement. Letters widen near the cursor and condense away from it
 * (see widthField.ts); on touch, a tap sends one ripple through the lines.
 * Reduced motion or no JS: static type at the resting width.
 */
export function HeroStatement() {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const h1 = ref.current;
      if (!h1) return;
      const mm = gsap.matchMedia();

      mm.add({ motion: MOTION_OK, hover: HOVER_OK }, (ctx) => {
        const { motion, hover } = ctx.conditions as { motion: boolean; hover: boolean };
        if (!motion) {
          h1.setAttribute('data-ready', '');
          h1.setAttribute('data-settled', '');
          return;
        }

        let field: ReturnType<typeof createWidthField> | null = null;
        const units = h1.querySelectorAll('.hero-unit-in');
        const letters = Array.from(h1.querySelectorAll<HTMLElement>('[data-l]'));
        const from = 78;
        const proxies = letters.map(() => ({ s: from }));

        h1.setAttribute('data-ready', '');
        const tl = gsap.timeline({
          delay: 0.05,
          onComplete: () => {
            h1.setAttribute('data-settled', '');
            field = createWidthField(h1, hover ? 'pointer' : 'tap', h1.closest('section'));
            // No cursor on touch screens: one ripple from the first letter hints that the type is alive.
            if (!hover) {
              const first = letters[0]?.getBoundingClientRect();
              if (first) field.rippleFrom(first.left + window.scrollX, first.top + first.height / 2 + window.scrollY);
            }
          },
        });
        // Lines rise out of their masks while the letters open up from condensed to rest.
        tl.from(units, { yPercent: 160, duration: 0.85, stagger: 0.075, ease: 'expo.out' }, 0);
        letters.forEach((el, i) => {
          el.style.fontStretch = `${from}%`;
          tl.to(
            proxies[i],
            {
              s: WDTH_REST,
              duration: 0.8,
              ease: 'expo.out',
              onUpdate: () => {
                el.style.fontStretch = `${proxies[i].s.toFixed(2)}%`;
              },
            },
            0.12 + i * 0.012,
          );
        });

        return () => {
          tl.kill();
          field?.destroy();
          letters.forEach((el) => (el.style.fontStretch = ''));
          h1.removeAttribute('data-settled');
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <h1 ref={ref} aria-label={plain} className="hero-title display">
      <span aria-hidden="true" className="block">
        {lead && (
          <Unit>
            <Letters text={lead} />
          </Unit>
        )}
        <span className="hero-pair">
          <Unit>
            <Letters text={pair[0]} />
          </Unit>{' '}
          <Unit>
            <Letters text={pair[1]} />
          </Unit>
        </span>
        <span className="hero-pair">
          <Unit>
            <span className="hero-em font-serif font-normal italic">{emphasis}</span>
          </Unit>{' '}
          <Unit>
            <Letters text={tail} />
            {stop && (
              <span data-l="" className="text-accent">
                .
              </span>
            )}
          </Unit>
        </span>
      </span>
    </h1>
  );
}
