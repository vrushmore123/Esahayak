"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { FaFileExcel, FaSpinner } from "react-icons/fa";

type Buyer = {
  id: string;
  fullName: string;
  email?: string;
  phone: string;
  city: string;
  propertyType: string;
  bhk?: string;
  purpose: string;
  budgetMin?: number;
  budgetMax?: number;
  timeline: string;
  source: string;
  status: string;
  notes?: string;
  tags?: string[];
  updatedAt?: string;
};

export default function ImportExport() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/buyers")
      .then((res) => {
        // Ensure buyers is always an array
        if (Array.isArray(res.data)) {
          setBuyers(res.data);
        } else if (res.data && Array.isArray(res.data.data)) {
          setBuyers(res.data.data);
        } else {
          setBuyers([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching buyers:", err);
        setBuyers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const exportToExcel = () => {
    if (!buyers || buyers.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(buyers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Buyers");
    XLSX.writeFile(workbook, "buyers.xlsx");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Buyers List</h1>
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <FaFileExcel /> Export as Excel
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <FaSpinner className="animate-spin text-2xl text-teal-600" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border px-4 py-2">Full Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">City</th>
                <th className="border px-4 py-2">Property Type</th>
                <th className="border px-4 py-2">BHK</th>
                <th className="border px-4 py-2">Purpose</th>
                <th className="border px-4 py-2">Budget Min</th>
                <th className="border px-4 py-2">Budget Max</th>
                <th className="border px-4 py-2">Timeline</th>
                <th className="border px-4 py-2">Source</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Notes</th>
                <th className="border px-4 py-2">Tags</th>
                <th className="border px-4 py-2">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {(buyers || []).map((buyer) => (
                <tr
                  key={buyer.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="border px-4 py-2">{buyer.fullName}</td>
                  <td className="border px-4 py-2">{buyer.email || "-"}</td>
                  <td className="border px-4 py-2">{buyer.phone}</td>
                  <td className="border px-4 py-2">{buyer.city}</td>
                  <td className="border px-4 py-2">{buyer.propertyType}</td>
                  <td className="border px-4 py-2">{buyer.bhk || "-"}</td>
                  <td className="border px-4 py-2">{buyer.purpose}</td>
                  <td className="border px-4 py-2">{buyer.budgetMin ?? "-"}</td>
                  <td className="border px-4 py-2">{buyer.budgetMax ?? "-"}</td>
                  <td className="border px-4 py-2">{buyer.timeline}</td>
                  <td className="border px-4 py-2">{buyer.source}</td>
                  <td className="border px-4 py-2">{buyer.status}</td>
                  <td className="border px-4 py-2">{buyer.notes || "-"}</td>
                  <td className="border px-4 py-2">
                    {(buyer.tags || []).join(", ")}
                  </td>
                  <td className="border px-4 py-2">
                    {buyer.updatedAt
                      ? new Date(buyer.updatedAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
