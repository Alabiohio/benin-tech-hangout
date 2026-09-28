"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const schedule = [
    {
        day: "DAY 1",
        title: "Talent & Emerging Technology",
        color: "#22C55E",
        bgBadge: "bg-[#22C55E]/10 text-[#22C55E]",
    },
    {
        day: "DAY 2",
        title: "Startups, Business & Ecosystem Leadership",
        color: "#F59E0B",
        bgBadge: "bg-[#F59E0B]/10 text-[#F59E0B]",
    },
    {
        day: "DAY 3",
        title: "Community & Connection",
        color: "#3B82F6",
        bgBadge: "bg-[#3B82F6]/10 text-[#3B82F6]",
    },
];

export default function EventSchedule() {
    return (
        <section
            id="schedule"
            className="w-full border-y border-[var(--color-trans-10-inverted)] bg-background px-6 py-16 text-foreground md:px-10 md:py-24"
            aria-labelledby="schedule-heading"
        >
            <div className="mx-auto max-w-5xl">
                <motion.div
                    className="mb-10 md:mb-14 text-center flex flex-col items-center"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
                        November 5-7, 2026
                    </p>
                    <h2 id="schedule-heading" className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl font-cabinet-grotesk">
                        Three days, one ecosystem.
                    </h2>
                </motion.div>

                {/* Single Unified Timeline Block */}
                <motion.div
                    className="overflow-hidden rounded-[28px] border border-[var(--color-trans-10-inverted)] bg-[var(--color-neutral)] shadow-lg"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="divide-y divide-[var(--color-trans-10-inverted)]">
                        {schedule.map((item, index) => (
                            <motion.div
                                key={item.day}
                                className="group relative flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 transition-colors duration-200 hover:bg-[var(--color-trans-5-inverted,rgba(0,0,0,0.02))]"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <span className={`inline-flex shrink-0 items-center justify-center rounded-full px-4 py-1.5 text-xs font-black tracking-widest ${item.bgBadge}`}>
                                        {item.day}
                                    </span>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                                        {item.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <div className="mt-8 text-center">
                    <Link
                        href="/schedule"
                        className="inline-flex items-center justify-center rounded-full bg-brand-blue px-8 py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
                    >
                        EXPLORE FULL AGENDA & SCHEDULE
                    </Link>
                </div>
            </div>
        </section>
    );
}
