import React from "react";
import { render, screen } from "@testing-library/react";
import StepsSection from "./StepsSection";

describe("StepsSection Component", () => {
  it("renders all steps with correct titles and descriptions", () => {
    render(<StepsSection />);

    const steps = [
      {
        title: "1. Seleccione un estilo",
        description: "Elija entre una selección de formas y tamaños de velas populares."
      },
      {
        title: "2. Elige una fragancia",
        description: "Encuentra su aroma favorito o elige la combinación perfecta."
      },
      {
        title: "3. Agregar una foto",
        description: "Sube uno que les encantará incluir en la etiqueta de la vela."
      },
      {
        title: "4. Crea un mensaje",
        description: "Escribe un mensaje desde el corazón para que tu foto brille."
      }
    ];

    steps.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
  });
});
