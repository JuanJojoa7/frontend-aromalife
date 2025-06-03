const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/conceptual-category`;

// GET all categories (public)
export const fetchConceptualCategories = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch conceptual categories");
  return response.json();
};

// GET one category by ID (public)
export const fetchConceptualCategoryById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch category with ID ${id}`);
  return response.json();
};


