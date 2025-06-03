import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Subscription from "./page";

describe("Subscription Page", () => {
  it("renders the hero section with correct text", () => {
    render(<Subscription />);

    expect(screen.getByText("Descubre tu ritual aromático mensual")).toBeInTheDocument();
    expect(screen.getByText("Velas artesanales personalizadas según tus emociones")).toBeInTheDocument();
  });

  it("renders subscription plans with correct details", () => {
    render(<Subscription />);

    expect(screen.getByText("Plan Esencial")).toBeInTheDocument();
    expect(screen.getByText("1 vela artesanal mensual")).toBeInTheDocument();
    expect(screen.getByText("Personalización básica")).toBeInTheDocument();
    expect(screen.getByText("Envío gratis")).toBeInTheDocument();

    const essentialPlanPrice = screen.getAllByText("$29.99").find((element) =>
      element.textContent?.includes("/mes")
    );
    expect(essentialPlanPrice).toBeInTheDocument();

    expect(screen.getByText("Plan Premium")).toBeInTheDocument();
    const premiumPlanPrice = screen.getAllByText("$49.99").find((element) =>
      element.textContent?.includes("/mes")
    );
    expect(premiumPlanPrice).toBeInTheDocument();

    expect(screen.getByText("Plan Exclusivo")).toBeInTheDocument();
    const exclusivePlanPrice = screen.getAllByText("$79.99").find((element) =>
      element.textContent?.includes("/mes")
    );
    expect(exclusivePlanPrice).toBeInTheDocument();
  });

  it("renders benefits section with correct details", () => {
    render(<Subscription />);

    expect(screen.getByText("Personalización IA")).toBeInTheDocument();
    expect(screen.getByText("Velas diseñadas según tus preferencias y estado de ánimo")).toBeInTheDocument();

    expect(screen.getByText("Experiencia Sensorial")).toBeInTheDocument();
    expect(screen.getByText("Fragancias exclusivas creadas por expertos aromáticos")).toBeInTheDocument();

    expect(screen.getByText("Contenido Exclusivo")).toBeInTheDocument();
    expect(screen.getByText("Acceso a playlists y contenido inspiracional")).toBeInTheDocument();
  });

  it("toggles FAQ items correctly", () => {
    render(<Subscription />);

    const faqItem1Button = screen.getByText("¿Cómo funciona la suscripción?");
    fireEvent.click(faqItem1Button);
    expect(screen.getByText("Recibirás mensualmente velas personalizadas según tus preferencias.")).toBeInTheDocument();

    fireEvent.click(faqItem1Button);
    expect(screen.queryByText("Recibirás mensualmente velas personalizadas según tus preferencias.")).not.toBeInTheDocument();

    const faqItem2Button = screen.getByText("¿Puedo cancelar en cualquier momento?");
    fireEvent.click(faqItem2Button);
    expect(screen.getByText("Sí, puedes cancelar tu suscripción cuando lo desees sin compromiso.")).toBeInTheDocument();

    fireEvent.click(faqItem2Button);
    expect(screen.queryByText("Sí, puedes cancelar tu suscripción cuando lo desees sin compromiso.")).not.toBeInTheDocument();
  });
});
