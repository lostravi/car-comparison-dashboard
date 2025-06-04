"use client";
import React from "react";
import { Car } from "lucide-react";

const Header = ({ selectedCarCount, onOpenComparison }) => {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Car className="w-8 h-8 mr-3" />
            <h1 className="text-2xl font-bold">Car Comparison Dashboard</h1>
          </div>

          {selectedCarCount > 0 && (
            <button
              onClick={onOpenComparison}
              className="bg-white text-blue-700 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition-colors flex items-center"
            >
              <span>Compare {selectedCarCount} Cars</span>
              <span className="ml-2 bg-blue-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {selectedCarCount}
              </span>
            </button>
          )}
        </div>

        <div className="mt-6 text-center md:text-left max-w-2xl">
          <p className="text-blue-100">
            Find the perfect car by comparing detailed specifications
            side-by-side. Select multiple vehicles to see how they measure up
            against each other.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
