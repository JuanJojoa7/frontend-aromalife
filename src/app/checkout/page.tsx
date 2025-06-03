"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/services/orders.service";
import { createOrderItem } from "@/services/order-item.service";
import { useUser } from "@/app/providers/user-context";
import { updateCustomCandle } from "@/services/custom-candle.service";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  
  const router = useRouter();
  const { user } = useUser();

  const [items, setItems] = useState<any[]>([]);
  const [complements, setComplements] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setItems(JSON.parse(localStorage.getItem("checkoutItems") || "[]"));
      setComplements(JSON.parse(localStorage.getItem("checkoutComplements") || "[]"));
    }
  }, []);

  const total =
    items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0) +
    complements.reduce((sum: number, c: any) => sum + Number(c.price || 0), 0);

  const handleSubmit = async () => {
    if (!user) return;

    const order = await createOrder({
      userId: user.id,
      phoneNumber: form.phone,
      totalAmount: total + 5000, // Incluye el costo de envío
      status: "pending", // o el estado que corresponda
      shippingAddress: form.address,
      city: form.city,
      postalCode: form.postalCode,
      paymentMethod: "mercado-pago", // o el método seleccionado
      notes: "", // o algún valor si tienes notas
    });
    while (items.length > 0) {
      const item = items.pop();
      if (item) {
        try {
          // Encuentra los complementos asociados a esta vela
          const itemComplements = complements.filter(
            (comp: any) => comp.customCandleId === item.id
          );
          // Suma el precio de los complementos asociados
          const complementsTotal = itemComplements.reduce(
            (sum: number, c: any) => sum + Number(c.price || 0),
            0
          );
          // Subtotal = vela * cantidad + complementos asociados
          const subtotal = item.price * item.quantity + complementsTotal;

          await createOrderItem({
            orderId: order.id,
            customCandleId: item.id,
            quantity: item.quantity,
            subtotal: subtotal,
          });
          await updateCustomCandle(item.id, { status: "completed" });
        } catch (err) {
          console.error("Error al crear order item:", err);
          break;
        }
      }
    }
    alert("Compra completada");
    localStorage.removeItem("checkoutItems");
    localStorage.removeItem("cartItems");
    router.push("/profile");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Título */}
      <h1 className="text-2xl font-bold mb-4">Finalizar Compra</h1>

      {/* Información de Envío */}
      <div className="bg-[#F5F2EE] p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Información de Envío</h2>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre completo
          </label>
          <input
            id="fullName"
            type="text"
            value={user?.name || ""}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#B49C82]"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Dirección
          </label>
          <input
            id="address"
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#B49C82]"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              Ciudad
            </label>
            <input
              id="city"
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#B49C82]"
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
              Código postal
            </label>
            <input
              id="postalCode"
              type="text"
              value={form.postalCode}
              onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#B49C82]"
            />
          </div>
        </div>
      </div>
      {/* Método de Pago */}
      <div className="bg-[#F5F2EE] p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer bg-white rounded-lg shadow-sm p-4">
            <input
              type="radio"
              name="paymentMethod"
              value="credit-card"
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              Tarjeta de Crédito/Débito
            </span>
          </label>
          <label className="flex items-center cursor-pointer bg-white rounded-lg shadow-sm p-4">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              PayPal
            </span>
          </label>
          <label className="flex items-center cursor-pointer bg-white rounded-lg shadow-sm p-4">
            <input
              type="radio"
              name="paymentMethod"
              value="mercado-pago"
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              MercadoPago
            </span>
          </label>
        </div>
      </div>
      {/* Resumen del Pedido */}
      <div className="bg-[#F5F2EE] p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>

        {/* Lista dinámica de ítems */}
        {items.map((item: any) => (
          <div key={item.id} className="flex items-start mb-4 border-b pb-4">
            <div>
              <p className="text-lg font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">{item.description || "Sin descripción"}</p>
              <p className="text-lg font-bold">${(item.price * item.quantity).toLocaleString()}</p>
              <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
            </div>
          </div>
        ))}
        {complements.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Complementos</h3>
            <ul>
              {complements.map((comp: any) => (
                <li key={comp.id} className="flex justify-between text-sm text-gray-700 mb-1">
                  <span>{comp.name}</span>
                  <span>${Number(comp.price).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Totales */}
        <div className="border-t border-gray-300 mt-4 pt-4">
          <div className="flex justify-between mb-2">
            <p>Subtotal</p>
            <p>${total.toLocaleString()}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Envío</p>
            <p>$5.000</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Total</p>
            <p className="font-bold">${(total + 5000).toLocaleString()}</p>
          </div>
        </div>

        {/* Botón de compra */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-[#B49C82] hover:bg-[#9C8366] text-white px-6 py-3 rounded transition"
        >
          Completar Compra
        </button>
        <p className="mt-2 text-sm text-gray-600">
          <span className="text-[#B49C82]">ⓘ</span> Pago seguro y encriptado
        </p>
      </div>
    </div>
  );
}