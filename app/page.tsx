import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Destinations from "@/components/Destinations";
import Testimonials from "@/components/Testimonials";
import ExploreB2B from "@/components/ExploreB2B";

import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Services />
      <Destinations />
      <ExploreB2B />
      <Testimonials />
      <AboutUs />
      <ContactUs />
      <Footer />
    </main>
  );
}
