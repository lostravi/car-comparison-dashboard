"use client";
import React, { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatPrice } from "../utils/filters";
import { Star } from "lucide-react";

const CarCard = memo(({ car, isSelected, onToggleSelect }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 
        hover:shadow-lg ${
          isSelected ? "ring-2 ring-blue-600 scale-[1.02]" : ""
        }`}
    >
      <div className="relative">
        <LazyLoadImage
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex justify-between items-end">
            <h3 className="text-white font-semibold text-lg">
              {car.brand} {car.model}
            </h3>
            <div className="flex items-center bg-white/90 text-black px-2 py-1 rounded-md">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
              <span className="font-medium">{car.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xl font-bold text-blue-800">
            {formatPrice(car.price)}
          </span>
          <span className="text-gray-600">{car.year}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">Type:</span>
            <span className="font-medium">{car.bodyType}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">Fuel:</span>
            <span className="font-medium">{car.fuelType}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">HP:</span>
            <span className="font-medium">{car.horsepower}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-1">MPG:</span>
            <span className="font-medium">{car.fuelEconomy}</span>
          </div>
        </div>

        <button
          onClick={onToggleSelect}
          className={`w-full py-2 rounded-md font-medium transition-colors duration-200 
            ${
              isSelected
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {isSelected ? "Selected for Comparison" : "Select for Comparison"}
        </button>
      </div>
    </div>
  );
});

export default CarCard;
