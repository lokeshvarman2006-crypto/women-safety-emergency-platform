import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import Hero from "../../components/common/Hero";
import Features from "../../components/common/Features";
import HowItWorks from "../../components/common/HowItWorks";
import Statistics from "../../components/common/Statistics";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <Statistics />

      <Footer />
    </>
  );
}

export default Home;