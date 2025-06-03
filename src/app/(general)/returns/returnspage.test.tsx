import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReturnsPage from "./page";

jest.mock("next/navigation", () => {
  const backMock = jest.fn();
  return {
    useRouter: () => ({
      back: backMock,
    }),
    __mockBack: backMock, // Expose the mock for assertions
  };
});

describe("ReturnsPage", () => {
  it("debería renderizar correctamente el título principal", () => {
    render(<ReturnsPage />);
    const title = screen.getByText("NUESTRAS ACTUALIZACIONES DE POLÍTICA");
    expect(title).toBeInTheDocument();
  });

  it("debería renderizar el botón de volver", () => {
    render(<ReturnsPage />);
    const backButton = screen.getByRole("button", { name: /volver/i });
    expect(backButton).toBeInTheDocument();
  });

  it("debería llamar a router.back() al hacer clic en el botón de volver", async () => {
    const { __mockBack } = require("next/navigation");
    render(<ReturnsPage />);
    const backButton = screen.getByRole("button", { name: /volver/i });
    await userEvent.click(backButton);
    expect(__mockBack).toHaveBeenCalled();
  });
});
