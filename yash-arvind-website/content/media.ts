/**
 * Images for work previews, case-study heroes, and the home "Shipped" strip.
 * STUB: the assets agent replaces this with optimized files and full coverage.
 */

export interface WorkImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Cover image per case-study slug: the WorkList hover preview and the case-study hero (shared morph). */
export const workMedia: Record<string, WorkImage> = {
  tam: {
    src: '/images/tam-dashboard.png',
    alt: 'TAM dashboard showing a due-diligence report with flagged anomalies',
    width: 3840,
    height: 2486,
  },
};

/** Images for the 3D "Shipped" strip on the home page. */
export const stripImages: (WorkImage & { caption: string; href?: string })[] = [];
