"use client";

import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { usePathname, useRouter } from 'next/navigation';


const AppContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (isLoaded && isSignedIn && pathName === '/') {
      router.push('/InterestForm');
    }
  }, [isLoaded, isSignedIn, pathName, router]);

  return (
    <div className="text-white pt-24 flex-grow">
      {children}
    </div>
  );
};

export default AppContent;