import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 max-w-4xl bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Términos y Condiciones</h1>
        <p className="mb-4 text-justify">
          Bienvenido a AromaLife. Al utilizar nuestro sitio web, usted acepta los siguientes términos y condiciones. Por favor, léalos detenidamente.
        </p>

        <h2 className="text-xl font-semibold mb-2">Uso de la Inteligencia Artificial</h2>
        <p className="mb-4 text-justify">
          AromaLife no se hace responsable por el mal uso de las herramientas de inteligencia artificial disponibles en el sitio. Estas herramientas están diseñadas para mejorar la experiencia del usuario y deben ser utilizadas de manera ética y responsable.
        </p>

        <h2 className="text-xl font-semibold mb-2">Uso de Imágenes</h2>
        <p className="mb-4 text-justify">
          Las imágenes utilizadas en este sitio web son propiedad de AromaLife o han sido proporcionadas con consentimiento explícito. Al subir imágenes al sitio, usted otorga su consentimiento para que sean utilizadas en el contexto de nuestra plataforma.
        </p>

        <h2 className="text-xl font-semibold mb-2">Tratamiento de Datos Personales</h2>
        <p className="mb-4 text-justify">
          AromaLife se compromete a proteger sus datos personales conforme a la legislación vigente. Al utilizar nuestro sitio, usted consiente el tratamiento de sus datos para fines relacionados con la prestación de nuestros servicios. Para más información, consulte nuestra política de privacidad.
        </p>

        <div className="mt-6 text-center">
          <Link href="/register">
            <a className="text-blue-500 hover:underline">Volver a la página de registro</a>
          </Link>
        </div>
      </div>
    </div>
  );
}