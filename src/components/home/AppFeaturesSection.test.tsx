import React from "react";
import { render, screen } from "@testing-library/react";
import AppFeaturesSection from "./AppFeaturesSection";

describe("AppFeaturesSection Component", () => {
  it("renders the section with correct title and description", () => {
    render(<AppFeaturesSection />);

    expect(screen.getByText("Satisfacción del cliente")).toBeInTheDocument();
    expect(screen.getByText("Siempre pensamos en tu seguridad y comodidad")).toBeInTheDocument();
  });

  it("renders the features with correct details", () => {
    render(<AppFeaturesSection />);

    // Chat en línea
    expect(screen.getByAltText("Chat en línea")).toBeInTheDocument();
    expect(screen.getByText("Chat en línea")).toBeInTheDocument();
    expect(screen.getByText("Escríbenos y déjanos saber tus inquietudes")).toBeInTheDocument();

    // Envío Gratis
    expect(screen.getByAltText("Envío Gratis")).toBeInTheDocument();
    expect(screen.getByText("Envío Gratis")).toBeInTheDocument();
    expect(screen.getByText("Si tus compras superan $300.000 el envío corre por nuestra cuenta")).toBeInTheDocument();

    // Compra Segura
    expect(screen.getByAltText("Compra Segura")).toBeInTheDocument();
    expect(screen.getByText("Compra Segura")).toBeInTheDocument();
    expect(screen.getByText("Compra sin preocuparte, nuestra pasarela de pagos es 100% segura")).toBeInTheDocument();
  });
});
