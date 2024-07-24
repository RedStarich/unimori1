import path from 'path';
import { promises as fs } from 'fs';

let cachedData = null;
let cacheTime = null;

export default async function handler(req, res) {
  const cacheDuration = 60 * 1000; // 1 minute
  const currentTime = Date.now();

  try {
    if (cachedData && cacheTime && (currentTime - cacheTime < cacheDuration)) {
      console.log('Serving from cache');
      return res.status(200).json({ universities: cachedData });
    }

    console.log('Reading from file');
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(path.join(jsonDirectory, 'universities.json'), 'utf8');
    const universities = JSON.parse(fileContents);

    cachedData = universities;
    cacheTime = currentTime;

    res.status(200).json({ universities });
  } catch (error) {
    console.error('Error reading universities.json:', error);
    res.status(500).json({ message: 'Failed to load universities data' });
  }
}
