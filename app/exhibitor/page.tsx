'use client';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";
import Button from "../components/Button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import React from "react";

export default function ExhibitorPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [cooldown, setCooldown] = useState(0);
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        phone: '',
        email: '',
        website: '',
        description: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/submissions/exhibitor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✓ Exhibitor registration submitted successfully!');
                setCooldown(30);
                setFormData({
                    company: '',
                    name: '',
                    phone: '',
                    email: '',
                    website: '',
                    description: ''
                });
            } else {
                setMessage(`✗ Error: ${data.error || 'Failed to submit'}`);
            }
        } catch (error) {
            setMessage('✗ Error submitting registration. Please try again.');
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
                                <h1 className="text-4xl md:text-6xl font-black font-righteous text-biro-blue-dark mb-4">
                                    Showcase Your <span className="text-biro-blue">Brand</span>
                                </h1>
                                <p className="text-md text-slate-600 max-w-2xl mx-auto font-medium">
                                    Expose your products, services, and innovations to over 1000+ tech enthusiasts, founders, and leaders at Benin Tech Fest 2.0.
                                </p>
                            </motion.div>

                            <div className="bg-white rounded-[1.5rem] overflow-hidden border border-blue-100 flex flex-col lg:flex-row-reverse">
                                <div className="lg:w-2/5 p-10 md:p-14 bg-[#0f2f6b] flex flex-col justify-center text-white relative">
                                    <h2 className="text-2xl md:text-3xl font-black mb-6 text-white font-righteous">Exhibitor Perks</h2>
                                    <p className="text-blue-100/80 mb-8 leading-relaxed font-medium">
                                        Position your brand at the epicenter of innovation. Connect with your target audience where they learn, network, and grow.
                                    </p>

                                    <div className="space-y-6">
                                        {[
                                            "Premium Booth Location",
                                            "Brand exposure across event media",
                                            "Direct customer acquisition",
                                            "Demo products to live audience",
                                            "Exclusive networking with VIPs"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 group">
                                                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 border border-white/15 text-white flex items-center justify-center font-bold transition-all">
                                                    ✓
                                                </div>
                                                <span className="text-lg font-semibold text-blue-50">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:w-3/5 p-10 md:p-14 bg-white">
                                    <h3 className="text-2xl font-black text-biro-blue-dark mb-6 font-righteous">Exhibitor Registration</h3>
                                    
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
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Company / Brand Name</label>
                                            <input 
                                                type="text" 
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-3.5 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900" 
                                                placeholder="Acme Corp" 
                                                required 
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Contact Person</label>
                                                <input 
                                                    type="text" 
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-3.5 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900" 
                                                    placeholder="Jane Doe" 
                                                    required 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Phone Number</label>
                                                <input 
                                                    type="tel" 
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-3.5 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900" 
                                                    placeholder="+234 XXX XXXX" 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
                                                <input 
                                                    type="email" 
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-3.5 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900" 
                                                    placeholder="jane@acmecorp.com" 
                                                    required 
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Website (Optional)</label>
                                                <input 
                                                    type="url" 
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-3.5 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900" 
                                                    placeholder="www.acmecorp.com" 
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Additional Requirements or Details</label>
                                            <textarea 
                                                rows={3} 
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-3.5 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 resize-none" 
                                                placeholder="Any specific power requirements, display arrangements, etc."
                                            />
                                        </div>

                                        <Button type="submit" disabled={loading} variant="biro" className="w-full py-4 text-lg rounded-xl border-0">
                                            {loading ? 'Submitting...' : 'Request Exhibitor Package'}
                                        </Button>
                                    </form>
                                    )}
                                    
                                    {message && cooldown === 0 && (
                                        <div className="p-5 rounded-2xl border-2 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100 border-biro-blue text-biro-blue-dark">
                                            <div className="flex items-center justify-center gap-3">
                                                <span className="text-2xl font-bold text-biro-blue">✓</span>
                                                <span className="font-semibold text-center leading-snug">{message.replace(/^[✓⚠] /, '')}</span>
                                            </div>
                                        </div>
                                    )}
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
