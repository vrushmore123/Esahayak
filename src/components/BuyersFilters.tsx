"use client";

import React, { useState } from "react";
import { FaSearch, FaFilter, FaTimesCircle } from "react-icons/fa";

export default function BuyersFilters() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    city: "",
    propertyType: "",
    status: "",
    timeline: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Options for filter dropdowns
  const cityOptions = [
    "Chandigarh",
    "Mohali",
    "Zirakpur",
    "Panchkula",
    "Other",
  ];
  const propertyTypeOptions = [
    "Apartment",
    "Villa",
    "Plot",
    "Office",
    "Retail",
  ];
  const statusOptions = [
    "New",
    "Qualified",
    "Contacted",
    "Visited",
    "Negotiation",
    "Converted",
    "Dropped",
  ];
  const timelineOptions = ["0-3m", "3-6m", ">6m", "Exploring"];

  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      city: "",
      propertyType: "",
      status: "",
      timeline: "",
    });
    setSearch("");
  };

  // Check if any filters are active
  const hasActiveFilters =
    Object.values(filters).some((value) => value !== "") || search !== "";

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search input */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimesCircle />
            </button>
          )}
        </div>

        {/* Filter toggle button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 flex items-center gap-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <FaFilter
            className={showFilters ? "text-primary-600" : "text-gray-500"}
          />
          Filters
        </button>

        {/* Clear filters button (only shows when filters are active) */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Filter dropdowns (collapsible) */}
      {showFilters && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-md animate-fadeIn">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <select
              id="city"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">Any City</option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="propertyType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">Any Property</option>
              {propertyTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">Any Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="timeline"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={filters.timeline}
              onChange={handleFilterChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">Any Timeline</option>
              {timelineOptions.map((timeline) => (
                <option key={timeline} value={timeline}>
                  {timeline}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Active filters summary */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(filters).map(
            ([key, value]) =>
              value && (
                <div
                  key={key}
                  className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {key}: {value}
                  <button
                    onClick={() => setFilters({ ...filters, [key]: "" })}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    <FaTimesCircle size={14} />
                  </button>
                </div>
              )
          )}
          {search && (
            <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center">
              Search: {search}
              <button
                onClick={() => setSearch("")}
                className="ml-2 text-primary-600 hover:text-primary-800"
              >
                <FaTimesCircle size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
