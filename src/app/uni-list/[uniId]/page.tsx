'use client';
import { useParams } from 'next/navigation';

const UniDetail: React.FC = () => {
  const params = useParams() as { uniId: string };  // Type assertion
  const { uniId } = params;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">University Details for {uniId}</h1>
      <p>Details about university {uniId} go here.</p>
    </div>
  );
}

export default UniDetail;
