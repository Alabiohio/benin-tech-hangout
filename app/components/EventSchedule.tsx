"use client";

import { motion } from "framer-motion";

const schedule = [
    {
        day: "DAY 1",
        title: "Talent & Emerging Technology",
        description: "Discover talent, skills and the technologies shaping Edo's next chapter.",
        accent: "border-[var(--color-green)] text-[var(--color-green)]",
    },
    {
        day: "DAY 2",
        title: "Startups, Business & Ecosystem Leadership",
        description: "Connect founders, businesses and ecosystem leaders to build what comes next.",
        accent: "border-[var(--color-amber)] text-[var(--color-amber)]",
    },
    {
        day: "DAY 3",
        title: "Community & Connection",
        description: "A BTF Community Meetup for the people and communities moving the ecosystem forward.",
        accent: "border-[var(--color-blue)] text-[var(--color-blue)]",
    },
];

export default function EventSchedule() {
    return (
        <section
            id="schedule"
            className="w-full border-y border-[var(--color-trans-10-inverted)] bg-background px-6 py-16 text-foreground md:px-10 md:py-24"
            aria-labelledby="schedule-heading"
        >
            <div className="mx-auto max-w-7xl">
                <motion.div
                    className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-blue">
                            November 5-7, 2026
                        </p>
                        <h2 id="schedule-heading" className="max-w-2xl text-4xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
                            Three days, one ecosystem.
                        </h2>
                    </div>
                    <p className="max-w-sm text-base leading-relaxed text-[var(--color-gray-inverted)] md:text-right">
                        A focused program for talent, business, innovation and the communities connecting them.
                    </p>
                </motion.div>

                <div className="grid gap-4 lg:grid-cols-3">
                    {schedule.map((item, index) => (
                        <motion.article
                            key={item.day}
                            className={`flex min-h-64 flex-col justify-between border-t-8 bg-[var(--color-neutral)] p-6 shadow-[0_12px_0_var(--color-trans-10-inverted)] md:p-8 ${item.accent}`}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <span className="text-sm font-extrabold uppercase tracking-[0.18em]">{item.day}</span>
                            </div>
                            <div>
                                <h3 className="max-w-md text-2xl font-extrabold leading-tight text-foreground md:text-3xl">{item.title}</h3>
                                <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-[var(--color-gray-inverted)] md:text-base">{item.description}</p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
