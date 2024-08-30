"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import ProfileLink from "./ProfileLink";
import {
  SignInButton,
  SignUpButton,
  useUser,
} from '@clerk/nextjs';


type NavLink = {
    name: string;
    href: string;
};

const Header = (props:any) => {
  const navLinks : NavLink[] = props.navLinks;
  const pathName = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-[#0e042c] fixed top-0 w-full z-50 px-8 py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center text-2xl">
          <Link href="/" className="flex items-center text-[#808cfb] no-underline cursor-pointer">
            <Image src="/logo.png" width={120} height={68} alt="NextCreator Logo" className="w-8 h-auto" />
            <span className="ml-2 font-bold">NextCreator</span>
          </Link>
        </div>
        <div className="flex items-center text-lg">
          <button className="md:hidden text-[#808cfb]" onClick={toggleMenu}>
            &#9776;
          </button>
          <nav className={`fixed top-0 right-0 h-full w-2/3 bg-[#0e042c] z-50 transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform md:static md:transform-none md:flex md:items-center md:space-x-4`}>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-1 space-y-4 md:space-y-0 mt-20 md:mt-0">
              {navLinks.map((link) => {
                const isDashboardLink = link.name === "Dashboard";
                const shouldRenderLink = !isDashboardLink || (isDashboardLink && isSignedIn);

                if (!shouldRenderLink) return null;

                const isActive = pathName.startsWith(link.href);
                return (
                  <NavLink
                    href={link.href}
                    key={link.name}
                    className={isActive ? "font-bold text-white text-[16px]" : "text-[16px] text-[#808cfb] hover:text-sky-400"}
                  >
                    {link.name}
                  </NavLink>
                );
              })}
              {!isSignedIn && (
                <>
                  <SignUpButton mode="modal">
                    <button className="text-[14px] inline-block bg-[#6875F5] hover:bg-[#5865F2] text-white font-bold py-1 px-4 rounded-full text-lg whitespace-nowrap">
                      Start Free
                    </button>
                  </SignUpButton>
                </>
              )}
              {isSignedIn && <ProfileLink />}
            </div>
          </nav>
        </div>
      </div>
      {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu}></div>}
    </header>
  );
};


export default Header;