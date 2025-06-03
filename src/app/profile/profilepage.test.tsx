import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import UserProfilePage from "./page";
import { useUser } from "@/app/providers/user-context";
import { changeUserPassword } from "@/services/user.service";

jest.mock("@/app/providers/user-context", () => ({
  useUser: jest.fn(() => ({
    user: { id: "1", name: "Test User", email: "test@example.com" },
    setUser: jest.fn(),
  })),
}));

jest.mock("@/services/user.service", () => ({
  changeUserPassword: jest.fn(() => Promise.resolve()),
}));

describe("UserProfilePage", () => {
  it("debería renderizar correctamente el perfil del usuario", () => {
    render(<UserProfilePage />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Cambiar Contraseña")).toBeInTheDocument();
  });

  it("debería mostrar errores si los campos de contraseña están vacíos al enviar el formulario", () => {
    render(<UserProfilePage />);
    fireEvent.click(screen.getByRole("button", { name: /guardar cambios/i }));
    expect(screen.getByText("La contraseña actual es obligatoria")).toBeInTheDocument();
    expect(screen.getByText("La nueva contraseña es obligatoria")).toBeInTheDocument();
    expect(screen.getByText("Debes confirmar la nueva contraseña")).toBeInTheDocument();
  });

  it("debería mostrar un error si las contraseñas nuevas no coinciden", () => {
    render(<UserProfilePage />);

    act(() => {
      fireEvent.change(screen.getByLabelText("Contraseña Actual"), {
        target: { value: "currentPassword" },
      });
      fireEvent.change(screen.getByLabelText("Nueva Contraseña"), {
        target: { value: "newPassword" },
      });
      fireEvent.change(screen.getByLabelText("Confirmar Nueva Contraseña"), {
        target: { value: "differentPassword" },
      });

      fireEvent.click(screen.getByText("Guardar Cambios"));
    });

    expect(screen.getByText("Las nuevas contraseñas no coinciden")).toBeInTheDocument();
  });

  it("debería llamar a changeUserPassword si el formulario es válido", async () => {
    const mockChangeUserPassword = require("@/services/user.service").changeUserPassword;
    render(<UserProfilePage />);

    fireEvent.change(screen.getByLabelText("Contraseña Actual"), {
      target: { value: "currentPassword" },
    });
    fireEvent.change(screen.getByLabelText("Nueva Contraseña"), {
      target: { value: "newPassword" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar Nueva Contraseña"), {
      target: { value: "newPassword" },
    });

    fireEvent.click(screen.getByText("Guardar Cambios"));

    expect(mockChangeUserPassword).toHaveBeenCalledWith({
      userId: "1",
      currentPassword: "currentPassword",
      newPassword: "newPassword",
    });
    await screen.findByText("Contraseña actualizada con éxito. Por seguridad, debes iniciar sesión nuevamente.");
  });

  it("debería mostrar un error general si changeUserPassword falla", async () => {
    const mockChangeUserPassword = require("@/services/user.service").changeUserPassword;
    mockChangeUserPassword.mockRejectedValue(new Error("Error al cambiar la contraseña"));

    render(<UserProfilePage />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Contraseña Actual"), {
        target: { value: "currentPassword" },
      });
      fireEvent.change(screen.getByLabelText("Nueva Contraseña"), {
        target: { value: "newPassword" },
      });
      fireEvent.change(screen.getByLabelText("Confirmar Nueva Contraseña"), {
        target: { value: "newPassword" },
      });

      fireEvent.click(screen.getByText("Guardar Cambios"));
    });

    expect(screen.getByText((content, element) => content.includes("Error al cambiar la contraseña"))).toBeInTheDocument();
  });

  it("debería ejecutar un test básico", () => {
    expect(true).toBe(true);
  });
});
