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
    phone: string;
    company: string;
    role: string;
    socialMedia: string[];
    speakingCategory: string;
    areaOfInterest: string;
    hasExperience: string;
    previousEngagement: string;
    largestAudience: string;
    whySpeak: string;
    agreedToTerms: boolean;
};

const initialForm: FormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    socialMedia: [''],
    speakingCategory: '',
    areaOfInterest: '',
    hasExperience: '',
    previousEngagement: '',
    largestAudience: '',
    whySpeak: '',
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
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = event.target;
        if (type === 'checkbox') {
            setFormData((prev) => ({ ...prev, [name]: (event.target as HTMLInputElement).checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const isError = (fieldName: keyof FormState) => {
        if (!submitted) return false;

        if (fieldName === 'socialMedia') {
            return formData.socialMedia.every((link) => !link.trim());
        }

        if (fieldName === 'agreedToTerms') {
            return !formData.agreedToTerms;
        }

        return !String(formData[fieldName]).trim();
    };

    const getFieldClass = (fieldName: keyof FormState) => {
        const activeError = isError(fieldName);
        return `bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))] min-h-[56px] overflow-clip px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] rounded-[8px] w-full border-2 transition-all duration-200 ${activeError ? 'border-[#FF8484]' : 'border-transparent focus:border-[#84CAFF]'}`;
    };

    const inputTextClass = "text-[color:var(--color-inverted,white)] placeholder:text-[color:var(--color-gray-inverted,#a1a1a1)] placeholder:opacity-70 focus:outline-none";

    const renderError = (fieldName: keyof FormState, message: string) => {
        if (!isError(fieldName)) return null;
        return <span className="text-[#FF8484] text-sm mt-1 ml-1 block">{message}</span>;
    };

    const handleSocialMediaChange = (index: number, value: string) => {
        setFormData((prev) => {
            const newSocialMedia = [...prev.socialMedia];
            newSocialMedia[index] = value;
            return { ...prev, socialMedia: newSocialMedia };
        });
    };

    const addSocialMediaLink = () => {
        setFormData((prev) => ({
            ...prev,
            socialMedia: [...prev.socialMedia, '']
        }));
    };
    
    const removeSocialMediaLink = (index: number) => {
        if (formData.socialMedia.length === 1) return;
        setFormData((prev) => {
            const newSocialMedia = prev.socialMedia.filter((_, i) => i !== index);
            return { ...prev, socialMedia: newSocialMedia };
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        setSubmitError('');

        const requiredFields: Array<keyof FormState> = [
            'firstName',
            'lastName',
            'email',
            'phone',
            'company',
            'role',
            'speakingCategory',
            'areaOfInterest',
            'hasExperience',
            'whySpeak',
            'agreedToTerms',
        ];

        const hasRequiredErrors = requiredFields.some((field) => isError(field));
        if (hasRequiredErrors) {
            return;
        }

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            role: formData.role,
            socialMedia: formData.socialMedia.filter((link) => link.trim().length > 0),
            speakingCategory: formData.speakingCategory,
            areaOfInterest: formData.areaOfInterest,
            hasExperience: formData.hasExperience,
            previousEngagement: formData.previousEngagement,
            largestAudience: formData.largestAudience,
            whySpeak: formData.whySpeak,
            agreedToTerms: formData.agreedToTerms,
        };

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/submissions/speaker', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || 'Failed to submit speaker application.');
            }

            setFormData(initialForm);
            setSubmitted(false);
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error('Speaker submission error:', error);
            setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
                                    Apply to
                                    <span className="block font-bold">Speak at BTF 2.0</span>
                                </h2>

                                <div className="flex flex-col font-cabinet-grotesk justify-end leading-[1.4] text-colors-inverted shrink-0 mb-1">
                                    <p className="font-bold text-[16px]">5TH - 7TH NOV. | 2026</p>
                                    <p className="font-bold text-[16px]">BENIN CITY, EDO STATE</p>
                                </div>
                            </div>
                                
                            <div className="font-['Inter:Regular'] text-[16px] leading-[1.4] text-colors-inverted">
                                <p>For more enquires:</p>
                                <p>+234-8142289951; +234-8145658605</p>
                                <p>info@benintechfest.com.ng</p>
                            </div>
                        </div>

                        {submitError && (
                            <div className="w-full max-w-[1080px] rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {submitError}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="w-full max-w-[1080px] gap-x-[24px] gap-y-[24px] grid grid-cols-1 md:grid-cols-2">
                            {/* PERSONAL INFO SECTION */}
                            <div className="col-span-1 flex flex-col gap-[24px]">
                                <p className="font-['Bricolage_Grotesque:Regular'] font-normal leading-[1.2] text-[color:var(--color-inverted,white)] text-[length:var(--type-title,20px)] tracking-[-0.8px] uppercase" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
                                    PERSONAL INFO
                                </p>

                                <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} placeholder="First name *" className={`${getFieldClass('firstName')} ${inputTextClass}`} />
                                {renderError('firstName', 'First name is required')}

                                <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Last name *" className={`${getFieldClass('lastName')} ${inputTextClass}`} />
                                {renderError('lastName', 'Last name is required')}

                                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email *" className={`${getFieldClass('email')} ${inputTextClass}`} />
                                {renderError('email', 'Valid email is required')}

                                <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone (preferably WhatsApp) *" className={`${getFieldClass('phone')} ${inputTextClass}`} />
                                {renderError('phone', 'Phone number is required')}

                                <input name="company" type="text" value={formData.company} onChange={handleChange} placeholder="Company/organisation *" className={`${getFieldClass('company')} ${inputTextClass}`} />
                                {renderError('company', 'Company or organisation is required')}

                                <input name="role" type="text" value={formData.role} onChange={handleChange} placeholder="Role/designation *" className={`${getFieldClass('role')} ${inputTextClass}`} />
                                {renderError('role', 'Role or designation is required')}

                                <div className="flex flex-col gap-4 w-full">
                                    {formData.socialMedia.map((link, index) => (
                                        <div key={index} className="bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))] content-stretch flex gap-[4px] items-center overflow-clip px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] relative rounded-[8px] shrink-0 w-full focus-within:ring-1 focus-within:ring-[color:var(--color-inverted,white)] transition">
                                            <input
                                                type="text"
                                                value={link}
                                                onChange={(e) => handleSocialMediaChange(index, e.target.value)}
                                                placeholder={index === 0 ? "Social media (LinkedIn, X, IG or FB page)" : "Additional social media link"}
                                                className="bg-transparent border-none w-full focus:outline-none text-[color:var(--color-inverted,white)] placeholder:text-[color:var(--color-gray-inverted,#a1a1a1)] placeholder:opacity-70"
                                            />
                                            {index === formData.socialMedia.length - 1 ? (
                                                <button
                                                    type="button"
                                                    onClick={addSocialMediaLink}
                                                    className="ml-auto text-[color:var(--color-inverted,white)] opacity-70 hover:opacity-100 flex-shrink-0 transition-opacity"
                                                    aria-label="Add social media link"
                                                >
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => removeSocialMediaLink(index)}
                                                    className="ml-auto text-[#FF695B] opacity-70 hover:opacity-100 flex-shrink-0 transition-opacity"
                                                    aria-label="Remove social media link"
                                                >
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* SPEAKING INFO SECTION */}
                            <div className="col-span-1 flex flex-col gap-[24px]">
                                <p className="font-['Bricolage_Grotesque:Regular'] font-normal leading-[1.2] text-[color:var(--color-inverted,white)] text-[length:var(--type-title,20px)] tracking-[-0.8px] uppercase" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
                                    SPEAKING INFO
                                </p>

                                <div className="relative w-full">
                                    <select
                                        name="speakingCategory"
                                        value={formData.speakingCategory}
                                        onChange={handleChange}
                                        className={`${getFieldClass('speakingCategory')} ${inputTextClass} appearance-none cursor-pointer pr-[52px]`}
                                        aria-label="Speaking category"
                                    >
                                        <option value="" disabled hidden>
                                            Speaking category *
                                        </option>
                                        <option value="Guest speaker">Guest speaker</option>
                                        <option value="Panelist">Panelist</option>
                                        <option value="Masterclass Facilitator">Masterclass Facilitator</option>
                                    </select>
                                    <DropdownIcon className="pointer-events-none absolute right-[24px] top-[20px] h-[17px] w-[10px] text-[color:var(--color-inverted,white)]" />
                                </div>
                                {renderError('speakingCategory', 'Please select a speaking category')}

                                <div className="relative w-full">
                                    <select
                                        name="areaOfInterest"
                                        value={formData.areaOfInterest}
                                        onChange={handleChange}
                                        className={`${getFieldClass('areaOfInterest')} ${inputTextClass} appearance-none cursor-pointer pr-[52px]`}
                                        aria-label="Area of interest"
                                    >
                                        <option value="" disabled hidden>
                                            Area of interest *
                                        </option>
                                        <option value="Skill, industry & talent development">Skill, industry & talent development</option>
                                        <option value="Entrepreneurship, business and startup mentorship">Entrepreneurship, business and startup mentorship</option>
                                        <option value="Community and ecosystem impact">Community and ecosystem impact</option>
                                        <option value="Edo history & heritage">Edo history & heritage</option>
                                    </select>
                                    <DropdownIcon className="pointer-events-none absolute right-[24px] top-[20px] h-[17px] w-[10px] text-[color:var(--color-inverted,white)]" />
                                </div>
                                {renderError('areaOfInterest', 'Please select your area of interest')}

                                <div className="relative w-full">
                                    <select
                                        name="hasExperience"
                                        value={formData.hasExperience}
                                        onChange={handleChange}
                                        className={`${getFieldClass('hasExperience')} ${inputTextClass} appearance-none cursor-pointer pr-[52px]`}
                                        aria-label="Do you have any speaking experience?"
                                    >
                                        <option value="" disabled hidden>
                                            Do you have any speaking experience? *
                                        </option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                    <DropdownIcon className="pointer-events-none absolute right-[24px] top-[20px] h-[17px] w-[10px] text-[color:var(--color-inverted,white)]" />
                                </div>
                                {renderError('hasExperience', 'Please tell us if you have speaking experience')}

                                    <input
                                        name="previousEngagement"
                                        type="text"
                                        value={formData.previousEngagement}
                                        onChange={handleChange}
                                        placeholder="If yes, paste a link to any of your previous engagement"
                                        disabled={formData.hasExperience === 'No'}
                                        className={`${getFieldClass('previousEngagement')} ${inputTextClass} disabled:cursor-not-allowed ${formData.hasExperience === 'No' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />

                                    <input
                                        name="largestAudience"
                                        type="text"
                                        value={formData.largestAudience}
                                        onChange={handleChange}
                                        placeholder="What's the largest audience you've spoken to?"
                                        disabled={formData.hasExperience === 'No'}
                                        className={`${getFieldClass('largestAudience')} ${inputTextClass} disabled:cursor-not-allowed ${formData.hasExperience === 'No' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />

                                    <textarea
                                        name="whySpeak"
                                        value={formData.whySpeak}
                                        onChange={handleChange}
                                        placeholder="Why do you want to speak at BTF 2.0? *"
                                        className={`${getFieldClass('whySpeak')} ${inputTextClass} resize-none`}
                                        rows={4}
                                    />
                                {renderError('whySpeak', 'Tell us why you want to speak')}

                                <label className={`flex gap-[4px] items-center rounded-[8px] w-full border-2 px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] transition-all duration-200 ${isError('agreedToTerms') ? 'border-[#FF8484]' : 'border-transparent bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))]'}`}>
                                    <input
                                        type="checkbox"
                                        name="agreedToTerms"
                                        checked={formData.agreedToTerms}
                                        onChange={handleChange}
                                        className="mt-1 h-4 w-4 rounded border-white/40 bg-transparent text-[#1570EF] focus:ring-[#1570EF]"
                                    />
                                    <span>
                                        I agree to be considered for speaking opportunities at BTF 2.0 and understand that my details may be reviewed by the organizing team.
                                    </span>
                                </label>
                                {renderError('agreedToTerms', 'You must agree before submitting')}
                            </div>

                            <button
                                type="submit"
                                disabled={!formData.agreedToTerms || isSubmitting}
                                aria-busy={isSubmitting}
                                aria-live="polite"
                                className="bg-[var(--static-blue,#1570ef)] cursor-pointer content-stretch flex gap-[8px] items-center justify-center px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] relative rounded-[1000px] shrink-0 text-[color:var(--static-white,white)] font-['Bricolage_Grotesque:Medium'] font-medium text-[length:var(--button-label-sm,20px)] uppercase tracking-[-0.4px] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed col-span-1 md:col-start-1 md:col-span-1"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="sr-only">Submitting...</span>
                                        <Spinner size="24" color="white" />
                                    </>
                                ) : "Submit"}
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <ConfirmationModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
            <Footer />
        </div>
    );
}
