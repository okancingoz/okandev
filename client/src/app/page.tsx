// app/page.tsx
import GalaxyScene from "@/app/lib/galaxy-scene";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <div className="relative h-screen w-full">
      <Header />
      <GalaxyScene />;
    </div>
  );
}
