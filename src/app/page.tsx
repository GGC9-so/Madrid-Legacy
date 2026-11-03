import Hero from "@/components/home/Hero";
import ThisWeek from "@/components/home/ThisWeek";
import QuickLinks from "@/components/home/QuickLinks";
import LatestNews from "@/components/home/LatestNews";
import Trophies from "@/components/home/Trophies";
import CtaBand from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ThisWeek />
      <QuickLinks />
      <LatestNews />
      <Trophies />
      <CtaBand />
    </>
  );
}
