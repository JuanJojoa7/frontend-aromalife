// filepath: src/services/api.ts
export const fetchFragrances = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fragrance`);
  if (!response.ok) throw new Error('Failed to fetch fragrances');
  return response.json();
};