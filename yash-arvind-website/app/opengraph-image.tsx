import { renderOgImage, ogSize } from '@/lib/og';
import { profile } from '@/content/profile';

export const alt = 'Yash Arvind, product builder';
export const size = ogSize;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: 'Product Builder',
    title: profile.name,
    subtitle: profile.headline,
  });
}
