'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { motion } from "framer-motion";

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

function SuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tierName = searchParams.get('tier') || 'Event Pass';
    const email = searchParams.get('email') || 'your email';

    return (
        <div className="flex min-h-screen flex-col font-sans relative bg-[#f8fbff]">
            <BackgroundWrapper />
            <Navbar />
            <main className="flex-grow relative z-10 pt-14 md:pt-32 pb-16">
                <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-biro-blue-dark via-blue-900 to-biro-blue py-24 px-4">
                    <motion.div
                        className="text-center text-white max-w-md w-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-2xl animate-bounce">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-cabinet-grotesk mb-3">
                            Registration Successful!
                        </h2>
                        <p className="text-xl font-semibold text-blue-100 mb-6">
                            Welcome to Benin Tech Fest 2.0
                        </p>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
                            <p className="text-blue-50 mb-4">
                                Thank you for registering for the <strong>{tierName}</strong>!
                            </p>
                            <p className="text-blue-100 text-sm mb-4">
                                A confirmation email has been sent to <strong>{email}</strong> with your registration details and event information.
                            </p>
                            <div className="text-left space-y-3 text-sm text-blue-100">
                                <div className="flex gap-3">
                                    <span className="text-green-400">✓</span>
                                    <span>Check your email for confirmation and event details</span>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-green-400">✓</span>
                                    <span>You now have access to your selected pass benefits</span>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-green-400">✓</span>
                                    <span>Mark your calendar for Benin Tech Fest 2.0</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <a
                                href="https://whatsapp.com/channel/0029VbCyw0P9mrGciiEpD71G"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-center shadow-lg hover:shadow-xl"
                            >
                                <WhatsAppIcon className="w-7 h-7 flex-shrink-0 relative z-10 drop-shadow" />
                                <span>Join WhatsApp Channel</span>
                            </a>
                            <button
                                onClick={() => router.push('/registration/badge')}
                                className="inline-block bg-white text-biro-blue font-bold border border-biro-blue py-3 px-8 rounded-lg transition-all duration-300 hover:bg-biro-blue hover:text-white"
                            >
                                Lookup Your Badge
                            </button>
                            <button
                                onClick={() => router.push('/')}
                                className="inline-block bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Back to Home
                            </button>
                        </div>
                    </motion.div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default function RegistrationSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
