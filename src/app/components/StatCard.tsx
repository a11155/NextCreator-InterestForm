import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const StatCard = ({ title, value }: { title: string, value: string }) => {
  return (
    <Card className="bg-white text-[#808CFC] rounded-lg flex flex-col items-center text-center shadow-md p-3">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-2xl">{value}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
