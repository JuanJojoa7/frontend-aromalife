import React from 'react';

const GoogleReviewsSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">EXCELENTE</h2>
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <img key={i} src="/images/star_filled.svg" alt="Estrella" className="w-6 h-6 mx-1" />
          ))}
        </div>
        <p className="text-gray-600 mb-4">A base de 217 reseñas</p>
        <img src="/images/google_logo_large.svg" alt="Google" className="mx-auto mb-8 w-32" />

        <div className="flex justify-center gap-6">
          {/* Review Card 1 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md w-80 transform transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src="/images/nancy_perez_avatar.png" alt="Nancy Perez" className="w-10 h-10 rounded-full mr-3" />
                <span className="font-bold">Nancy Perez</span>
              </div>
              <img src="/images/google_logo_small.svg" alt="Google Review" className="w-6 h-6" />
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <img key={i} src="/images/star_filled.svg" alt="Estrella" className="w-5 h-5 mx-0.5" />
              ))}
              <div className="relative group">
                <img src="/images/verified_checkmark.svg" alt="Verificado" className="w-5 h-5 ml-2" />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg w-64">
                  <p className="font-semibold mb-1">Trustindex</p>
                  <p>Verifica que la fuente original de la reseña sea Google.</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600">Excelente servicio y puntualidad</p>
          </div>

          {/* Review Card 2 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md w-80 transform transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src="/images/carolina_garcia_avatar.png" alt="Carolina Garcia Mafla" className="w-10 h-10 rounded-full mr-3" />
                <span className="font-bold">Carolina Garcia Mafla</span>
              </div>
              <img src="/images/google_logo_small.svg" alt="Google Review" className="w-6 h-6" />
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <img key={i} src="/images/star_filled.svg" alt="Estrella" className="w-5 h-5 mx-0.5" />
              ))}
              <div className="relative group">
                <img src="/images/verified_checkmark.svg" alt="Verificado" className="w-5 h-5 ml-2" />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg w-64">
                  <p className="font-semibold mb-1">Trustindex</p>
                  <p>Verifica que la fuente original de la reseña sea Google.</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600">Súper recomendadisimo !! La atención a cada detalle y asesoría fueron excelentes y las velas divinas!! Mi pedido fue de velas para Baby Shower...</p>
          </div>

          {/* Review Card 3 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md w-80 transform transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src="/images/jose_rubio_avatar.png" alt="Jose Rubio" className="w-10 h-10 rounded-full mr-3" />
                <span className="font-bold">Jose Rubio</span>
              </div>
              <img src="/images/google_logo_small.svg" alt="Google Review" className="w-6 h-6" />
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <img key={i} src="/images/star_filled.svg" alt="Estrella" className="w-5 h-5 mx-0.5" />
              ))}
              <div className="relative group">
                <img src="/images/verified_checkmark.svg" alt="Verificado" className="w-5 h-5 ml-2" />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg w-64">
                  <p className="font-semibold mb-1">Trustindex</p>
                  <p>Verifica que la fuente original de la reseña sea Google.</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600">Muy agradecido con la compra, el producto llegó igual como lo habíamos solicitado y en el tiempo estimado, gracias Dios los bendiga.</p>
          </div>

          {/* Review Card 4 */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md w-80 transform transition-transform hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src="/images/monica_alfonso_avatar.png" alt="Monica Alfonso Buitrago" className="w-10 h-10 rounded-full mr-3" />
                <span className="font-bold">Monica Alfonso Buitrago</span>
              </div>
              <img src="/images/google_logo_small.svg" alt="Google Review" className="w-6 h-6" />
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <img key={i} src="/images/star_filled.svg" alt="Estrella" className="w-5 h-5 mx-0.5" />
              ))}
              <div className="relative group">
                <img src="/images/verified_checkmark.svg" alt="Verificado" className="w-5 h-5 ml-2" />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg w-64">
                  <p className="font-semibold mb-1">Trustindex</p>
                  <p>Verifica que la fuente original de la reseña sea Google.</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600">Que buen servicio que recibí de parte de ustedes, muy buena atención al cliente, un producto de mucha calidad, en tiempo y ajustado en su precio. Mil gracias por todo.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
