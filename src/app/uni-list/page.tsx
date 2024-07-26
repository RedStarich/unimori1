'use client';

import UniversitiesList from '../components/UniversitiesList';
import Header from '../components/HeaderLanding';

const Home: React.FC = () => {
  return (
    <main>
      <Header/>
      <UniversitiesList />
    </main>
  );
};

export default Home;
