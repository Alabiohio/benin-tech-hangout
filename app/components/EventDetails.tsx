"use client";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
  },
};

export default function EventDetails() {
  const details = [
    { 
      label: "Location", 
      value: "Benin City, NG", 
      icon: <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></> 
    },
    { 
      label: "Date & Time", 
      value: "Nov 05, 2026", 
      icon: <><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></> 
    },
    { 
      label: "Admission", 
      value: "Registration Open", 
      icon: <><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></> 
    }
  ];

  return (
    <section className="relative bg-white py-16 md:py-24 z-20 overflow-hidden border-b border-slate-100">
      {/* Architectural Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #0f2f6b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Horizontal Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-slate-100"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-slate-100"></div>
        
        {/* Diagonal Accent */}
        <div className="absolute -right-20 top-0 w-64 h-full bg-slate-50/50 -skew-x-12 border-l border-slate-100"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <h2 className="text-3xl md:text-5xl font-black text-biro-blue-dark uppercase tracking-tighter leading-none mb-6">
              When & <span className="text-slate-300">Where.</span>
            </h2>
            <div className="w-12 h-1 bg-biro-blue"></div>
          </motion.div>

          {/* Details Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-0 bg-slate-100 md:bg-transparent border md:border-0 border-slate-100 rounded-sm overflow-hidden"
          >
            {details.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white p-5 md:p-10 group relative border-r border-slate-100 last:border-0 transition-all duration-300 hover:bg-slate-50"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-[2px] md:w-full h-full md:h-[2px] bg-biro-blue opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                
                <div className="relative z-10 flex flex-col gap-6 md:gap-8">
                  {/* Icon */}
                  <div className="w-10 h-10 flex items-center justify-center bg-slate-50 group-hover:bg-white rounded-sm border border-slate-100 transition-all duration-300">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-biro-blue"
                    >
                      {item.icon}
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="space-y-1 md:space-y-2">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-biro-blue transition-colors">
                      {item.label}
                    </span>
                    <h4 className="text-base md:text-xl font-bold text-biro-blue-dark leading-tight">
                      {item.value}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
