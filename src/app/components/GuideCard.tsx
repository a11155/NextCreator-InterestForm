import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from 'next/image';

const GuideCard = ({ title, description, time, imageSrc }: { title: string, description: string, time: string, imageSrc: string }) => {
  return (
    <Card className="bg-[#808CFC] text-white rounded-lg overflow-hidden shadow-md border-[#808CFC]">
      <Image src={imageSrc} alt={title} width={500} height={280} className="w-full h-56 object-cover" />
      <CardContent className="p-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <CardHeader className='p-0'>
              <CardTitle className="text-xl font-bold">{title}</CardTitle>
            </CardHeader>
            <p className="text-sm mb-2">{description}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-m bg-green-500 text-white py-1 px-6 rounded-lg mb-1">Free</span>
            <div className="flex items-center mt-2">
              <span className="text-sm mr-4">{time}</span>
              <span className="text-sm">🕑</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuideCard;
