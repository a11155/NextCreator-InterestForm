import React from 'react';
import Link from 'next/link';

const NavLink = ({ href, children, className, onClick }: { href: string; children: React.ReactNode; className: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) => (
  <Link href={href} className={`${className} no-underline cursor-pointer px-4 py-2`} onClick={onClick}>
    {children}
  </Link>
);


export default NavLink;