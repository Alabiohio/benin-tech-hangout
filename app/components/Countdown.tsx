'use client';

import { useState, useEffect, useCallback } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function Countdown() {
    const targetDate = new Date('2026-10-02T10:00:00').getTime();
    
    const calculateTimeLeft = useCallback(() => {
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

    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        setMounted(true);
        setTimeLeft(calculateTimeLeft());
        
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        
        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    if (!mounted) {
        return (
            <section className="py-20 bg-[#020617] h-[400px] flex items-center justify-center">
                <div className="animate-pulse text-blue-400 font-righteous tracking-widest uppercase">Initializing Tracker...</div>
            </section>
        );
    }

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-16 h-20 md:w-28 md:h-32 bg-[#0F172A] border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="text-2xl md:text-6xl font-black font-righteous text-white tabular-nums">
                        {value.toString().padStart(2, '0')}
                    </span>
                </div>
            </div>
            <span className="mt-4 text-blue-400 text-[10px] md:text-sm font-black uppercase tracking-[0.2em]">{label}</span>
        </div>
    );

    return (
        <section className="py-20 relative overflow-hidden bg-[#020617]">
            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.1)_0%,_transparent_70%)] pointer-events-none"></div>
            
            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="mb-12" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-black font-righteous text-white mb-4">
                        Countdown to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">BTH 2.0</span>
                    </h2>
                    <div className="w-24 h-1 bg-highlight-yellow mx-auto rounded-full"></div>
                </div>

                <div className="flex items-center justify-center gap-3 md:gap-10" data-aos="zoom-in">
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <TimeUnit value={timeLeft.minutes} label="Minutes" />
                    <TimeUnit value={timeLeft.seconds} label="Seconds" />
                </div>
            </div>
        </section>
    );
}
