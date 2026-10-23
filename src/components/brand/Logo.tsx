import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  surface: "light" | "dark";
  className?: string;
}

const variants = {
  light: { src: "/brand/logo-light-bg.svg", width: 673, height: 88 },
  dark: { src: "/brand/logo-dark-bg.svg", width: 653, height: 86 },
} as const;

export function Logo({ surface, className }: LogoProps) {
  const { src, width, height } = variants[surface];
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt="Open Elements"
      preload
      className={cn("h-6 w-auto", className)}
    />
  );
}
