const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/custom-candle`;


export const fetchCustomCandles = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch custom candles");
  return response.json();
};

export const fetchCustomCandleById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch custom candle with ID ${id}`);
  if (response)
  return response.json();
};

export const fetchCustomCandlesByUserId = async (userId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/by-user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error(`Failed to fetch custom candles for user ID ${userId}`);
  return response.json();
};

export const createCustomCandle = async (customCandle: {
  containerId: string;
  fragranceId: string;
  price: number;
  customImageUrl?: string;
  notes?: string;
  name?: string;
  status?: string;
  userId?: string;
  qrUrl?: string;
}) => {
  // Limpia el objeto de campos undefined o null
  const cleanCandle = Object.fromEntries(
    Object.entries(customCandle).filter(([_, v]) => v !== undefined && v !== null)
  );
  const token = localStorage.getItem("token");
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cleanCandle),
  });
  if (!response.ok) throw new Error("Failed to create custom candle");
  return response.json();
};

//PATCH an existing custom candle by ID
export const updateCustomCandle = async (id: string, customCandle: Record<string, any>) => {
  
  // Limpia el objeto de campos undefined o null
  const cleanCandle = Object.fromEntries(
    Object.entries(customCandle).filter(([_, v]) => v !== undefined && v !== null)
  );
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cleanCandle),
  });
  if (!response.ok) throw new Error(`Failed to update custom candle with ID ${id}`);
  return response.json();
}

//Delete custom candle by ID
export const fetchDeleteCustomCandleById = async (id: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error(`Failed to delete custom candle with ID ${id}`);
  return response.json();
};

// POST ai text (Deberiamos es pegar la respuesta de la IA y no lo que la persona pone en el texto)
export const fetchBeautifyText= async (text: string) => {
    const response = await fetch(`${BASE_URL}/beautify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error(`Failed to send prompt to AI`);
    return response.json();
}

//Post url and get qr code
export const fetchGenerateQrCode = async (url: string): Promise<{ qrCodeImage: string }> => {
  const response = await fetch(`${BASE_URL}/generate-qr`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: url }),
  });

  if (!response.ok) throw new Error("Failed to generate QR code");

  return response.json(); // <-- retorna el objeto
};
