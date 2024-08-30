import { useUser, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && router.pathname === '/') {
      router.push('/InterestForm');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <p>Loading...</p>; // or any loading indicator
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="pt-24 flex-grow">
      <SignedIn>
        {children}
      </SignedIn>
    </div>
  );
};

export default MainContent;
