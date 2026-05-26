'use client';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function VolunteerPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [cooldown, setCooldown] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        skills: '',
        availability: '',
        motivation: ''
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
            const response = await fetch('/api/submissions/volunteer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✓ Volunteer application submitted successfully!');
                setCooldown(30);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    skills: '',
                    availability: '',
                    motivation: ''
                });
            } else {
                setMessage(`✗ Error: ${data.error || 'Failed to submit'}`);
            }
        } catch (error) {
            setMessage('✗ Error submitting application. Please try again.');
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
                                <h1 className="text-5xl md:text-7xl font-black font-righteous text-biro-blue-dark mb-6 leading-tight">
                                    Join The <span className="text-biro-blue">Team</span>
                                </h1>
                                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                                    Become a vital part of <span className="text-biro-blue-dark font-bold">Benin Tech Fest 2.0</span>. Help us create an unforgettable experience for thousands of innovators.
                                </p>
                            </motion.div>

                            <motion.div
                                className="rounded-[1.5rem] overflow-hidden border border-blue-100 flex flex-col lg:flex-row"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="lg:w-2/5 p-10 md:p-14 bg-[#0f2f6b] flex flex-col justify-center text-white relative overflow-hidden">
                                    <h2 className="text-2xl md:text-3xl font-black mb-4 relative z-10 font-righteous text-white">Why Volunteer?</h2>
                                    <p className="text-blue-100/80 mb-4 leading-relaxed relative z-10">
                                        Volunteering at BTH is more than just lending a hand. It&apos;s an opportunity to grow, network, and lead the change.
                                    </p>

                                    <div className="space-y-5 relative z-10">
                                        {[
                                            "Exclusive backstage access",
                                            "Network with industry leaders",
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-4 group">
                                                <div className="w-8 h-8 shrink-0 rounded-lg bg-white/10 border border-white/15 text-white flex items-center justify-center font-bold transition-all">
                                                    ✓
                                                </div>
                                                <span className="text-base font-semibold text-blue-50 leading-tight pt-1">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:w-3/5 p-10 md:p-16 bg-white">
                                    <h3 className="text-3xl font-black text-biro-blue-dark mb-8 font-righteous">Application Form</h3>
                                    
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
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
                                                <input 
                                                    type="text" 
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" 
                                                    placeholder="John Doe" 
                                                    required 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                                                <input 
                                                    type="email" 
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" 
                                                    placeholder="john@example.com" 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Preferred Area</label>
                                                <select 
                                                    name="availability"
                                                    value={formData.availability}
                                                    onChange={handleInputChange}
                                                    className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 appearance-none font-medium"
                                                >
                                                    <option value="" className="text-gray-500">Select an area of interest</option>
                                                    <option className="text-gray-900">Logistics & Operations</option>
                                                    <option className="text-gray-900">Media & Public Relations</option>
                                                    <option className="text-gray-900">Technical Support</option>
                                                    <option className="text-gray-900">Ushering & Guest Management</option>
                                                    <option className="text-gray-900">Photography & Videography</option>
                                                    <option className="text-gray-900">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Relevant Skills (Optional)</label>
                                            <input 
                                                type="text" 
                                                name="skills"
                                                value={formData.skills}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" 
                                                placeholder="e.g. Event coordination, graphic design, video editing..."
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Why do you want to volunteer?</label>
                                            <textarea 
                                                rows={4} 
                                                name="motivation"
                                                value={formData.motivation}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 resize-none font-medium placeholder:text-gray-400" 
                                                placeholder="Tell us briefly about your motivation and any relevant experience..."
                                            />
                                        </div>

                                        <Button type="submit" disabled={loading} variant="biro" className="w-full py-5 text-xl rounded-2xl border-0">
                                            {loading ? 'Submitting...' : 'Send Application'}
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
