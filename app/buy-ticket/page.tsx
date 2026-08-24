'use client';

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Script from 'next/script';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import formBanner from "@/assets/images/formBanner.png";
import ConfirmationModal from '../components/ConfirmationModal';
import Spinner from '../components/Spinner';
import { validateCoupon, checkRegistration, redeemCoupon, formatPrice } from "@/app/lib/coupons";
import type { CouponValidationResult } from "@/app/lib/coupons";
import { generateRegistrationId } from "@/app/lib/registration";

const TIER_PRICES: Record<string, number> = {
    regular: 3500,
    standard: 10000,
    business: 35000,
    vip: 85000,
};

const LOADING_PHRASES = [
    "Looking up your email...",
    "Checking registration status...",
    "Validating details...",
    "Almost there..."
];

function BuyTicketContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const passNameRaw = searchParams.get('pass') || 'Regular';
    // Normalize to handle case insensitivity and find the price
    const passKey = passNameRaw.toLowerCase();
    const passName = passKey.charAt(0).toUpperCase() + passKey.slice(1);
    
    // Look up the price or fallback to regular if unknown
    const passPrice = TIER_PRICES[passKey] || TIER_PRICES['regular'];

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [couponCode, setCouponCode] = useState("");
    
    const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
    const [registrationError, setRegistrationError] = useState("");
    const [couponValidation, setCouponValidation] = useState<CouponValidationResult | null>(null);
    const [isValidatingEmail, setIsValidatingEmail] = useState(false);
    const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [loadingPhraseIndex, setLoadingPhraseIndex] = useState(0);

    const totalPrice = passPrice * quantity;
    const finalPrice = couponValidation?.final_price_total ?? totalPrice;
    const savings = totalPrice - finalPrice;

    const validateEmail = async (emailValue: string) => {
        if (!emailValue) {
            setIsRegistered(null);
            setRegistrationError("");
            return;
        }

        setIsValidatingEmail(true);
        try {
            const result = await checkRegistration(emailValue);
            if (result.registered) {
                setIsRegistered(true);
                setRegistrationError("");
                setErrors((prev) => ({ ...prev, email: "" }));
            } else {
                setIsRegistered(false);
                setRegistrationError("Please register first to use our ticketing system");
                setErrors((prev) => ({ ...prev, email: "Not registered" }));
            }
        } catch (error) {
            setIsRegistered(false);
            setRegistrationError("Failed to check registration");
        } finally {
            setIsValidatingEmail(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const trimmedEmail = email.trim();
            if (trimmedEmail) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(trimmedEmail)) {
                    validateEmail(trimmedEmail);
                } else {
                    setIsRegistered(null);
                    setRegistrationError("");
                    // Optionally alert them that the format is invalid
                    setErrors((prev) => ({ ...prev, email: "" }));
                }
            } else {
                setIsRegistered(null);
                setRegistrationError("");
                setErrors((prev) => ({ ...prev, email: "" }));
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [email]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isValidatingEmail) {
            const isLastPhrase = loadingPhraseIndex === LOADING_PHRASES.length - 1;
            const delay = isLastPhrase ? 3000 : 1200;
            
            timer = setTimeout(() => {
                setLoadingPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
            }, delay);
        } else {
            setLoadingPhraseIndex(0); // Reset when done
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isValidatingEmail, loadingPhraseIndex]);

    const applyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponValidation(null);
            return;
        }

        if (!email || !isRegistered) {
            setErrors((prev) => ({ ...prev, coupon: "Please enter a registered email first" }));
            return;
        }

        setIsValidatingCoupon(true);
        setErrors((prev) => ({ ...prev, coupon: "" }));

        try {
            const result = await validateCoupon(couponCode.trim(), email, quantity, passPrice);
            setCouponValidation(result);

            if (!result.valid) {
                setErrors((prev) => ({ ...prev, coupon: result.message }));
            }
        } finally {
            setIsValidatingCoupon(false);
        }
    };

    const handlePayment = async () => {
        const newErrors: { [key: string]: string } = {};

        if (!email.trim()) newErrors.email = "Email is required";
        if (!name.trim()) newErrors.name = "Name is required";
        if (quantity <= 0) newErrors.quantity = "Quantity must be at least 1";
        if (!isRegistered) newErrors.email = "Please register first";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsProcessing(true);

        try {
            const paymentResponse = await fetch("/api/payments/initialize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ticket_type: passName.toLowerCase(),
                    email: email.trim(),
                    firstName: name.trim().split(" ")[0],
                    lastName: name.trim().split(" ").slice(1).join(" ") || "-",
                    coupon_code: couponCode.trim() || null,
                    quantity,
                    total_price: finalPrice,
                }),
            });

            if (!paymentResponse.ok) {
                throw new Error("Failed to initialize payment");
            }

            const { accessCode } = await paymentResponse.json();

            if (!accessCode) {
                throw new Error("Failed to get payment access code");
            }

            const PaystackPop = (window as any).PaystackPop;
            if (!PaystackPop) {
                throw new Error("Paystack not loaded");
            }

            const registrationId = generateRegistrationId();

            const paystack = new PaystackPop();
            paystack.resumeTransaction(accessCode, {
                onClose: () => {
                    console.log("Payment window closed");
                },
                onSuccess: async (transaction: any) => {
                    if (couponCode.trim() && couponValidation?.valid) {
                        await redeemCoupon(
                            couponCode.trim(),
                            email,
                            registrationId,
                            passName,
                            quantity,
                            couponValidation.discount_amount,
                            totalPrice,
                            finalPrice
                        );
                    }

                    // Save ticket registration and send confirmation email
                    try {
                        const firstName = name.trim().split(' ')[0];
                        const lastName = name.trim().split(' ').slice(1).join(' ') || '-';
                        const ticketRes = await fetch('/api/submissions/ticket', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                ticket_type: passName.toLowerCase(),
                                firstName,
                                lastName,
                                email: email.trim(),
                                phone: '',
                                country: '',
                                nationality: '',
                                community: '',
                                paymentReference: transaction.reference,
                                registrationId,
                                quantity,
                            }),
                        });
                        const ticketData = await ticketRes.json();
                        if (!ticketRes.ok) {
                            console.error('Ticket submission failed:', ticketRes.status, ticketData);
                        } else {
                            console.log('Ticket registered, confirmation email sent:', ticketData);
                        }
                    } catch (err) {
                        console.error('Failed to submit ticket registration after payment:', err);
                    }

                    setIsSuccessModalOpen(true);
                },
            });
        } catch (error) {
            console.error("Payment error:", error);
            setErrors((prev) => ({
                ...prev,
                payment: error instanceof Error ? error.message : "Payment failed",
            }));
        } finally {
            setIsProcessing(false);
        }
    };

    const getFieldClass = (hasError: boolean, isSuccess?: boolean) => {
        return `bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))] min-h-[56px] overflow-clip px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] rounded-[8px] w-full border-2 transition-all duration-200 ${hasError ? 'border-[#FF8484]' : isSuccess ? 'border-[#32D583]' : 'border-transparent focus:border-[#84CAFF]'}`;
    };

    const inputTextClass = "text-[color:var(--color-inverted,white)] placeholder:text-[color:var(--color-gray-inverted,#a1a1a1)] placeholder:opacity-70 focus:outline-none";

    return (
        <div className="min-h-screen bg-[var(--background,#ffffff)] text-[var(--foreground,#000000)]">
            <Script src="https://js.paystack.co/v2/inline.js" strategy="afterInteractive" />
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
                                    Get Your
                                    <span className="block font-bold">{passName} Pass</span>
                                </h2>

                                <div className="flex flex-col font-cabinet-grotesk justify-end leading-[1.4] text-colors-inverted shrink-0 mb-1">
                                    <p className="font-bold text-[16px]">5TH - 7TH NOV. | 2026</p>
                                    <p className="font-bold text-[16px]">BENIN CITY, EDO STATE</p>
                                </div>
                            </div>                              
                        </div>

                        <div className="w-full max-w-[1080px] grid grid-cols-1 gap-[24px] md:grid-cols-2">
                            {/* Email */}
                            <div className="flex flex-col w-full md:col-span-2">
                                <label className="text-sm text-inverted mb-2 font-bold ml-1">Email Address *</label>
                                <div className="relative w-full">
                                    <input 
                                        name="email" 
                                        type="email" 
                                        required 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        placeholder="your@email.com" 
                                        className={`${getFieldClass(!!errors.email || (isRegistered === false && !isValidatingEmail), isRegistered === true)} ${inputTextClass} pr-12`} 
                                    />
                                </div>
                                {isRegistered === false && !isValidatingEmail && (
                                    <span className="text-[#FF8484] text-sm mt-1 ml-1 block">
                                        Please <Link href="/register" className="underline hover:text-[#ffd1d1]">register</Link> first to use our ticketing system
                                    </span>
                                )}
                                {isRegistered === true && (
                                    <span className="text-[#32D583] text-sm mt-1 ml-1 block">✓ Email is registered</span>
                                )}
                                {errors.email && <span className="text-[#FF8484] text-sm mt-1 ml-1 block">{errors.email}</span>}
                            </div>

                            {/* Name */}
                            <div className="flex flex-col w-full">
                                <label className="text-sm text-inverted mb-2 font-bold ml-1">Full Name *</label>
                                <input 
                                    name="name" 
                                    type="text" 
                                    required 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="John Doe" 
                                    className={`${getFieldClass(!!errors.name)} ${inputTextClass}`} 
                                />
                                {errors.name && <span className="text-[#FF8484] text-sm mt-1 ml-1 block">{errors.name}</span>}
                            </div>

                            {/* Quantity */}
                            <div className="flex flex-col w-full">
                                <label className="text-sm text-inverted mb-2 font-bold ml-1">Number of Tickets *</label>
                                <div className="flex items-center gap-4 h-[56px]">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="h-full px-6 bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))] rounded-[8px] text-[color:var(--color-inverted,white)] font-bold hover:bg-[var(--color-trans-20-inverted,rgba(255,255,255,0.2))] transition-colors"
                                    >
                                        −
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        className={`flex-1 text-center h-full ${getFieldClass(!!errors.quantity)} ${inputTextClass}`}
                                        min="1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="h-full px-6 bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))] rounded-[8px] text-[color:var(--color-inverted,white)] font-bold hover:bg-[var(--color-trans-20-inverted,rgba(255,255,255,0.2))] transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                {errors.quantity && <span className="text-[#FF8484] text-sm mt-1 ml-1 block">{errors.quantity}</span>}
                            </div>

                            {/* Coupon Code */}
                            <div className="flex flex-col w-full md:col-span-2 mt-4">
                                <label className="text-sm text-inverted mb-2 font-bold ml-1">Discount Coupon (Optional)</label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        placeholder="Enter coupon code"
                                        disabled={!isRegistered}
                                        className={`flex-1 ${getFieldClass(!!errors.coupon, couponValidation?.valid)} ${inputTextClass} ${!isRegistered ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={applyCoupon}
                                        disabled={!isRegistered || !couponCode || isValidatingCoupon || isProcessing}
                                        className="px-8 bg-[var(--static-blue,#1570ef)] text-[color:var(--static-white,white)] rounded-[8px] font-['Bricolage_Grotesque:Medium'] font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-[-0.4px]"
                                    >
                                        {isValidatingCoupon ? "..." : "Apply"}
                                    </button>
                                </div>
                                {errors.coupon && <span className="text-[#FF8484] text-sm mt-1 ml-1 block">{errors.coupon}</span>}
                                {couponValidation?.valid && (
                                    <span className="text-[#32D583] text-sm mt-1 ml-1 block">✓ {couponValidation.message}</span>
                                )}
                            </div>

                            {/* Price Breakdown */}
                            <div className="md:col-span-2 bg-[var(--color-trans-10-inverted,rgba(255,255,255,0.1))] rounded-[16px] p-6 space-y-4 mt-4 text-[color:var(--color-inverted,white)] border border-[color:var(--color-trans-20-inverted,rgba(255,255,255,0.2))]">
                                <div className="flex justify-between text-lg">
                                    <span className="opacity-80">
                                        {passName} × {quantity}
                                    </span>
                                    <span className="font-semibold">{formatPrice(totalPrice)}</span>
                                </div>

                                {savings > 0 && (
                                    <div className="flex justify-between text-lg text-[#32D583]">
                                        <span>Discount</span>
                                        <span className="font-semibold">−{formatPrice(savings)}</span>
                                    </div>
                                )}

                                <div className="border-t border-[color:var(--color-trans-20-inverted,rgba(255,255,255,0.2))] pt-4 flex justify-between mt-4">
                                    <span className="font-bold text-xl">Total</span>
                                    <span className="font-bold text-2xl">{formatPrice(finalPrice)}</span>
                                </div>
                            </div>

                            {errors.payment && (
                                <div className="md:col-span-2 rounded-lg border border-[#FF8484] bg-[rgba(255,132,132,0.1)] px-4 py-3 text-sm text-[#FF8484]">
                                    {errors.payment}
                                </div>
                            )}

                            {/* Payment Button */}
                            <div className="md:col-span-2 flex flex-col items-start gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={handlePayment}
                                    disabled={isProcessing || !isRegistered || !name.trim() || quantity <= 0}
                                    aria-busy={isProcessing}
                                    aria-live="polite"
                                    className="bg-[var(--static-blue,#1570ef)] cursor-pointer content-stretch flex gap-[8px] items-center justify-center justify-self-stretch px-[var(--button-x-pad,24px)] py-[var(--button-y-pad-sm,16px)] relative rounded-[1000px] self-start shrink-0 text-[color:var(--static-white,white)] font-['Bricolage_Grotesque:Medium'] font-medium text-[length:var(--button-label-sm,20px)] uppercase tracking-[-0.4px] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="sr-only">Processing payment...</span>
                                            <Spinner size="24" color="white" />
                                        </>
                                    ) : `Pay ${formatPrice(finalPrice)} with Paystack`}
                                </button>
                                <p className="text-sm text-[color:var(--color-gray-inverted,#a1a1a1)] opacity-70">
                                    Secure payment powered by Paystack
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <ConfirmationModal isOpen={isSuccessModalOpen} onClose={() => {
                setIsSuccessModalOpen(false);
                router.push('/');
            }} />
            
            {isValidatingEmail && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
                    <div className="flex flex-col items-center gap-4 p-8 bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl max-w-sm w-full mx-4 text-center">
                        <Spinner size="48" color="white" />
                        <p className="text-lg font-medium text-white animate-pulse min-h-[28px] transition-opacity duration-300">
                           {LOADING_PHRASES[loadingPhraseIndex]}
                        </p>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    );
}

export default function BuyTicketPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[var(--background,#ffffff)] text-[var(--foreground,#000000)]"></div>}>
            <BuyTicketContent />
        </Suspense>
    );
}
