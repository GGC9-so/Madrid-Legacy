"use client";

import { motion } from "framer-motion";

type Series = { label: string; color: string; values: number[] };

const SIZE = 420;
const C = SIZE / 2;
const R = 125;

const point = (i: number, n: number, value: number): [number, number] => {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const r = (value / 100) * R;
  return [Math.cos(angle) * r, Math.sin(angle) * r];
};

export default function RadarChart({ axes, series }: { axes: string[]; series: Series[] }) {
  const n = axes.length;
  const ring = (f: number) => axes.map((_, i) => point(i, n, f * 100).join(",")).join(" ");

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`Gráfico de radar: ${series.map((s) => s.label).join(" contra ")}`} className="mx-auto w-full max-w-md">
      <g transform={`translate(${C} ${C})`}>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <polygon key={f} points={ring(f)} fill="none" stroke="#C4A35A" strokeOpacity={f === 1 ? 0.7 : 0.28} />
        ))}
        {axes.map((a, i) => {
          const [x, y] = point(i, n, 100);
          const [lx, ly] = point(i, n, 118);
          return (
            <g key={a}>
              <line x1={0} y1={0} x2={x} y2={y} stroke="#C4A35A" strokeOpacity={0.28} />
              <text x={lx} y={ly} textAnchor={Math.abs(lx) < 8 ? "middle" : lx > 0 ? "start" : "end"} dominantBaseline="middle" fontSize={14} fontWeight={600} fill="#0B1F3A">{a}</text>
            </g>
          );
        })}
        {series.map((s, k) => (
          <motion.g key={`${s.label}-${k}`} initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: k * 0.12 }}>
            <polygon points={s.values.map((v, i) => point(i, n, v).join(",")).join(" ")} fill={s.color} fillOpacity={0.28} stroke={s.color} strokeWidth={2.5} strokeLinejoin="round" />
            {s.values.map((v, i) => {
              const [x, y] = point(i, n, v);
              return <circle key={i} cx={x} cy={y} r={3.5} fill={s.color} />;
            })}
          </motion.g>
        ))}
      </g>
    </svg>
  );
}
