import Atmosphere from "@/components/public/Atmosphere";
import FeaturedMenu from "@/components/public/FeaturedMenu";
import Hero from "@/components/public/Hero";
import Philosophy from "@/components/public/Philosophy";
import Testimonial from "@/components/public/Testimonial";

export default function HomePage() {
  return (
    <section>
      <Hero />
      <Philosophy />
      <FeaturedMenu />
      <Atmosphere />
      <Testimonial />
    </section>
  );
}