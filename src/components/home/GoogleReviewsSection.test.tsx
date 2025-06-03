import React from "react";
import { render, screen } from "@testing-library/react";
import GoogleReviewsSection from "./GoogleReviewsSection";

describe("GoogleReviewsSection Component", () => {
  it("renders the section with correct title and description", () => {
    render(<GoogleReviewsSection />);

    expect(screen.getByText("EXCELENTE")).toBeInTheDocument();
    expect(screen.getByText("A base de 217 reseñas")).toBeInTheDocument();
    expect(screen.getByAltText("Google")).toBeInTheDocument();
  });

  it("renders the stars correctly", () => {
    render(<GoogleReviewsSection />);

    const headerStars = screen.getByText("EXCELENTE").parentElement?.querySelectorAll("img[alt='Estrella']");
    expect(headerStars).toHaveLength(25); // Verifies 5 stars are rendered in the header
  });

  it("renders review cards with correct details", () => {
    render(<GoogleReviewsSection />);

    // Review Card 1
    expect(screen.getByAltText("Nancy Perez")).toBeInTheDocument();
    expect(screen.getByText("Nancy Perez")).toBeInTheDocument();
    expect(screen.getByText("Excelente servicio y puntualidad")).toBeInTheDocument();

    // Review Card 2
    expect(screen.getByAltText("Carolina Garcia Mafla")).toBeInTheDocument();
    expect(screen.getByText("Carolina Garcia Mafla")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Súper recomendadisimo !! La atención a cada detalle y asesoría fueron excelentes y las velas divinas!! Mi pedido fue de velas para Baby Shower..."
      )
    ).toBeInTheDocument();

    // Review Card 3
    expect(screen.getByAltText("Jose Rubio")).toBeInTheDocument();
    expect(screen.getByText("Jose Rubio")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Muy agradecido con la compra, el producto llegó igual como lo habíamos solicitado y en el tiempo estimado, gracias Dios los bendiga."
      )
    ).toBeInTheDocument();

    // Review Card 4
    expect(screen.getByAltText("Monica Alfonso Buitrago")).toBeInTheDocument();
    expect(screen.getByText("Monica Alfonso Buitrago")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Que buen servicio que recibí de parte de ustedes, muy buena atención al cliente, un producto de mucha calidad, en tiempo y ajustado en su precio. Mil gracias por todo."
      )
    ).toBeInTheDocument();
  });
});
