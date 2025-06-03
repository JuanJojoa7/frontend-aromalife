import React from "react";
import { render } from "@testing-library/react";
import ProductCategories from "./ProductCategories";
import StepsSection from "./StepsSection";

jest.mock("./StepsSection", () => jest.fn(() => <div>Mocked StepsSection</div>));

describe("ProductCategories Component", () => {
  it("renders the StepsSection component", () => {
    render(<ProductCategories />);

    expect(StepsSection).toHaveBeenCalledTimes(1);
  });
});
