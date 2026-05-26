'use client';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function SponsorPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [cooldown, setCooldown] = useState(0);
    const [formData, setFormData] = useState({
        company_name: '',
        contact_person: '',
        email: '',
        phone: '',
        sponsorship_tier: '',
        interests: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/submissions/sponsor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
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
                    sponsorship_tier: '',
                    interests: ''
                });
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
                                <h1 className="text-4xl md:text-6xl font-black font-righteous text-biro-blue-dark mb- leading-tight">
                                    Partner With <span className="text-biro-blue">Innovation</span>
                                </h1>
                                <p className="md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                                    Position your brand at the center of Benin City&apos;s fastest-growing tech community. Let&apos;s build the future together.
                                </p>
                            </motion.div>

                            <motion.div 
                                className="rounded-[1.5rem] overflow-hidden border border-blue-100 flex flex-col lg:flex-row"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="lg:w-2/5 p-10 md:p-14 bg-[#0f2f6b] flex flex-col justify-center text-white relative overflow-hidden">
                                    <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10 font-righteous text-white">Why Sponsor BTH?</h2>
                                    <p className="text-blue-100/80 mb-10 leading-relaxed text-lg relative z-10">
                                        Join a network of visionary brands supporting thousands of developers, founders, and tech enthusiasts.
                                    </p>
                                </div>

                                <div className="lg:w-3/5 p-10 md:p-16 bg-white">
                                    <h3 className="text-3xl font-black text-biro-blue-dark mb-8 font-righteous">Sponsorship Inquiry</h3>
                                    
                                    {cooldown > 0 ? (
                                        <div className="space-y-6">
                                            {message && (
                                                <div className={`p-5 rounded-2xl border-2 shadow-lg transform transition-all duration-300 bg-gradient-to-r from-blue-50 to-blue-100 border-biro-blue text-biro-blue-dark`}>
                                                    <div className="flex items-center justify-center gap-3">
                                                        <span className="text-4xl font-bold text-biro-blue">✓</span>
                                                        <div className="text-center">
                                                            <p className="font-semibold leading-snug text-lg">{message.replace(/^[✓⚠] /, '')}</p>
                                                            <p className="text-sm mt-2 text-biro-blue-dark/70">You can submit another form in {cooldown} seconds</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Company Name</label>
                                                <input 
                                                    type="text" 
                                                    name="company_name"
                                                    value={formData.company_name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" 
                                                    placeholder="Your Brand Ltd." 
                                                    required 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Contact Person</label>
                                                <input 
                                                    type="text" 
                                                    name="contact_person"
                                                    value={formData.contact_person}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" 
                                                    placeholder="John Doe" 
                                                    required 
                                                />
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
                                                    className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" 
                                                    placeholder="john@brand.com" 
                                                    required 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                                                <input 
                                                    type="tel" 
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" 
                                                    placeholder="+234 XXX XXXX" 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Estimated Budget</label>
                                            <select 
                                                name="sponsorship_tier"
                                                value={formData.sponsorship_tier}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium appearance-none cursor-pointer"
                                            >
                                                <option value="">Select a range</option>
                                                <option value="bronze">₦1,000,000 - ₦2,500,000</option>
                                                <option value="silver">₦2,500,000 - ₦5,000,000</option>
                                                <option value="gold">₦5,000,000 - ₦10,000,000+</option>
                                                <option value="other">Others / Partnership</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">How can we partner? Tell us about your brand objectives.</label>
                                            <textarea 
                                                rows={4} 
                                                name="interests"
                                                value={formData.interests}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 resize-none font-medium placeholder:text-gray-400" 
                                                placeholder="Tell us about your brand objectives and what you're looking for..."
                                                required
                                            />
                                        </div>

                                        <Button type="submit" disabled={loading} variant="biro" className="w-full py-5 text-xl rounded-2xl border-0">
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
