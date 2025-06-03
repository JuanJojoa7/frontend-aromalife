import React from 'react';

const SpecialOccasionRecommendations = () => {
  return (
    <section className="py-10 bg-[var(--brand-beige)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <div className="relative w-3/4 mx-auto h-[28rem] md:h-[32rem] overflow-hidden rounded-lg shadow-lg">
            {/* Slider for images */}
            <div className="slider-wrapper flex transition-transform duration-[16s] ease-in-out">
              <div className="w-full flex-shrink-0">
                <img
                  src="/images/matrimonio.png"
                  alt="Matrimonio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full flex-shrink-0">
                <img
                  src="/images/dia-padre.png"
                  alt="Día del Padre"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full flex-shrink-0">
                <img
                  src="/images/dia-madre.png"
                  alt="Día de la Madre"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full flex-shrink-0">
                <img
                  src="/images/recuerdos.png"
                  alt="Recuerdos"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-10">
          <h2 className="text-3xl font-bold mb-4">
            Enmarca tus recuerdos con una fragancia
          </h2>
          <p className="text-lg text-[var(--text-gray-600)] mb-6">
            Velas para todos esos momentos especiales que deseas que perduren por
            siempre.
          </p>
          <button
            className="btn-primary mb-4"
            onClick={() => (window.location.href = "/personalize")}
          >
            QUIERO MI VELA PERSONALIZADA
          </button>
          <ul className="list-disc pl-5 text-[var(--text-gray-600)]">
            <li>Fechas especiales</li>
            <li>Día de la madre</li>
            <li>Amor y amistad</li>
            <li>Cumpleaños</li>
            <li>Navidad</li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .slider-wrapper {
          display: flex;
          animation: slide 16s infinite;
        }

        @keyframes slide {
          0%,
          20% {
            transform: translateX(0);
          }
          25%,
          45% {
            transform: translateX(-100%);
          }
          50%,
          70% {
            transform: translateX(-200%);
          }
          75%,
          95% {
            transform: translateX(-300%);
          }
        }
      `}</style>
    </section>
  );
};

export default SpecialOccasionRecommendations;
