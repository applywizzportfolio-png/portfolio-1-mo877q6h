import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Server, Terminal, Github, Linkedin, Briefcase } from "lucide-react";

interface HeaderProps {
  name: string;
}

const Header = ({ name }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about", icon: User },
    { label: "Work", href: "#experience", icon: Briefcase },
    { label: "Projects", href: "#projects", icon: Server },
    { label: "Contact", href: "#contact", icon: Terminal },
  ];

  // Get initials for logo
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : "SA";

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-4 bg-background/80 backdrop-blur-xl border-b border-white/5" : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <motion.a 
          href="/"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group"
        >
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-heading font-black text-xl text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] group-hover:scale-110 transition-transform">
            {initials}
          </div>
          <span className="text-xl font-heading font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
            {name || "Portfolio"}
          </span>
        </motion.a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-xs font-heading font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </motion.a>
          ))}
          
          <div className="h-6 w-px bg-white/10 mx-2" />
          
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="#" className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </nav>

        {/* MOBILE TOGGLE */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-12 h-12 rounded-xl bg-secondary border border-white/10 flex flex-col items-center justify-center gap-1.5"
        >
          <span className={`w-6 h-0.5 bg-foreground transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-foreground transition-all ${isOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-foreground transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-secondary/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-10 space-y-8">
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-6 text-2xl font-heading font-black text-foreground hover:text-primary transition-colors"
                >
                  <item.icon size={24} className="text-primary" />
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Header;
