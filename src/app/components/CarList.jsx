"use client";
import React from "react";
import CarCard from "./CarCard";

const CarList = ({ cars, selectedCarIds, onToggleSelect }) => {
  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-gray-400 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No cars match your filters
        </h3>
        <p className="text-gray-500 max-w-md">
          Try adjusting your filter criteria or resetting the filters to see
          more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isSelected={selectedCarIds.includes(car.id)}
          onToggleSelect={() => onToggleSelect(car.id)}
        />
      ))}
    </div>
  );
};

export default CarList;
