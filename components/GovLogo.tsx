import Image from 'next/image';
import govLogoSrc from '@/gov-removebg-preview.png';

/**
 * GOV Logo component — uses the official GOV icon PNG.
 * The image file lives at demo/gov-removebg-preview.png
 * and is imported statically by Next.js Image.
 */
export function GovLogo({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <Image
      src={govLogoSrc}
      alt="GOV Components Library Logo"
      width={size}
      height={size}
      className={className}
      priority
      style={{ objectFit: 'contain' }}
    />
  );
}
