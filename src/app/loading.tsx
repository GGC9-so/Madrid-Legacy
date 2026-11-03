import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <section role="status" aria-label="Cargando" className="container-x py-16 lg:py-24">
      <Skeleton className="h-12 w-2/3 max-w-xl" />
      <Skeleton className="mt-4 h-5 w-full max-w-lg" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => <Skeleton key={i} className="h-40" />)}
      </div>
    </section>
  );
}
