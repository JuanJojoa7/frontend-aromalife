"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/providers/user-context";
import { fetchCustomCandlesByUserId, fetchDeleteCustomCandleById } from "@/services/custom-candle.service";
import { fetchCustomCandleComplementaryProductsByCustomCandleId,deleteCustomCandleComplementaryProduct } from "@/services/custom-candle_complementary-product.service";
import { fetchComplementaryProductById } from "@/services/complementary-product.service";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [compItems, setCompItems] = useState<any[]>([]); // Complementary products
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const candles = await fetchCustomCandlesByUserId(user.id);
      const pendingCandles = candles.filter((c: any) => c.status === "pending");

      // Save custom candles directly
      setItems(pendingCandles.map((c: any) => ({ ...c, quantity: 1 })));

      // Fetch associations for all pending candles
      const associations = await fetchCustomCandleComplementaryProductsByCustomCandleId(
        pendingCandles.map((c: any) => c.id)
      );

      // Fetch all complementary products (if any)
      let compProducts: any[] = [];
      if (associations.length > 0) {
        let products = await fetchComplementaryProductById(
          associations.map((a: any) => a.complementaryProductId)
        );
        if (!Array.isArray(products)) {
          products = [products];
        }
        // Merge association info with product info
        compProducts = associations.map((assoc: any) => {
          const prod = products.find((p: any) => String(p.id) === String(assoc.complementaryProductId));
          return prod ? { ...prod, association: assoc } : null;
        }).filter(Boolean);
      }
      console.log("Complementary products loaded:", compProducts);
      setCompItems(compProducts);
    };
    load();
  }, [user]);

  const updateQuantity = (index: number, value: number) => {
    const updated = [...items];
    updated[index].quantity = value;
    setItems(updated);
  };

  const total =
    items.reduce((sum, i) => sum + i.price * i.quantity, 0) +
    compItems.reduce((sum, c) => sum + Number(c.price || 0), 0);

  const proceedToCheckout = () => {
    localStorage.setItem("checkoutItems", JSON.stringify(items));
    localStorage.setItem("checkoutComplements", JSON.stringify(compItems));
    router.push("/checkout");
  };

  const handleDelete = async (id: string) => {
    try {
      await fetchDeleteCustomCandleById(id);
      setItems(items.filter((item) => item.id !== id));
      localStorage.setItem(
        "checkoutItems",
        JSON.stringify(items.filter((item) => item.id !== id))
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Título */}
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">Carrito de Compras</h1>

      {/* Mensaje si está vacío */}
      {items.length === 0 ? (
        <div className="text-center py-10 bg-[#F5F2EE] rounded-lg shadow-inner">
          <p className="text-gray-600">Tu carrito está vacío.</p>
          <button
            onClick={() => router.push("/personalizar")}
            className="mt-4 px-6 py-2 bg-[#B49C82] text-white rounded hover:bg-[#9C8366] transition"
          >
            Personaliza tu vela
          </button>
        </div>
      ) : (
        items.map((item, i) => (
          <div
            key={item.id}
            className="mb-6 p-6 bg-[#F5F2EE] rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            {/* Candle info */}
            <div>
              <h2 className="font-semibold text-xl text-gray-900">{item.name}</h2>
              <p className="text-sm text-gray-600 mt-1">${item.price.toLocaleString()} c/u</p>
              <div className="flex items-center mt-3">
                <label htmlFor={`quantity-${i}`} className="text-sm text-gray-700 mr-2">
                  Cantidad:
                </label>
                <input
                  id={`quantity-${i}`}
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(i, parseInt(e.target.value))}
                  className="border border-gray-300 p-1 w-16 rounded text-center focus:outline-none focus:ring-1 focus:ring-[#B49C82]"
                />
              </div>
              {/* Complementary products */}
              {compItems.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Complementos en tu carrito</h2>
                  <ul>
                    {compItems.map((comp: any) => (
                      <li key={comp.id} className="flex items-center justify-between mb-2">
                        <span>
                          {comp.name} {comp.price ? `- $${Number(comp.price).toLocaleString()}` : ""}
                        </span>
                        <button
                          className="ml-2 px-2 py-1 bg-red-300 text-white rounded text-xs"
                          onClick={async () => {
                            console.log("Deleting complementary product:", comp.association.id);
                            await deleteCustomCandleComplementaryProduct(comp.association.id);
                            window.location.reload();
                          }}
                        >
                          Eliminar complemento
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Delete candle and all its complementaries */}
            <button
              onClick={() => handleDelete(item.id)}
              className="self-end md:self-center px-4 py-2 bg-red-400 text-white rounded hover:bg-red-600 transition text-sm"
            >
              Eliminar vela
            </button>
          </div>
        )))}

      {/* Resumen del total y botón de checkout */}
      {items.length > 0 && (
        <div className="mt-8">
          <div className="text-right font-bold text-2xl text-gray-900">
            Total: ${total.toLocaleString()}
          </div>
          <button
            onClick={proceedToCheckout}
            className="mt-6 w-full sm:w-auto ml-auto block px-6 py-3 bg-[#B49C82] text-white rounded-lg hover:bg-[#9C8366] transition text-center"
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
}