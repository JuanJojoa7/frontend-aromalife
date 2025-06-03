"use client";

import React, { useEffect, useState } from "react";
import {
  fetchConceptualCategories,
} from "@/services/conceptual-category.service";
import { fetchOptionsByConceptualCategory } from "@/services/options.service";
import { fetchEmotionalStatesByOption } from "@/services/emotional-state.service";
import { fetchFragrances } from "@/services/fragrance.service";
import { fetchContainers } from "@/services/container.service";
import { fetchBeautifyText, fetchGenerateQrCode } from "@/services/custom-candle.service";
import { fetchComplementaryProducts } from "@/services/complementary-product.service";
import { useUser } from "@/app/providers/user-context";
import { createCustomCandle } from "@/services/custom-candle.service";
import { connectComplementaryProductToCustomCandle } from "@/services/custom-candle_complementary-product.service";
import { useRouter } from "next/navigation";



interface Item {
  id: string;
  name: string;
  description?: string;
  price?: string;
  image?: string;
  imageUrl?: string; // For images
}

const Package = "📦"; // Contenedor
const Flower2 = "🌸"; // Fragrancia
const Gift = "🎁"; // Complementos
const LucideImage = "🖼️"; // Imagen
const MessageSquare = "💬"; // Mensaje
const QrCode = "🧩"; // Código QR (emoji genérico para QR)

const categories = [
  { id: "contenedor", name: "Contenedor", icon: Package },
  { id: "fragrancia", name: "Fragrancia", icon: Flower2 },
  { id: "imagen", name: "Imagen", icon: LucideImage },
  { id: "mensaje", name: "Mensaje", icon: MessageSquare },
  { id: "complementos", name: "Complementos", icon: Gift },
  { id: "codigo", name: "Código QR", icon: QrCode },
];

