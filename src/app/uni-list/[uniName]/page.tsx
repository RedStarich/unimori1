"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Header from '../../components/HeaderLanding';
import { FaPaperPlane } from 'react-icons/fa';

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
      console.log('Submitting question:', question);
      const response = await axios.post('/api/gemini/route', { question, uniName: university?.name });
      console.log('Response from Gemini:', response.data);
      setAnswer(response.data.answer);
    } catch (err) {
      console.error('Error occurred:', err);
      setError('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  if (!university) return <div><Loader /></div>;

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="px-6 mt-10 py-6 flex items-center">
          <div className="w-24 h-24 mr-6">
            <Image
              src={university.logo_url || '/university_image.png'}
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
        <div className="mt-0 px-6">
          <div className="">
            <div className="flex sm:flex-row items-center ">
              <div className="mr-0 sm:mr-4 mb-4 sm:mb-0 flex-shrink-0">
                <Image
                  src="/images/GraduationDog.png"
                  alt= "Graduation Dog"
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
        <div className="mt-6"></div>
        <section id="about" className="relative py-20 bg-cover bg-center" style={{ backgroundImage: 'url(/images/background-about.png)' }}>
          <div className="mt-6 px-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold">Details</h2>
              <ul className="mt-2 space-y-1">
                <li><strong>Год основания:</strong> {university.established_year}</li>
                <li><strong>Тип:</strong> {university.type}</li>
                <li><strong>Рейтинг:</strong> {university.ranking}</li>
                <li><strong>Acceptance Rate:</strong> {university.acceptance_rate}%</li>
                <li><strong>Средняя стоимость обучения:</strong> ${university.tuition_fees}</li>
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
        </section>
        <div className="mt-6 p-6">
          <h2 className="text-2xl font-bold mb-4">Спросить у Сиба Юни о {university.name}</h2>
          <p className="text-lg mb-4">Я могу помочь тебе с подбором университета!</p>
          <form onSubmit={handleFormSubmit} className="mb-4 flex items-center w-full">
            <input
              type="text"
              placeholder="Написать сообщение"
              value={question}
              onChange={handleQuestionChange}
              className="p-2 border border-gray-300 rounded-l w-full h-10"
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded-r flex items-center justify-center h-10">
              Отправить
            </button>
          </form>
          <div className="flex md:flex-row flex-col mt-6 p-6 bg-white rounded-lg shadow-md items-start">
            <div className="mr-4 flex-shrink-0 flex-row">
              <Image
                src="/images/LaptopDog.png"
                alt="Laptop Dog"
                width={100}
                height={100}
                className="object-cover rounded-full"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Ответ от <span className="text-orange-500">Юни</span></h3>
              <div className="p-4 border border-gray-300 rounded">
                {loading && <div><Loader /></div>}
                {error && <div className="text-red-500">{error}</div>}
                {answer ? (
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-4" {...props} />,
                      h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold my-3" {...props} />,
                      h3: ({ node, ...props }) => <h3 className="text-xl font-semibold my-2" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc list-inside ml-4 my-2" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal list-inside ml-4 my-2" {...props} />,
                      li: ({ node, ...props }) => <li className="my-1" {...props} />,
                      p: ({ node, ...props }) => <p className="my-2 break-words" {...props} />,
                      a: ({ node, ...props }) => <a className="text-blue-500 underline break-all" {...props} />,
                      blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props} />,
                      code: ({ node, ...props }) => <code className="bg-gray-100 rounded p-1 text-red-500 break-words" {...props} />
                    }}
                  >
                    {answer}
                  </ReactMarkdown>
                ) : (
                  <p className="text-gray-500">Заполните форму</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityPage;
