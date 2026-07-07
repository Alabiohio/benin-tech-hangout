'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from './Button';

const GuessSpeakers = () => {
    const filters = ['All Speakers', 'Keynote', 'Panelists', 'Facilitators'];
    const [selectedFilter, setSelectedFilter] = useState<string>('All Speakers');

    const speakers = [
        { id: 1, name: 'Aisha Okoro', role: 'Founder, Kora Labs', category: 'Keynote', image: '/past/speaker3.jpg' },
        { id: 2, name: 'David Igbinedion', role: 'CTO, EdoWorks', category: 'Panelists', image: '/past/speaker1.jpeg' },
        { id: 3, name: 'Ngozi Eze', role: 'Community Lead, DevHub', category: 'Facilitators', image: '/past/speaker2.jpeg' },
        { id: 4, name: 'Tunde Balogun', role: 'Product Lead, StartX', category: 'Panelists', image: '/past/speaker5.jpeg' },
        { id: 5, name: 'Chioma Umeh', role: 'CEO, BuildHer', category: 'Keynote', image: '/BTH-9-1.jpg' },
        { id: 6, name: 'Emeka Nwosu', role: 'CTO, QuickPay', category: 'Facilitators', image: '/BTH-30-1.jpg' },
    ];

    const filteredSpeakers =
        selectedFilter === 'All Speakers' ? speakers : speakers.filter(s => s.category === selectedFilter);

    return (
        <section className="py-20 px-2 bg-white relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-2 relative z-10">
                {/* Heading */}
                <motion.div
                    className="text-left mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-7xl font-black font-cabinet-grotesk text-gray-900 mb-6">
                        Guess the{' '} <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                            Speakers
                        </span>
                    </h2>       
                    <p className="text-gray-700 text-lg md:text-xl mx-auto leading-relaxed">
                        The stage is being set for Benin&apos;s brightest minds. Can you guess who will be sharing their vision at BTF 2.0?
                    </p>
                </motion.div>

                {/* Filter controls */}
                <div className="flex flex-wrap items-start justify-start gap-2 mb-10">
                    {filters.map((f, i) => (
                        <div key={f} className="relative" style={{ zIndex: selectedFilter === f ? 10 : filters.length - i }}>
                            <Button
                                onClick={() => setSelectedFilter(f)}
                                variant={selectedFilter === f ? 'biro' : 'outline'}
                                className="!w-auto !px-4 sm:!px-5 !py-2 !text-xs sm:!text-sm hover:!translate-y-0 hover:!translate-x-0 !border-4 -ml-[4px] first:ml-0"
                            >
                                {f}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Speaker Grid */}
                {filteredSpeakers.length === 0 ? (
                    <p className="text-center text-gray-500 py-12">No speakers match this filter yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 mb-16">
                        {filteredSpeakers.map((speaker, idx) => (
                            <motion.div
                                key={speaker.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.08 }}
                                className="group rounded-md overflow-hidden border border-2 border-[#DEDEDE] bg-[#F4F4F4] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
                            >
                                {/* Speaker Image */}
                                <div className="relative w-full h-[300px] sm:h-[380px] md:h-[480px]">
                                    <Image
                                        src={speaker.image}
                                        alt={speaker.name}
                                        fill
                                        className="object-cover object-top"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Speaker Info */}
                                <div className="p-5">
                                    {/* Category badge */}
                                    <span className="text-amber-700 text-[12px] font-bold uppercase font-oswald tracking-widest py-1">
                                        {speaker.category}
                                    </span>
                                    <h3 className="text-xl font-black font-righteous text-gray-900 mb-1">
                                        {speaker.name}
                                    </h3>
                                    <p className="text-sm text-blue-500 font-semibold">{speaker.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <motion.div
                    className="flex flex-col items-center gap-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div>
                        <h3 className="text-2xl font-black font-righteous text-gray-900 mb-2">Want to Speak at BTF 2.0?</h3>
                        <p className="text-gray-500 font-medium">Share your expertise with 1,000+ attendees.</p>
                    </div>

                    <Button href="/speaker-registration" variant="biro">
                        Apply to Speak / Suggest a Speaker
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default GuessSpeakers;