export default function Personalize() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [step, setStep] = useState(0);

  // Data states
  const [containers, setContainers] = useState<Item[]>([]);
  const [fragrances, setFragrances] = useState<Item[]>([]);
  const [complementaries, setComplementaries] = useState<Item[]>([]);

  // Selection states
  const [selectedContainer, setSelectedContainer] = useState<Item | null>(null);
  const [selectedFragrance, setSelectedFragrance] = useState<Item | null>(null);
  const [selectedComplementary, setSelectedComplementary] = useState<Item | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const goBack = () => setShowSummary(false);
  const [imageDisclaimerAccepted, setImageDisclaimerAccepted] = useState(false);

  // Customization
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [iaMessage, setIaMessage] = useState("");
  const [urlMessage, setUrlMessage] = useState("");
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [iaResult, setIaResult] = useState<string | null>(null);
  const { user } = useUser();
  const pricePerUnit = 40000;

  const [mainImage, setMainImage] = useState<string | null>(null);

  // Fetch containers on mount
  useEffect(() => {
    fetchContainers().then(setContainers).catch(console.error);
  }, []);

  // Fetch fragrances when step is fragrance
  useEffect(() => {
    if (selectedCategory === "fragrancia") {
      fetchFragrances().then(setFragrances).catch(console.error);
    }
  }, [selectedCategory]);

  // Fetch complementaries when step is complementos
  useEffect(() => {
    if (selectedCategory === "complementos") {
      fetchComplementaryProducts().then(setComplementaries).catch(console.error);
    }
  }, [selectedCategory]);

  // Handlers
  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setStep(categories.findIndex((c) => c.id === catId));
  };

  const handleContainerSelect = (container: Item) => setSelectedContainer(container);

  const fragranceImageMap: Record<string, string> = {
    "Brisa Citrica": "/images/fragrancias/Brisa_Citrica.png",
    "Horizonte Marino": "/images/fragrancias/Horizonte_Marino.png",
    "Jardin al Anochecer": "/images/fragrancias/Jardin_al_anochecer.jpeg",
    "Luna de Seda": "/images/fragrancias/Luna_de_seda.png",
    "Niebla de Algodon": "/images/fragrancias/Niebla_de_algodon.png",
    "Ritual de Lavanda": "/images/fragrancias/Ritual_de_Lavanda.png",
  };

  const containerImageMap: Record<string, string> = {
    "Zen": "/images/contenedor/zen.jpg",
    "Prisma": "/images/contenedor/prisma.png",
  };

  const complementaryImageMap: Record<string, string> = {
    "Chocolates": "/images/complementos/chocolates.png",
    "Flores": "/images/complementos/flores.png",
    "Jabones": "/images/complementos/jabones.png",
    "Sales": "/images/complementos/sales.png",
  };

  const handleFragranceSelect = (fragrance: Item) => {
    setSelectedFragrance(fragrance);
  };

  useEffect(() => {
    if (selectedFragrance && fragranceImageMap[selectedFragrance.name ?? ""]) {
      setMainImage(fragranceImageMap[selectedFragrance.name ?? ""]);
    } else {
      setMainImage(null);
    }
  }, [imagePreview, selectedFragrance, selectedContainer]);

  const handleComplementarySelect = (complementary: Item) => setSelectedComplementary(complementary);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageBase64(reader.result as string); // Guarda el string base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCallIAService = async () => {
    try {
      const result = await fetchBeautifyText(iaMessage);
      setIaResult(result.text || "Texto embellecido generado.");
    } catch (error) {
      setIaResult("Error al generar texto con IA.");
    }
  };

  const handleCallQrService = async () => {
    try {
      const base64Image = await fetchGenerateQrCode(urlMessage);
      setQrCodeImage(base64Image.qrCodeImage);
      alert("Código QR generado exitosamente.");
    } catch (error) {
      alert("Error al generar el código QR.");
    }
  };

  const handleContinue = () => {
    if (step < categories.length - 1) {
      setStep(step + 1);
      setSelectedCategory(categories[step + 1].id);
    }
  };

  const handleConfirmAndBuy = async () => {
    if (!user) {
      alert("Debes iniciar sesión para realizar la compra.");
      return;
    }
    if (!selectedContainer || !selectedFragrance) {
      alert("Debes seleccionar un contenedor y una fragancia.");
      return;
    }
    try {
      const customCandle = {
        containerId: selectedContainer.id,
        fragranceId: selectedFragrance.id,
        userId: user.id,
        price: pricePerUnit,
        customImageUrl: undefined,
        notes: iaResult || undefined, 
        name: selectedFragrance.name || undefined,
        qrUrl: urlMessage || undefined, // QR code image if generated
      };
      const customCandlePOST = await createCustomCandle(customCandle);
      console.log(customCandlePOST);
      if (selectedComplementary) {
        await connectComplementaryProductToCustomCandle(customCandlePOST.id, parseInt(selectedComplementary.id));
      }
      alert("¡Vela personalizada creada exitosamente!");
      router.push("/cart");
    } catch (error: any) {
      console.log(selectedComplementary);
      alert(error.message || "Ocurrió un error inesperado.");
    }
  };

  // Renderers for each step
  const renderStepContent = () => {
    switch (selectedCategory) {
      case "contenedor":
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Selección de Contenedor</h3>
            <div className="grid grid-cols-2 gap-4">
              {containers.map((container) => (
                <div
                  key={container.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedContainer?.id === container.id
                      ? "border-gray-800 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedContainer(container)}
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={containerImageMap[container.name] || "/images/fragrancias/default.png"}
                      alt={container.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-gray-900 text-sm">{container.name}</h4>
                    <p className="text-gray-600 text-sm">{container.price ? container.price : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case "fragrancia":
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Selecciona una Fragancia</h3>
            <div className="grid grid-cols-2 gap-4">
              {fragrances.map((fragrance) => (
                <div
                  key={fragrance.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedFragrance?.id === fragrance.id
                      ? "border-gray-800 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleFragranceSelect(fragrance)}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center text-xl">
                    <img
                      src={fragranceImageMap[fragrance.name] || "/images/fragrancias/default.png"}
                      alt={fragrance.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-gray-900 text-sm">{fragrance.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case "complementos":
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Selecciona Complementos</h3>
            <div className="grid grid-cols-2 gap-4">
              {complementaries.map((comp) => (
                <div
                  key={comp.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedComplementary?.id === comp.id
                      ? "border-gray-800 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedComplementary(comp)}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center text-xl">
                    <img
                      src={complementaryImageMap[comp.name] || "/images/complementos/chocolates.png"}
                      alt={comp.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-gray-900 text-sm">{comp.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case "imagen":
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Imagen Personalizada</h3>
            <label className="block w-full cursor-pointer border-2 border-dashed border-gray-400 p-4 text-center rounded hover:bg-[#eee]">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="mx-auto max-h-48" />
              ) : (
                <span>Arrastra o haz clic para subir una imagen</span>
              )}
            </label>
            <div className="mt-4 flex items-center">
              <input
                id="image-disclaimer"
                type="checkbox"
                checked={imageDisclaimerAccepted}
                onChange={e => setImageDisclaimerAccepted(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="image-disclaimer" className="text-sm text-gray-700">
                Acepto que Aromalife no es responsable por esta imagen.
              </label>
            </div>
          </>
        );
      case "mensaje":
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Mensaje Sensorial IA</h3>
            <textarea
              value={iaMessage}
              onChange={(e) => setIaMessage(e.target.value)}
              placeholder="Describe el ambiente que deseas crear..."
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleCallIAService}
              className="px-4 py-2 bg-[#B49C82] text-white rounded hover:bg-[#9C8366]"
            >
              Generar con IA
            </button>
            {iaResult && <p className="mt-4 text-sm text-gray-700">{iaResult}</p>}
          </>
        );
      case "codigo":
        return (
          <>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Código QR</h3>
            <div className="flex items-center justify-center h-40">
              <span className="text-5xl">{QrCode}</span>
            </div>
            <textarea
              value={urlMessage}
              onChange={(e) => setUrlMessage(e.target.value)}
              placeholder="Url que quieres volver qr aparecera en la parte de atras de la vela"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleCallQrService}
              className="px-4 py-2 bg-[#B49C82] text-white rounded hover:bg-[#9C8366]"
            >
              Generar QR
            </button>
            {qrCodeImage && (
              <img src={qrCodeImage} alt="Código QR" />
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    // Conditionally render summary or main content
    showSummary ? (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F2EE]">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Imagen de la fragancia a la izquierda */}
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow">
          <img
            src={mainImage || "/images/vela-decorativa.jpg"}
            alt="Fragancia"
            className="rounded-lg shadow-lg max-w-md"
          />
        </div>
        {/* Resumen del pedido */}
        <div className="bg-[#F5F2EE] p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>
          {/* Contenedor */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Contenedor</h3>
            <div className="space-y-1">
              <div><strong>Tipo:</strong> {selectedContainer?.name || "-"}</div>
            </div>
          </div>
          {/* Fragancia */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Fragancia</h3>
            <div className="space-y-1">
              <div><strong>Aroma:</strong> {selectedFragrance?.name || "-"}</div>
            </div>
          </div>
          {/* Personalización */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Personalización</h3>
            <div className="space-y-1">
              <div><strong>Mensaje:</strong> {iaMessage || "-"}</div>
            </div>
          </div>
          {/* Extras */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Extras</h3>
            <div className="space-y-1">
              {selectedComplementary && (
                <div>
                  <span className="mr-2 text-gray-500">🎁</span>
                  <span>{selectedComplementary.name}</span>
                </div>
              )}
            </div>
          </div>
          {/* Cantidad y Precios */}
          <div className="mb-6 border-t border-gray-300 pt-4">
            <div className="space-y-1 text-right">
              <p className="text-sm text-gray-600">Subtotal: ${pricePerUnit.toLocaleString()}</p>
            </div>
          </div>
          {/* Botones de acción */}
          <div className="flex justify-end mt-6 gap-2">
            <button
              onClick={goBack}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Editar pedido
            </button>
            <button
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
              onClick={handleConfirmAndBuy}
            >
              Confirmar y comprar
            </button>
          </div>
        </div>
      </div>
    </div>
    ) : (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Personaliza Tu Vela</h2>
          <nav className="space-y-2">
            {categories.map((category, idx) => (
              <button
                key={category.id}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-gray-800 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setStep(idx);
                }}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-gray-200">
          <button
            className="w-full text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
            onClick={() => window.location.href = "/"}
          >
            Cancelar
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Center Preview */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-96 h-96 rounded-2xl overflow-hidden bg-gray-100 shadow-2xl flex items-center justify-center">
            <img
              src={mainImage || "/images/vela-decorativa.jpg"}
              className="w-full h-full object-cover"
              alt="Vista previa"
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col">
          {renderStepContent()}
          <div className="mt-8">
            {step < categories.length - 1 ? (
              <button
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors"
                onClick={handleContinue}
                disabled={
                  (selectedCategory === "contenedor" && !selectedContainer) ||
                  (selectedCategory === "fragrancia" && !selectedFragrance)
                }
              >
                Continuar
              </button>
            ) : (
              <button
                className="w-full bg-green-700 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-800 transition-colors"
                onClick={() => setShowSummary(true)}
              >
                Confirmar y comprar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
  );
}