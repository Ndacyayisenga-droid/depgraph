import { formatMonth } from "@/lib/format";

interface Series<K extends string> {
  key: K;
  label: string;
  color: string;
}

interface TrendChartProps<K extends string> {
  points: ({ month: string } & Record<K, number>)[];
  series: Series<K>[];
  title: string;
}

const WIDTH = 600;
const HEIGHT = 220;
const PAD = { top: 12, right: 12, bottom: 28, left: 32 };
const TARGET_TICKS = 5;

function niceStep(raw: number): number {
  const magnitude = Math.pow(10, Math.floor(Math.log10(Math.max(raw, 1))));
  const multiplier = [1, 2, 5, 10].find((m) => m * magnitude >= raw) ?? 10;
  return multiplier * magnitude;
}

export function TrendChart<K extends string>({ points, series, title }: TrendChartProps<K>) {
  const peak = Math.max(...points.flatMap((p) => series.map((s) => p[s.key])));
  const step = niceStep(peak / TARGET_TICKS);
  const max = Math.ceil(peak / step) * step;
  const gridLines = max / step;
  const innerW = WIDTH - PAD.left - PAD.right;
  const innerH = HEIGHT - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (innerW * i) / Math.max(points.length - 1, 1);
  const y = (v: number) => PAD.top + innerH - (innerH * v) / max;

  return (
    <div className="flex flex-col gap-4">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={title}
        className="h-auto w-full overflow-visible"
      >
        {Array.from({ length: gridLines + 1 }, (_, i) => {
          const value = step * i;
          return (
            <g key={i}>
              <line
                x1={PAD.left}
                x2={WIDTH - PAD.right}
                y1={y(value)}
                y2={y(value)}
                stroke="var(--chart-grid)"
              />
              <text
                x={PAD.left - 8}
                y={y(value)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted-foreground text-[10px]"
              >
                {value}
              </text>
            </g>
          );
        })}
        {points.map((p, i) => (
          <text
            key={p.month}
            x={x(i)}
            y={HEIGHT - 6}
            textAnchor="middle"
            className="fill-muted-foreground text-[10px]"
          >
            {formatMonth(p.month)}
          </text>
        ))}
        {series.map((s) => (
          <polyline
            key={s.key}
            points={points.map((p, i) => `${x(i)},${y(p[s.key])}`).join(" ")}
            fill="none"
            stroke={s.color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
        {series.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span className="h-1 w-4 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
