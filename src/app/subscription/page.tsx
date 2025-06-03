"use client";

import React from "react";

import { useEffect, useState } from "react";

export default function Subscription() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">

      {/* Hero Section */}
      <section
        className="relative py-20 px-6 text-center"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Descubre tu ritual aromático mensual
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Velas artesanales personalizadas según tus emociones
          </p>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Planes de Suscripción</h3>
          <div className="grid md:grid-cols-3 gap-8">

            {/* Plan Esencial */}
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Plan Esencial</h4>
                <p className="text-3xl font-bold text-gray-900">
                  $29.99 <span className="text-lg font-normal text-gray-600">/mes</span>
                </p>
              </div>
              <div className="px-6 pb-6 space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#B49C82] rounded-full"></span>
                  <span>1 vela artesanal mensual</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#B49C82] rounded-full"></span>
                  <span>Personalización básica</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#B49C82] rounded-full"></span>
                  <span>Envío gratis</span>
                </div>
              </div>
              <div className="p-6">
                <button className="w-full bg-[#B49C82] hover:bg-[#9C8366] text-white py-2 px-4 rounded transition">
                  Seleccionar Plan
                </button>
              </div>
            </div>

            {/* Plan Premium (Highlighted) */}
            <div className="relative bg-[#B49C82] shadow-xl hover:shadow-2xl border-2 border-[#9C8366] transform scale-105 rounded-lg overflow-hidden min-h-[400px]">
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-white mb-2">Plan Premium</h4>
                <p className="text-3xl font-bold text-white">
                  $49.99 <span className="text-lg font-normal text-white">/mes</span>
                </p>
              </div>
              <div className="px-6 pb-6 space-y-2 text-white">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span>2 velas artesanales mensuales</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span>Personalización avanzada</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span>Contenido exclusivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span>Envío prioritario</span>
                </div>
              </div>
              <div className="p-6">
                <button className="w-full bg-white hover:bg-gray-50 text-[#B49C82] border border-[#B49C82] py-2 px-4 rounded transition">
                  Seleccionar Plan
                </button>
              </div>
            </div>

            {/* Plan Exclusivo */}
            <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Plan Exclusivo</h4>
                <p className="text-3xl font-bold text-gray-900">
                  $79.99 <span className="text-lg font-normal text-gray-600">/mes</span>
                </p>
              </div>
              <div className="px-6 pb-6 space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#B49C82] rounded-full"></span>
                  <span>3 velas artesanales mensuales</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#B49C82] rounded-full"></span>
                  <span>Personalización premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#B49C82] rounded-full"></span>
                  <span>Acceso VIP a eventos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#B49C82] rounded-full"></span>
                  <span>Regalo sorpresa mensual</span>
                </div>
              </div>
              <div className="p-6">
                <button className="w-full bg-[#B49C82] hover:bg-[#9C8366] text-white py-2 px-4 rounded transition">
                  Seleccionar Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Beneficios</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F5F2EE] rounded-full flex items-center justify-center mx-auto mb-4">
                🌿
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Personalización IA</h4>
              <p className="text-gray-600">
                Velas diseñadas según tus preferencias y estado de ánimo
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F5F2EE] rounded-full flex items-center justify-center mx-auto mb-4">
                ❤️
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Experiencia Sensorial</h4>
              <p className="text-gray-600">
                Fragancias exclusivas creadas por expertos aromáticos
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F5F2EE] rounded-full flex items-center justify-center mx-auto mb-4">
                🎵
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Contenido Exclusivo</h4>
              <p className="text-gray-600">
                Acceso a playlists y contenido inspiracional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Preguntas Frecuentes</h3>
          <div className="space-y-4">

            {/* FAQ Item 1 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleAccordion("item-1")}
                className="w-full px-6 py-4 text-left font-semibold text-gray-900 flex justify-between items-center"
              >
                ¿Cómo funciona la suscripción?
                <span>{openItem === "item-1" ? "−" : "+"}</span>
              </button>
              {openItem === "item-1" && (
                <div className="px-6 pb-4 text-gray-600">
                  Recibirás mensualmente velas personalizadas según tus preferencias.
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleAccordion("item-2")}
                className="w-full px-6 py-4 text-left font-semibold text-gray-900 flex justify-between items-center"
              >
                ¿Puedo cancelar en cualquier momento?
                <span>{openItem === "item-2" ? "−" : "+"}</span>
              </button>
              {openItem === "item-2" && (
                <div className="px-6 pb-4 text-gray-600">
                  Sí, puedes cancelar tu suscripción cuando lo desees sin compromiso.
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => toggleAccordion("item-3")}
                className="w-full px-6 py-4 text-left font-semibold text-gray-900 flex justify-between items-center"
              >
                ¿Cuándo recibiré mi pedido?
                <span>{openItem === "item-3" ? "−" : "+"}</span>
              </button>
              {openItem === "item-3" && (
                <div className="px-6 pb-4 text-gray-600">
                  Los envíos se realizan los primeros días de cada mes.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}