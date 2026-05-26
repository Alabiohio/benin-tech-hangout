import Link from 'next/link';
import React from 'react';

interface ButtonProps {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'outline' | 'biro';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
    href, 
    onClick, 
    children, 
    variant = 'primary', 
    className = '',
    type = 'button',
    disabled = false
}) => {
    const baseStyles = "w-full sm:w-auto px-8 py-3 font-black font-oswald uppercase tracking-widest border-4 transition-all duration-300 hover:translate-y-1 hover:translate-x-1 text-center inline-block";
    
    const variants = {
        primary: "bg-highlight-yellow text-white border-highlight-yellow hover:bg-transparent hover:text-highlight-yellow shadow-[10px_10px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_rgba(15,23,42,1)]",
        outline: "bg-transparent border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white shadow-[10px_10px_0px_rgba(15,23,42,0.2)] hover:shadow-[4px_4px_0px_rgba(15,23,42,0.2)]",
        biro: "bg-biro-blue text-white border-biro-blue hover:bg-transparent hover:text-biro-blue shadow-[10px_10px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_rgba(15,23,42,1)]"
    };

    const disabledStyles = disabled ? "opacity-50 cursor-not-allowed hover:translate-y-0 hover:translate-x-0" : "";
    const combinedClasses = `${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={combinedClasses}>
            {children}
        </button>
    );
};

export default Button;
