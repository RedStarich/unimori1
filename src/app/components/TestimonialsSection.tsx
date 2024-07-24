const TestimonialsSection = () => {
    return (
      <section id="testimonials" className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Отзывы наших пользователей</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="p-4 bg-white rounded shadow">
              <blockquote className="text-xl italic">"Unimori.ai значительно упростил мою жизнь в университете. Теперь я всегда в курсе всех событий и изменений в расписании."</blockquote>
              <p className="mt-4">– Анна, студентка КБТУ</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <blockquote className="text-xl italic">"Благодаря Unimori.ai я нашел все необходимые материалы для подготовки к экзаменам. Отличная платформа!"</blockquote>
              <p className="mt-4">– Ильяс, студент Назарбаев Университета</p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default TestimonialsSection;
  