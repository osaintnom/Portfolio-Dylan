import { Nav } from "@/components/Nav";
import { ContactFab } from "@/components/ContactFab";
import { Hero } from "@/components/sections/Hero";
import { CategoryDirectory } from "@/components/sections/CategoryDirectory";
import { Reel } from "@/components/sections/Reel";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CategoryDirectory />
        <Reel />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <ContactFab />
    </>
  );
}
