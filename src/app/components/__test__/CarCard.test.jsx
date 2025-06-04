// import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CarCard from "../CarCard";

// Mock car data for testing
const mockCar = {
  brand: "Toyota",
  model: "Camry",
  image: "https://example.com/car.jpg",
  rating: 4.5,
  price: 25000,
  year: 2023,
  bodyType: "Sedan",
  fuelType: "Petrol",
  horsepower: 203,
  fuelEconomy: "30 MPG",
};

describe("CarCard Component", () => {
  test("renders car details correctly", () => {
    render(
      <CarCard car={mockCar} isSelected={false} onToggleSelect={jest.fn()} />
    );
    expect(screen.getByText("Toyota Camry")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  test("shows selected state when car is selected", () => {
    render(
      <CarCard car={mockCar} isSelected={true} onToggleSelect={jest.fn()} />
    );
    expect(screen.getByText("Selected for Comparison")).toBeInTheDocument();
  });
});
