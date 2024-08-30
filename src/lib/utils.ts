import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from "@clerk/nextjs/server";




export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getSocialMediaIcon = (link: string): string => {
    const lowerCaseLink = link.toLowerCase();

    if (lowerCaseLink.includes('youtube.com') || lowerCaseLink.includes('youtu.be')) {
        return '/Youtube.png';
    } else if (lowerCaseLink.includes('tiktok.com')) {
        return '/TikTok.png';
    } else if (lowerCaseLink.includes('instagram.com')) {
        return '/Instagram.png';
    } else if (lowerCaseLink.includes('twitter.com') || lowerCaseLink.includes('x.com')) {
        return '/Twitter.png';
    } else {
        return '/default-icon.png';
    }
}