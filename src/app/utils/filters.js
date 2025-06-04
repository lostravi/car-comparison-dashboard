"use client";
export const filterCars = (cars, filters) => {
  return cars.filter((car) => {
    // Price range filter
    if (
      car.price < filters.priceRange[0] ||
      car.price > filters.priceRange[1]
    ) {
      return false;
    }

    // Year range filter
    if (car.year < filters.yearRange[0] || car.year > filters.yearRange[1]) {
      return false;
    }

    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(car.brand)) {
      return false;
    }

    // Body type filter
    if (
      filters.bodyTypes.length > 0 &&
      !filters.bodyTypes.includes(car.bodyType)
    ) {
      return false;
    }

    // Fuel type filter
    if (
      filters.fuelTypes.length > 0 &&
      !filters.fuelTypes.includes(car.fuelType)
    ) {
      return false;
    }

    // Rating filter
    if (car.rating < filters.minRating) {
      return false;
    }

    return true;
  });
};

export const sortCars = (cars, sortOption) => {
  const sortedCars = [...cars];

  switch (sortOption) {
    case "price-asc":
      return sortedCars.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sortedCars.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return sortedCars.sort((a, b) => b.rating - a.rating);
    case "year-desc":
      return sortedCars.sort((a, b) => b.year - a.year);
    default:
      return sortedCars;
  }
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatNumber = (value, suffix = "") => {
  return `${value.toLocaleString()}${suffix ? ` ${suffix}` : ""}`;
};
