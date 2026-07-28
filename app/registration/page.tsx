'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { ticketTiersMap as ticketTiers } from '../data/tickets';

import { Suspense } from 'react';

function RegistrationContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tierParam = searchParams.get('tier') || 'community';
    const tier = ticketTiers[tierParam] || ticketTiers['community'];

    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        nationality: '',
        community: '',
    });

    // Restore form data if user navigates back from the summary page
    useEffect(() => {
        const stored = sessionStorage.getItem('btf_registration');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setFormData({
                    firstName: parsed.firstName || '',
                    lastName: parsed.lastName || '',
                    email: parsed.email || '',
                    phone: parsed.phone || '',
                    country: parsed.country || '',
                    nationality: parsed.nationality || '',
                    community: parsed.community || '',
                });
            } catch {
                // ignore malformed data
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.country.trim() || !formData.nationality.trim() || !formData.phone.trim()) {
            setError('Please fill in all required fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Save to sessionStorage and navigate to summary page
        sessionStorage.setItem('btf_registration', JSON.stringify({
            tierParam,
            ...formData,
        }));
        router.push('/registration/summary');
    };

    return (
        <div className="flex min-h-screen flex-col font-sans relative bg-[#f8fbff]">
            <BackgroundWrapper />
            <Navbar />
            <main className="flex-grow relative z-10 pt-14 md:pt-32 pb-16">
                <section className="relative overflow-hidden py-12">
                    <div className="container mx-auto px-2 relative z-10">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                className="text-center mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-4xl md:text-6xl font-black font-cabinet-grotesk text-biro-blue-dark mb-4 leading-tight">
                                    Register for <span className="text-biro-blue">{tier.name}</span>
                                </h1>
                                <p className="md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                                    Secure your spot at Benin Tech Fest 2.0 and unlock exclusive access.
                                </p>
                            </motion.div>

                            <div className="w-full mx-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                    <motion.div
                                        className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm lg:col-span-7 xl:col-span-8"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        <h3 className="text-2xl font-black text-biro-blue-dark mb-6 font-cabinet-grotesk">Registration Form</h3>

                                        {/* Step indicator */}
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-biro-blue text-white text-xs font-black flex items-center justify-center">1</div>
                                                <span className="text-sm font-bold text-biro-blue">Your Details</span>
                                            </div>
                                            <div className="flex-1 h-0.5 bg-blue-100 rounded-full" />
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-blue-100 text-slate-400 text-xs font-black flex items-center justify-center">2</div>
                                                <span className="text-sm font-bold text-slate-400">Review & Submit</span>
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="p-4 rounded-lg bg-red-50 border border-red-200 mb-4">
                                                <p className="text-red-700 text-sm font-medium">{error}</p>
                                            </div>
                                        )}
                                        <form className="space-y-5" onSubmit={handleNext}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="firstName" className="block text-sm font-bold text-slate-700 mb-2">
                                                        First Name <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="firstName"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                        placeholder="Enter your first name"
                                                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:border-biro-blue focus:ring-2 focus:ring-blue-100 transition-colors"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="lastName" className="block text-sm font-bold text-slate-700 mb-2">
                                                        Last Name <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="lastName"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleChange}
                                                        placeholder="Enter your last name"
                                                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:border-biro-blue focus:ring-2 focus:ring-blue-100 transition-colors"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                                                    Email Address <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="your.email@example.com"
                                                    className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:border-biro-blue focus:ring-2 focus:ring-blue-100 transition-colors"
                                                    required
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="country" className="block text-sm font-bold text-slate-700 mb-2">
                                                        Country of Residence <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="country"
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleChange}
                                                        placeholder="Country of residence"
                                                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:border-biro-blue focus:ring-2 focus:ring-blue-100 transition-colors"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="nationality" className="block text-sm font-bold text-slate-700 mb-2">
                                                        Nationality <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="nationality"
                                                        name="nationality"
                                                        value={formData.nationality}
                                                        onChange={handleChange}
                                                        placeholder="Nationality"
                                                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:border-biro-blue focus:ring-2 focus:ring-blue-100 transition-colors"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">
                                                    Phone Number <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+234 or any format"
                                                    className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:border-biro-blue focus:ring-2 focus:ring-blue-100 transition-colors"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="community" className="block text-sm font-bold text-slate-700 mb-2">
                                                    Community / Tech Group <span className="text-slate-400 font-normal normal-case">(optional)</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    id="community"
                                                    name="community"
                                                    value={formData.community}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Google Developer Group, Andela etc."
                                                    className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:border-biro-blue focus:ring-2 focus:ring-blue-100 transition-colors"
                                                />
                                            </div>

                                            <Button type="submit" variant="biro" className="w-full !py-3 border-0 flex items-center justify-center gap-2">
                                                Next — Review Your Details
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Button>
                                        </form>
                                    </motion.div>

                                    <motion.div
                                        className="bg-white rounded-3xl p-8 border border-blue-100 shadow-sm lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                    >
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-black text-biro-blue-dark mb-2 font-cabinet-grotesk">{tier.name}</h3>
                                            <p className="text-3xl font-black text-biro-blue font-oswald">
                                                {tier.price.startsWith('₦') ? (
                                                    <>
                                                        <sup className="text-xl md:text-2xl mt-2 mr-1">₦</sup>
                                                        {tier.price.substring(1)}
                                                    </>
                                                ) : (
                                                    tier.price
                                                )}
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            {tier.features.map((feature, fIdx) => {
                                                const isIncludes = feature.startsWith('Everything in');
                                                return (
                                                    <div
                                                        key={fIdx}
                                                        className={`flex gap-3 ${isIncludes ? '-ml-4 mr-2 rounded-l-none rounded-r-xl px-3 pl-9 py-3 border-2 border-l-4 font-bold shadow-md bg-biro-blue text-white' : ''}`}
                                                    >
                                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] mt-0.5 shrink-0 ${isIncludes ? 'bg-biro-blue-dark text-white' : 'bg-blue-50/50 text-biro-blue border border-blue-100/50'}`}>
                                                            ✓
                                                        </div>
                                                        <p className={`text-sm leading-relaxed ${isIncludes ? 'text-white font-extrabold' : 'text-slate-700 font-bold'}`}>
                                                            {feature}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default function RegistrationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8fbff] text-biro-blue font-bold">Loading...</div>}>
            <RegistrationContent />
        </Suspense>
    );
}
