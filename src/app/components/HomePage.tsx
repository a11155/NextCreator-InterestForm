"use client";

import { useEffect } from "react";
import Image from "next/image";
import Button from "../components/Button";
import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from '@clerk/nextjs';

const HomePage = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("div");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-[#0e042c] min-h-screen flex flex-col items-center text-white px-4">
      {/* Hero Section */}
      <div className="fade-in max-w-4xl w-full mx-auto py-20 flex flex-col md:flex-row items-center justify-between">
        <div className="text-left max-w-lg mb-10 md:mb-0">
          <h1 className="text-7xl font-bold leading-none mb-4">
            Create
            <br />
            Viral
            <br />
            Content.
          </h1>
          <p className="text-lg mb-8">
            Learn to master the <span className="font-bold">algorithm</span>
            <br />
            Reach your content <span className="font-bold">potential</span>
          </p>
          <SignUpButton mode="modal">
            <button className="text-[14px] inline-block bg-[#6875F5] hover:bg-[#5865F2] text-white font-bold py-1 px-4 rounded-full text-lg whitespace-nowrap px-[50px] py-5">
              Start Free
            </button>
          </SignUpButton>
        </div>
        <div className="relative w-[500px] h-[500px]">
          <Image
            src="/hero.png"
            alt="Decorative"
            priority
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="fade-in max-w-4xl w-full mx-auto mt-5">
        <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-center py-20 mt-20 rounded-2xl max-w-4xl">
          <h2 className="text-xl font-bold mb-4 text-black">Why Wait?</h2>
          <h1 className="text-6xl font-bold mb-6">You Are Next</h1>
          <SignUpButton mode="modal">
            <button className="text-[14px] inline-block bg-black hover:bg-[#5865F2] text-white font-bold py-1 px-4 rounded-full text-lg whitespace-nowrap">
              Start Free
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
