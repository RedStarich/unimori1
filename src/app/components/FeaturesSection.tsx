const FeaturesSection = () => {
    return (
      <section id="features" className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Что мы предлагаем</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Полная база данных университетов</h3>
              <p>Получите доступ к информации о всех университетах в вашем регионе.</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Расписание занятий</h3>
              <p>Легко находите и следите за своим расписанием.</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Мероприятия и события</h3>
              <p>Будьте в курсе всех университетских мероприятий и событий.</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Ресурсы и материалы</h3>
              <p>Найдите учебные материалы и ресурсы, необходимые для успешной учебы.</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <h3 className="text-xl font-semibold mb-2">Поддержка сообщества</h3>
              <p>Общайтесь и сотрудничайте с другими студентами через нашу платформу.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default FeaturesSection;
  