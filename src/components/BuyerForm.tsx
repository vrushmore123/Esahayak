"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaSave, FaTimes, FaPlus, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

// Define the validation schema using Zod
const buyerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(80, "Name must be less than 80 characters"),
    email: z
      .string()
      .email("Invalid email address")
      .optional()
      .or(z.literal("")),
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
      .default("New"),
    notes: z
      .string()
      .max(1000, "Notes must be less than 1000 characters")
      .optional()
      .or(z.literal("")),
    tags: z.string().optional(),
    updatedAt: z.date().optional(),
    ownerId: z.string().uuid(),
  })
  .refine(
    (data) => {
      // If both budgets are provided, ensure max >= min
      if (data.budgetMin && data.budgetMax) {
        return data.budgetMax >= data.budgetMin;
      }
      return true;
    },
    {
      message: "Maximum budget must be greater than or equal to minimum budget",
      path: ["budgetMax"],
    }
  );

type BuyerFormData = z.infer<typeof buyerSchema>;

// Function to fetch buyer data for edit mode
const fetchBuyerData = async (buyerId: string) => {
  try {
    const response = await axios.get(`/api/buyers/${buyerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching buyer data:", error);
    throw error;
  }
};

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
  const router = useRouter();

  // Set up react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BuyerFormData>({
    resolver: zodResolver(buyerSchema),
    defaultValues: {
      status: "New",
      tags: "",
      ownerId: "user-id-placeholder", // You'll need to replace this with actual user ID
    },
  });

  // Watch property type to conditionally show BHK field
  const propertyType = watch("propertyType");
  const shouldShowBhk =
    propertyType === "Apartment" || propertyType === "Villa";

  // Fetch buyer data for edit mode
  useEffect(() => {
    if (mode === "edit" && buyerId) {
      const loadBuyerData = async () => {
        setIsLoading(true);
        try {
          const data = await fetchBuyerData(buyerId);
          reset(data);
          if (data.tags) {
            setTags(data.tags.split(",").filter((tag: string) => tag !== ""));
          }
        } catch (error) {
          console.error("Failed to load buyer data:", error);
          alert("Failed to load buyer data");
        } finally {
          setIsLoading(false);
        }
      };

      loadBuyerData();
    }
  }, [mode, buyerId, reset]);

  // Handle form submission
  const onSubmit = async (data: BuyerFormData) => {
    setIsSubmitting(true);

    // Add tags to form data
    data.tags = tags.join(",");

    // Set timestamps
    data.updatedAt = new Date();

    try {
      if (mode === "create") {
        await axios.post("/api/buyers", data);
        alert("Buyer created successfully!");
      } else {
        await axios.put(`/api/buyers/${buyerId}`, data);
        alert("Buyer updated successfully!");
      }

      // Redirect to buyers list
      router.push("/buyers");
      router.refresh(); // Refresh the page to show updated data
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert(
        `Error submitting form: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle adding tags
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue("tags", newTags.join(","), { shouldValidate: true });
      setTagInput("");
    }
  };

  // Handle removing tags
  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue("tags", newTags.join(","), { shouldValidate: true });
  };

  // Handle key press in tag input
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/20 dark:to-gray-900 rounded-xl shadow-md p-8">
        <div className="text-center">
          <FaSpinner className="animate-spin text-teal-600 text-4xl mx-auto mb-4" />
          <p className="text-teal-800 dark:text-teal-200">
            Loading buyer data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-teal-50 to-white dark:from-teal-900/20 dark:to-gray-900 rounded-xl shadow-lg p-8 mb-8">
      <div className="mb-8 pb-6 border-b border-teal-100 dark:border-teal-800/30 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-teal-900 dark:text-teal-100">
            {mode === "create" ? "Create New Buyer" : "Edit Buyer"}
          </h2>
          <p className="text-teal-700 dark:text-teal-300 mt-1">
            {mode === "create"
              ? "Add a new buyer to your leads database"
              : "Update existing buyer information"}
          </p>
        </div>
        <Link
          href="/buyers"
          className="px-4 py-2 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-800/30 rounded-lg transition-colors flex items-center gap-2"
        >
          <FaTimes /> Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Form sections */}
        <div className="bg-white/50 dark:bg-gray-800/30 rounded-lg p-6 shadow-sm border border-teal-100 dark:border-teal-900/30">
          <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-200 mb-4 flex items-center">
            <span className="bg-teal-100 dark:bg-teal-800/50 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-teal-600 dark:text-teal-300">
              1
            </span>
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
              >
                Full Name *
              </label>
              <div className="relative">
                <input
                  id="fullName"
                  type="text"
                  {...register("fullName")}
                  className={`w-full rounded-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 pl-3 ${
                    errors.fullName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
              >
                Email (Optional)
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`w-full rounded-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
              >
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className={`w-full rounded-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
                placeholder="9876543210"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
              >
                City *
              </label>
              <select
                id="city"
                {...register("city")}
                className={`w-full rounded-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  errors.city
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <option value="">Select City</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Mohali">Mohali</option>
                <option value="Zirakpur">Zirakpur</option>
                <option value="Panchkula">Panchkula</option>
                <option value="Other">Other</option>
              </select>
              {errors.city && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Property Requirements */}
        <div className="bg-white/50 dark:bg-gray-800/30 rounded-lg p-6 shadow-sm border border-teal-100 dark:border-teal-900/30">
          <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-200 mb-4 flex items-center">
            <span className="bg-teal-100 dark:bg-teal-800/50 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-teal-600 dark:text-teal-300">
              2
            </span>
            Property Requirements
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Property Type */}
            <div>
              <label
                htmlFor="propertyType"
                className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
              >
                Property Type *
              </label>
              <select
                id="propertyType"
                {...register("propertyType")}
                className={`w-full rounded-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  errors.propertyType
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <option value="">Select Property Type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Office">Office</option>
                <option value="Retail">Retail</option>
              </select>
              {errors.propertyType && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.propertyType.message}
                </p>
              )}
            </div>

            {/* BHK (conditional) */}
            {shouldShowBhk && (
              <div>
                <label
                  htmlFor="bhk"
                  className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
                >
                  BHK *
                </label>
                <select
                  id="bhk"
                  {...register("bhk")}
                  className={`w-full rounded-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                    errors.bhk
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                >
                  <option value="">Select BHK</option>
                  <option value="Studio">Studio</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                </select>
                {errors.bhk && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.bhk.message}
                  </p>
                )}
              </div>
            )}

            {/* Purpose */}
            <div>
              <label
                htmlFor="purpose"
                className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
              >
                Purpose *
              </label>
              <select
                id="purpose"
                {...register("purpose")}
                className={`w-full rounded-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  errors.purpose
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <option value="">Select Purpose</option>
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
              </select>
              {errors.purpose && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.purpose.message}
                </p>
              )}
            </div>

            {/* Timeline */}
            <div>
              <label
                htmlFor="timeline"
                className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
              >
                Timeline *
              </label>
              <select
                id="timeline"
                {...register("timeline")}
                className={`w-full rounded-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  errors.timeline
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <option value="">Select Timeline</option>
                <option value="0-3m">0-3 months</option>
                <option value="3-6m">3-6 months</option>
                <option value=">6m">More than 6 months</option>
                <option value="Exploring">Just exploring</option>
              </select>
              {errors.timeline && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.timeline.message}
                </p>
              )}
            </div>

            {/* Budget Min */}
            <div>
              <label
                htmlFor="budgetMin"
                className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
              >
                Budget Min (INR)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-teal-500 dark:text-teal-400">₹</span>
                </div>
                <Controller
                  name="budgetMin"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="budgetMin"
                      type="number"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      value={field.value || ""}
                      className={`w-full rounded-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 pl-8 ${
                        errors.budgetMin
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                      placeholder="5000000"
                    />
                  )}
                />
              </div>
              {errors.budgetMin && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.budgetMin.message}
                </p>
              )}
            </div>

            {/* Budget Max */}
            <div>
              <label
                htmlFor="budgetMax"
                className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
              >
                Budget Max (INR)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-teal-500 dark:text-teal-400">₹</span>
                </div>
                <Controller
                  name="budgetMax"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="budgetMax"
                      type="number"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      value={field.value || ""}
                      className={`w-full rounded-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 pl-8 ${
                        errors.budgetMax
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                      placeholder="7000000"
                    />
                  )}
                />
              </div>
              {errors.budgetMax && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.budgetMax.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white/50 dark:bg-gray-800/30 rounded-lg p-6 shadow-sm border border-teal-100 dark:border-teal-900/30">
          <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-200 mb-4 flex items-center">
            <span className="bg-teal-100 dark:bg-teal-800/50 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-teal-600 dark:text-teal-300">
              3
            </span>
            Lead Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Source */}
            <div>
              <label
                htmlFor="source"
                className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
              >
                Source *
              </label>
              <select
                id="source"
                {...register("source")}
                className={`w-full rounded-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  errors.source
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <option value="">Select Source</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Walk-in">Walk-in</option>
                <option value="Call">Call</option>
                <option value="Other">Other</option>
              </select>
              {errors.source && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.source.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                {...register("status")}
                className={`w-full rounded-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                  errors.status
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              >
                <option value="New">New</option>
                <option value="Qualified">Qualified</option>
                <option value="Contacted">Contacted</option>
                <option value="Visited">Visited</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Converted">Converted</option>
                <option value="Dropped">Dropped</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
            >
              Tags
            </label>
            <div className="flex items-center">
              <input
                id="tagInput"
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="flex-grow rounded-l-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500"
                placeholder="Add tag and press Enter"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-teal-600 text-white rounded-r-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
              >
                <FaPlus />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-teal-100 dark:bg-teal-800/50 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full text-sm flex items-center transition-all hover:shadow-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200 focus:outline-none"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-teal-900 dark:text-teal-100 mb-1"
            >
              Notes
            </label>
            <textarea
              id="notes"
              {...register("notes")}
              rows={4}
              className={`w-full rounded-md border-teal-200 dark:border-teal-800 bg-white/70 dark:bg-gray-900/70 text-teal-900 dark:text-white shadow-sm focus:border-teal-500 focus:ring-teal-500 ${
                errors.notes
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : ""
              }`}
              placeholder="Add any additional notes about this buyer..."
            />
            <p className="mt-1 text-xs text-teal-700 dark:text-teal-400">
              Maximum 1000 characters
            </p>
            {errors.notes && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.notes.message}
              </p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-teal-100 dark:border-teal-800/30">
          <Link
            href="/buyers"
            className="px-6 py-3 border border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300 rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 flex items-center gap-2 shadow-sm transition-colors"
          >
            {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {isSubmitting ? "Saving..." : "Save Buyer"}
          </button>
        </div>
      </form>
    </div>
  );
}
