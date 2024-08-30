import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('your-database-name');

    const { name, email, description, ...socialMedia } = await request.json();

    // Basic validation
    if (!name || !email) {
      return NextResponse.json({ success: false, message: 'Name and Email are required.' }, { status: 400 });
    }

    const collection = db.collection('creatives');

    // Insert the form data into the MongoDB collection
    const result = await collection.insertOne({
      name,
      email,
      description,
      socialMedia,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Error saving data:', error);
    return NextResponse.json({ success: false, message: 'Failed to save data.' }, { status: 500 });
  }
}
