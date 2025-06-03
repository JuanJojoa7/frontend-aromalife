"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserProvider, useUser } from "@/app/providers/user-context";
import { fetchCustomCandlesByUserId } from "@/services/custom-candle.service";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

type CartItem = {
  id?: string;
  name: string;
  price: number;
  quantity: number;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-brand-beige text-brand-dark antialiased">
        <UserProvider>
          <AppContent>{children}</AppContent>
        </UserProvider>
      </body>
    </html>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Typed array for cart items
  const router = useRouter();
  const { user, logout } = useUser();

  const handleUserClick = () => {
    if (user) {
      router.push('/profile'); // Navigate to user profile page
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      try {
        const candles = await fetchCustomCandlesByUserId(user.id);
        // Solo velas en estado "pending"
        const pendingCandles = candles.filter((candle: any) => candle.status === "pending");
        const items = pendingCandles.map((candle: any) => ({
          id: candle.id,
          name: candle.name,
          price: candle.price,
          quantity: candle.quantity ?? 1,
        }));
        setCartItems(items);
        localStorage.setItem("cartItems", JSON.stringify(items));
      } catch (error) {
        console.error("Error loading user candles", error);
      }
    };
    fetchCart();
  }, [user]);

  const handleRemoveItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  return (
    <>
      <header className="bg-[var(--brand-beige)] text-[var(--brand-dark)] py-4 px-6 md:px-10 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <a href="/" className="text-3xl font-bold">AromaLife</a>
            <p className="text-sm text-[var(--text-gray-500)]">Encendemos emociones, cuidamos el planeta</p>
            {user && (
              <p className="text-base font-semibold mt-1">Bienvenido: {user.name}</p>
            )}
          </div>
          <nav className="flex items-center space-x-4 relative">
            <button aria-label="Usuario" className="btn-primary" onClick={handleUserClick}>
              <img
                src={`${imageBaseUrl}/user.png`}
                alt="Usuario"
                className="w-6 h-6"
              />
            </button>
            <button
              aria-label="Carrito"
              className="btn-primary"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <img
                src={`${imageBaseUrl}/cart.png`}
                alt="Carrito"
                className="w-6 h-6"
              />
            </button>
            {user && (
              <button
                aria-label="Cerrar sesión"
                className="btn-primary bg-[var(--brand-green)] hover:bg-opacity-90 flex items-center justify-center rounded-md px-2 py-2"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                <img
                  src={`${imageBaseUrl}/logout.png`}
                  alt="Cerrar sesión"
                  className="w-6 h-6"
                />
              </button>
            )}
            {isCartOpen && (
              <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 p-4 overflow-y-auto">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={() => setIsCartOpen(false)}
                >✕</button>
                <h2 className="text-lg font-semibold mb-4">Tu Carrito</h2>
                {cartItems.length === 0 ? (
                  <p>Tu carrito está vacío.</p>
                ) : (
                  <ul className="space-y-4">
                    {cartItems.map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">${item.price.toLocaleString()}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {cartItems.length > 0 && (
                  <>
                    <p className="mt-4 text-right font-bold">
                      Total: ${cartItems.reduce((acc, item) => acc + item.price * (item.quantity ?? 1), 0).toLocaleString()}
                    </p>
                    <button
                      className="mt-4 w-full bg-[var(--brand-green)] text-white py-2 rounded-md hover:bg-opacity-90"
                      onClick={() => router.push('/cart')}
                    >Ir a pagar</button>
                  </>
                )}
              </div>
            )}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-[var(--footer-bg)] text-[var(--footer-text)] pt-12 pb-8 px-6 md:px-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Sobre AromaLife</h5>
            <p>Velas artesanales y sostenibles para cada ocasión.</p>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Atención al Cliente</h5>
            <ul>
              <li><a href="https://wa.me/573126986165" className="hover:text-white">Contactar Asistente</a></li>
              <li><a href="#" className="hover:text-white">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-white">Envíos</a></li>
              <li><a href="/returns" className="hover:text-white">Devoluciones</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Síguenos</h5>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com/velasaromalife" target="_blank" rel="noopener noreferrer">
                <img
                  src={`${imageBaseUrl}/facebook.png`}
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a href="https://www.instagram.com/velasaromalife" target="_blank" rel="noopener noreferrer">
                <img
                  src={`${imageBaseUrl}/instagram.png`}
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-3">Contacto</h5>
            <ul className="space-y-2">
              <li>+57 312 6986165</li>
              <li>comercial@velasaromatizadas.com</li>
              <li>Cll. 15a #69-85 Cali - Colombia</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-[var(--text-gray-500)] border-t border-gray-700 pt-8">
          <p>© {new Date().getFullYear()} AromaLife - Todos los derechos reservados</p>
        </div>
      </footer>
    </>
  );
}
