import type { Metadata } from 'next';

// Setting openGraph on a page replaces the inherited one, so re-attach the
// site-wide card from app/opengraph-image.tsx. Case studies override it with
// their own opengraph-image file.
const defaultImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Yash Arvind, product builder',
};

/** Per-route metadata with matching Open Graph and Twitter fields. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | Yash Arvind`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: 'Yash Arvind',
      locale: 'en_US',
      title: fullTitle,
      description,
      url: path,
      images: [defaultImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [defaultImage],
    },
  };
}
