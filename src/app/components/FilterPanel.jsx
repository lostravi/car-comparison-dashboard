"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";

const FilterPanel = ({
  filters,
  onFilterChange,
  sortOption,
  onSortChange,
  availableBrands,
  availableBodyTypes,
  availableFuelTypes,
  minMaxPrice,
  minMaxYear,
  resetFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePriceChange = (index, value) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = value;
    onFilterChange({ ...filters, priceRange: newPriceRange });
  };

  const handleYearChange = (index, value) => {
    const newYearRange = [...filters.yearRange];
    newYearRange[index] = value;
    onFilterChange({ ...filters, yearRange: newYearRange });
  };

  const handleBrandChange = (brand, checked) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter((b) => b !== brand);
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleBodyTypeChange = (type, checked) => {
    const newBodyTypes = checked
      ? [...filters.bodyTypes, type]
      : filters.bodyTypes.filter((t) => t !== type);
    onFilterChange({ ...filters, bodyTypes: newBodyTypes });
  };

  const handleFuelTypeChange = (type, checked) => {
    const newFuelTypes = checked
      ? [...filters.fuelTypes, type]
      : filters.fuelTypes.filter((t) => t !== type);
    onFilterChange({ ...filters, fuelTypes: newFuelTypes });
  };

  const handleRatingChange = (value) => {
    onFilterChange({ ...filters, minRating: value });
  };

  const formatPriceLabel = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-6">
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <SlidersHorizontal className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold">Filters & Sorting</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              resetFilters();
            }}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <X className="w-4 h-4 mr-1" />
            Reset
          </button>
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 pt-0 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Price Range Slider */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Price Range</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{formatPriceLabel(filters.priceRange[0])}</span>
                  <span>{formatPriceLabel(filters.priceRange[1])}</span>
                </div>
                <input
                  type="range"
                  min={minMaxPrice[0]}
                  max={minMaxPrice[1]}
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    handlePriceChange(0, parseInt(e.target.value))
                  }
                  className="w-full accent-blue-600"
                />
                <input
                  type="range"
                  min={minMaxPrice[0]}
                  max={minMaxPrice[1]}
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    handlePriceChange(1, parseInt(e.target.value))
                  }
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            {/* Year Range */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Year</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{filters.yearRange[0]}</span>
                  <span>{filters.yearRange[1]}</span>
                </div>
                <input
                  type="range"
                  min={minMaxYear[0]}
                  max={minMaxYear[1]}
                  value={filters.yearRange[0]}
                  onChange={(e) =>
                    handleYearChange(0, parseInt(e.target.value))
                  }
                  className="w-full accent-blue-600"
                />
                <input
                  type="range"
                  min={minMaxYear[0]}
                  max={minMaxYear[1]}
                  value={filters.yearRange[1]}
                  onChange={(e) =>
                    handleYearChange(1, parseInt(e.target.value))
                  }
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Sort By</h3>
              <select
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: Best First</option>
                <option value="year-desc">Year: Newest First</option>
              </select>
            </div>

            {/* Min Rating */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">
                Min Rating: {filters.minRating}
              </h3>
              <input
                type="range"
                min={0}
                max={5}
                step={0.1}
                value={filters.minRating}
                onChange={(e) => handleRatingChange(parseFloat(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Brands */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Brands</h3>
              <div className="max-h-40 overflow-y-auto space-y-1 pr-2">
                {availableBrands.map((brand) => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onChange={(e) =>
                        handleBrandChange(brand, e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Body Types */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Body Types</h3>
              <div className="max-h-40 overflow-y-auto space-y-1 pr-2">
                {availableBodyTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`type-${type}`}
                      checked={filters.bodyTypes.includes(type)}
                      onChange={(e) =>
                        handleBodyTypeChange(type, e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`type-${type}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Fuel Types */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Fuel Types</h3>
              <div className="max-h-40 overflow-y-auto space-y-1 pr-2">
                {availableFuelTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`fuel-${type}`}
                      checked={filters.fuelTypes.includes(type)}
                      onChange={(e) =>
                        handleFuelTypeChange(type, e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`fuel-${type}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
