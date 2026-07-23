'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import Footer from '../components/Footer';

export default function FreePassPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validate required fields
        if (!formData.name.trim()) {
            setError('Name is required');
            setIsLoading(false);
            return;
        }

        if (!formData.email.trim()) {
            setError('Email is required');
            setIsLoading(false);
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/submissions/free-pass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim() || null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Check if it's a duplicate email error
                if (response.status === 400 && data.error?.includes('already registered')) {
                    setIsDuplicate(true);
                    setIsLoading(false);
                    return;
                }
                setError(data.error || 'Failed to submit registration');
                setIsLoading(false);
                return;
            }

            setSuccess(true);
            setFormData({ name: '', email: '', phone: '' });
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Registration error:', err);
            setIsLoading(false);
        }
    };

    if (isDuplicate) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-biro-blue-dark via-blue-900 to-biro-blue py-24 px-4">
                <div className="text-center text-white max-w-md">
                    {/* Alert icon */}
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 shadow-2xl">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 4v2m0-14a9 9 0 110 18 9 9 0 010-18zm0 0a9 9 0 110 18 9 9 0 010-18z" />
                            </svg>
                        </div>
                    </div>

                    {/* Main heading */}
                    <h2 className="text-4xl md:text-5xl font-black font-cabinet-grotesk mb-3">
                        Already Registered!
                    </h2>

                    {/* Subheading */}
                    <p className="text-xl font-semibold text-blue-100 mb-6">
                        You're all set for Benin Tech Fest 2.0
                    </p>

                    {/* Details */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
                        <p className="text-blue-50 mb-4">
                            This email address has already been registered for the <strong>Community Pass</strong>.
                        </p>
                        <p className="text-blue-100 text-sm mb-4">
                            <strong>{formData.email}</strong>
                        </p>
                        <div className="text-left space-y-3 text-sm text-blue-100">
                            <div className="flex gap-3">
                                <span className="text-orange-400">→</span>
                                <span>Check your email for your confirmation and event details</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-orange-400">→</span>
                                <span>You already have access to all Community Pass benefits</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-orange-400">→</span>
                                <span>If you need to update your info, please contact support</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <p className="text-blue-200 mb-8">
                        Looking forward to seeing you at the event!
                    </p>

                    {/* Action buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={() => router.push('/')}
                            className="w-full inline-block bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => {
                                setIsDuplicate(false);
                                setFormData({ name: '', email: '', phone: '' });
                            }}
                            className="w-full text-blue-200 hover:text-white font-semibold py-2 px-4 transition-colors"
                        >
                            Try Another Email
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    if (success) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-biro-blue-dark via-blue-900 to-biro-blue py-24 px-4">
                <div className="text-center text-white max-w-md">
                    {/* Animated checkmark */}
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-2xl animate-bounce">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>

                    {/* Main heading */}
                    <h2 className="text-4xl md:text-5xl font-black font-cabinet-grotesk mb-3">
                        Registration Successful!
                    </h2>

                    {/* Subheading */}
                    <p className="text-xl font-semibold text-blue-100 mb-6">
                        Welcome to Benin Tech Fest 2.0
                    </p>

                    {/* Details */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
                        <p className="text-blue-50 mb-4">
                            Thank you for registering for the <strong>Community Pass</strong>!
                        </p>
                        <p className="text-blue-100 text-sm mb-4">
                            A confirmation email has been sent to <strong>{formData.email}</strong> with your registration details and event information.
                        </p>
                        <div className="text-left space-y-3 text-sm text-blue-100">
                            <div className="flex gap-3">
                                <span className="text-green-400">✓</span>
                                <span>Check your email for confirmation and event details</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-green-400">✓</span>
                                <span>You now have access to general sessions and exhibitions</span>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-green-400">✓</span>
                                <span>Mark your calendar for Benin Tech Fest 2.0</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <p className="text-blue-200 mb-8">
                        Get ready for an amazing event experience!
                    </p>

                    {/* Action button */}
                    <button
                        onClick={() => router.push('/')}
                        className="inline-block bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Back to Home
                    </button>
                </div>
            </section>
        );
    }

    return (
        <>
        <section className="min-h-screen bg-gradient-to-br from-biro-blue-dark via-blue-900 to-biro-blue py-24 px-4">
            <div className="container mx-auto max-w-md">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-black font-cabinet-grotesk text-biro-blue-dark mb-2">
                            Community Pass
                        </h1>
                        <p className="text-slate-600 text-sm">
                            Free Access to Benin Tech Fest
                        </p>
                        <div className="mt-4 pt-4 border-t border-blue-100">
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex gap-2">
                                    <span className="text-biro-blue">✓</span>
                                    Access to all general sessions
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-biro-blue">✓</span>
                                    Networking sessions
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-biro-blue">✓</span>
                                    Exhibitions booths
                                </li>
                            </ul>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:border-biro-blue focus:ring-2 focus:ring-blue-100 transition-colors"
                                required
                            />
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

                        <div>
                            <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">
                                Phone Number <span className="text-slate-500 text-xs">(Optional)</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+234 or any format"
                                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:border-biro-blue focus:ring-2 focus:ring-blue-100 transition-colors"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            variant="primary"
                            className="w-full !py-3 font-bold text-base"
                        >
                            {isLoading ? 'Registering...' : 'Register for Free Pass'}
                        </Button>
                    </form>
                </div>
            </div>
        </section>

        <Footer />
        </>
    );
}
