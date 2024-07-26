'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Header from '../../components/HeaderLanding';

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
  alternate_names: string[];
}

const Loader: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <img src="https://media1.tenor.com/m/OWI_ai132b0AAAAC/wink-dog.gif" alt="Loading..." />
  </div>
);

const UniversityPage: React.FC = () => {
  const params = useParams();
  const uniName = params?.uniName as string;
  const [university, setUniversity] = useState<University | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (uniName) {
      fetch('/api/universities/route')
        .then(response => response.json())
        .then(data => {
          const foundUniversity = data.universities.find((uni: University) => uni.name === decodeURIComponent(uniName));
          setUniversity(foundUniversity || null);
        });
    }
  }, [uniName]);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/gemini/route', { question, uniName: university?.name });
      setAnswer(response.data.answer);
    } catch (err) {
      setError('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  if (!university) return <div><Loader /></div>;

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="w-24 h-24 mr-6">
            <Image
              src={university.logo_url || '/university_image.png'} // Use the new image here
              alt={`${university.name} logo`}
              width={96}
              height={96}
              className="object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{university.name}</h1>
            <p className="text-gray-600 py-3">{university.location}</p>
            <a href={university.website_url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Перейти на официальный сайт</a>
          </div>
        </div>
        <div className="mt-16">
          <div className="mt-6">
            <div className="flex sm:flex-row items-center ">
              <div className="mr-0 sm:mr-4 mb-4 sm:mb-0 flex-shrink-0">
                <Image
                  src="/images/GraduationDog.png"
                  alt="Graduation Dog"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Описание университета</h2>
                
              </div>
            </div>
            <p className="text-lg">{university.description}</p>
          </div>
        </div>
        <div className="mt-6">
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold">Details</h2>
            <ul className="mt-2 space-y-1">
              <li><strong>Established Year:</strong> {university.established_year}</li>
              <li><strong>Type:</strong> {university.type}</li>
              <li><strong>Ranking:</strong> {university.ranking}</li>
              <li><strong>Tuition Fees:</strong> ${university.tuition_fees}</li>
              <li><strong>Acceptance Rate:</strong> {university.acceptance_rate}%</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <ul className="mt-2 space-y-1">
              <li><strong>Email:</strong> <a href={`mailto:${university.contact_email}`} className="text-blue-500 hover:underline">{university.contact_email}</a></li>
              <li><strong>Phone:</strong> {university.contact_phone}</li>
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Chat with GPT about {university.name}</h2>
          <form onSubmit={handleFormSubmit} className="mb-4">
            <input
              type="text"
              placeholder={`Ask a question about ${university.name}...`}
              value={question}
              onChange={handleQuestionChange}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Ask</button>
          </form>
          {loading && <div><Loader /></div>}
          {error && <div className="text-red-500">{error}</div>}
          {answer && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Answer:</h3>
              <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityPage;
