import Head from 'next/head';
import Header from './components/HeaderLanding';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import JoinUsSection from './components/JoinUsSection';
import Footer from './components/Footer';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Unimori.ai</title>
        <meta name="description" content="Платформа для поддержки студентов" />
      </Head>
      <Header />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
      <JoinUsSection />
      <Footer />
    </div>
  );
};

export default Home;
