import React from 'react';

const AppFeaturesSection = () => {
  return (
    <section className="py-10 bg-[var(--brand-beige)]">
      <div className="container mx-auto">
        <div className="bg-[var(--brand-green)] text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-4">Satisfacción del cliente</h2>
          <p className="text-center text-lg mb-6">Siempre pensamos en tu seguridad y comodidad</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <img
                src="/images/chat-en-linea.png"
                alt="Chat en línea"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Chat en línea</h3>
              <p className="text-white">Escríbenos y déjanos saber tus inquietudes</p>
            </div>
            <div className="text-center">
              <img
                src="/images/envio-gratis.png"
                alt="Envío Gratis"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Envío Gratis</h3>
              <p className="text-white">Si tus compras superan $300.000 el envío corre por nuestra cuenta</p>
            </div>
            <div className="text-center">
              <img
                src="/images/compra-segura.png"
                alt="Compra Segura"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">Compra Segura</h3>
              <p className="text-white">Compra sin preocuparte, nuestra pasarela de pagos es 100% segura</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeaturesSection;
