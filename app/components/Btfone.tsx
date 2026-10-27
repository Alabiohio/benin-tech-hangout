"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const galleryImages = [
    { src: "/past/BTH1.jpg" },
    { src: "/past/BTH2.jpg" },
    { src: "/past/BTH3.jpg" },
];

const pastSpeakers = [
    { name: "Uche Eze", role: "CEO, Eki Technologies", image: "/past/speaker1.jpeg" },
    { name: "Teddy Eragbai", role: "TVET Communication Advisor, ForbesBLK Member", image: "/past/speaker2.jpeg" },
    { name: "Omokaro Osayi", role: "Founder, Treskaro & Father Startups", image: "/past/speaker3.jpg" },
    { name: "Nwachukwu Justin Jr", role: "Lead, SuperteamNG Edo State; Founder, Breeeve & Ravolo", image: "/past/speaker5.jpeg" },
    { name: "Past Speaker", role: "Tech Leader", image: "/past/speaker4.jpeg" },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
    return (
        <svg
            aria-hidden="true"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            {direction === "left" ? (
                <>
                    <path d="M19 12H5" />
                    <path d="m12 19-7-7 7-7" />
                </>
            ) : (
                <>
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                </>
            )}
        </svg>
    );
}

export default function Btfone() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const updateScrollProgress = () => {
        const element = scrollRef.current;
        if (!element) return;

        const maxScroll = element.scrollWidth - element.clientWidth;
        setScrollProgress(maxScroll > 0 ? element.scrollLeft / maxScroll : 0);
    };

    const scrollSpeakers = (direction: "left" | "right") => {
        const element = scrollRef.current;
        if (!element) return;

        element.scrollBy({
            left: (direction === "left" ? -1 : 1) * element.clientWidth * 0.8,
            behavior: "smooth",
        });
    };

    return (
        <section
            id="legacy"
            className="relative w-full overflow-hidden bg-[var(--background)] py-[var(--space-padding)] text-[var(--foreground)]"
            aria-labelledby="legacy-heading"
        >
            <div className="pointer-events-none absolute -right-32 top-12 h-80 w-80 rounded-full bg-[var(--brand-blue)] opacity-[0.08] blur-3xl" />

            <div className="relative mx-auto max-w-[var(--max-width)] px-6">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div data-aos="fade-up">
                        <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                            The beginning · Benin Tech Hangout 1.0
                        </p>
                        <h2
                            id="legacy-heading"
                            className="max-w-2xl text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.06em]"
                        >
                            One gathering.
                            <span className="mt-2 block text-[var(--brand-green)]">A lasting impact.</span>
                        </h2>
                        <p className="mt-7 max-w-xl text-[var(--text-body)] leading-relaxed text-[var(--color-gray-inverted)]">
                            Benin Tech Hangout 1.0 brought innovators, builders and communities together.
                            It sparked new connections across the ecosystem and showed what Edo can build
                            when its tech community moves forward together.
                        </p>

                        <div className="mt-9 flex max-w-xl flex-wrap gap-3">
                            <div className="min-w-[155px] flex-1 rounded-2xl bg-[var(--brand-blue)] p-5 text-white">
                                <p className="text-4xl font-bold tracking-tight">500+</p>
                                <p className="mt-1 text-sm font-medium text-white/80">people in the room</p>
                            </div>
                            <div className="min-w-[155px] flex-1 rounded-2xl bg-[var(--brand-green)] p-5 text-black">
                                <p className="text-4xl font-bold tracking-tight">30+</p>
                                <p className="mt-1 text-sm font-medium text-black/70">communities represented</p>
                            </div>
                        </div>

                        <p className="mt-7 border-l-4 border-[var(--brand-red)] pl-4 text-lg font-bold">
                            Benin is ready for the future.
                        </p>
                    </div>

                    <div className="relative mx-auto grid w-full max-w-2xl grid-cols-2 gap-3 sm:gap-5" data-aos="fade-up">
                        <div className="relative col-span-1 row-span-2 min-h-[330px] overflow-hidden rounded-[2rem] bg-[var(--color-gray-neutral)] sm:min-h-[470px]">
                            <Image
                                src={galleryImages[0].src}
                                alt=""
                                fill
                                sizes="(max-width: 1024px) 50vw, 25vw"
                                className="object-cover"
                                priority={false}
                            />
                        </div>
                        {galleryImages.slice(1).map((image, index) => (
                            <div
                                key={image.src}
                                className={`relative min-h-[158px] overflow-hidden rounded-[2rem] bg-[var(--color-gray-neutral)] sm:min-h-[225px] ${
                                    index === 0 ? "translate-y-5" : "-translate-y-5"
                                }`}
                            >
                                <Image
                                    src={image.src}
                                    alt=""
                                    fill
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        ))}
                        <div className="pointer-events-none absolute -bottom-4 right-4 h-16 w-16 sm:-right-5 sm:h-24 sm:w-24">
                            <Image src="/past/pattern1.png" alt="" fill sizes="96px" className="object-contain" />
                        </div>
                    </div>
                </div>

                <div className="mt-24 border-t border-[var(--color-trans-10-inverted)] pt-12">
                    <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
                        <div>
                            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--brand-blue)]">
                                Previous editions
                            </p>
                            <h3 className="text-3xl font-bold tracking-tight sm:text-5xl">
                                The people who made it happen
                            </h3>
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => scrollSpeakers("left")}
                                aria-label="Scroll to previous speakers"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-trans-10-inverted)] transition-colors hover:bg-[var(--brand-blue)] hover:text-white"
                            >
                                <ArrowIcon direction="left" />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollSpeakers("right")}
                                aria-label="Scroll to next speakers"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-trans-10-inverted)] transition-colors hover:bg-[var(--brand-blue)] hover:text-white"
                            >
                                <ArrowIcon direction="right" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollRef}
                        onScroll={updateScrollProgress}
                        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5"
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="Speakers from previous editions"
                    >
                        {pastSpeakers.map((speaker) => (
                            <article
                                key={speaker.name}
                                className="w-[78vw] max-w-[300px] flex-shrink-0 snap-start sm:w-[280px]"
                            >
                                <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-gray-neutral)]">
                                    <Image
                                        src={speaker.image}
                                        alt={speaker.name}
                                        fill
                                        sizes="(max-width: 640px) 78vw, 280px"
                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                                <h4 className="font-bold">{speaker.name}</h4>
                                <p className="mt-1 text-sm text-[var(--color-gray-inverted)]">{speaker.role}</p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-center gap-2" aria-label="Speaker carousel position">
                        {pastSpeakers.map((speaker, index) => (
                            <span
                                key={speaker.name}
                                className={`h-1.5 rounded-full transition-all ${
                                    Math.round(scrollProgress * (pastSpeakers.length - 1)) === index
                                        ? "w-8 bg-[var(--brand-blue)]"
                                        : "w-2 bg-[var(--color-trans-10-inverted)]"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
