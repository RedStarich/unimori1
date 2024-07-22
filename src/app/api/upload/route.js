import { NextResponse } from 'next/server';
import s3 from '../../../../lib/aws';
import formidable from 'formidable-serverless';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(request, (err, fields, files) => {
      if (err) {
        return reject(NextResponse.json({ error: 'Error parsing the file' }, { status: 500 }));
      }

      const file = files.file;
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file.name,
        Body: file,
        ContentType: file.type,
      };

      s3.upload(params, (err, data) => {
        if (err) {
          return reject(NextResponse.json({ error: 'Error uploading file' }, { status: 500 }));
        }
        resolve(NextResponse.json({ data }));
      });
    });
  });
}
