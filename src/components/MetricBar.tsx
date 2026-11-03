"use client";

import { motion } from "framer-motion";

export default function MetricBar({ label, value, strong = true }: { label: string; value: number; strong?: boolean }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-muted">
        <span>{label}</span>
        <span className="font-semibold text-night">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-night/10">
        <motion.div initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className={`h-full rounded-full ${strong ? "bg-gold" : "bg-night/40"}`} />
      </div>
    </div>
  );
}
