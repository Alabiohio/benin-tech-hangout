'use client';

import React, { useState } from 'react';

export default function Registration() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        primaryInterest: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/submissions/registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('✓ Registration successful! Check your email for confirmation.');
                setFormData({ name: '', email: '', primaryInterest: '' });
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

    return (
        <section id="register" className="py-24 md:py-32 bg-biro-blue-dark relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-biro-blue-dark to-[#050a14] opacity-100"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                    {/* Left Info Panel */}
                    <div className="md:w-[45%] p-10 md:p-14 bg-biro-blue-dark flex flex-col justify-center text-white">
                        <h2 className="text-3xl md:text-4xl font-black font-cabinet-grotesk mb-6 leading-tight">
                            Secure Your <span className="text-highlight-yellow">Spot</span>
                        </h2>
                        <p className="text-blue-100/60 text-base md:text-lg mb-10 leading-relaxed font-medium">
                            Join the definitive gathering of builders, founders, and innovators in Benin City.
                        </p>

                        <div className="space-y-6">
                            {[
                                "Ecosystem Networking",
                                "Strategic Workshops",
                                "Limited Edition Access",
                                "Main Stage Sessions"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-highlight-yellow"></div>
                                    <span className="text-sm md:text-base font-bold tracking-wide uppercase text-blue-100/80">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-12 border-t border-white/5">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                                Location: Benin City, Edo State
                            </p>
                        </div>
                    </div>

                    {/* Right Form Panel */}
                    <div className="md:w-[55%] p-10 md:p-14 bg-white">
                        {message && (
                            <div className={`mb-6 p-5 rounded-2xl border-2 shadow-lg transform transition-all duration-300 bg-gradient-to-r from-blue-50 to-blue-100 border-biro-blue text-biro-blue-dark`}>
                                <p className="font-semibold leading-snug text-center">{message}</p>
                            </div>
                        )}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Primary Interest</label>
                                    <select
                                        name="primaryInterest"
                                        value={formData.primaryInterest}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-biro-blue outline-none transition-all bg-white text-gray-900 font-medium cursor-pointer"
                                        required
                                    >
                                        <option value="">Select Interest</option>
                                        <option value="Development">Development</option>
                                        <option value="Design">Design</option>
                                        <option value="Entrepreneurship">Entrepreneurship</option>
                                        <option value="Investment">Investment</option>
                                        <option value="Sponsorship">Sponsorship</option>
                                    </select>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full py-5 bg-biro-blue-dark text-white font-black font-cabinet-grotesk text-lg rounded-xl hover:bg-highlight-yellow hover:text-biro-blue-dark transition-all active:scale-95 shadow-lg shadow-blue-900/10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Submitting...' : 'COMPLETE REGISTRATION'}
                            </button>

                            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">
                                Limited seats available for BTF 2.0
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
