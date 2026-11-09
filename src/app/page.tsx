import { getProducts } from "@/lib/products";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { WorkshopSection } from "@/components/sections/WorkshopSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <main className="mx-auto max-w-6xl px-6">
        <HeroSection />
        <ProductCatalog products={products} />
        <MethodologySection />
        <WorkshopSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}