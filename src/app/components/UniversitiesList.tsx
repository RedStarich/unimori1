'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';

interface University {
  _id: string;
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
  alternate_names?: string[];
}

const UniversitiesList: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch('/api/universities/route');
        if (!res.ok) {
          throw new Error('Failed to fetch universities');
        }
        const data = await res.json();
        if (data && Array.isArray(data.universities)) {
          setUniversities(data.universities);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const filteredUniversities = useMemo(() =>
    universities.filter((uni) =>
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (uni.alternate_names && uni.alternate_names.some(name => name.toLowerCase().includes(searchQuery.toLowerCase())))
    ), [universities, searchQuery]);

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
            <Link href={`/uni-list/${encodeURIComponent(uni.name)}`}>
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
