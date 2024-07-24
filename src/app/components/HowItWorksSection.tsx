const HowItWorksSection = () => {
    return (
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Как это работает</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Зарегистрируйтесь</h3>
              <p>Создайте учетную запись на Unimori.ai.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Выберите университет</h3>
              <p>Найдите ваш университет в нашей базе данных.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Исследуйте ресурсы</h3>
              <p>Получите доступ ко всей необходимой информации.</p>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Оставайтесь на связи</h3>
              <p>Общайтесь с другими студентами и делитесь опытом.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorksSection;
  