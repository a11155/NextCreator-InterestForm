"use client"

import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UserSelectedDisplay from './UserSelectedDisplay';
import { createRoot } from 'react-dom/client';

interface UserCardProps {
    profilePicture: string;
    username: string;
    id: string;
}

const UserCard: React.FC<UserCardProps> = ({ profilePicture, username, id }) => {
    function onSelect(event: React.MouseEvent<HTMLButtonElement>) {
        const self = event.currentTarget as HTMLElement

        if (self.textContent === "Deselect") {
            const selectedUserDisplay = document.getElementById("display-id-" + username);
            selectedUserDisplay?.remove();
            self.textContent = "Select";
        }else{
            const selectedUsersArea = document.getElementById("selected-users");
            const userSelectedDisplay = <UserSelectedDisplay username={username} id={"display-id-" + username}/>;
            const userSelectedDisplayNode = document.createElement('div');
            const root = createRoot(userSelectedDisplayNode);
            root.render(userSelectedDisplay);
            selectedUsersArea?.appendChild(userSelectedDisplayNode);
    
            self.textContent = "Deselect";
        }
    }

    return (
        <Card className="flex items-center p-4">
            <div className="flex items-center space-x-4">
                <Image src={profilePicture} alt={`${username}'s profile picture`} width={40} height={40} className="rounded-full border" />
                <div>
                    {username}
                </div>
            </div>
            <div className="ml-auto">
                <Button onClick={onSelect} id={"button-id-" + username}>Select</Button>
            </div>
        </Card>
    );
};

export default UserCard;
