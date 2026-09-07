import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { ScrollProgress } from "@/components/site/ScrollProgress";

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* Mobile gets the sticky Call/WhatsApp/Book bar instead of the
          floating button - two WhatsApp entry points on one small screen
          is redundant. */}
      <div className="hidden md:block">
        <FloatingWhatsApp />
      </div>
      <MobileActionBar />
      <div className="h-16 md:hidden" aria-hidden />
    </>
  );
}
