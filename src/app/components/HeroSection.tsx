import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className="bg-hero-pattern bg-cover bg-center text-center text-black py-20">
            <h2 className="text-4xl font-bold mb-4">Unimori.ai – Ваша платформа для поддержки студентов</h2>
            <p className="text-xl mb-8">Найдите всю необходимую информацию о вашем университете в одном месте</p>
            <Link href='/uni-list'>
                <button className="bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold text-white">Найти информацию</button>
            </Link>
        </section>
    );
};

export default HeroSection;
