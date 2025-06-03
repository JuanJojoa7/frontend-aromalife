import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Page from "./page";

import "jest";
import "@testing-library/jest-dom";

jest.mock("../../../components/register/RegisterPage", () => () => (
  <div data-testid="register-page">Register Page Component</div>
));

describe("Register Page", () => {
  it("debería renderizar el componente RegisterPage", () => {
    render(<Page />);
    const registerPage = screen.getByTestId("register-page");
    expect(registerPage).toBeInTheDocument();
  });
});