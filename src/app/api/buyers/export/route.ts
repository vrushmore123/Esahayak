import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { buyers } from "@/lib/schema";


// Utility function to convert data to CSV
function convertToCSV(data: any[]): string {
  const headers = Object.keys(data[0] || {}).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map((value) =>
        value === null || value === undefined ? "" : `"${value}"`
      )
      .join(",")
  );
  return [headers, ...rows].join("\n");
}

// CSV export handler
export async function GET() {
  try {
    // Fetch buyer data from the database
    const buyerData = await db.select().from(buyers);

    if (buyerData.length === 0) {
      return NextResponse.json({ message: "No buyers found" }, { status: 404 });
    }

    // Convert data to CSV
    const csvData = convertToCSV(buyerData);

    // Return the CSV file as a response
    return new Response(csvData, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=buyers.csv",
      },
    });
  } catch (error) {
    console.error("Error exporting buyers:", error);
    return NextResponse.json(
      { message: "Failed to export buyers" },
      { status: 500 }
    );
  }
}
