const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/order-item`;

// GET all order items by order ID (private)
export const fetchOrderItemsByOrderId = async (orderId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/by-order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error(`Failed to fetch order items for order ID ${orderId}`);
  return response.json();
};

// Post a new order item (private)
export const createOrderItem = async (orderItem: {
  orderId: string;
  customCandleId: string;
  quantity: number;
  subtotal?: number;
}) => {
  // Clean the order item object to remove undefined or null fields
  const cleanOrderItem = Object.fromEntries(
    Object.entries(orderItem).filter(([_, v]) => v !== undefined && v !== null)
  );

  const token = localStorage.getItem("token");
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cleanOrderItem),
  });

  if (!response.ok) throw new Error("Failed to create order item");
  return response.json();
};


