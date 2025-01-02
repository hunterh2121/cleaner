import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import BeforeAfterComparison from "../components/beforeandafter";
import ServicesSection from "../components/ServiceSection";
import HeroSection from "../components/cover";
import WhyChooseUs from "../components/why";
import ModernGallery from "../components/gallery";
import Reviews from "@/components/review";

function Home() {
  const location = useLocation();

  useEffect(() => {
    // Check if we have a scrollTo target in the location statea
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100); // Small delay to ensure content is rendered
    }
  }, [location]);

  return (
    <>
      <HeroSection />

      <WhyChooseUs />

      <section id="services" className="scroll-mt-16">
        <ServicesSection />
      </section>

      <section className="scroll-mt-16 bg-white">
        <BeforeAfterComparison />
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready for Spotless Windows?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get in touch today for a free estimate on our professional window
            cleaning services
          </p>
          <Link
            to="/contact"
            className="bg-[#ff8c28] quote-button hover:bg-[#ff9d4d] text-white px-8 py-3 rounded text-lg font-medium inline-block"
          >
            Contact Us Now
          </Link>
        </div>
      </section>

      <section id="gallery" className="scroll-mt-16">
        <ModernGallery />
      </section>

      <section id="review">
        <Reviews></Reviews>
      </section>
    </>
  );
}

export default Home;
