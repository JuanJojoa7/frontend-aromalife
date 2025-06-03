const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/container`;

// GET all containers (public)
export const fetchContainers = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch containers");
  return response.json();
};

// GET one container by ID (public)
export const fetchContainerById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch container with ID ${id}`);
  return response.json();
};

// POST a new container (admin)
export const createContainer = async (containerData: Record<string, any>) => {
  const token = localStorage.getItem("token");
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(containerData),
  });

  if (!response.ok) throw new Error("Failed to create container");
  return response.json();
};

// PATCH (update) an existing container by ID (admin)
export const updateContainer = async (id: string, containerData: Record<string, any>) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(containerData),
  });

  if (!response.ok) throw new Error(`Failed to update container with ID ${id}`);
  console.log("Container updated successfully");
  return response.json();
};

// DELETE a container by ID (admin)
export const deleteContainer = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(`Failed to delete container with ID ${id}`);
  return response.json();
};