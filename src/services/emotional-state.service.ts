const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/emotional-state`;

// GET all emotional states (public)
export const fetchEmotionalStates = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch emotional states");
  return response.json();
};

// GET one emotional state by ID (public)
export const fetchEmotionalStateById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch emotional state with ID ${id}`);
  return response.json();
};

// GET all emotional states by option ID (public)
export const fetchEmotionalStatesByOption = async (optionId: string) => {
  const response = await fetch(`${BASE_URL}/by-option/${optionId}`);
  if (!response.ok) throw new Error("Failed to fetch emotional states");
  return response.json();
};

