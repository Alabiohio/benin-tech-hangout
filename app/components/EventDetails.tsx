"use client";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function EventDetails() {
  return (
    <section className="relative bg-white py-16">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 border-y border-slate-100"
        >
          {/* Location */}
          <motion.div 
            variants={itemVariants}
            className="group py-8 md:py-12 md:pr-12 flex items-start gap-5 border-b border-slate-100 md:border-b-0 md:border-r border-slate-100"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-biro-blue/5 flex items-center justify-center rounded-sm text-biro-blue group-hover:bg-biro-blue group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-biro-blue uppercase tracking-widest mb-1">Venue</span>
              <h3 className="text-xl font-bold text-biro-blue-dark leading-tight">Benin City, Edo State</h3>
            </div>
          </motion.div>

          {/* Date */}
          <motion.div 
            variants={itemVariants}
            className="group py-8 md:py-12 md:px-12 flex items-start gap-5 border-b border-slate-100 md:border-b-0 md:border-r border-slate-100"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-biro-blue/5 flex items-center justify-center rounded-sm text-biro-blue group-hover:bg-biro-blue group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-biro-blue uppercase tracking-widest mb-1">Event Date</span>
              <h3 className="text-xl font-bold text-biro-blue-dark leading-tight">October 2, 2026</h3>
            </div>
          </motion.div>

          {/* Access */}
          <motion.div 
            variants={itemVariants}
            className="group py-8 md:py-12 md:pl-12 flex items-start gap-5"
          >
            <div className="flex-shrink-0 w-12 h-12 bg-biro-blue/5 flex items-center justify-center rounded-sm text-biro-blue group-hover:bg-biro-blue group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-biro-blue uppercase tracking-widest mb-1">Registration</span>
              <h3 className="text-xl font-bold text-biro-blue-dark leading-tight">Free & Paid Passes</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Available Now</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

