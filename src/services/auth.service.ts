const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;


export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    roles: string;
  };
  token: string;
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Credenciales incorrectas o error de servidor");
  }

  return response.json();
}
