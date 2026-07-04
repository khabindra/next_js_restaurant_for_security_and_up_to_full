import FeaturedMenu from "@/components/public/FeaturedMenu";
import Hero from "@/components/public/Hero";
import Testimonial from "@/components/public/Testimonial";

export default function HomePage() {
  return (
    <section>
      <Hero />
      <FeaturedMenu />
      <Testimonial />
    </section>
  );
}