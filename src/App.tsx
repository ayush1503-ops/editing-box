import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Noise from "./components/Noise";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Work from "./components/Work";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-screen font-body text-bone">
      <Noise />
      <Cursor />

      <AnimatePresence>
        {!loaded && <Preloader key="preloader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <Nav />

      <main>
        <Hero started={loaded} />
        <Marquee />
        <About />
        <Work />
        <Services />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
