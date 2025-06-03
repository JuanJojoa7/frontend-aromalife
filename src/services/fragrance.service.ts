const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/fragrance`;

// GET all fragrances (with optional search query)
export const fetchFragrances = async (searchParams?: Record<string, string>) => {
  const url = new URL(BASE_URL);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );
  }

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to fetch fragrances");
  return response.json();
};

// GET one fragrance by ID
export const fetchFragranceById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch fragrance with ID ${id}`);
  return response.json();
};


// GET all fragrances by emotional state ID
export const fetchFragrancesByEmotionalState = async (emotionalStateId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/emotional-state-fragrance/by-emotional-state/${emotionalStateId}`);
  if (!response.ok) throw new Error("Failed to fetch related fragrances");
  return response.json();
};

// POST a new fragrance
export const createFragrance = async (fragranceData: Record<string, any>) => {
  const token = localStorage.getItem("token");
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fragranceData),
  });

  if (!response.ok) throw new Error("Failed to create fragrance");
  return response.json();
};

// PATCH (update) an existing fragrance by ID
export const updateFragrance = async (id: string, fragranceData: Record<string, any>) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fragranceData),
  });

  if (!response.ok) throw new Error(`Failed to update fragrance with ID ${id}`);
  console.log("Fragrance updated successfully");
  return response.json();
};

// DELETE a fragrance by ID
export const deleteFragrance = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(`Failed to delete fragrance with ID ${id}`);
  return response.json();
};

