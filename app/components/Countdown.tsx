'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const timeLabels = ["Days", "Hours", "Minutes", "Seconds"] as const;

function Counter({ value, isInView }: { value: number, isInView: boolean }) {
    const [displayValue, setDisplayValue] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView) return;
        
        if (!hasAnimated.current && value > 0) {
            hasAnimated.current = true;
            const startValue = 0;
            const endValue = value;
            const duration = 2000;
            const startTime = performance.now();

            const animateCount = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easedProgress = 1 - Math.pow(1 - progress, 4);
                const currentCount = Math.floor(startValue + (endValue - startValue) * easedProgress);
                
                setDisplayValue(currentCount);

                if (progress < 1) {
                    requestAnimationFrame(animateCount);
                }
            };

            requestAnimationFrame(animateCount);
        } else if (hasAnimated.current) {
            const rafId = requestAnimationFrame(() => {
                setDisplayValue(value);
            });
            return () => cancelAnimationFrame(rafId);
        }
    }, [value, isInView]);

    return <>{displayValue.toString().padStart(2, '0')}</>;
}

export default function Countdown() {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const targetDate = new Date('2026-11-05T21:00:00').getTime();

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

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

    return (
        <motion.section 
            onViewportEnter={() => setShouldAnimate(true)}
            viewport={{ once: true }}
            className="py-20 mb-16 relative overflow-hidden bg-black"
        >
            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div 
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-4xl font-black font-cabinet-grotesk text-white mb-4" data-aos="zoom-out" data-aos-duration="1000" data-aos-once="true">
                        Countdown to <span className="text-biro-blue">BTF 2.0</span>
                    </h2>
                    <div className="w-24 h-1 bg-highlight-yellow mx-auto rounded-full shadow-[0_0_10px_rgba(0,124,249,0.5)]"></div>
                </motion.div>

                <div className="flex items-center justify-center gap-1 md:gap-6" data-aos="zoom-out">
                    {values.map((value, index) => (
                        <div key={timeLabels[index]} className="flex items-center">
                            <div className="flex flex-col items-center min-w-[70px] md:min-w-[140px]">
                                <span 
                                    className="text-4xl md:text-[6rem] lg:text-[8rem] font-black font-cabinet-grotesk text-white tabular-nums tracking-tighter leading-none" 
                                    style={{ textShadow: '0 0 15px rgba(255,0,0,0.6), 0 0 30px rgba(255,0,0,0.3)' }}
                                >
                                    <Counter value={value} isInView={shouldAnimate} />
                                </span>
                                <span className="mt-4 text-blue-400 text-[10px] md:text-sm font-black uppercase tracking-[0.3em]">{timeLabels[index]}</span>
                            </div>
                            {index < values.length - 1 && (
                                <div className="text-blue-500/80 text-3xl md:text-5xl font-black md:mx-2 -mt-8 animate-pulse">:</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
