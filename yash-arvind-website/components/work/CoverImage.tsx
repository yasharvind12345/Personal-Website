import Image from 'next/image';
import { phoneSets, type WorkImage } from '@/content/media';

/**
 * Fills a 16:10 cover frame. Wide images crop to fit; phone screenshots sit
 * whole, side by side, so nothing tall gets sliced into a strip.
 */
export function CoverImage({
  slug,
  media,
  sizes,
  alt = media.alt,
  priority,
  eager,
}: {
  slug: string;
  media: WorkImage;
  sizes: string;
  alt?: string;
  priority?: boolean;
  eager?: boolean;
}) {
  if (media.kind !== 'phone') {
    return (
      <Image
        src={media.src}
        alt={alt}
        width={media.width}
        height={media.height}
        sizes={sizes}
        priority={priority}
        loading={eager && !priority ? 'eager' : undefined}
        className="h-full w-full object-cover"
      />
    );
  }

  const set = phoneSets[slug] ?? [media];
  return (
    <div className="flex h-full w-full items-center justify-center gap-[3%] px-[6%]" role={alt ? 'img' : undefined} aria-label={alt || undefined}>
      {set.map((shot, i) => (
        <Image
          key={shot.src}
          src={shot.src}
          alt=""
          width={shot.width}
          height={shot.height}
          sizes="(min-width: 768px) 16vw, 30vw"
          priority={priority}
          loading={eager && !priority ? 'eager' : undefined}
          className={`h-[82%] w-auto rounded-[6%/2.8%] object-contain ${
            set.length === 3 && i !== 1 ? 'translate-y-[5%] opacity-90' : ''
          }`}
        />
      ))}
    </div>
  );
}
