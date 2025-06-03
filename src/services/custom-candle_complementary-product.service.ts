import { UUID } from "crypto";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/custom-candle-complementary-product`;

// GET all complementary products (public)
export const fetchCustomCandleComplementaryProducts = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch complementary products");
  return response.json();
};

// GET complementary products by custom candle ID
export const fetchCustomCandleComplementaryProductsByCustomCandleId = async (customCandleId: string) => {
  const response = await fetch(`${BASE_URL}/by-custom-candle/${customCandleId}`);
  if (!response.ok) throw new Error(`Failed to fetch complementary products for custom candle ID ${customCandleId}`);
  return response.json();
};

// POST connect complementary product to custom candle
export const connectComplementaryProductToCustomCandle = async (customCandleId: string, complementaryProductId: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ customCandleId, complementaryProductId }),
  });
  if (!response.ok) throw new Error("Failed to connect complementary product to custom candle");
  return response.json();
};

//DELETE a complementary product from custom candle by ID
export const deleteCustomCandleComplementaryProduct = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error(`Failed to delete complementary product with ID ${id}`);
  return response.json();
};
