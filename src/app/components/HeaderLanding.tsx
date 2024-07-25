'use client';

import React from 'react';

const Header = () => {
  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-600">Unimori.ai</h1>
        <nav>
          <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="ml-4 cursor-pointer text-gray-700">О нас</a>
          <a href="#features" onClick={(e) => handleScroll(e, 'features')} className="ml-4 cursor-pointer text-gray-700">Особенности</a>
          <a href="#how-it-works" onClick={(e) => handleScroll(e, 'how-it-works')} className="ml-4 cursor-pointer text-gray-700">Как это работает</a>
          <a href="#join-us" onClick={(e) => handleScroll(e, 'join-us')} className="ml-4 cursor-pointer text-gray-700">Присоединяйтесь</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
