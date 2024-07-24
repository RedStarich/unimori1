import Head from 'next/head';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import JoinUsSection from './components/JoinUsSection';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Unimori.ai</title>
        <meta name="description" content="Платформа для поддержки студентов" />
      </Head>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <JoinUsSection />
    </div>
  );
};

export default Home;
