"use client";

import React from "react";
import { useRouter } from 'next/navigation';

export default function ReturnsPage() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto bg-[var(--brand-beige)] text-[var(--brand-dark)] p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-4">NUESTRAS ACTUALIZACIONES DE POLÍTICA</h1>
      <p className="mb-6">
        Debido a COVID-19, algunas de nuestras políticas se han actualizado.
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Nuestra política de devoluciones se extenderá para aceptar devoluciones después de los 5 días para compras en la tienda y en línea.</li>
        <li>Seguiremos ofreciendo devoluciones gratuitas.</li>
        <li>Visite nuestra página de preguntas frecuentes para conocer las preguntas más frecuentes relacionadas con COVID-19 y cómo está afectando nuestras operaciones comerciales.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Descripción general</h2>
      <p className="mb-6">
        Esperamos que esté 100% satisfecho con su compra de velasaromatizadas.com. Si por alguna razón no está completamente satisfecho, Velas Aromalife ofrece un reembolso o cambio en artículos sin abrir y sin usar, a precio completo dentro de los 5 días posteriores a la fecha de compra (ajustable por COVID-19).
      </p>
      <p className="mb-6">
        En este momento, los artículos pedidos en línea se pueden devolver en la tienda Velas Aromalife Cali.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Artículos a la venta</h2>
      <p className="mb-6">
        Todos los productos en oferta son de venta final y no son elegibles para devoluciones o cambios.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Daños y perjuicios</h2>
      <p className="mb-6">
        Si a su llegada, cualquier parte de su pedido está dañada, envíe un correo electrónico a <a href="mailto:comercial@velasaromatizadas.com" className="text-[var(--brand-green)] underline">comercial@velasaromatizadas.com</a> tan pronto como sea posible e incluya su número de pedido y una imagen del daño. Aromalife debe recibir cualquier consulta dentro de los 5 días posteriores a la fecha de compra (ajustable según COVID-19). Tenga en cuenta: Una vez que el producto se retira de su embalaje protector original, no podemos ser responsables de ningún daño adicional debido a una manipulación incorrecta.
      </p>
      <h2 className="text-2xl font-semibold mb-4">¿Mas preguntas?</h2>
      <p className="mb-6">
        Comuníquese con nuestro servicio de atención al cliente:
      </p>
      <ul className="list-disc pl-6">
        <li>De lunes a viernes de 8:30 a.m. a 4:30 p.m.</li>
        <li>Teléfono: 312 6986165</li>
        <li>Correo electrónico: <a href="mailto:comercial@velasaromatizadas.com" className="text-[var(--brand-green)] underline">comercial@velasaromatizadas.com</a></li>
      </ul>
      <button
        onClick={() => router.back()}
        className="mt-6 px-4 py-2 bg-[var(--brand-green)] text-white font-semibold rounded hover:bg-opacity-80 hover:cursor-pointer mx-auto block"
      >
        Volver
      </button>
    </div>
  );
}