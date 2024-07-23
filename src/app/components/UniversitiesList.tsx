'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface University {
  _id: string; // Изменено на _id, так как MongoDB использует _id
  name: string;
  location: string;
  description: string;
  logo_url: string;
  website_url: string;
  established_year: number;
  type: string;
  ranking: number;
  tuition_fees: number;
  acceptance_rate: number;
  contact_email: string;
  contact_phone: string;
}

const UniversitiesList: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch('/api/universities');
        if (!res.ok) {
          throw new Error('Failed to fetch universities');
        }
        const data = await res.json();
        console.log('Fetched data:', data); // Добавьте лог для проверки данных
        if (data && Array.isArray(data.universities)) {
          setUniversities(data.universities);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError((err as any).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const filteredUniversities = universities.filter((uni) =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!universities.length) {
    return <div>No universities found.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Universities in Kazakhstan</h2>
      <input
        type="text"
        placeholder="Search universities..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <ul className="space-y-4">
        {filteredUniversities.map((uni) => (
          <li key={uni._id} className="bg-white shadow rounded p-4">
            <h3 className="text-xl font-semibold">{uni.name}</h3>
            <p className="text-gray-700">{uni.description}</p>
            <Link href={`/uni-list/${uni._id}`}>
              <p className="text-blue-500 hover:underline mt-2 block">
                Visit university page
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UniversitiesList;
