import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buyers } from "@/lib/schema";
import { z } from "zod";

// Zod schema
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
  ownerId: z.string().uuid(),
});

// GET buyers
export async function GET() {
  try {
    const buyerList = await db.select().from(buyers);
    return NextResponse.json(buyerList);
  } catch (error) {
    console.error("Error fetching buyers:", error);
    return NextResponse.json(
      { message: "Failed to fetch buyers" },
      { status: 500 }
    );
  }
}

// POST buyer
export async function POST(request: Request) {
  try {
    const reqBody = await request.json();
    const validatedData = buyerSchema.parse(reqBody);

    // Map camelCase to snake_case for DB
    const dbData = {
      full_name: validatedData.fullName,
      email: validatedData.email || null,
      phone: validatedData.phone,
      city: validatedData.city,
      property_type: validatedData.propertyType,
      bhk: validatedData.bhk || null,
      purpose: validatedData.purpose,
      budget_min: validatedData.budgetMin || null,
      budget_max: validatedData.budgetMax || null,
      timeline: validatedData.timeline,
      source: validatedData.source,
      status: validatedData.status,
      notes: validatedData.notes || null,
      tags: validatedData.tags ? validatedData.tags.split(",") : [],
      owner_id: validatedData.ownerId,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const newBuyer = await db.insert(buyers).values(dbData).returning();

    return NextResponse.json(
      { message: "Buyer created successfully", buyer: newBuyer },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating buyer:", error);
    return NextResponse.json(
      { message: "Failed to create buyer", error: error.message },
      { status: 400 }
    );
  }
}
