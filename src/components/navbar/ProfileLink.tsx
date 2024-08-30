"use client"
import { useClerk } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUser } from '@clerk/clerk-react';



const ProfileLink = () => {
  const { user } = useUser();

  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/Profile');
  };
  const { signOut } = useClerk();

  return (
    <div className="relative cursor-pointer px-4 py-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <div className="w-10 h-10 rounded-full bg-[#808cfb] border-2 border-[#808cfb] flex justify-center items-center">
            <Image src="/profile.png" alt="Profile" width={40} height={40} className="rounded-full" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#6875F5] border-[#5867EF] text-white">
          <DropdownMenuLabel style={{ height: "52px" }}>
            <div className="w-10 h-10 rounded-full bg-[#808cfb] border-2 border-[#808cfb] flex justify-center items-center float-left mr-4">
              <Image src="/profile.png" alt="Profile" width={40} height={40} className="rounded-full float-left" />
            </div>
            <div className='float-left'> {user?.firstName} {user?.lastName}{/*display name implementation*/}
              <div className='font-normal'>{user?.username}</div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ redirectUrl: '/' })}>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileLink;