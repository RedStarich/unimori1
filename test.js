require('dotenv').config();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const params = {
  Bucket: process.env.S3_BUCKET_NAME,
  Key: 'universities.json',
};

s3.getObject(params, (err, data) => {
  if (err) {
    console.error('Error getting universities:', err);
  } else {
    const universities = JSON.parse(data.Body.toString('utf-8'));
    console.log('Universities:', universities);
  }
});
