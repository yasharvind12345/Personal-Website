import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card: dark background, gold accent, name + positioning. */
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #0a0a0b 0%, #151517 60%, #1a1a1d 100%)',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#fbbf24' }} />
          <div style={{ fontSize: 26, letterSpacing: 4, textTransform: 'uppercase', color: '#a1a1aa' }}>
            {eyebrow}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 38, color: '#d4d4d8', marginTop: 28, lineHeight: 1.3, maxWidth: 980 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 28, color: '#fbbf24' }}>yasharvind.com</div>
          <div style={{ width: 240, height: 4, background: 'linear-gradient(90deg, transparent, #fbbf24)' }} />
        </div>
      </div>
    ),
    ogSize
  );
}
