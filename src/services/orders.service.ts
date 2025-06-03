const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

// Get order by User ID (private)
export const fetchOrdersByUserId = async (userId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/by-user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error(`Failed to fetch orders for user ID ${userId}`);
  return response.json();
};

// Get all orders (public)
export const fetchAllOrders = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch all orders");
  return response.json();
};

// Post a new order (private)
export const createOrder = async (order: {
  userId?: string;
  phoneNumber?: string;
  totalAmount: number;
  status?: string;
  shippingAddress?: string;
  city?: string;
  postalCode?: string;
  paymentMethod?: string;
  notes?: string;
}) => {
  // Clean the order object to remove undefined or null fields
  const cleanOrder = Object.fromEntries(
    Object.entries(order).filter(([_, v]) => v !== undefined && v !== null)
  );
  
  const token = localStorage.getItem("token");
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cleanOrder),
  });
  
  if (!response.ok) throw new Error("Failed to create order");
  return response.json();
};

// PATCH an existing order by ID (private)
export const updateOrder = async (id: string, orderData: Record<string, any>) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
  
  if (!response.ok) throw new Error(`Failed to update order with ID ${id}`);
  return response.json();
};

// Delete an order by ID (private)
export const deleteOrder = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) throw new Error(`Failed to delete order with ID ${id}`);
  return response.json();
};