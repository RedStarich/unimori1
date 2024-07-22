import { useEffect, useState } from 'react';

interface University {
  id: string;
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch('/api/universities');
        if (!res.ok) {
          throw new Error('Failed to fetch universities');
        }
        const data = await res.json();
        setUniversities(data.universities);
      } catch (err) {
        setError((err as any).message);
      }
    };

    fetchUniversities();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Universities in Kazakhstan</h2>
      <ul className="space-y-4">
        {universities.map(uni => (
          <li key={uni.id} className="bg-white shadow rounded p-4">
            <h3 className="text-xl font-semibold">{uni.name}</h3>
            <p className="text-gray-700">{uni.description}</p>
            <a
              href={uni.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 block"
            >
              Visit website
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UniversitiesList;
