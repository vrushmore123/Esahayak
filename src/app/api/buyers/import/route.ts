import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buyers } from "@/lib/schema";
import { parse } from "csv-parse/sync";
import { z, ZodError } from "zod";

// Define the validation schema for a buyer
const buyerSchema = z.object({
  fullName: z.string().min(2).max(80),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(15),
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
  notes: z.string().max(1000).optional(),
  tags: z.string().optional(),
  ownerId: z.string().uuid(), // <-- add this line
});

// Utility function to validate and transform CSV rows
function validateAndTransformRow(row: any) {
  const parsedRow = {
    fullName: row.fullName,
    email: row.email || undefined,
    phone: row.phone,
    city: row.city,
    propertyType: row.propertyType,
    bhk: row.bhk || undefined,
    purpose: row.purpose,
    budgetMin: row.budgetMin ? parseInt(row.budgetMin, 10) : undefined,
    budgetMax: row.budgetMax ? parseInt(row.budgetMax, 10) : undefined,
    timeline: row.timeline,
    source: row.source,
    status: row.status || "New",
    notes: row.notes || undefined,
    tags: row.tags || undefined,
    ownerId: row.ownerId || "123e4567-e89b-12d3-a456-426614174000", // <-- add this line, use a default or from row
  };

  return buyerSchema.parse(parsedRow);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const csvText = await file.text();
    const rows = parse(csvText, { columns: true, skip_empty_lines: true });

    const validBuyers = [];
    const errors: { row: number; message: any }[] = [];

    for (const [index, row] of rows.entries()) {
      try {
        const validatedRow = validateAndTransformRow(row);
        validBuyers.push(validatedRow);
      } catch (error) {
        if (error instanceof ZodError) {
          errors.push({ row: index + 1, message: error.issues });
        } else {
          errors.push({
            row: index + 1,
            message: [{ message: "Unknown error" }],
          });
        }
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { message: "Validation errors", errors },
        { status: 400 }
      );
    }

    await db.insert(buyers).values(validBuyers);

    return NextResponse.json({
      message: "Buyers imported successfully",
      count: validBuyers.length,
    });
  } catch (error) {
    console.error("Error importing buyers:", error);
    return NextResponse.json(
      { message: "Failed to import buyers" },
      { status: 500 }
    );
  }
}
