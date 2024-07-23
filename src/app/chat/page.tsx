import Head from 'next/head';
import ChatGPT from '../components/Chat';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Chat with GPT about KBTU</title>
      </Head>
      <main>
        <h1 className="text-3xl font-bold">Welcome to KBTU Info Chat</h1>
        <ChatGPT />
      </main>
    </div>
  );
};

export default Home;
