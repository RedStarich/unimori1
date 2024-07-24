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
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Unimori.ai</h1>
        <nav>
          <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="ml-4 cursor-pointer">О нас</a>
          <a href="#features" onClick={(e) => handleScroll(e, 'features')} className="ml-4 cursor-pointer">Особенности</a>
          <a href="#how-it-works" onClick={(e) => handleScroll(e, 'how-it-works')} className="ml-4 cursor-pointer">Как это работает</a>
          <a href="#testimonials" onClick={(e) => handleScroll(e, 'testimonials')} className="ml-4 cursor-pointer">Отзывы</a>
          <a href="#join-us" onClick={(e) => handleScroll(e, 'join-us')} className="ml-4 cursor-pointer">Присоединяйтесь</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
