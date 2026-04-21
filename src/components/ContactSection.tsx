import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./AboutSection";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { ThreeDCard } from "./3d/ThreeDCard";
import { ThreeDIcon } from "./3d/ThreeDIcon";

interface ContactSectionProps {
  contact: {
    email?: string;
    phone?: string;
    location?: string;
  };
}

const ContactSection = ({ contact }: ContactSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [focused, setFocused] = useState<string | null>(null);

  const contactInfo = [
    { icon: Mail, label: "Email", value: contact.email || "hello@example.com", color: "hsl(var(--primary))" },
    { icon: Phone, label: "Phone", value: contact.phone || "+1 234 567 890", color: "hsl(var(--teal))" },
    { icon: MapPin, label: "Location", value: contact.location || "Available Globally", color: "hsl(var(--electric))" },
  ].filter(c => c.value);

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
                    <div className="space-y-2">
                      <label className="text-xs font-heading font-black uppercase tracking-widest text-muted-foreground ml-1">Name</label>
                      <input 
                        type="text" 
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        className={`w-full bg-secondary/50 border ${focused === 'name' ? 'border-primary/50' : 'border-white/5'} rounded-xl px-6 py-4 text-foreground focus:outline-none transition-colors font-body`}
                        placeholder="Your Name" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-heading font-black uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                      <input 
                        type="email" 
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        className={`w-full bg-secondary/50 border ${focused === 'email' ? 'border-primary/50' : 'border-white/5'} rounded-xl px-6 py-4 text-foreground focus:outline-none transition-colors font-body`}
                        placeholder="your@email.com" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-heading font-black uppercase tracking-widest text-muted-foreground ml-1">Message</label>
                    <textarea 
                      rows={4} 
                      onFocus={() => setFocused('msg')}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-secondary/50 border ${focused === 'msg' ? 'border-primary/50' : 'border-white/5'} rounded-xl px-6 py-4 text-foreground focus:outline-none transition-colors font-body resize-none`}
                      placeholder="Your message here..." 
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full gradient-bg text-white font-heading font-black uppercase tracking-[0.2em] py-5 rounded-xl shadow-xl flex items-center justify-center gap-3"
                  >
                    <Send size={20} />
                    Send Connection Request
                  </motion.button>
                </form>
              </motion.div>
            </ThreeDCard>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="group p-8 rounded-3xl glass border border-white/5 hover:border-primary/20 transition-all flex items-center gap-6"
              >
                <div className="p-4 rounded-2xl bg-secondary border border-white/10 group-hover:bg-primary/10 transition-colors">
                  <ThreeDIcon icon={info.icon} size={28} color={info.color} />
                </div>
                <div>
                  <p className="text-[10px] font-heading font-black uppercase tracking-[0.2em] text-primary mb-1">{info.label}</p>
                  <p className="text-xl font-heading font-black text-foreground break-all">{info.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
