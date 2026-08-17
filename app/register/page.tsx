'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import formBanner from "@/assets/images/formBanner.png";
import DropdownIcon from "../components/DropdownIcon";
import ConfirmationModal from '../components/ConfirmationModal';
import Spinner from '../components/Spinner';

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    whatsapp: string;
    company: string;
    role: string;
    location: string;
    interests: string[];
    heardFrom: string;
    eventPass: string;
    agreedToTerms: boolean;
};

const initialForm: FormState = {
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
    company: '',
    role: '',
    location: '',
    interests: [],
    heardFrom: '',
    eventPass: '',
    agreedToTerms: false,
};

export default function RegisterPage() {
    const [formData, setFormData] = useState<FormState>(initialForm);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = event.target;

        if (type === 'checkbox') {
            setFormData((prev) => ({ ...prev, [name]: (event.target as HTMLInputElement).checked }));
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        setSubmitError('');

        const form = event.currentTarget;
        if (!form.checkValidity() || formData.interests.length === 0 || !formData.agreedToTerms) {
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/submissions/registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                    primaryInterest: formData.interests.join(', '),
                    agreedToTerms: formData.agreedToTerms,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || 'Registration failed. Please try again.');
            }

            setFormData(initialForm);
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error('Registration submission error:', error);
            setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isError = (fieldName: keyof FormState) => {
        return submitted && (fieldName === 'interests' ? formData.interests.length === 0 : !formData[fieldName]);
    };

    const getFieldClass = (fieldName: keyof FormState) => {
        return `bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))] min-h-[56px] overflow-clip px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] rounded-[8px] w-full border-2 transition-all duration-200 ${isError(fieldName) ? 'border-[#FF8484]' : 'border-transparent focus:border-[#84CAFF]'}`;
    };

    const inputTextClass = "text-[color:var(--color-inverted,white)] placeholder:text-[color:var(--color-gray-inverted,#a1a1a1)] placeholder:opacity-70 focus:outline-none";

    const renderError = (fieldName: keyof FormState, message: string) => {
        if (!isError(fieldName)) return null;
        return <span className="text-[#FF8484] text-sm mt-1 ml-1 block">{message}</span>;
    };

    return (
        <div className="min-h-screen bg-[var(--background,#ffffff)] text-[var(--foreground,#000000)]">
            <Navbar />

            <main className="relative z-10 pt-28 pb-16 md:pt-32 md:pb-20">
                <div className='h-full w-full'>
                    <Image
                        width={2000}
                        height={10}
                        src={formBanner.src}
                        alt='form banner'
                        loading="eager"
                    />
                </div>
                <section className="mx-auto max-w-[1080px] px-4 md:px-6 xl:px-0 pt-18">
                    <div className="content-stretch flex flex-col gap-[var(--device-margin,40px)] items-start justify-center relative size-full">
                        <div className="flex flex-col w-full max-w-[1080px] gap-y-[32px] relative shrink-0 mb-4">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-y-[24px] gap-x-[24px]">
                                <h2 className="text-[48px] font-light leading-[0.9] tracking-[-0.04em] text-colors-inverted md:text-[80px]">
                                    Register to
                                    <span className="block font-bold">Attend BTF 2.0</span>
                                </h2>

                                <div className="flex flex-col font-cabinet-grotesk justify-end leading-[1.4] text-colors-inverted shrink-0 mb-1">
                                    <p className="font-bold text-[16px]">5TH - 7TH NOV. | 2026</p>
                                    <p className="font-bold text-[16px]">VICTOR UWAIFO CREATIVE HUB,</p>
                                    <p className="font-bold text-[16px]">BENIN CITY, EDO STATE</p>
                                </div>
                            </div>                              
                        </div>

                    <form onSubmit={handleSubmit} noValidate className="w-full max-w-[1080px] grid grid-cols-1 gap-[24px] md:grid-cols-2">
                        <div className="flex flex-col w-full">
                            <input name="firstName" type="text" required value={formData.firstName} onChange={handleChange} placeholder="First name *" className={`${getFieldClass("firstName")} ${inputTextClass}`} />
                            {renderError("firstName", "First name is required")}
                        </div>

                        <div className="flex flex-col w-full">
                            <input name="lastName" type="text" required value={formData.lastName} onChange={handleChange} placeholder="Last name *" className={`${getFieldClass("lastName")} ${inputTextClass}`} />
                            {renderError("lastName", "Last name is required")}
                        </div>

                        <div className="flex flex-col w-full">
                            <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="Email *" className={`${getFieldClass("email")} ${inputTextClass}`} />
                            {renderError("email", "Valid email is required")}
                        </div>

                        <div className="flex flex-col w-full">
                            <input name="whatsapp" type="tel" required value={formData.whatsapp} onChange={handleChange} placeholder="WhatsApp number *" className={`${getFieldClass("whatsapp")} ${inputTextClass}`} />
                            {renderError("whatsapp", "WhatsApp number is required")}
                        </div>

                        <div className="flex flex-col w-full">
                            <input name="company" type="text" required value={formData.company} onChange={handleChange} placeholder="Company/school *" className={`${getFieldClass("company")} ${inputTextClass}`} />
                            {renderError("company", "Company or school is required")}
                        </div>

                        <div className="relative flex flex-col w-full">
                                <select
                                    name="role"
                                    required
                                    value={formData.role}
                                    onChange={handleChange}
                                    className={`${getFieldClass("role")} ${inputTextClass} appearance-none cursor-pointer pr-[52px]`}
                                    aria-label="Role/designation *"
                                >
                                    <option value="" disabled hidden>
                                        Role/designation *
                                    </option>
                                    <option value="Builder">Builder (PM, designer, engineer, test, cyber security, etc.)</option>
                                    <option value="Creative">Creative (content creator, video editor, animator, writer, artist, etc.)</option>
                                    <option value="Growth">Growth (marketer, community/social media manager, influencer, etc.)</option>
                                    <option value="Business">Business (business expert, director, founder, investor, executive, etc.)</option>
                                </select>
                                <DropdownIcon className="pointer-events-none absolute right-[24px] top-[20px] h-[17px] w-[10px] text-[color:var(--color-inverted,white)]" />
                            {renderError("role", "Please select a role")}
                        </div>

                        <div className="relative flex flex-col w-full">
                                <select
                                    name="location"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                    className={`${getFieldClass("location")} ${inputTextClass} appearance-none cursor-pointer pr-[52px]`}
                                    aria-label="Where are you located at *"
                                >
                                    <option value="" disabled hidden>
                                        Where are you located at? *
                                    </option>
                                    <option value="Benin City, Edo">Benin City, Edo</option>
                                    <option value="Lagos">Lagos</option>
                                    <option value="Abuja">Abuja</option>
                                    <option value="Port Harcourt">Port Harcourt</option>
                                    <option value="Outside Nigeria">Outside Nigeria</option>
                                </select>
                                <DropdownIcon className="pointer-events-none absolute right-[24px] top-[20px] h-[17px] w-[10px] text-[color:var(--color-inverted,white)]" />
                            {renderError("location", "Please select your location")}
                        </div>

                        <div className="flex flex-col w-full">
                            <div 
                                onClick={() => setIsModalOpen(true)}
                                className={`${getFieldClass("interests")} cursor-pointer relative flex items-center`}
                            >
                                <div className={`w-full truncate ${formData.interests.length === 0 ? 'text-[color:var(--color-gray-inverted,#a1a1a1)] opacity-70' : 'text-[color:var(--color-inverted,white)]'}`}>
                                    {formData.interests.length === 0 ? 'What are you looking forward to? *' : formData.interests.join(', ')}
                                </div>
                                <div className="absolute right-[24px] pointer-events-none flex items-center justify-center size-[20px]">
                                    <DropdownIcon className="size-full text-[color:var(--color-inverted,white)]" />
                                </div>
                            </div>
                            {renderError("interests", "Please select at least one interest")}
                        </div>

                        <div className="relative flex flex-col w-full">
                                <select
                                    name="heardFrom"
                                    required
                                    value={formData.heardFrom}
                                    onChange={handleChange}
                                    className={`${getFieldClass("heardFrom")} ${inputTextClass} appearance-none cursor-pointer pr-[52px]`}
                                    aria-label="How did you hear about BTF? *"
                                >
                                    <option value="" disabled hidden>
                                        How did you hear about BTF? *
                                    </option>
                                    <option value="Instagram">Google search or similar</option>
                                    <option value="Twitter/X">Social media (IG/X/LinkedIn/TikTok)</option>
                                    <option value="Friend/Referral">Friend/word of mouth</option>
                                    <option value="LinkedIn">Communities/group channel</option>
                                    <option value="Community">News/publications</option>
                                    <option value="Other">Others</option>
                                </select>
                                <DropdownIcon className="pointer-events-none absolute right-[24px] top-[20px] h-[17px] w-[10px] text-[color:var(--color-inverted,white)]" />
                            {renderError("heardFrom", "Please let us know how you heard about us")}
                        </div>

                        <div className="relative flex flex-col w-full">
                                <select
                                    name="eventPass"
                                    required
                                    value={formData.eventPass}
                                    onChange={handleChange}
                                    className={`${getFieldClass("eventPass")} ${inputTextClass} appearance-none cursor-pointer pr-[52px]`}
                                    aria-label="Have you gotten an event pass? *"
                                >
                                    <option value="" disabled hidden>
                                        Have you gotten an event pass? *
                                    </option>
                                    <option value="Yes">Yes, I have</option>
                                    <option value="Not yet, plan to">Not yet</option>
                                </select>
                                <DropdownIcon className="pointer-events-none absolute right-[24px] top-[20px] h-[17px] w-[10px] text-[color:var(--color-inverted,white)]" />
                            {renderError("eventPass", "Please specify if you have an event pass")}
                        </div>

                        {submitError && (
                            <div className="md:col-span-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {submitError}
                            </div>
                        )}

                        <label className="md:col-span-2 flex items-start gap-3 rounded-[8px] bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))] px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] text-sm text-[color:var(--color-inverted,white)]">
                            <input
                                type="checkbox"
                                name="agreedToTerms"
                                checked={formData.agreedToTerms}
                                onChange={handleChange}
                                className="mt-1 h-4 w-4 rounded border-white/40 bg-transparent text-[#1570EF] focus:ring-[#1570EF]"
                            />
                            <span>
                                I agree to receive event updates and understand that my registration details may be reviewed by the organizing team.
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={!formData.agreedToTerms || isSubmitting}
                            aria-busy={isSubmitting}
                            aria-live="polite"
                            className="bg-[var(--static-blue,#1570ef)] cursor-pointer content-stretch flex gap-[8px] items-center justify-center justify-self-stretch px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] relative rounded-[1000px] self-start shrink-0 text-[color:var(--static-white,white)] font-['Bricolage_Grotesque:Medium'] font-medium text-[length:var(--button-label-sm,20px)] uppercase tracking-[-0.4px] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="sr-only">Registering...</span>
                                    <Spinner size="24" color="white" />
                                </>
                            ) : "Register"}
                        </button>
                    </form>
                    </div>
                </section>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-[var(--color-neutral,black)] rounded-[16px] p-6 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-xl">
                        <h3 className="text-xl font-bold mb-4 text-[color:var(--color-inverted,white)]">What are you looking forward to?</h3>
                        <div className="flex flex-col gap-3">
                            {[
                                "Workshops & speaking sessions",
                                "Learning & mentorship",
                                "Startup pitch & grants",
                                "Hiring & job opportunities",
                                "Networking & business connections",
                                "Community & collaboration",
                                "Edo arts & culture"
                            ].map(option => (
                                <label key={option} className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-gray-300 text-[#1570EF] focus:ring-[#1570EF]"
                                        checked={formData.interests.includes(option)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setFormData(prev => ({...prev, interests: [...prev.interests, option]}));
                                            } else {
                                                setFormData(prev => ({...prev, interests: prev.interests.filter(i => i !== option)}));
                                            }
                                        }}
                                    />
                                    <span className="text-lg text-[color:var(--color-inverted,white)]">{option}</span>
                                </label>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="mt-6 w-full bg-[#1570EF] text-white py-3 rounded-[8px] font-medium hover:opacity-90 transition"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}

            <ConfirmationModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
            <Footer />
        </div>
    );
}
