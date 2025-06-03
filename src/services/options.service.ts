const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/options`;

// GET all options (public)
export const fetchOptions = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch options");
  return response.json();
};

// GET one option by ID (public)
export const fetchOptionById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch option with ID ${id}`);
  return response.json();
};

// GET all options by conceptual category ID (public)
export const fetchOptionsByConceptualCategory = async (categoryId: string) => {
  const response = await fetch(`${BASE_URL}/by-conceptual-category/${categoryId}`);
  if (!response.ok) throw new Error("Failed to fetch options");
  return response.json();
};
