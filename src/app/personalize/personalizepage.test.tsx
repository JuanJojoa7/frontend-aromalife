import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Personalize from "./page";

jest.mock("@/services/conceptual-category.service", () => ({
  fetchConceptualCategories: jest.fn(() => Promise.resolve([{ id: "1", name: "Category 1" }]))
}));

jest.mock("@/services/options.service", () => ({
  fetchOptionsByConceptualCategory: jest.fn(() => Promise.resolve([{ id: "1", name: "Option 1" }]))
}));

jest.mock("@/services/emotional-state.service", () => ({
  fetchEmotionalStatesByOption: jest.fn(() => Promise.resolve([{ id: "1", name: "Emotion 1" }]))
}));

jest.mock("@/services/fragrance.service", () => ({
  fetchFragrancesByEmotionalState: jest.fn(() => Promise.resolve([{ id: "1", name: "Fragrance 1" }]))
}));

jest.mock("@/services/container.service", () => ({
  fetchContainers: jest.fn(() => Promise.resolve([{ id: "1", name: "Container 1" }]))
}));

jest.mock("@/services/complementary-product.service", () => ({
  fetchComplementaryProducts: jest.fn(() => Promise.resolve([{ id: "1", name: "Complementary 1" }]))
}));

jest.mock("@/services/custom-candle.service", () => ({
  fetchBeautifyText: jest.fn(() => Promise.resolve({ text: "Embellecido" })),
  createCustomCandle: jest.fn(() => Promise.resolve())
}));

jest.mock("@/app/providers/user-context", () => ({
  useUser: jest.fn(() => ({ user: { id: "1", name: "Test User" } }))
}));

describe("Personalize", () => {
  it("debería renderizar correctamente la página inicial", async () => {
    render(<Personalize />);
    expect(screen.getByText("Personaliza tu experiencia")).toBeInTheDocument();
    expect(await screen.findByText("Category 1")).toBeInTheDocument();
  });

  it("debería avanzar al paso de opciones al seleccionar una categoría", async () => {
    render(<Personalize />);
    const categoryButton = await screen.findByText("Category 1");
    fireEvent.click(categoryButton);
    expect(await screen.findByText("Option 1")).toBeInTheDocument();
  });

  it("debería avanzar al paso de emociones al seleccionar una opción", async () => {
    render(<Personalize />);
    const categoryButton = await screen.findByText("Category 1");
    fireEvent.click(categoryButton);
    const optionButton = await screen.findByText("Option 1");
    fireEvent.click(optionButton);
    expect(await screen.findByText("Emotion 1")).toBeInTheDocument();
  });

  it("debería avanzar al paso de fragancias al seleccionar una emoción", async () => {
    render(<Personalize />);
    const categoryButton = await screen.findByText("Category 1");
    fireEvent.click(categoryButton);
    const optionButton = await screen.findByText("Option 1");
    fireEvent.click(optionButton);
    const emotionButton = await screen.findByText("Emotion 1");
    fireEvent.click(emotionButton);
    expect(await screen.findByText("Fragrance 1")).toBeInTheDocument();
  });

  it("debería avanzar al paso de personalización al seleccionar una fragancia", async () => {
    render(<Personalize />);
    const categoryButton = await screen.findByText("Category 1");
    fireEvent.click(categoryButton);
    const optionButton = await screen.findByText("Option 1");
    fireEvent.click(optionButton);
    const emotionButton = await screen.findByText("Emotion 1");
    fireEvent.click(emotionButton);
    const fragranceButton = await screen.findByText("Fragrance 1");
    fireEvent.click(fragranceButton);
    expect(await screen.findByText("Selecciona un Contenedor")).toBeInTheDocument();
  });

  it("debería mostrar el resumen del pedido al confirmar detalles", async () => {
    render(<Personalize />);
    const categoryButton = await screen.findByText("Category 1");
    fireEvent.click(categoryButton);
    const optionButton = await screen.findByText("Option 1");
    fireEvent.click(optionButton);
    const emotionButton = await screen.findByText("Emotion 1");
    fireEvent.click(emotionButton);
    const fragranceButton = await screen.findByText("Fragrance 1");
    fireEvent.click(fragranceButton);
    const confirmButton = await screen.findByText("Confirmar detalles");
    fireEvent.click(confirmButton);
    expect(await screen.findByText("Resumen del pedido")).toBeInTheDocument();
  });

  it("debería ejecutar un test básico", () => {
    expect(true).toBe(true);
  });
});
