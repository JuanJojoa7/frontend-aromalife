import React from "react";
import { render, screen } from "@testing-library/react";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";

describe("FloatingWhatsAppButton Component", () => {
  it("renders the WhatsApp button with correct attributes", () => {
    render(<FloatingWhatsAppButton />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "https://wa.me/573126986165");
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");

    const imgElement = screen.getByAltText("WhatsApp");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "/images/whatsapp-icon.png");
  });

  it("applies correct styles to the button", () => {
    render(<FloatingWhatsAppButton />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveStyle({
      position: "fixed",
      bottom: "20px",
      right: "40px",
      zIndex: "1000",
    });
  });
});
