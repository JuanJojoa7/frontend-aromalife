import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/providers/user-context";

export function useRoleGuard(allowedRoles: string[] = []) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Compara roles sin importar mayúsculas/minúsculas
    const userRole = user?.roles?.toLowerCase();
    const allowed = allowedRoles.map((r) => r.toLowerCase());
    if (
      !user ||
      (allowedRoles.length > 0 && (!userRole || !allowed.includes(userRole)))
    ) {
      router.replace("/forbidden");
    }
  }, [user, allowedRoles, router]);
}
