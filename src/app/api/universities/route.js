import { getSignedUrl } from '../../../../lib/aws';

export async function GET(req) {
  const key = 'universities.json'; // Укажите путь к вашему файлу в S3, без префикса s3://
  const signedUrl = getSignedUrl(key);

  try {
    const response = await fetch(signedUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data from S3');
    }
    const data = await response.json();
    console.log('Data from S3:', data); // Лог данных из S3

    if (Array.isArray(data)) {
      return new Response(JSON.stringify({ universities: data }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      console.log('Invalid data format:', data);
      throw new Error('Invalid data format');
    }
  } catch (err) {
    console.error('Error fetching data:', err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
