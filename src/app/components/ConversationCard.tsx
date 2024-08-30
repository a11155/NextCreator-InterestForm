import React from 'react';
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ConversationCardProps {
    profilePicture: string;
    chatName: string;
    newMessage: boolean;
    onSelect: () => void;
}

const ConversationCard: React.FC<ConversationCardProps> = ({ profilePicture, chatName, newMessage }) => {
    return (
        <Card className="flex items-center p-0 mb-2">
            <Button variant="ghost" className="flex-1 w-full h-full p-4">
                <div className="flex items-center space-x-4">
                    <Image src={profilePicture} alt={`${chatName} chat's profile picture`} width={40} height={40} className="rounded-full" />
                    <div>
                        {chatName}
                    </div>
                </div>
                <div className="ml-auto">
                    {newMessage && (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                </div>
            </Button>
        </Card>
    );
};

export default ConversationCard;
