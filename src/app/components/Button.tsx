import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Button component
 *
 * @param {string} href - The URL the button links to
 * @param {React.ReactNode} children - The content inside the button
 * @param {string} [className] - Additional class names for the button
 * @returns {JSX.Element} - The rendered button component
 */
const Button: React.FC<ButtonProps> = ({ href, children, className }) => {
  return (
    <Link href={href} className={`inline-block bg-[#6875F5] hover:bg-[#5865F2] text-white font-bold py-1 px-4 rounded-full text-lg whitespace-nowrap ${className}`}>
      {children}
    </Link>
  );
};

export default Button;
