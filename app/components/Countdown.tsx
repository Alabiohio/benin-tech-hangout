'use client';

import { useState, useEffect, useCallback } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const timeLabels = ["Days", "Hours", "Minutes", "Seconds"] as const;

export default function Countdown() {
    const targetDate = new Date('2026-10-02T10:00:00').getTime();

    const calculateTimeLeft = useCallback((): TimeLeft => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

    return (
        <section className="py-20 relative overflow-hidden bg-white">
            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="mb-12" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-black font-righteous text-biro-blue-dark mb-4">
                        Countdown to <span className="text-biro-blue">BTH 2.0</span>
                    </h2>
                    <div className="w-24 h-1 bg-highlight-yellow mx-auto rounded-full"></div>
                </div>

                <div className="flex items-center justify-center gap-3 md:gap-10">
                    {values.map((value, index) => (
                        <div key={timeLabels[index]} className="flex flex-col items-center">
                            <div className="relative w-16 h-20 md:w-28 md:h-32 bg-[#f8fbff] border border-blue-100 rounded-2xl flex items-center justify-center">
                                <span className="text-2xl md:text-6xl font-black font-righteous text-biro-blue-dark tabular-nums">
                                    {value.toString().padStart(2, '0')}
                                </span>
                            </div>
                            <span className="mt-4 text-biro-blue text-[10px] md:text-sm font-black uppercase tracking-[0.2em]">{timeLabels[index]}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
