import { useEffect, useState } from "react";
import { Nav } from "./components/Nav.jsx";
import { Hero } from "./components/Hero.jsx";
import { CurrentlyBuilding } from "./components/CurrentlyBuilding.jsx";
import { WorkIndex } from "./components/WorkIndex.jsx";
import { TinkeringLog } from "./components/TinkeringLog.jsx";
import { About } from "./components/About.jsx";
import { Footer } from "./components/Footer.jsx";
import { ProjectFocus } from "./components/ProjectFocus.jsx";

const ACCENT = "#c46b3a";
const CARD_STYLE = "minimal";

export default function App() {
  const [active, setActive] = useState("work");
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", ACCENT);
  }, []);

  useEffect(() => {
    const ids = ["work", "log", "about"];
    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setFocused(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNav = (key) => {
    setActive(key);
    if (key === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(key);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 24;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div id="top" className="page">
      <Nav active={active} onNav={handleNav} />
      <Hero />
      <CurrentlyBuilding />
      <WorkIndex onOpenProject={setFocused} cardStyle={CARD_STYLE} />
      <TinkeringLog />
      <About />
      <Footer />
      <ProjectFocus project={focused} onClose={() => setFocused(null)} />
    </div>
  );
}
