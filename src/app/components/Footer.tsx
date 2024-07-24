import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="container mx-auto text-center">
        <nav className="mb-4">
          <Link href="#" className="ml-4">О нас</Link>
          <Link href="#" className="ml-4">Политика конфиденциальности</Link>
          <Link href="#" className="ml-4">Условия использования</Link>
          <Link href="#" className="ml-4">Контакты</Link>
        </nav>
        <div className="mb-4">
          <a href="#" className="mx-2">Facebook</a>
          <a href="#" className="mx-2">Twitter</a>
          <a href="#" className="mx-2">Instagram</a>
          <a href="#" className="mx-2">LinkedIn</a>
        </div>
        <p>Email: support@unimori.ai</p>
      </div>
    </footer>
  );
};

export default Footer;
