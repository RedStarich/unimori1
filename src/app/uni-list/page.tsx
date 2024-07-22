'use client';

import UniversitiesList from '../components/UniversitiesList';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="p-6">
        <UniversitiesList />
      </main>
    </div>
  );
};

export default Home;
