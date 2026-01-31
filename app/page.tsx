import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EventDetails from "./components/EventDetails";
import About from "./components/About";
import VisionMission from "./components/VisionMission";
import WhyAttend from "./components/WhyAttend";
import WhatToExpect from "./components/WhatToExpect";
import Gallery from "./components/Gallery";
import Organizer from "./components/Organizer";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import BackgroundWrapper from "./components/BackgroundWrapper";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans relative">
      <BackgroundWrapper />
      <Navbar />
      <main className="flex-grow relative z-10">
        <Hero />
        <EventDetails />
        <About />
        <VisionMission />
        <Gallery />
        <WhyAttend />
        <WhatToExpect />
        <Organizer />
        <Registration />
      </main>
      <Footer />
    </div>
  );
}
