require('dotenv').config();
import { NextResponse } from 'next/server';
import s3 from '../../../../lib/aws';

export async function GET() {
  console.log('S3_BUCKET_NAME:', process.env.S3_BUCKET_NAME); // Добавьте это для проверки
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: 'universities.json',
  };

  try {
    if (!params.Bucket) {
      throw new Error('Bucket name is not defined');
    }
    console.log(`Trying to fetch object from S3 with params: ${JSON.stringify(params)}`);
    const data = await s3.getObject(params).promise();
    const universities = JSON.parse(data.Body.toString('utf-8'));
    return NextResponse.json({ universities });
  } catch (err) {
    console.error('Error getting universities:', err);
    return NextResponse.json({ error: 'Error getting universities' }, { status: 500 });
  }
}
