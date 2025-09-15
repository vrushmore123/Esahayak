"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaEdit,
  FaEye,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEllipsisV,
} from "react-icons/fa";

// Mock data for demonstration
const mockBuyers = [
  {
    id: "1",
    fullName: "John Doe",
    phone: "+91 98765 43210",
    city: "Chandigarh",
    propertyType: "Apartment",
    budgetMin: 5000000,
    budgetMax: 7000000,
    timeline: "0-3m",
    status: "New",
    updatedAt: new Date("2023-05-15"),
  },
  {
    id: "2",
    fullName: "Jane Smith",
    phone: "+91 87654 32109",
    city: "Mohali",
    propertyType: "Villa",
    budgetMin: 8000000,
    budgetMax: 10000000,
    timeline: "3-6m",
    status: "Contacted",
    updatedAt: new Date("2023-05-12"),
  },
  {
    id: "3",
    fullName: "Raj Kumar",
    phone: "+91 76543 21098",
    city: "Zirakpur",
    propertyType: "Plot",
    budgetMin: 3000000,
    budgetMax: 4500000,
    timeline: ">6m",
    status: "Qualified",
    updatedAt: new Date("2023-05-10"),
  },
  // Add more mock data as needed
];

// Status color mapping
const statusColors = {
  New: "bg-blue-100 text-blue-800",
  Qualified: "bg-purple-100 text-purple-800",
  Contacted: "bg-yellow-100 text-yellow-800",
  Visited: "bg-indigo-100 text-indigo-800",
  Negotiation: "bg-orange-100 text-orange-800",
  Converted: "bg-green-100 text-green-800",
  Dropped: "bg-red-100 text-red-800",
};

export default function BuyersTable() {
  const [sortField, setSortField] = useState("updatedAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Sort handler
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Render sort icon
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <FaSort className="ml-1 text-gray-400" />;
    return sortDirection === "asc" ? (
      <FaSortUp className="ml-1 text-blue-600" />
    ) : (
      <FaSortDown className="ml-1 text-blue-600" />
    );
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort("fullName")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center">
                  Name {renderSortIcon("fullName")}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th
                onClick={() => handleSort("city")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center">
                  City {renderSortIcon("city")}
                </div>
              </th>
              <th
                onClick={() => handleSort("propertyType")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center">
                  Property Type {renderSortIcon("propertyType")}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget
              </th>
              <th
                onClick={() => handleSort("timeline")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center">
                  Timeline {renderSortIcon("timeline")}
                </div>
              </th>
              <th
                onClick={() => handleSort("status")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center">
                  Status {renderSortIcon("status")}
                </div>
              </th>
              <th
                onClick={() => handleSort("updatedAt")}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center">
                  Updated {renderSortIcon("updatedAt")}
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockBuyers.map((buyer) => (
              <tr key={buyer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {buyer.fullName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {buyer.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {buyer.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {buyer.propertyType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(buyer.budgetMin)} –{" "}
                  {formatCurrency(buyer.budgetMax)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {buyer.timeline}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusColors[buyer.status as keyof typeof statusColors]
                    }`}
                  >
                    {buyer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(buyer.updatedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <Link
                      href={`/buyers/${buyer.id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      href={`/buyers/${buyer.id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <FaEdit />
                    </Link>
                    <div className="relative group">
                      <button className="text-gray-500 hover:text-gray-700">
                        <FaEllipsisV />
                      </button>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-dropdown hidden group-hover:block z-10">
                        <div className="py-1">
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Change Status
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">20</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                &larr;
              </button>
              <button
                onClick={() => setPage(1)}
                className={`${
                  page === 1
                    ? "bg-primary-50 border-primary-500 text-primary-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
              >
                1
              </button>
              <button
                onClick={() => setPage(2)}
                className={`${
                  page === 2
                    ? "bg-primary-50 border-primary-500 text-primary-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
              >
                2
              </button>
              <button
                onClick={() => setPage(page + 1)}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                &rarr;
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
