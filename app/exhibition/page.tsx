'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import formBanner from "@/assets/images/formBanner.png";
import DropdownIcon from "../components/DropdownIcon";
import Spinner from '../components/Spinner';
import ConfirmationModal from '../components/ConfirmationModal';
const imgVector1 = 'https://www.figma.com/api/mcp/asset/c718115e-08bd-4291-a1f2-818463646722.svg';
const imgVector2 = 'https://www.figma.com/api/mcp/asset/23f25dc7-e463-4b43-806a-32a4e82381fc.svg';

type InputFieldProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  required?: boolean;
};

function InputField({ placeholder = 'First name', value, onChange, name, type = 'text', required }: InputFieldProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="min-h-[56px] w-full rounded-[8px] border-2 border-transparent bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))] px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] font-['Inter:Regular'] text-[length:var(--type-body,18px)] font-normal tracking-[-0.36px] text-[color:var(--color-inverted,white)] placeholder:text-[color:var(--color-gray-inverted,#a1a1a1)] placeholder:opacity-70 outline-none transition-all duration-200 focus:border-[#84CAFF]"
    />
  );
}

export default function ExhibitionPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    companyName: '',
    website: '',
    exhibitionPackage: '',
    immediatePayment: '',
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        setErrorMessage('Please upload a PNG, JPG, or SVG file');
        return;
      }
      // Validate file size (max 2MB to stay well below 413 limits)
      const maxSizeMB = 2;
      if (file.size > maxSizeMB * 1024 * 1024) {
        setErrorMessage(`File size must be less than ${maxSizeMB}MB`);
        return;
      }
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('companyName', formData.companyName);
      formDataToSend.append('website', formData.website);
      formDataToSend.append('exhibitionPackage', formData.exhibitionPackage);
      formDataToSend.append('immediatePayment', formData.immediatePayment);
      
      if (logo) {
        formDataToSend.append('logo', logo);
      }

      const response = await fetch('/api/submissions/exhibition', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit registration');
      }

      const result = await response.json();
      setSubmitStatus('success');
      setIsSuccessModalOpen(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        companyName: '',
        website: '',
        exhibitionPackage: '',
        immediatePayment: '',
      });
      setLogo(null);

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
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
                  <span className="block font-bold">Exhibit at BTF 2.0</span>
                </h2>

                <div className="flex flex-col font-cabinet-grotesk justify-end leading-[1.4] text-colors-inverted shrink-0 mb-1">
                  <p className="font-bold text-[16px]">5TH - 7TH NOV. | 2026</p>
                  <p className="font-bold text-[16px]">VICTOR UWAIFO CREATIVE HUB,</p>
                  <p className="font-bold text-[16px]">BENIN CITY, EDO STATE</p>
                </div>
              </div>

              <div className="font-['Inter:Regular'] text-[16px] leading-[1.4] text-colors-inverted">
                <p>For more enquires:</p>
                <p>+234-8142289951; +234-8145658605</p>
                <p>info@benintechfest.com.ng</p>
              </div>
            </div>



            {submitStatus === 'error' && (
              <div className="w-full max-w-[1080px] bg-red-900 border border-red-700 rounded-[8px] p-4 text-red-100">
                <p className="font-bold">✗ Submission failed</p>
                <p>{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid w-full max-w-[1080px] grid-cols-1 gap-[24px] md:grid-cols-2" data-node-id="215:16287" data-name="form">
              <div className="content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative self-start shrink-0" data-node-id="215:16714" data-name="contact-info">
                <p className="[word-break:break-word] font-['Bricolage_Grotesque:Regular'] font-normal leading-[1.2] relative shrink-0 text-[color:var(--color-inverted,white)] text-[length:var(--type-title,20px)] tracking-[-0.8px] whitespace-nowrap" data-node-id="215:16715" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
                  CONTACT INFO
                </p>

                <InputField 
                  placeholder="First name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
                <InputField 
                  placeholder="Last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
                <InputField 
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <InputField 
                  placeholder="Phone (preferably WhatsApp)"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />

                <textarea
                  name="message"
                  placeholder="Send us a message (optional)"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="h-[160px] w-full resize-none rounded-[8px] border-2 border-transparent bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))] px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] font-['Inter:Regular'] text-[length:var(--type-body,18px)] font-normal tracking-[-0.36px] text-[color:var(--color-inverted,white)] placeholder:text-[color:var(--color-gray-inverted,#a1a1a1)] placeholder:opacity-70 outline-none transition-all duration-200 focus:border-[#84CAFF]"
                />
              </div>

              <div className="content-stretch flex flex-col gap-[24px] items-start justify-self-stretch relative self-start shrink-0" data-node-id="215:16716" data-name="business-info">
                <p className="[word-break:break-word] font-['Bricolage_Grotesque:Regular'] font-normal leading-[1.2] relative shrink-0 text-[color:var(--color-inverted,white)] text-[length:var(--type-title,20px)] tracking-[-0.8px] whitespace-nowrap" data-node-id="215:16717" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
                  EXHIBITION INFO
                </p>

                <InputField 
                  placeholder="Company/business name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
                <InputField 
                  placeholder="Link to website/social media"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                />

                <div
                  className="relative w-full"
                  data-node-id="215:16750"
                  data-name="dropdown"
                >
                  <select
                    name="exhibitionPackage"
                    value={formData.exhibitionPackage}
                    onChange={handleInputChange}
                    className="min-h-[56px] w-full appearance-none cursor-pointer rounded-[8px] border-2 border-transparent bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))] px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] pr-[52px] text-[color:var(--color-inverted,white)] outline-none transition-all duration-200 focus:border-[#84CAFF]"
                    aria-label="Choose exhibition package"
                    required
                  >
                    <option value="" disabled hidden>
                      Choose exhibition package
                    </option>
                    <option value="Premium booth (4x space)">Premium booth (4x space)</option>
                    <option value="Standard booth (2x space)">Standard booth (2x space)</option>
                    <option value="Regular booth (1x space)">Regular booth (1x space)</option>
                  </select>
                  <DropdownIcon className="pointer-events-none absolute right-[24px] top-[20px] h-[17px] w-[10px] text-[color:var(--color-inverted,white)]" />
                </div>

                <div
                  className="relative w-full"
                  data-node-id="215:16756"
                  data-name="dropdown"
                >
                  <select
                    name="immediatePayment"
                    value={formData.immediatePayment}
                    onChange={handleInputChange}
                    className="min-h-[56px] w-full appearance-none cursor-pointer rounded-[8px] border-2 border-transparent bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))] px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] pr-[52px] text-[color:var(--color-inverted,white)] outline-none transition-all duration-200 focus:border-[#84CAFF]"
                    aria-label="Are you making immediate payment?"
                  >
                    <option value="" disabled hidden>
                      Are you making immediate payment?
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <DropdownIcon className="pointer-events-none absolute right-[24px] top-[20px] h-[17px] w-[10px] text-[color:var(--color-inverted,white)]" />
                </div>

                <div className="bg-[var(--color-trans-10-inverted,rgba(0,0,0,0.1))] border border-[var(--color-gray-neutral,#303030)] border-dashed content-stretch flex flex-col h-[160px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-full" data-node-id="215:16958" data-name="file-upload">
                  <label htmlFor="logo-upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center group">
                    {logoPreview && (
                      <div className="absolute inset-0 p-4 flex items-center justify-center">
                        <img src={logoPreview} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                      </div>
                    )}
                    <div className={`content-stretch flex flex-col items-center justify-center gap-[16px] w-full h-full relative z-10 transition-all duration-200 ${logoPreview ? 'opacity-0 bg-black/60 group-hover:opacity-100' : 'opacity-100 px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)]'}`}>
                      <div className="content-stretch flex items-center justify-center opacity-70 relative shrink-0" data-node-id="215:16959" data-name="icon">
                        <div className="relative shrink-0 size-[40px]" data-node-id="I215:16959;15:72469" data-name="UploadSimple">
                          <div className="absolute inset-[9.37%_12.5%_15.63%_12.5%]" data-node-id="I215:16959;15:72469;15:40496" data-name="Vector">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
                          </div>
                        </div>
                      </div>
                      <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic opacity-70 relative shrink-0 text-[color:var(--color-gray-inverted,#a1a1a1)] text-[length:var(--type-body,18px)] tracking-[-0.36px] whitespace-nowrap" data-node-id="215:16961">
                        <p className="leading-[1.4]">
                          {logo ? `Change logo (${logo.name})` : 'Upload your logo (PNG, JPG or SVG)'}
                        </p>
                      </div>
                    </div>
                    <input
                      id="logo-upload"
                      type="file"
                      accept=".png,.jpg,.jpeg,.svg"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                aria-busy={isLoading}
                aria-live="polite"
                className="bg-[var(--color-blue,#1570ef)] cursor-pointer col-1 content-stretch flex gap-[8px] items-center justify-center justify-self-stretch px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] relative rounded-[1000px] row-2 self-start shrink-0 text-[color:var(--color-neutral,white)] font-['Bricolage_Grotesque:Medium'] font-medium text-[length:var(--button-label-sm,20px)] uppercase tracking-[-0.4px] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                data-node-id="215:16972"
                data-name="submit"
              >
                {isLoading ? (
                    <>
                        <span className="sr-only">Submitting...</span>
                        <Spinner size="24" color="white" />
                    </>
                ) : 'SUBMIT'}
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
