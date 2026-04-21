import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";

const navItems = ["About", "Experience", "Projects", "Skills", "Education", "Certifications", "Contact"];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActive(id);
    setMobileOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-heading font-bold text-xl gradient-text">
          SA
        </button>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="relative text-sm font-body text-muted-foreground hover:text-foreground transition-colors group"
            >
              {item}
              <span className={`absolute -bottom-1 left-0 h-px bg-teal transition-all duration-300 ${
                active === item ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-teal/50 transition-all icon-3d"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("Contact"); }}
            className="hidden md:inline-block text-xs font-body px-4 py-2 rounded-md border border-teal/30 text-teal hover:bg-teal/10 transition-all"
          >
            Get in Touch
          </a>
          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {/* Mobile dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-t border-border/30 px-6 py-4 space-y-3"
        >
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="block w-full text-left text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
