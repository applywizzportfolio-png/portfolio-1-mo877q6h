import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Get In" accent="Touch" subtitle="Establishing Connection" />

        <div className="grid lg:grid-cols-5 gap-12 mt-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <ThreeDCard>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="glass rounded-3xl p-10 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] -z-10" />
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { id: "name", label: "Identity", type: "text", placeholder: "e.g. John Doe" },
                      { id: "email", label: "Email Node", type: "email", placeholder: "john@system.com" },
                    ].map((field) => (
                      <div key={field.id} className="relative group">
                        <label className="block text-[10px] font-heading font-black tracking-[0.2em] text-muted-foreground uppercase mb-2 group-hover:text-primary transition-colors">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full bg-secondary/50 border border-white/5 rounded-xl px-4 py-4 text-sm font-heading font-bold text-foreground focus:border-primary/50 focus:bg-secondary/80 focus:outline-none transition-all"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="relative group">
                    <label className="block text-[10px] font-heading font-black tracking-[0.2em] text-muted-foreground uppercase mb-2 group-hover:text-primary transition-colors">
                      Subject Matter
                    </label>
                    <input
                      type="text"
                      placeholder="Infrastructure Design"
                      className="w-full bg-secondary/50 border border-white/5 rounded-xl px-4 py-4 text-sm font-heading font-bold text-foreground focus:border-primary/50 focus:bg-secondary/80 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="relative group">
                    <label className="block text-[10px] font-heading font-black tracking-[0.2em] text-muted-foreground uppercase mb-2 group-hover:text-primary transition-colors">
                      Request Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Transmitting message parameters..."
                      className="w-full bg-secondary/50 border border-white/5 rounded-xl px-4 py-4 text-sm font-heading font-bold text-foreground focus:border-primary/50 focus:bg-secondary/80 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02, translateZ: 20 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 rounded-2xl gradient-bg text-accent-foreground font-heading font-black text-base uppercase tracking-widest hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 group overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                    <ThreeDIcon icon={Send} size={20} color="white" /> Initiating Transfer
                  </motion.button>
                </form>
              </motion.div>
            </ThreeDCard>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: MapPin, label: "Geographic Hub", value: "Cumming, GA (Open to Relocate)", color: "hsl(var(--teal))" },
              { icon: Mail, label: "Digital Node", value: "sowjanyaallam.dev@gmail.com", href: "mailto:sowjanyaallam.dev@gmail.com", color: "hsl(var(--primary))" },
              { icon: Phone, label: "Voice Channel", value: "+1 (361) 737-2643", href: "tel:+13617372643", color: "hsl(var(--electric))" },
            ].map((item, i) => (
              <ThreeDCard key={item.label}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  className="glass rounded-2xl p-6 group h-full border border-white/5 hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/80 border border-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors shadow-inner">
                      <ThreeDIcon icon={item.icon} size={24} color={item.color} />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground font-heading font-black uppercase tracking-[0.2em] mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-base font-heading font-black text-foreground hover:text-primary transition-colors tracking-tight">{item.value}</a>
                      ) : (
                        <p className="text-base font-heading font-black text-foreground tracking-tight">{item.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </ThreeDCard>
            ))}
            
            {/* Additional Status Card */}
            <ThreeDCard>
              <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 flex flex-col items-center justify-center text-center">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-ping mb-4" />
                <h4 className="text-sm font-heading font-black uppercase tracking-widest text-primary">Status: Active</h4>
                <p className="text-xs text-muted-foreground font-body mt-2">Ready for Immediate Engagement</p>
              </div>
            </ThreeDCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

