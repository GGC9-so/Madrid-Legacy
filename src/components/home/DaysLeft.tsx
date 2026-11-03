"use client";

import { useEffect, useState } from "react";

export default function DaysLeft({ date }: { date: string }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const now = new Date();
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const [y, m, d] = date.split("-").map(Number);
    const days = Math.round((Date.UTC(y, m - 1, d) - today) / 86400000);
    setText(days < 0 ? "" : days === 0 ? "¡Hoy se juega!" : days === 1 ? "Mañana" : `Faltan ${days} días`);
  }, [date]);

  return <span className="inline-block min-h-[2rem] font-display text-2xl text-gold-dark">{text}</span>;
}
