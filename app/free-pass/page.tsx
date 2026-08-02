'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import patterns1 from '../../assets/images/patterns1.png';
import Button from '../components/Button';
import Footer from '../components/Footer';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    nationality: string;
    community: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function FreePassPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        nationality: '',
        community: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});
    const [success, setSuccess] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState('');

    const validateField = (name: keyof FormData, value: string) => {
        const trimmedValue = value.trim();

        if (name === 'firstName') {
            return trimmedValue ? '' : 'First name is required.';
        }

        if (name === 'lastName') {
            return trimmedValue ? '' : 'Last name is required.';
        }

        if (name === 'email') {
            if (!trimmedValue) {
                return 'Email is required.';
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
                return 'Please enter a valid email address.';
            }

            return '';
        }

        if (name === 'phone') {
            if (!trimmedValue) {
                return 'Phone number is required.';
            }

            if (!/^\+?[0-9\s()-]{7,20}$/.test(trimmedValue)) {
                return 'Please enter a valid phone number.';
            }

            return '';
        }

        if (name === 'country') {
            return trimmedValue ? '' : 'Country of residence is required.';
        }

        if (name === 'nationality') {
            return trimmedValue ? '' : 'Nationality is required.';
        }

        return '';
    };

    const validateForm = (data: FormData) => {
        const nextErrors: FormErrors = {};

        const firstNameError = validateField('firstName', data.firstName);
        const lastNameError = validateField('lastName', data.lastName);
        const emailError = validateField('email', data.email);
        const phoneError = validateField('phone', data.phone);
        const countryError = validateField('country', data.country);
        const nationalityError = validateField('nationality', data.nationality);

        if (firstNameError) nextErrors.firstName = firstNameError;
        if (lastNameError) nextErrors.lastName = lastNameError;
        if (emailError) nextErrors.email = emailError;
        if (phoneError) nextErrors.phone = phoneError;
        if (countryError) nextErrors.country = countryError;
        if (nationalityError) nextErrors.nationality = nationalityError;

        return nextErrors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const fieldName = name as keyof FormData;
        setFormData(prev => ({
            ...prev,
            [fieldName]: value,
        }));
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const trimmedData: FormData = {
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
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/submissions/free-pass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trimmedData),
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

            setSubmittedEmail(formData.email.trim());
            setSuccess(true);
            setFormData({ firstName: '', lastName: '', email: '', phone: '', country: '', nationality: '', community: '' });
            setErrors({});
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Registration error:', err);
            setIsLoading(false);
        }
    };

    if (isDuplicate) {
        return (
            <section
                className="min-h-screen flex items-center justify-center py-24 px-4"
                style={{
                    backgroundImage: `linear-gradient(135deg, rgba(2, 37, 84, 0.95), rgba(30, 64, 175, 0.95)), url(${patterns1.src})`,
                    backgroundPosition: 'center, 0 0',
                    backgroundRepeat: 'no-repeat, repeat',
                    backgroundSize: 'cover, 220px 220px',
                }}
            >
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
                                setFormData({
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    phone: '',
                                    country: '',
                                    nationality: '',
                                    community: '',
                                });
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
            <section
                className="min-h-screen flex items-center justify-center py-24 px-4"
                style={{
                    backgroundImage: `linear-gradient(135deg, rgba(2, 37, 84, 0.95), rgba(30, 64, 175, 0.95)), url(${patterns1.src})`,
                    backgroundPosition: 'center, 0 0',
                    backgroundRepeat: 'no-repeat, repeat',
                    backgroundSize: 'cover, 220px 220px',
                }}
            >
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
                            A confirmation email has been sent to <strong>{submittedEmail}</strong> with your registration details and event information.
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

                    {/* Action buttons */}
                    <div className="flex flex-col gap-3 w-full">
                        <a
                            href="https://whatsapp.com/channel/0029VbCyw0P9mrGciiEpD71G"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-center shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span>Join WhatsApp Channel</span>
                        </a>
                        <button
                            onClick={() => router.push('/')}
                            className="inline-block bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
        <section
            className="min-h-screen py-24 px-2"
            style={{
                backgroundImage: `linear-gradient(135deg, rgba(2, 37, 84, 0.95), rgba(30, 64, 175, 0.95)), url(${patterns1.src})`,
                backgroundPosition: 'center, 0 0',
                backgroundRepeat: 'no-repeat, repeat',
                backgroundSize: 'cover, 220px 220px',
            }}
        >
            <div className="container mx-auto max-w-2xl">
                <div className="relative overflow-hidden rounded-[32px] border border-white/50 shadow-[0_30px_80px_rgba(2,37,84,0.25)] backdrop-blur-3xl p-5 md:p-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/35 to-transparent" />
                    <div className="relative">
                        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-blue-100/80 bg-gradient-to-r from-blue-50/80 to-white/70 p-5 shadow-sm backdrop-blur-xl md:flex-row md:items-start md:justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black font-cabinet-grotesk text-biro-blue-dark mb-2">
                                    Community Pass
                                </h1>
                                <p className="text-slate-600 text-sm md:text-base">
                                    Free Access to Benin Tech Fest
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 mb-6 rounded-2xl border border-blue-100/80 bg-slate-50/70 p-4 backdrop-blur-xl">
                            <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-3">
                                <li className="flex gap-2 rounded-xl bg-white/70 px-3 py-2">
                                    <span className="text-biro-blue">✓</span>
                                    Access to all general sessions
                                </li>
                                <li className="flex gap-2 rounded-xl bg-white/70 px-3 py-2">
                                    <span className="text-biro-blue">✓</span>
                                    Networking sessions
                                </li>
                                <li className="flex gap-2 rounded-xl bg-white/70 px-3 py-2">
                                    <span className="text-biro-blue">✓</span>
                                    Exhibitions booths
                                </li>
                            </ul>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="relative space-y-5" noValidate>
                        {error && (
                            <div className="rounded-2xl border border-red-200 bg-red-50/90 p-4 backdrop-blur-sm">
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="mb-2 block text-sm font-bold text-black">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter your first name"
                                    className={`w-full rounded-xl border bg-white/90 px-4 py-3 shadow-sm transition-all ${errors.firstName ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-blue-200 focus:border-biro-blue focus:ring-2 focus:ring-blue-100'}`}
                                    aria-invalid={!!errors.firstName}
                                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                                />
                                {errors.firstName && <p id="firstName-error" className="mt-2 text-sm text-red-600">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-bold text-black mb-2">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter your last name"
                                    className={`w-full rounded-xl border bg-white/90 px-4 py-3 shadow-sm transition-all ${errors.lastName ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-blue-200 focus:border-biro-blue focus:ring-2 focus:ring-blue-100'}`}
                                    aria-invalid={!!errors.lastName}
                                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                                />
                                {errors.lastName && <p id="lastName-error" className="mt-2 text-sm text-red-600">{errors.lastName}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-black mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                className={`w-full rounded-xl border bg-white/90 px-4 py-3 shadow-sm transition-all ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-blue-200 focus:border-biro-blue focus:ring-2 focus:ring-blue-100'}`}
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                            />
                            {errors.email && <p id="email-error" className="mt-2 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="country" className="block text-sm font-bold text-white mb-2">
                                    Country of Residence <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Country of residence"
                                    className={`w-full rounded-xl border bg-white/90 px-4 py-3 shadow-sm transition-all ${errors.country ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-blue-200 focus:border-biro-blue focus:ring-2 focus:ring-blue-100'}`}
                                    aria-invalid={!!errors.country}
                                    aria-describedby={errors.country ? 'country-error' : undefined}
                                />
                                {errors.country && <p id="country-error" className="mt-2 text-sm text-red-600">{errors.country}</p>}
                            </div>
                            <div>
                                <label htmlFor="nationality" className="block text-sm font-bold text-white mb-2">
                                    Nationality <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="nationality"
                                    name="nationality"
                                    value={formData.nationality}
                                    onChange={handleChange}
                                    placeholder="Nationality"
                                    className={`w-full rounded-xl border bg-white/90 px-4 py-3 shadow-sm transition-all ${errors.nationality ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-blue-200 focus:border-biro-blue focus:ring-2 focus:ring-blue-100'}`}
                                    aria-invalid={!!errors.nationality}
                                    aria-describedby={errors.nationality ? 'nationality-error' : undefined}
                                />
                                {errors.nationality && <p id="nationality-error" className="mt-2 text-sm text-red-600">{errors.nationality}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-bold text-white mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+234 or any format"
                                    className="w-full rounded-xl border border-blue-200 bg-white/90 px-4 py-3 shadow-sm transition-all focus:outline-none focus:border-biro-blue focus:ring-2 focus:ring-blue-100"
                                    aria-invalid={!!errors.phone}
                                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                                    required
                                />
                                {errors.phone && <p id="phone-error" className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                        </div>

                        <div>
                            <label htmlFor="community" className="block text-sm font-bold text-white mb-2">
                                Community / Tech Group <span className="text-slate-400 font-medium">(optional)</span>
                            </label>
                            <input
                                type="text"
                                id="community"
                                name="community"
                                value={formData.community}
                                onChange={handleChange}
                                placeholder="e.g. Benin Tech Community"
                                maxLength={255}
                                className="w-full rounded-xl border border-blue-200 bg-white/90 px-4 py-3 shadow-sm transition-all focus:outline-none focus:border-biro-blue focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            variant="primary"
                            className="w-full !py-3 font-bold text-base shadow-lg shadow-blue-600/20 hover:!text-white hover:!border-white"
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
