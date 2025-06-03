const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function changeUserPassword({
  userId,
  currentPassword,
  newPassword,
}: {
  userId: string;
  currentPassword: string;
  newPassword: string;
}) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/user/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword,
      password: newPassword,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Error al cambiar la contraseña");
  }
  return res.json();
}
