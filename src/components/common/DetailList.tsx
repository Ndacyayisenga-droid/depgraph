export interface DetailItem {
  label: string;
  value: React.ReactNode;
}

interface DetailListProps {
  /** Falsy entries are skipped, so optional rows can be written inline. */
  items: (DetailItem | false | "" | null | undefined)[];
}

export function DetailList({ items }: DetailListProps) {
  return (
    <dl className="grid grid-cols-[minmax(110px,auto)_1fr] gap-x-6 gap-y-3 text-[13px]">
      {items.filter((item): item is DetailItem => Boolean(item)).map(({ label, value }) => (
        <div key={label} className="contents">
          <dt className="text-muted-foreground">{label}</dt>
          <dd className="font-semibold text-heading">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
