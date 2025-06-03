import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./page";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/providers/user-context";
import { loginUser } from "@/services/auth.service";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("@/app/providers/user-context", () => ({
  useUser: jest.fn(() => ({
    setUser: jest.fn(),
  })),
}));

jest.mock("@/services/auth.service", () => ({
  loginUser: jest.fn(),
}));

describe("LoginPage", () => {
  it("debería renderizar correctamente el título y subtítulo", () => {
    render(<LoginPage />);
    expect(screen.getByText("Bienvenido")).toBeInTheDocument();
    expect(screen.getByText("Inicia sesión en tu cuenta")).toBeInTheDocument();
  });

  it("debería mostrar errores si los campos están vacíos al enviar el formulario", () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
    expect(screen.getByText("El correo electrónico es obligatorio")).toBeInTheDocument();
    expect(screen.getByText("La contraseña es obligatoria")).toBeInTheDocument();
  });

  it("debería llamar a loginUser y redirigir si el formulario es válido", async () => {
    const mockPush = jest.fn();
    const mockSetUser = jest.fn();
    const mockLoginUser = jest.fn().mockResolvedValue({
      token: "mockToken",
      user: { name: "Mock User" },
    });

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useUser as jest.Mock).mockReturnValue({ setUser: mockSetUser });
    (loginUser as jest.Mock).mockImplementation(mockLoginUser);

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("nombre@ejemplo.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(mockLoginUser).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    await screen.findByText("Bienvenido");
    expect(mockSetUser).toHaveBeenCalledWith({ name: "Mock User" });
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("debería mostrar un error si loginUser falla", async () => {
    const mockLoginUser = jest.fn().mockRejectedValue(new Error("Credenciales inválidas"));
    (loginUser as jest.Mock).mockImplementation(mockLoginUser);

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("nombre@ejemplo.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    await screen.findByText("Credenciales inválidas");
    expect(screen.getByText("Credenciales inválidas")).toBeInTheDocument();
  });

  it("debería ejecutar un test básico", () => {
    expect(true).toBe(true);
  });
});
