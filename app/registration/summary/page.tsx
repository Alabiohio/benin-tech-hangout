'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import { motion } from "framer-motion";
import Button from "../../components/Button";
import { ticketTiersMap } from '../../data/tickets';

interface RegistrationData {
    tierParam: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    nationality: string;
    community: string;
}

export default function RegistrationSummaryPage() {
    const router = useRouter();
    const [data, setData] = useState<RegistrationData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const stored = sessionStorage.getItem('btf_registration');
        if (!stored) {
            router.replace('/registration');
            return;
        }
        try {
            setData(JSON.parse(stored));
        } catch {
            router.replace('/registration');
        }
    }, [router]);

    if (!data) return null;

    const tier = ticketTiersMap[data.tierParam] || ticketTiersMap['community'];

    const submitRegistration = async (reference?: string) => {
        try {
            const response = await fetch('/api/submissions/ticket', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ticket_type: data.tierParam,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    country: data.country,
                    nationality: data.nationality,
                    community: data.community,
                    paymentReference: reference,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || 'Failed to submit registration. Please try again.');
                setIsLoading(false);
                return;
            }

            sessionStorage.removeItem('btf_registration');
            router.push(`/registration/success?tier=${encodeURIComponent(tier.name)}&email=${encodeURIComponent(data.email)}`);
        } catch (err) {
            console.error('Registration error:', err);
            router.push('/registration/failure?reason=' + encodeURIComponent('An error occurred during submission. Please try again.'));
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError('');

        const isFree = tier.price === 'Free Access' || tier.price.toLowerCase().includes('free');

        if (isFree) {
            await submitRegistration();
        } else {
            try {
                // Dynamically import PaystackPop to avoid SSR issues if necessary, or just use the imported one.
                // We'll import it at the top level or require it here.
                const PaystackPop = (await import('@paystack/inline-js')).default;
                
                const amountString = tier.price.replace(/[^\d.]/g, '');
                const amount = parseInt(amountString, 10) * 100;

                const paystack = new PaystackPop();
                paystack.newTransaction({
                    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
                    email: data.email,
                    amount: amount,
                    firstname: data.firstName,
                    lastname: data.lastName,
                    onSuccess: (transaction: any) => {
                        submitRegistration(transaction.reference);
                    },
                    onCancel: () => {
                        setIsLoading(false);
                    },
                    onError: (error: any) => {
                        console.error('Payment error:', error);
                        router.push('/registration/failure?reason=' + encodeURIComponent('Payment failed or was cancelled. Please try again.'));
                    }
                });
            } catch (err) {
                console.error(err);
                router.push('/registration/failure?reason=' + encodeURIComponent('Failed to load payment module. Please check your connection.'));
            }
        }
    };

    // ── Summary / Review screen ───────────────────────────────────────────────
    // ── Summary / Review screen ───────────────────────────────────────────────
    const summaryRows: { label: string; value: string }[] = [
        { label: 'Full Name', value: `${data.firstName} ${data.lastName}` },
        { label: 'Email Address', value: data.email },
        { label: 'Phone Number', value: data.phone },
        { label: 'Country of Residence', value: data.country },
        { label: 'Nationality', value: data.nationality },
        ...(data.community ? [{ label: 'Community / Tech Group', value: data.community }] : []),
    ];

    return (
        <div className="flex min-h-screen flex-col font-sans relative bg-[#f8fbff]">
            <BackgroundWrapper />
            <Navbar />
            <main className="flex-grow relative z-10 pt-14 md:pt-32 pb-16">
                <section className="relative overflow-hidden py-12">
                    <div className="container mx-auto px-2 relative z-10">
                        <div className="max-w-3xl mx-auto">
                            <motion.div
                                className="text-center mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-4xl md:text-5xl font-black font-cabinet-grotesk text-biro-blue-dark mb-3 leading-tight">
                                    Review Your <span className="text-biro-blue">Registration</span>
                                </h1>
                                <p className="text-slate-600 font-medium">
                                    Please confirm your details before submitting.
                                </p>
                            </motion.div>

                            {/* Step indicator */}
                            <div className="flex items-center gap-3 mb-8 max-w-sm mx-auto">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-green-500 text-white text-xs font-black flex items-center justify-center">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-bold text-slate-500">Your Details</span>
                                </div>
                                <div className="flex-1 h-0.5 bg-biro-blue rounded-full" />
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-biro-blue text-white text-xs font-black flex items-center justify-center">2</div>
                                    <span className="text-sm font-bold text-biro-blue">Review & Submit</span>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.15 }}
                                className="space-y-5"
                            >
                                {/* Ticket info card */}
                                <div className="bg-gradient-to-br from-biro-blue-dark to-biro-blue rounded-2xl p-6 text-white flex items-center justify-between shadow-lg">
                                    <div>
                                        <p className="text-blue-200 text-sm font-bold uppercase tracking-wide mb-1">Selected Pass</p>
                                        <h3 className="text-2xl font-black font-cabinet-grotesk">{tier.name}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-blue-200 text-sm font-bold uppercase tracking-wide mb-1">Price</p>
                                        <p className="text-3xl font-black font-oswald text-white">{tier.price}</p>
                                    </div>
                                </div>

                                {/* Personal details card */}
                                <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
                                    <div className="px-6 py-4 border-b border-blue-50 flex items-center justify-between">
                                        <h3 className="text-lg font-black text-biro-blue-dark font-cabinet-grotesk">Personal Details</h3>
                                        <button
                                            onClick={() => router.back()}
                                            className="text-sm font-bold text-biro-blue hover:text-biro-blue-dark flex items-center gap-1.5 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5l-7 7 7 7M4 12h16" />
                                            </svg>
                                            Edit
                                        </button>
                                    </div>
                                    <div className="divide-y divide-blue-50">
                                        {summaryRows.map(({ label, value }) => (
                                            <div key={label} className="flex items-start gap-4 px-6 py-4">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide w-40 pt-0.5 shrink-0">{label}</p>
                                                <p className="text-sm font-semibold text-slate-800 break-all">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                                        <p className="text-red-700 text-sm font-medium">{error}</p>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        onClick={() => router.back()}
                                        className="flex-1 !py-2 bg-transparent border-2 border-blue-200 !text-biro-blue hover:bg-blue-50 hover:text-biro-blue shadow-none hover:shadow-none group !font-cabinet-grotesk text-lg"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            <span className="font-black">Back</span>
                                        </div>
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        variant="biro"
                                        className="flex-[2] !py-2 border-0 group !font-cabinet-grotesk text-lg shadow-lg shadow-biro-blue/20"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            {isLoading ? (
                                                <>
                                                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                    </svg>
                                                    <span className="font-black">Submitting…</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="font-black">Confirm & Register</span>
                                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </>
                                            )}
                                        </div>
                                    </Button>
                                </div>

                                <p className="text-center text-xs text-slate-400 font-medium">
                                    By registering you agree to our terms and conditions.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
