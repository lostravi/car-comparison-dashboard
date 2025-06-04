"use client";
import React from "react";
import { formatNumber } from "../utils/filters";
import { X, Star } from "lucide-react";

const ComparisonView = ({ selectedCars, onRemoveCar, onCloseComparison }) => {
  if (selectedCars.length === 0) return null;

  const isBestSpec = (key, value, isHigherBetter = true) => {
    if (selectedCars.length < 2) return false;

    const values = selectedCars.map((car) => car[key]);

    if (isHigherBetter) {
      return value === Math.max(...values);
    } else {
      return value === Math.min(...values);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg border-t border-gray-200 z-50 overflow-auto max-h-[80vh]">
      <div className="sticky top-0 bg-blue-700 text-white px-4 py-3 flex justify-between items-center">
        <h2 className="text-xl font-bold">Car Comparison</h2>
        <button
          onClick={onCloseComparison}
          className="p-1 hover:bg-blue-600 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-4 px-6 text-left font-semibold text-gray-600 w-48">
                Specification
              </th>
              {selectedCars.map((car) => (
                <th
                  key={car.id}
                  className="py-4 px-6 text-center relative min-w-[250px]"
                >
                  <div className="relative">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <button
                      onClick={() => onRemoveCar(car.id)}
                      className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="font-bold text-lg">
                    {car.brand} {car.model}
                  </div>
                  <div className="text-sm text-gray-600">{car.year}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Price", key: "price", lowerIsBetter: true },
              { label: "Rating", key: "rating" },
              { label: "Body Type", key: "bodyType", plain: true },
              { label: "Fuel Type", key: "fuelType", plain: true },
              { label: "Transmission", key: "transmission", plain: true },
              {
                label: "Engine Size",
                key: "engineSize",
                format: (val) => (val > 0 ? `${val}L` : "Electric"),
              },
              {
                label: "Horsepower",
                key: "horsepower",
                format: (val) => formatNumber(val, "hp"),
              },
              {
                label: "Torque",
                key: "torque",
                format: (val) => formatNumber(val, "lb-ft"),
              },
              {
                label: "0-60 mph",
                key: "acceleration",
                lowerIsBetter: true,
                format: (val) => formatNumber(val, "sec"),
              },
              {
                label: "Top Speed",
                key: "topSpeed",
                format: (val) => formatNumber(val, "mph"),
              },
              {
                label: "Fuel Economy",
                key: "fuelEconomy",
                format: (val, car) =>
                  formatNumber(
                    val,
                    car.fuelType === "Electric" ? "MPGe" : "MPG"
                  ),
              },
              {
                label: "Weight",
                key: "weight",
                lowerIsBetter: true,
                format: (val) => formatNumber(val, "kg"),
              },
            ].map((spec) => (
              <tr key={spec.label} className="border-t border-gray-200">
                <td className="py-4 px-6 font-medium text-gray-800 bg-gray-50">
                  {spec.label}
                </td>
                {selectedCars.map((car) => {
                  const value = car[spec.key];
                  const highlight =
                    !spec.plain &&
                    isBestSpec(spec.key, value, !spec.lowerIsBetter);
                  const displayValue = spec.format
                    ? spec.format(value, car)
                    : value;

                  return (
                    <td
                      key={car.id}
                      className={`py-4 px-6 text-center ${
                        highlight ? "bg-green-50 font-semibold" : ""
                      }`}
                    >
                      {spec.key === "rating" ? (
                        <div className="flex items-center justify-center">
                          <span className="mr-1">{value}</span>
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        </div>
                      ) : (
                        displayValue
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            <tr className="border-t border-gray-200">
              <td className="py-4 px-6 font-medium text-gray-800 bg-gray-50">
                Dimensions
              </td>
              {selectedCars.map((car) => (
                <td key={car.id} className="py-4 px-6 text-center">
                  <div>{formatNumber(car.dimensions.length, "mm")} L</div>
                  <div>{formatNumber(car.dimensions.width, "mm")} W</div>
                  <div>{formatNumber(car.dimensions.height, "mm")} H</div>
                </td>
              ))}
            </tr>

            <tr className="border-t border-gray-200">
              <td className="py-4 px-6 font-medium text-gray-800 bg-gray-50">
                Available Colors
              </td>
              {selectedCars.map((car) => (
                <td key={car.id} className="py-4 px-6 text-center">
                  <div className="flex flex-wrap justify-center gap-1">
                    {car.colors.map((color) => (
                      <span
                        key={color}
                        style={{
                          backgroundColor: color,
                          border: "1px solid gray",
                        }}
                        title={color}
                        className="w-8 h-8 px-2 py-1 rounded-full text-xs border-gray-50"
                      >
                        {/* {color} */}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonView;
