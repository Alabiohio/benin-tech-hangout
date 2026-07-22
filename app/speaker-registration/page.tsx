'use client';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "../components/Button";

export default function SpeakerRegistrationPage() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [cooldown, setCooldown] = useState(0);
    const [formData, setFormData] = useState({
        application_type: 'self',
        name: '',
        email: '',
        phone: '',
        speaker_name: '',
        topic: '',
        speaker_category: 'Keynote',
        why_speak: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/submissions/speaker', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✓ Nomination submitted successfully!');
                setCooldown(30);
                setFormData({
                    application_type: 'self',
                    name: '',
                    email: '',
                    phone: '',
                    speaker_name: '',
                    topic: '',
                    speaker_category: 'Keynote',
                    why_speak: ''
                });
            } else {
                setMessage(`✗ Error: ${data.error || 'Failed to submit'}`);
            }
        } catch (error) {
            setMessage('✗ Error submitting nomination. Please try again.');
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
                                <h1 className="text-4xl md:text-6xl font-black font-cabinet-grotesk text-biro-blue-dark mb-6 leading-tight">
                                    Take The <span className="text-biro-blue">Stage</span>
                                </h1>
                                <p className="md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                                    Whether you want to share your expertise or recommend a visionary leader, help us shape the conversations at <span className="text-biro-blue-dark font-bold">BTF 2.0</span>.
                                </p>
                            </motion.div>

                            <motion.div
                                className="overflow-hidden flex flex-col item-center justify-center lg:flex-row"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >

                                <div className="w-full max-w-4xl mx-auto py-10 px-2 md:py-16 md:px-24">
                                    <h3 className="text-3xl font-black text-biro-blue-dark mb-8 font-cabinet-grotesk">Speaker Nomination</h3>
                                    
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
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">I am...</label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <label className="flex items-center gap-3 p-4 border border-blue-100 rounded-xl cursor-pointer hover:border-biro-blue transition-all has-[:checked]:border-biro-blue has-[:checked]:bg-blue-50/50">
                                                    <input 
                                                        type="radio" 
                                                        name="application_type" 
                                                        value="self" 
                                                        className="w-5 h-5 accent-blue-600"
                                                        checked={formData.application_type === 'self'}
                                                        onChange={handleInputChange}
                                                    />
                                                    <span className="font-bold text-gray-900">Applying to speak</span>
                                                </label>
                                                <label className="flex items-center gap-3 p-4 border border-blue-100 rounded-xl cursor-pointer hover:border-biro-blue transition-all has-[:checked]:border-biro-blue has-[:checked]:bg-blue-50/50">
                                                    <input 
                                                        type="radio" 
                                                        name="application_type" 
                                                        value="suggest"
                                                        className="w-5 h-5 accent-blue-600"
                                                        checked={formData.application_type === 'suggest'}
                                                        onChange={handleInputChange}
                                                    />
                                                    <span className="font-bold text-gray-900">Suggesting a speaker</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Your Name</label>
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

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Your Email</label>
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
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Speaker Name (if suggesting)</label>
                                            <input 
                                                type="text" 
                                                name="speaker_name"
                                                value={formData.speaker_name}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" 
                                                placeholder="Name of the person you're suggesting" 
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Talk Topic / Areas of Expertise</label>
                                            <input 
                                                type="text" 
                                                name="topic"
                                                value={formData.topic}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400" 
                                                placeholder="e.g. AI, FinTech, Creative Economy, Scaling Tech Roles" 
                                                required 
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Speaker Category</label>
                                            <select 
                                                name="speaker_category"
                                                value={formData.speaker_category}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium" 
                                                required 
                                            >
                                                <option value="Keynote">Keynote</option>
                                                <option value="Panelists">Panelists</option>
                                                <option value="Facilitators">Facilitators</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Why should they/you speak?</label>
                                            <textarea 
                                                rows={4} 
                                                name="why_speak"
                                                value={formData.why_speak}
                                                onChange={handleInputChange}
                                                className="w-full px-5 py-4 rounded-xl border border-blue-100 bg-[#f8fbff] focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 resize-none font-medium placeholder:text-gray-400" 
                                                placeholder="Tell us briefly about the impact and relevance..."
                                            />
                                        </div>

                                        <Button type="submit" disabled={loading} variant="biro" className="w-full !py-2 text-xl rounded-2xl border-0">
                                            {loading ? 'Submitting...' : 'Submit Nomination'}
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
