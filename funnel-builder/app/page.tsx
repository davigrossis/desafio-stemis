import FunnelBuilder from "@/app/components/funnel/funnel-builder";
import Header from "@/app/components/header/header";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col bg-background text-foreground">
      <Header />

      <section className="min-h-0 flex-1">
        <FunnelBuilder />
      </section>
    </main>
  );
}
