'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import patterns1 from '../../assets/images/patterns1.png';
import { motion } from "framer-motion";
import Button from "../components/Button";
import { ticketTiersMap as ticketTiers } from '../data/tickets';
import { IoIosArrowForward } from 'react-icons/io';

import { Suspense } from 'react';

function RegistrationContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const requestedTier = searchParams.get('tier');
    const tierParam = requestedTier && requestedTier !== 'community' && ticketTiers[requestedTier]
        ? requestedTier
        : 'explorer';
    const tier = ticketTiers[tierParam];

    useEffect(() => {
        if (!requestedTier || requestedTier === 'community' || !ticketTiers[requestedTier]) {
            router.replace('/free-pass');
        }
    }, [requestedTier, router]);

    const colorsMap: Record<string, any> = {
        'explorer': { bg: 'bg-brand-blue', text: 'text-brand-blue', border: 'border-brand-blue/30' },
        'builders': { bg: 'bg-brand-purple', text: 'text-brand-purple', border: 'border-brand-purple/30' },
        'founders': { bg: 'bg-brand-red', text: 'text-brand-red', border: 'border-brand-red/30' },
        'vip': { bg: 'bg-brand-amber', text: 'text-brand-amber', border: 'border-brand-amber/30' },
        'investors': { bg: 'bg-biro-blue-dark', text: 'text-biro-blue-dark', border: 'border-biro-blue-dark/30' }
    };
    const tierColor = colorsMap[tierParam] || colorsMap['community'];

    const [error, setError] = useState('');
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        nationality: '',
        community: '',
    });

    const validateField = (name: keyof typeof formData, value: string) => {
        const trimmedValue = value.trim();

        if (name === 'firstName') {
            return trimmedValue ? '' : 'Please enter your first name.';
        }

        if (name === 'lastName') {
            return trimmedValue ? '' : 'Please enter your last name.';
        }

        if (name === 'email') {
            if (!trimmedValue) {
                return 'Please enter your email address.';
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
                return 'Please enter a valid email address.';
            }

            return '';
        }

        if (name === 'phone') {
            if (!trimmedValue) {
                return 'Please enter your phone number.';
            }

            if (!/^\+?[0-9\s()-]{7,15}$/.test(trimmedValue)) {
                return 'Please enter a valid phone number.';
            }

            return '';
        }

        if (name === 'country') {
            return trimmedValue ? '' : 'Please enter your country of residence.';
        }

        if (name === 'nationality') {
            return trimmedValue ? '' : 'Please enter your nationality.';
        }

        return '';
    };

    const validateForm = (data: typeof formData) => {
        const nextErrors: Partial<Record<keyof typeof formData, string>> = {};

        (Object.keys(data) as Array<keyof typeof formData>).forEach((fieldName) => {
            if (fieldName === 'community') {
                return;
            }

            const fieldError = validateField(fieldName, data[fieldName]);
            if (fieldError) {
                nextErrors[fieldName] = fieldError;
            }
        });

        return nextErrors;
    };

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
        const fieldName = name as keyof typeof formData;

        setFormData(prev => ({ ...prev, [fieldName]: value }));
        setError('');

        const fieldError = validateField(fieldName, value);
        setErrors(prevErrors => {
            const nextErrors = { ...prevErrors };

            if (fieldError) {
                nextErrors[fieldName] = fieldError;
            } else {
                delete nextErrors[fieldName];
            }

            return nextErrors;
        });
    };

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const trimmedData = {
            ...formData,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            country: formData.country.trim(),
            nationality: formData.nationality.trim(),
            community: formData.community.trim(),
        };

        const nextErrors = validateForm(trimmedData);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            setError('Please correct the highlighted fields before continuing.');
            return;
        }

        // Save to sessionStorage and navigate to summary page
        sessionStorage.setItem('btf_registration', JSON.stringify({
            tierParam,
            ...trimmedData,
        }));
        router.push('/registration/summary');
    };

    return (
        <section
            className="min-h-screen py-24 px-2"
            style={{
                backgroundImage: `linear-gradient(135deg, rgba(2, 37, 84, 0.90), rgba(30, 64, 175, 0.90)), url(${patterns1.src})`,
                backgroundPosition: 'center, 0 0',
                backgroundRepeat: 'no-repeat, repeat',
                backgroundSize: 'cover, 220px 220px',
            }}
        >
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
                                <h1 className="text-4xl md:text-6xl font-black font-cabinet-grotesk text-white mb-4 leading-tight">
                                    Register for <span className="text-brand-amber">{tier.name}</span>
                                </h1>
                                <p className="md:text-xl text-white max-w-2xl mx-auto font-medium leading-relaxed">
                                    Secure your spot at Benin Tech Fest 2.0 and unlock exclusive access.
                                </p>
                            </motion.div>

                            <div className="w-full mx-auto">
                                <form onSubmit={handleNext} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" noValidate>
                                    <motion.div
                                        className="bg-white backdrop-blur-md rounded-3xl p-8 border border-blue-100 shadow-sm lg:col-span-7 xl:col-span-8"
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
                                        <div className="space-y-5">
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
                                                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${errors.firstName ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-blue-200 focus:border-biro-blue focus:ring-blue-100'}`}
                                                        aria-invalid={!!errors.firstName}
                                                        aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                                                    />
                                                    {errors.firstName && <p id="firstName-error" className="mt-2 text-sm text-red-600">{errors.firstName}</p>}
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
                                                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${errors.lastName ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-blue-200 focus:border-biro-blue focus:ring-blue-100'}`}
                                                        aria-invalid={!!errors.lastName}
                                                        aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                                                    />
                                                    {errors.lastName && <p id="lastName-error" className="mt-2 text-sm text-red-600">{errors.lastName}</p>}
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
                                                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-blue-200 focus:border-biro-blue focus:ring-blue-100'}`}
                                                    aria-invalid={!!errors.email}
                                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                                />
                                                {errors.email && <p id="email-error" className="mt-2 text-sm text-red-600">{errors.email}</p>}
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
                                                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${errors.country ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-blue-200 focus:border-biro-blue focus:ring-blue-100'}`}
                                                        aria-invalid={!!errors.country}
                                                        aria-describedby={errors.country ? 'country-error' : undefined}
                                                    />
                                                    {errors.country && <p id="country-error" className="mt-2 text-sm text-red-600">{errors.country}</p>}
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
                                                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${errors.nationality ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-blue-200 focus:border-biro-blue focus:ring-blue-100'}`}
                                                        aria-invalid={!!errors.nationality}
                                                        aria-describedby={errors.nationality ? 'nationality-error' : undefined}
                                                    />
                                                    {errors.nationality && <p id="nationality-error" className="mt-2 text-sm text-red-600">{errors.nationality}</p>}
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
                                                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-blue-200 focus:border-biro-blue focus:ring-blue-100'}`}
                                                    aria-invalid={!!errors.phone}
                                                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                                                />
                                                {errors.phone && <p id="phone-error" className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="community" className="block text-sm font-bold text-slate-700 mb-2">
                                                    Community <span className="text-slate-400 font-normal normal-case">(optional)</span>
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

                                            <div className="pt-4 hidden lg:block">
                                                <Button type="submit" className={`w-full !py-3 border-0 group !font-cabinet-grotesk text-lg shadow-lg text-white hover:opacity-90 transition-all ${tierColor.bg}`}>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span className="font-black">Next</span>
                                                        <IoIosArrowForward 
                                                            className="w-6 h-6 transition-transform group-hover:translate-x-1" 
                                                            stroke="currentColor" 
                                                            strokeWidth={40}
                                                        />
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className={`bg-white rounded-3xl p-8 border ${tierColor.border} shadow-xl lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32 overflow-hidden relative`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                    >
                                        <div className={`absolute top-0 left-0 w-full h-2 ${tierColor.bg}`}></div>
                                        <div className="mb-6 mt-2">
                                            <h3 className={`text-2xl font-black ${tierColor.text} mb-2 font-cabinet-grotesk uppercase`}>{tier.name}</h3>
                                            <p className={`text-4xl font-black ${tierColor.text} font-oswald`}>
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
                                                        className={`flex gap-3 ${isIncludes ? `-ml-4 mr-2 rounded-l-none rounded-r-xl px-3 pl-9 py-3 border-2 border-l-4 font-bold shadow-md border-white ${tierColor.bg} text-white` : ''}`}
                                                    >
                                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] mt-0.5 shrink-0 ${isIncludes ? `bg-white ${tierColor.text}` : `${tierColor.bg}/10 ${tierColor.text} border ${tierColor.border}`}`}>
                                                            ✓
                                                        </div>
                                                        <p className={`text-sm leading-relaxed ${isIncludes ? 'text-white font-extrabold' : 'text-slate-700 font-bold'}`}>
                                                            {feature}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className={`mt-8 pt-6 border-t ${tierColor.border}`}>
                                            <Button type="submit" className={`w-full !py-3 border-0 group !font-cabinet-grotesk text-lg shadow-lg text-white hover:opacity-90 transition-all ${tierColor.bg}`}>
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className="font-black">Next</span>
                                                    <IoIosArrowForward 
                                                        className="w-6 h-6 transition-transform group-hover:translate-x-1" 
                                                        stroke="currentColor" 
                                                        strokeWidth={40}
                                                    />
                                                </div>
                                            </Button>
                                        </div>
                                    </motion.div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </section>
    );
}

export default function RegistrationPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f8fbff] text-biro-blue font-bold">Loading...</div>}>
            <RegistrationContent />
        </Suspense>
    );
}
