import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from "lucide-react";

import { TableHead } from "@/components/ui/table";
import { interpolate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { messages } from "@/messages/en";

interface SortableHeadProps {
  label: string;
  href: string;
  direction?: "asc" | "desc";
  align?: "left" | "right";
}

export function SortableHead({ label, href, direction, align = "left" }: SortableHeadProps) {
  const Icon = direction === "asc" ? ArrowUpIcon : direction === "desc" ? ArrowDownIcon : ChevronsUpDownIcon;
  return (
    <TableHead
      aria-sort={direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}
      className={cn(align === "right" && "text-right")}
    >
      <Link
        href={href}
        scroll={false}
        aria-label={interpolate(messages.common.sortBy, { column: label })}
        className={cn(
          "inline-flex items-center gap-1 hover:text-heading",
          direction && "text-heading",
          align === "right" && "flex-row-reverse",
        )}
      >
        {label}
        <Icon className={cn("size-3.5", !direction && "opacity-50")} aria-hidden />
      </Link>
    </TableHead>
  );
}
