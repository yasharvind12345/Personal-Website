import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

// Palette from DESIGN.md. Satori can't read CSS variables, so hex here.
const paper = '#F4F1EA';
const ink = '#111110';
const muted = '#5E5B54';
const rule = '#D9D4C7';
const accent = '#FF4F00';

type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 600; style: 'normal' };

// Latin subsets of Archivo (static Expanded cut stands in for `.display`) and
// IBM Plex Mono. Read once per process; on failure, fall back to the default font.
let fontsPromise: Promise<OgFont[]> | null = null;
function loadFonts(): Promise<OgFont[]> {
  if (fontsPromise) return fontsPromise;
  const dir = join(process.cwd(), 'lib/fonts');
  const load = async (file: string, name: string, weight: 400 | 600): Promise<OgFont> => {
    const buf = await readFile(join(dir, file));
    const data = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
    return { name, data, weight, style: 'normal' };
  };
  fontsPromise = Promise.all([
    load('Archivo-Expanded-SemiBold.ttf', 'Archivo Expanded', 600),
    load('Archivo-Regular.ttf', 'Archivo', 400),
    load('IBMPlexMono-Regular.ttf', 'Plex Mono', 400),
  ]).catch((err) => {
    console.warn('[og] font load failed, using default font:', err);
    return [];
  });
  return fontsPromise;
}

// Long titles step down so they stay on one or two lines.
function titleSize(title: string) {
  if (title.length <= 12) return 148;
  if (title.length <= 22) return 100;
  return 76;
}

/** Shared Open Graph card: paper, ink, expanded grotesk title, mono meta. */
export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  const fonts = await loadFonts();
  const hasFonts = fonts.length > 0;
  const display = hasFonts ? 'Archivo Expanded' : 'sans-serif';
  const body = hasFonts ? 'Archivo' : 'sans-serif';
  const mono = hasFonts ? 'Plex Mono' : 'monospace';
  const size = titleSize(title);

  const metaStyle = {
    fontFamily: mono,
    fontSize: 20,
    letterSpacing: 2.4,
    textTransform: 'uppercase' as const,
    color: muted,
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px 72px 52px',
          background: paper,
          color: ink,
          fontFamily: body,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 12, height: 12, background: accent }} />
              <div style={{ ...metaStyle, color: ink }}>{eyebrow}</div>
            </div>
            <div style={metaStyle}>yasharvind.com</div>
          </div>
          <div style={{ height: 2, background: ink }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontFamily: display,
              fontWeight: 600,
              fontSize: size,
              lineHeight: 0.95,
              letterSpacing: -size * 0.04,
              maxWidth: 1056,
            }}
          >
            {title}
            {/* Separate flex item, so it misses the title's tracking; pull it in. */}
            <span style={{ color: accent, marginLeft: -size * 0.1 }}>.</span>
          </div>
          {subtitle ? (
            <div style={{ display: 'flex', marginTop: 36, paddingTop: 24, borderTop: `1.5px solid ${rule}` }}>
              <div style={{ fontSize: 32, lineHeight: 1.3, letterSpacing: -0.3, color: muted, maxWidth: 960 }}>
                {subtitle}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...ogSize, fonts: hasFonts ? fonts : undefined }
  );
}
