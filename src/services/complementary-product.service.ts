const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/complementary-product`;

// GET all complementary products (public)
export const fetchComplementaryProducts = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch complementary products");
  return response.json();
};

// GET one complementary product by ID (public)
export const fetchComplementaryProductById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch complementary product with ID ${id}`);
  return response.json();
};

// POST a new complementary product (admin)
export const createComplementaryProduct = async (productData: Record<string, any>) => {
  const token = localStorage.getItem("token");
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) throw new Error("Failed to create complementary product");
  return response.json();
};

// PATCH (update) an existing complementary product by ID (admin)
export const updateComplementaryProduct = async (id: string, productData: Record<string, any>) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) throw new Error(`Failed to update complementary product with ID ${id}`);
  console.log("Complementary product updated successfully");
  return response.json();
};

// DELETE a complementary product by ID (admin)
export const deleteComplementaryProduct = async (id: string) => {
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