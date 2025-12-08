import Image from 'next/image';
import { profileImage } from './ProfileImage.css';

type ProfileImageProps = {
  src: string;
  alt: string;
  size?: number;
} & Parameters<typeof Image>[0];

export function ProfileImage({
  src,
  alt,
  size = 32,
  ...props
}: ProfileImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={profileImage}
      {...props}
    />
  );
}
