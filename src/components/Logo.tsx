import Image from "next/image";

export default function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return <Image src="/logo-mark.png" alt="" width={356} height={600} priority className={className} />;
}
