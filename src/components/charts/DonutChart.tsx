interface Segment {
  key: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: Segment[];
  centerValue: string;
  centerLabel: string;
  title: string;
}

const SIZE = 140;
const STROKE = 18;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function DonutChart({ segments, centerValue, centerLabel, title }: DonutChartProps) {
  const total = segments.reduce((n, s) => n + s.value, 0);
  const arcs = segments.reduce<{ key: string; color: string; length: number; offset: number }[]>(
    (acc, s) => {
      const offset = acc.reduce((n, a) => n + a.length, 0);
      return [...acc, { key: s.key, color: s.color, length: (s.value / total) * CIRCUMFERENCE, offset }];
    },
    [],
  );

  return (
    <div className="relative size-36 shrink-0">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={title} className="-rotate-90">
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="var(--secondary)" strokeWidth={STROKE} />
        {arcs.map((a) => (
          <circle
            key={a.key}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={a.color}
            strokeWidth={STROKE}
            strokeDasharray={`${Math.max(a.length - 2, 0)} ${CIRCUMFERENCE}`}
            strokeDashoffset={-a.offset}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-lg font-bold text-navy">{centerValue}</span>
        <span className="text-[10px] text-muted-foreground">{centerLabel}</span>
      </div>
    </div>
  );
}
