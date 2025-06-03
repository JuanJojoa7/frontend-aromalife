"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchFragrances, createFragrance, updateFragrance, deleteFragrance } from "@/services/fragrance.service";
import { fetchContainers, createContainer, updateContainer, deleteContainer } from "@/services/container.service";
import { fetchComplementaryProducts, createComplementaryProduct, updateComplementaryProduct, deleteComplementaryProduct } from "@/services/complementary-product.service";
import { fetchAllOrders, createOrder, updateOrder, deleteOrder } from "@/services/orders.service";

interface Item {
  id: string;
  userId: string;
  items: string[];
  totalAmount: number;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  subtotal?: number;
  order_id?: string;
  custom_candle_id?: string;
  name: string;
  description?: string;
  image?: string;
  price?: number;
  quantity?: number;
}



const AdminPanelPage = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("Fragancias");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  type EditableItem = {
    name?: string;
    description?: string;
    image_url?: string;
    price?: number | string;
    quantity?: number | string;
    totalAmount?: number | string;
    status?: string;
    shippingAddress?: string;
    paymentMethod?: string;
    notes?: string;
    userId?: string;
  };
  
  const [editItem, setEditItem] = useState<EditableItem>({ name: "", description: "" });
  
  const [newItem, setNewItem] = useState<EditableItem>({ name: "", description: "" });

  const sectionMap: Record<string, string> = {
    Fragancias: "Fragrancia",
    Contenedores: "Contenedor",
    Complementos: "Complemento",
    Órdenes: "Orden",
  };

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
    // Agrega tus nombres y rutas reales
    "Chocolates": "/images/complementos/chocolates.png",
    "Flores": "/images/complementos/flores.png",
    "Jabones": "/images/complementos/jabones.png",
    "Sales": "/images/complementos/sales.png",
    // ...
  };

  const handleAdd = async (newData: Record<string, any>) => {
    try {
      if (activeSection === "Fragancias") {
        await createFragrance(newData);
      } else if (activeSection === "Contenedores") {
        await createContainer(newData);
      } else if (activeSection === "Complementos") {
        await createComplementaryProduct(newData);
      } else if (activeSection === "Órdenes") {
        // Adapt newData to match the required type for createOrder
        if (typeof newData.totalAmount !== "number") {
          throw new Error("El campo 'totalAmount' es obligatorio y debe ser un número.");
        }
        await createOrder({
          userId: newData.userId,
          totalAmount: newData.totalAmount,
          status: newData.status,
          shippingAddress: newData.shippingAddress,
          paymentMethod: newData.paymentMethod,
          notes: newData.notes,
        });
      }
      await loadItems(activeSection); // Refresca la lista
    } catch (error) {
      if (error instanceof Error) {
        console.log(newData);
        alert("Error al añadir: " + error.message);
      } else {
        alert("Error al añadir: " + String(error));
      }
    }
  };

  const handleEdit = async (id: string, updatedData: Record<string, any>) => {
    try {
      if (activeSection === "Fragancias") {
        await updateFragrance(id, updatedData);
      } else if (activeSection === "Contenedores") {
        await updateContainer(id, updatedData);
      } else if (activeSection === "Complementos") {
        await updateComplementaryProduct(id, updatedData);
      } else if (activeSection === "Órdenes") {
        await updateOrder(id, updatedData);
      }
      await loadItems(activeSection);
    } catch (error) {
      if (error instanceof Error) {
        console.log(updatedData);
        console.log(id);
        alert("Error al editar: " + error.message);
      } else {
        alert("Error al editar: " + String(error));
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Seguro que deseas eliminar este elemento?")) return;
    try {
      if (activeSection === "Fragancias") {
        await deleteFragrance(id);
      } else if (activeSection === "Contenedores") {
        await deleteContainer(id);
      } else if (activeSection === "Complementos") {
        await deleteComplementaryProduct(id);
      } else if (activeSection === "Órdenes") {
        await deleteOrder(id);
      }
      await loadItems(activeSection);
    } catch (error) {
      if (error instanceof Error) {
        alert("Error al eliminar: " + error.message);
      } else {
        alert("Error al eliminar: " + String(error));
      }
    }
  };

  const loadItems = async (section: string) => {
    setLoading(true);
    try {
      let data: Item[] = [];
      switch (section) {
        case "Fragancias":
          data = await fetchFragrances();
          break;
        case "Contenedores":
          data = await fetchContainers();
          break;
        case "Complementos":
          data = await fetchComplementaryProducts();
          break;
        case "Órdenes":
          data = await fetchAllOrders(); // Suponiendo que devuelve órdenes
          break;
        default:
          data = [];
      }
      setItems(data);
    } catch (error) {
      console.error(`Error fetching ${section}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems(activeSection);
  }, [activeSection]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barra Lateral */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Panel de Administración</h2>
            <nav className="space-y-2">
            {[
                { id: "Fragancias", name: "Fragancias", icon: "🪴" },
                { id: "Contenedores", name: "Contenedores", icon: "📦" },
                { id: "Complementos", name: "Complementos", icon: "✨" },
                { id: "Órdenes", name: "Órdenes", icon: "📖" },
            ].map((section) => (
                <button
                key={section.id}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    activeSection === section.id
                    ? "bg-gray-800 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection(section.id)}
                >
                <span className="text-xl">{section.icon}</span>
                <span className="font-medium">{section.name}</span>
                </button>
            ))}
            </nav>
        </div>
    </div>
    {/* Sección Principal */}
      <main className="flex-1 p-4">
        {/* Cabecera */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Gestión de {sectionMap[activeSection]}</h2>
          <button
            className="bg-green-700 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-800 transition-colors"
            onClick={() => setShowAddModal(true)}
          >
            <span className="mr-2">+</span> Añadir Nuevo
          </button>
        </div>

        {/* Lista de Items */}
        {loading ? (
          <p>Cargando datos...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {items.map((item) => {
                let imageSrc = item.image || "/images/vela-decorativa.jpg";
                if (activeSection === "Fragancias") {
                    imageSrc = fragranceImageMap[item.name] || imageSrc;
                } else if (activeSection === "Contenedores") {
                    imageSrc = containerImageMap[item.name] || imageSrc;
                } else if (activeSection === "Complementos") {
                    imageSrc = complementaryImageMap[item.name] || imageSrc;
                }
                return (
                    <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                    >
                    {activeSection !== "Órdenes" && (
                      <div>
                        <img
                        src={imageSrc}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
                      </div>
                    )}
                    {activeSection == "Complementos" && (
                      <div>
                        <p className="text-gray-600 mt-1">{item.description || "-"}</p>
                        <p className="text-gray-600 mt-1">Precio: ${item.price || "-"}</p>
                      </div>

                    )}

                    {activeSection === "Órdenes" && (
                      <div className="border p-4 rounded-lg shadow-sm mb-4 bg-white">
                        <p className="text-sm text-gray-500">ID: <span className="text-gray-700">{item.id || "-"}</span></p>
                        <p className="text-sm text-gray-500 mt-1">Estado: <span className="text-gray-700 capitalize">{item.status || "-"}</span></p>
                        <p className="text-sm text-gray-500 mt-1">Total: <span className="text-gray-700">${Number(item.totalAmount).toFixed(2)}</span></p>
                        <p className="text-sm text-gray-500 mt-1">Método de pago: <span className="text-gray-700">{item.paymentMethod || "-"}</span></p>
                        <p className="text-sm text-gray-500 mt-1">Dirección de envío: <span className="text-gray-700">{item.shippingAddress || "-"}</span></p>
                        <p className="text-sm text-gray-500 mt-1">Fecha: <span className="text-gray-700">{new Date(item.createdAt).toLocaleDateString()}</span></p>
                        <p className="text-sm text-gray-500 mt-1">Usuario: <span className="text-gray-700">{item.userId || "-"}</span></p>
                      </div>
                    )}
                    <div className="flex justify-center mt-4 space-x-4">
                  <button
                    title="Editar"
                    className="text-yellow-500 hover:bg-yellow-100 hover:text-yellow-700 rounded p-2"
                    onClick={() => {
                      setEditItemId(item.id);
                      if (activeSection === "Fragancias") {
                        setEditItem({
                          name: item.name,
                        });
                      } else if (activeSection === "Contenedores") {
                        setEditItem({
                          name: item.name,
                          image_url: item.image || "",
                        });
                      } else if (activeSection === "Complementos") {
                        setEditItem({
                          name: item.name,
                          description: item.description || "",
                          image_url: item.image || "",
                          price: item.price || "",
                        });
                      } else if (activeSection === "Órdenes") {
                        setEditItem({
                          totalAmount: item.totalAmount || 0,
                          status: item.status || "",
                          shippingAddress: item.shippingAddress || "",
                          paymentMethod: item.paymentMethod || "",
                          notes: item.notes || "",
                        });
                      }
                      setShowEditModal(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    title="Eliminar"
                    className="text-red-500 hover:bg-red-100 hover:text-red-700 rounded p-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    ❌
                  </button>
                  </div>
                    </div>
                );
              }
            )}
          </div>
        )}
      </main>
      {/* Modal de añadir */}
      {showAddModal && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Añadir {sectionMap[activeSection]}</h3>
            
            {/* Nombre Input */}
            {activeSection !== "Órdenes" && (              
              <input
                className="w-full border p-2 mb-4 rounded"
                placeholder="Nombre"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            )}
            {/* Campos adicionales según la sección */}
            {activeSection === "Contenedores" && (
              <input
                className="w-full border p-2 mb-4 rounded"
                placeholder="URL de imagen"
                value={newItem.image_url || ""}
                onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
              />
            )}

            {activeSection === "Complementos" && (
              <>
                <textarea
                  className="w-full border p-2 mb-4 rounded"
                  placeholder="Descripción"
                  value={newItem.description || ""}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-4 rounded"
                  placeholder="URL de imagen"
                  value={newItem.image_url || ""}
                  onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-4 rounded"
                  placeholder="Precio"
                  type="number"
                  value={newItem.price || ""}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
              </>
            )}
            {activeSection === "Órdenes" && (
              <>
                <input
                  className="w-full border p-2 mb-4 rounded"
                  placeholder="ID de usuario"
                  value={newItem.userId || ""}
                  onChange={(e) => setNewItem({ ...newItem, userId: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-4 rounded"
                  placeholder="Total"
                  type="number"
                  value={newItem.totalAmount || ""}
                  onChange={(e) => setNewItem({ ...newItem, totalAmount: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-4 rounded"
                  placeholder="Estado"
                  value={newItem.status || ""}
                  onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-4 rounded"
                  placeholder="Dirección de envío"
                  value={newItem.shippingAddress || ""}
                  onChange={(e) => setNewItem({ ...newItem, shippingAddress: e.target.value })}
                />
                <input
                  className="w-full border p-2 mb-4 rounded"
                  placeholder="Método de pago"
                  value={newItem.paymentMethod || ""}
                  onChange={(e) => setNewItem({ ...newItem, paymentMethod: e.target.value })}
                />
                <textarea
                  className="w-full border p-2 mb-4 rounded"
                  placeholder="Notas (opcional)"
                  value={newItem.notes || ""}
                  onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                />
              </>
            )}

            {/* Botones */}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
                onClick={async () => {
                  let data: Record<string, any> | undefined;
                  if (activeSection === "Fragancias") {
                    data = { name: newItem.name };
                  } else if (activeSection === "Contenedores") {
                    data = { name: newItem.name, image_url: newItem.image_url };
                  } else if (activeSection === "Complementos") {
                    data = {
                      name: newItem.name,
                      description: newItem.description,
                      image_url: newItem.image_url,
                      price: newItem.price ? Number(newItem.price) : undefined,
                    };
                  } else if (activeSection === "Órdenes") {
                    data = {
                      userId: newItem.userId,
                      totalAmount: newItem.totalAmount ? Number(newItem.totalAmount) : undefined,
                      status: newItem.status,
                      shippingAddress: newItem.shippingAddress,
                      paymentMethod: newItem.paymentMethod,
                      notes: newItem.notes,
                    };
                  }
                  if (!data) return;
                  await handleAdd(data);
                  setShowAddModal(false);
                  setNewItem({ name: "", description: "" });
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
      <div className="fixed inset-0 bg-gray-700 bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
          <h3 className="text-xl font-bold mb-4">Editar {sectionMap[activeSection]}</h3>
          {activeSection !== "Órdenes" && (
            <input
              className="w-full border p-2 mb-4 rounded"
              placeholder="Nombre"
              value={editItem.name}
              onChange={e => setEditItem({ ...editItem, name: e.target.value })}
            />
          )}
          {activeSection === "Contenedores" && (
            <input
              className="w-full border p-2 mb-4 rounded"
              placeholder="URL de imagen"
              value={editItem.image_url || ""}
              onChange={e => setEditItem({ ...editItem, image_url: e.target.value })}
            />
          )}
          {activeSection === "Complementos" && (
            <>
              <textarea
                className="w-full border p-2 mb-4 rounded"
                placeholder="Descripción"
                value={editItem.description || ""}
                onChange={e => setEditItem({ ...editItem, description: e.target.value })}
              />
              <input
                className="w-full border p-2 mb-4 rounded"
                placeholder="URL de imagen"
                value={editItem.image_url || ""}
                onChange={e => setEditItem({ ...editItem, image_url: e.target.value })}
              />
              <input
                className="w-full border p-2 mb-4 rounded"
                placeholder="Precio"
                type="number"
                value={editItem.price || ""}
                onChange={e => setEditItem({ ...editItem, price: e.target.value })}
              />
            </>
          )}
          {activeSection === "Órdenes" && (
            <>
              <input
                className="w-full border p-2 mb-4 rounded"
                placeholder="ID de usuario"
                value={editItem.userId || ""}
                onChange={e => setEditItem({ ...editItem, userId: e.target.value })}
              />
              <input
                className="w-full border p-2 mb-4 rounded"
                placeholder="Total"
                type="number"
                value={editItem.totalAmount || ""}
                onChange={e => setEditItem({ ...editItem, totalAmount: e.target.value })}
              />
              <input
                className="w-full border p-2 mb-4 rounded"
                placeholder="Estado"
                value={editItem.status || ""}
                onChange={e => setEditItem({ ...editItem, status: e.target.value })}
              />
              <input
                className="w-full border p-2 mb-4 rounded"
                placeholder="Dirección de envío"
                value={editItem.shippingAddress || ""}
                onChange={e => setEditItem({ ...editItem, shippingAddress: e.target.value })}
              />
              <input
                className="w-full border p-2 mb-4 rounded"
                placeholder="Método de pago"
                value={editItem.paymentMethod || ""}
                onChange={e => setEditItem({ ...editItem, paymentMethod: e.target.value })}
              />
              <textarea
                className="w-full border p-2 mb-4 rounded"
                placeholder="Notas (opcional)"
                value={editItem.notes || ""}
                onChange={e => setEditItem({ ...editItem, notes: e.target.value })}
              />
            </>
          )}
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setShowEditModal(false)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
              onClick={async () => {
                let data: Record<string, any> | undefined;
                if (activeSection === "Fragancias") {
                  data = { name: editItem.name };
                } else if (activeSection === "Contenedores") {
                  data = { name: editItem.name, image_url: editItem.image_url };
                } else if (activeSection === "Complementos") {
                  data = {
                    name: editItem.name,
                    description: editItem.description,
                    image_url: editItem.image_url,
                    price: editItem.price ? Number(editItem.price) : undefined,
                  };
                } else if (activeSection === "Órdenes") {
                  data = {
                    totalAmount: editItem.totalAmount ? Number(editItem.totalAmount) : undefined,
                    status: editItem.status,
                    shippingAddress: editItem.shippingAddress,
                    paymentMethod: editItem.paymentMethod,
                    notes: editItem.notes,
                  };
                }
                if (!data || !editItemId) return;
                await handleEdit(editItemId, data);
                setShowEditModal(false);
                setEditItemId(null);
                setEditItem({ name: "", description: "" });
              }}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}
export default AdminPanelPage;