'use client';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "../components/Button";

type FormData = {
    company_name: string;
    contact_person: string;
    email: string;
    phone: string;
    interests: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function SponsorPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [cooldown, setCooldown] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        company_name: '',
        contact_person: '',
        email: '',
        phone: '',
        interests: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const validateField = (name: keyof FormData, value: string) => {
        const trimmedValue = value.trim();

        if (name === 'company_name') {
            return trimmedValue ? '' : 'Please enter your company name.';
        }

        if (name === 'contact_person') {
            return trimmedValue ? '' : 'Please enter the contact person name.';
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
            return trimmedValue ? '' : 'Please enter your phone number.';
        }

        if (name === 'interests') {
            return trimmedValue ? '' : 'Please tell us how you would like to partner.';
        }

        return '';
    };

    const validateForm = (data: FormData) => {
        const nextErrors: FormErrors = {};

        const companyError = validateField('company_name', data.company_name);
        const contactError = validateField('contact_person', data.contact_person);
        const emailError = validateField('email', data.email);
        const phoneError = validateField('phone', data.phone);
        const interestsError = validateField('interests', data.interests);

        if (companyError) nextErrors.company_name = companyError;
        if (contactError) nextErrors.contact_person = contactError;
        if (emailError) nextErrors.email = emailError;
        if (phoneError) nextErrors.phone = phoneError;
        if (interestsError) nextErrors.interests = interestsError;

        return nextErrors;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof FormData;
        setFormData(prev => ({ ...prev, [fieldName]: value }));

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const trimmedData: FormData = {
            company_name: formData.company_name.trim(),
            contact_person: formData.contact_person.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            interests: formData.interests.trim()
        };

        const nextErrors = validateForm(trimmedData);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            setMessage('Please correct the highlighted fields before submitting.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/submissions/sponsor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trimmedData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✓ Sponsorship inquiry submitted successfully!');
                setCooldown(30);
                setFormData({
                    company_name: '',
                    contact_person: '',
                    email: '',
                    phone: '',
                    interests: ''
                });
                setErrors({});
            } else {
                setMessage(`✗ Error: ${data.error || 'Failed to submit'}`);
            }
        } catch (error) {
            setMessage('✗ Error submitting inquiry. Please try again.');
            console.error('Submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

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
                                <h1 className="text-4xl md:text-6xl font-black font-cabinet-grotesk text-biro-blue-dark mb- leading-tight">
                                    Partner With <span className="text-biro-blue">Innovation</span>
                                </h1>
                                <p className="md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                                    Position your brand at the center of Benin City&apos;s fastest-growing tech community. Let&apos;s build the future together.
                                </p>
                            </motion.div>

                            <motion.div 
                                className="overflow-hidden flex flex-col lg:flex-row"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >

                                <div className="w-full max-w-4xl mx-auto p-10 px-2 md:py-16 md:px-24 bg-white">
                                    <h3 className="text-3xl font-black text-biro-blue-dark mb-8 font-cabinet-grotesk">Sponsorship Inquiry</h3>
                                    
                                    {cooldown > 0 ? (
                                        <div className="space-y-6">
                                            {message && (
                                                <div className={`p-5 rounded-2xl border-2 shadow-lg transform transition-all duration-300 ${message.startsWith('✓') ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-500 text-green-800' : 'bg-gradient-to-r from-red-50 to-red-100 border-red-500 text-red-800'}`}>
                                                    <div className="flex items-center justify-center gap-3">
                                                        <span className={`text-4xl font-bold ${message.startsWith('✓') ? 'text-green-500' : 'text-red-500'}`}>{message.startsWith('✓') ? '✓' : '✗'}</span>
                                                        <div className="text-center">
                                                            <p className="font-semibold leading-snug text-lg">{message.replace(/^[✓✗⚠] /, '')}</p>
                                                            <p className={`text-sm mt-2 ${message.startsWith('✓') ? 'text-green-800/70' : 'text-red-800/70'}`}>You can submit another form in {cooldown} seconds</p>
                                                            {message.startsWith('✓') && (
                                                                <div className="flex justify-center mt-4">
                                                                    <a
                                                                        href="https://whatsapp.com/channel/0029VbCyw0P9mrGciiEpD71G"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#1da851] transition-colors"
                                                                    >
                                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                                                        </svg>
                                                                        Join Channel
                                                                    </a>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Company Name</label>
                                                <input 
                                                    type="text" 
                                                    name="company_name"
                                                    value={formData.company_name}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-5 py-4 rounded-xl border bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400 ${errors.company_name ? 'border-red-400' : 'border-blue-100'}`} 
                                                    placeholder="Your Brand Ltd." 
                                                    aria-invalid={!!errors.company_name}
                                                    aria-describedby={errors.company_name ? 'company_name-error' : undefined}
                                                />
                                                {errors.company_name && <p id="company_name-error" className="mt-2 text-sm text-red-600">{errors.company_name}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Contact Person</label>
                                                <input 
                                                    type="text" 
                                                    name="contact_person"
                                                    value={formData.contact_person}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-5 py-4 rounded-xl border bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400 ${errors.contact_person ? 'border-red-400' : 'border-blue-100'}`} 
                                                    placeholder="John Doe" 
                                                    aria-invalid={!!errors.contact_person}
                                                    aria-describedby={errors.contact_person ? 'contact_person-error' : undefined}
                                                />
                                                {errors.contact_person && <p id="contact_person-error" className="mt-2 text-sm text-red-600">{errors.contact_person}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Email</label>
                                                <input 
                                                    type="email" 
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-5 py-4 rounded-xl border bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400 ${errors.email ? 'border-red-400' : 'border-blue-100'}`} 
                                                    placeholder="john@brand.com" 
                                                    aria-invalid={!!errors.email}
                                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                                />
                                                {errors.email && <p id="email-error" className="mt-2 text-sm text-red-600">{errors.email}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                                                <input 
                                                    type="tel" 
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-5 py-4 rounded-xl border bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400 ${errors.phone ? 'border-red-400' : 'border-blue-100'}`} 
                                                    placeholder="+234 XXX XXXX" 
                                                    aria-invalid={!!errors.phone}
                                                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                                                />
                                                {errors.phone && <p id="phone-error" className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">How can we partner? Tell us about your brand objectives.</label>
                                            <textarea 
                                                rows={4} 
                                                name="interests"
                                                value={formData.interests}
                                                onChange={handleInputChange}
                                                className={`w-full px-5 py-4 rounded-xl border bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 resize-none font-medium placeholder:text-gray-400 ${errors.interests ? 'border-red-400' : 'border-blue-100'}`} 
                                                placeholder="Tell us about your brand objectives and what you're looking for..."
                                                aria-invalid={!!errors.interests}
                                                aria-describedby={errors.interests ? 'interests-error' : undefined}
                                            />
                                            {errors.interests && <p id="interests-error" className="mt-2 text-sm text-red-600">{errors.interests}</p>}
                                        </div>

                                        <Button type="submit" disabled={loading} variant="biro" className="w-full !py-3 border-0">
                                            {loading ? 'Sending...' : 'Send Partnership Inquiry'}
                                        </Button>
                                    </form>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
