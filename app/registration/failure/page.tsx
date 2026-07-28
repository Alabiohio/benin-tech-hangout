'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import BackgroundWrapper from "../../../components/BackgroundWrapper";
import { motion } from "framer-motion";

function FailureContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const reason = searchParams.get('reason') || 'An unexpected error occurred during your payment process.';

    return (
        <div className="flex min-h-screen flex-col font-sans relative bg-[#f8fbff]">
            <BackgroundWrapper />
            <Navbar />
            <main className="flex-grow relative z-10 pt-14 md:pt-32 pb-16">
                <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-red-900 py-24 px-4">
                    <motion.div
                        className="text-center text-white max-w-md w-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-2xl animate-pulse">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-cabinet-grotesk mb-3">
                            Registration Failed
                        </h2>
                        <p className="text-xl font-semibold text-red-100 mb-6">
                            We couldn't process your request.
                        </p>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
                            <p className="text-red-50 mb-4 text-center">
                                {reason}
                            </p>
                            <div className="text-left space-y-3 text-sm text-red-100 mt-6">
                                <p>What you can do:</p>
                                <div className="flex gap-3">
                                    <span className="text-red-400">•</span>
                                    <span>Check your internet connection and try again.</span>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-red-400">•</span>
                                    <span>If you were charged, please contact our support team.</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full">
                            <button
                                onClick={() => router.push('/registration')}
                                className="inline-block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => router.push('/')}
                                className="inline-block bg-transparent border-2 border-red-500 text-white hover:bg-red-500/20 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
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

export default function RegistrationFailurePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FailureContent />
        </Suspense>
    );
}
