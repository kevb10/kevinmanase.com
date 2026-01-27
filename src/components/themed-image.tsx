"use client";

interface ThemedImageProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  className?: string;
}

export function ThemedImage({
  lightSrc,
  darkSrc,
  alt,
  className = "",
}: ThemedImageProps) {
  return (
    <>
      <img
        src={lightSrc}
        alt={alt}
        className={`block dark:hidden ${className}`}
      />
      <img
        src={darkSrc}
        alt={alt}
        className={`hidden dark:block ${className}`}
      />
    </>
  );
}
