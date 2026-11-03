"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

interface InstallEvent extends Event {
  prompt: () => Promise<void>;
}

export default function InstallButton() {
  const [event, setEvent] = useState<InstallEvent | null>(null);

  useEffect(() => {
    const onPrompt = (e: Event) => { e.preventDefault(); setEvent(e as InstallEvent); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!event) return null;
  return (
    <button type="button" onClick={async () => { await event.prompt(); setEvent(null); }} className="btn-ghost mt-5">
      <Download className="h-4 w-4" /> Instalar la app
    </button>
  );
}
