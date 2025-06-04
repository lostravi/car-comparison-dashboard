"use client";
import React, {
  useState,
  Suspense,
  lazy,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import {
  cars,
  getMinMaxPrice,
  getMinMaxYear,
  getAllBrands,
  getAllBodyTypes,
  getAllFuelTypes,
} from "../data/cars";
import { filterCars, sortCars } from "../utils/filters";
import Header from "./Header";
import FilterPanel from "./FilterPanel";
import CarList from "./CarList";
const ComparisonView = lazy(() => import("./ComparisonView"));

function App() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  // Filter state
  const [filters, setFilters] = useState({
    priceRange: getMinMaxPrice(),
    brands: [],
    bodyTypes: [],
    fuelTypes: [],
    yearRange: getMinMaxYear(),
    minRating: 0,
  });
  // Sort state
  const [sortOption, setSortOption] = useState("price-asc");

  // Comparison state
  const [selectedCarIds, setSelectedCarIds] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  // Filter and sort cars when filters or sort option changes

  const filteredCars = useMemo(() => {
    const filtered = filterCars(cars, filters);
    return sortCars(filtered, sortOption);
  }, [filters, sortOption]);

  // Toggle car selection
  const handleToggleSelect = useCallback((carId) => {
    setSelectedCarIds((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      } else {
        // Limit to 4 cars for comparison
        if (prev.length >= 5) {
          // Remove the first car and add the new one
          return [...prev.slice(1), carId];
        }
        return [...prev, carId];
      }
    });
  }, []);

  // Get selected cars for comparison
  const selectedCars = cars.filter((car) => selectedCarIds.includes(car.id));

  // Reset filters to default
  const resetFilters = () => {
    setFilters({
      priceRange: getMinMaxPrice(),
      brands: [],
      bodyTypes: [],
      fuelTypes: [],
      yearRange: getMinMaxYear(),
      minRating: 0,
    });
    setSortOption("price-asc");
  };

  // Remove car from comparison
  const handleRemoveCar = (carId) => {
    setSelectedCarIds((prev) => prev.filter((id) => id !== carId));

    if (selectedCarIds.length === 1) {
      setShowComparison(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header
        selectedCarCount={selectedCarIds.length}
        onOpenComparison={() => setShowComparison(true)}
      />
      <main className="container mx-auto px-4 py-8">
        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          sortOption={sortOption}
          onSortChange={setSortOption}
          availableBrands={getAllBrands()}
          availableBodyTypes={getAllBodyTypes()}
          availableFuelTypes={getAllFuelTypes()}
          minMaxPrice={getMinMaxPrice()}
          minMaxYear={getMinMaxYear()}
          resetFilters={resetFilters}
        />
        {/* Car List */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredCars.length} {filteredCars.length === 1 ? "Car" : "Cars"}{" "}
              Available
            </h2>
            {selectedCarIds.length > 0 && (
              <button
                onClick={() => setShowComparison(true)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Compare Selected ({selectedCarIds.length})
              </button>
            )}
          </div>

          <CarList
            cars={filteredCars}
            selectedCarIds={selectedCarIds}
            onToggleSelect={handleToggleSelect}
          />
        </div>
      </main>
      {/* Car Comparison View */}
      {showComparison && (
        <Suspense fallback={<div>Loading Comparison...</div>}>
          <ComparisonView
            selectedCars={selectedCars}
            onRemoveCar={handleRemoveCar}
            onCloseComparison={() => setShowComparison(false)}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
