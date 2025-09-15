"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaSave, FaTimes, FaPlus, FaSpinner } from "react-icons/fa";
import Link from "next/link";

// ---------------- Schema ----------------
const buyerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(80, "Name must be less than 80 characters"),
    email: z.string().email("Invalid email address").optional(),
    phone: z
      .string()
      .min(10, "Phone must be at least 10 digits")
      .max(15, "Phone must be less than 15 digits"),
    city: z.enum(["Chandigarh", "Mohali", "Zirakpur", "Panchkula", "Other"]),
    propertyType: z.enum(["Apartment", "Villa", "Plot", "Office", "Retail"]),
    bhk: z.enum(["1", "2", "3", "4", "Studio"]).optional(),
    purpose: z.enum(["Buy", "Rent"]),
    budgetMin: z.number().optional(),
    budgetMax: z.number().optional(),
    timeline: z.enum(["0-3m", "3-6m", ">6m", "Exploring"]),
    source: z.enum(["Website", "Referral", "Walk-in", "Call", "Other"]),
    status: z
      .enum([
        "New",
        "Qualified",
        "Contacted",
        "Visited",
        "Negotiation",
        "Converted",
        "Dropped",
      ])
      .optional() // ✅ allow undefined
      .default("New"),
    notes: z.string().max(1000).optional(),
    tags: z.array(z.string()).optional(),
    updatedAt: z.date().optional(),
  })
  .refine(
    (data) =>
      data.budgetMin && data.budgetMax ? data.budgetMax >= data.budgetMin : true,
    {
      message: "Maximum budget must be greater than or equal to minimum budget",
      path: ["budgetMax"],
    }
  );

type BuyerFormData = z.infer<typeof buyerSchema>;

// ---------------- Mock Fetch ----------------
const fetchBuyer = async (id: string): Promise<BuyerFormData> => {
  return {
    fullName: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    city: "Chandigarh",
    propertyType: "Apartment",
    bhk: "3",
    purpose: "Buy",
    budgetMin: 5000000,
    budgetMax: 7000000,
    timeline: "3-6m",
    source: "Website",
    status: "New",
    notes: "Looking for a property near the city center",
    tags: ["Urgent", "Premium"],
    updatedAt: new Date(),
  };
};

// ---------------- Component ----------------
export default function BuyerForm({
  mode,
  buyerId,
}: {
  mode: "create" | "edit";
  buyerId?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<BuyerFormData>({
    
  });

  const propertyType = watch("propertyType");
  const shouldShowBhk = propertyType === "Apartment" || propertyType === "Villa";

  useEffect(() => {
    if (mode === "edit" && buyerId) {
      setIsLoading(true);
      fetchBuyer(buyerId)
        .then((data) => {
          reset(data);
          if (data.tags) setTags(data.tags);
        })
        .finally(() => setIsLoading(false));
    }
  }, [mode, buyerId, reset]);

  const onSubmit = async (data: BuyerFormData) => {
    setIsSubmitting(true);
    data.tags = tags;
    data.updatedAt = new Date();
    try {
      console.log("Form data submitted:", data);
      await new Promise((r) => setTimeout(r, 1000));
      alert(
        mode === "create"
          ? "Buyer created successfully!"
          : "Buyer updated successfully!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------- Render ----------------
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-teal-600 text-4xl" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="block">Full Name *</label>
        <input
          type="text"
          {...register("fullName")}
          className="w-full border rounded p-2"
        />
        {errors.fullName && (
          <p className="text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block">Phone *</label>
        <input
          type="tel"
          {...register("phone")}
          className="w-full border rounded p-2"
        />
        {errors.phone && (
          <p className="text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block">Status</label>
        <select {...register("status")} className="w-full border rounded p-2">
          <option value="New">New</option>
          <option value="Qualified">Qualified</option>
          <option value="Contacted">Contacted</option>
          <option value="Visited">Visited</option>
          <option value="Negotiation">Negotiation</option>
          <option value="Converted">Converted</option>
          <option value="Dropped">Dropped</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-teal-600 text-white rounded"
      >
        {isSubmitting ? "Submitting..." : "Save"}
      </button>
    </form>
  );
}
