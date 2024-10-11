// Heart.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Heart from "./heart";


describe("Heart component", () => {
  test("renders the heart icon", () => {
    render(<Heart />);
    expect(screen.getByTestId("heart")).toBeInTheDocument();    
  });
});
