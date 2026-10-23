import Link from "next/link";

export function TagChip({ tag, href }: { tag: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex h-5 items-center rounded-full border px-2 text-[11px] font-normal text-muted-foreground hover:border-primary hover:text-primary"
    >
      {tag}
    </Link>
  );
}
