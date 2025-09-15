import { mkdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const base = "src";

const folders = [
  "app/buyers/new",
  "app/buyers/[id]",
  "app/api/buyers",
  "app/api/buyers/[id]",
  "app/api/buyers/import",
  "app/api/buyers/export",
  "components/forms",
  "components/tables",
  "components/ui",
  "lib",
  "hooks",
  "types",
];

const files: Record<string, string> = {
  "app/buyers/page.tsx": `export default function BuyersPage() {
  return <div>Buyers List</div>;
}`,
  "app/buyers/new/page.tsx": `export default function NewBuyerPage() {
  return <div>Create Buyer Form</div>;
}`,
  "app/buyers/[id]/page.tsx": `export default function BuyerDetailPage() {
  return <div>Buyer Details / Edit</div>;
}`,
  "app/api/buyers/route.ts": `// GET: list buyers, POST: create buyer
export async function GET() {}
export async function POST() {}`,
  "app/api/buyers/[id]/route.ts": `// GET, PUT, DELETE single buyer
export async function GET() {}
export async function PUT() {}
export async function DELETE() {}`,
  "app/api/buyers/import/route.ts": `// CSV import handler
export async function POST() {}`,
  "app/api/buyers/export/route.ts": `// CSV export handler
export async function GET() {}`,
  "components/forms/BuyerForm.tsx": `export function BuyerForm() { return <form>Buyer Form</form>; }`,
  "components/tables/BuyerTable.tsx": `export function BuyerTable() { return <table><tbody></tbody></table>; }`,
  "lib/prisma.ts": `import { PrismaClient } from "@prisma/client";
declare global { var prisma: PrismaClient | undefined }
export const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;`,
  "lib/validations.ts": `import { z } from "zod";

export const BuyerSchema = z.object({
  fullName: z.string().min(2).max(80),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(15),
  city: z.enum(["Chandigarh","Mohali","Zirakpur","Panchkula","Other"]),
  propertyType: z.enum(["Apartment","Villa","Plot","Office","Retail"]),
  bhk: z.enum(["1","2","3","4","Studio"]).optional(),
  purpose: z.enum(["Buy","Rent"]),
  budgetMin: z.number().int().optional(),
  budgetMax: z.number().int().optional(),
  timeline: z.enum(["0-3m","3-6m",">6m","Exploring"]),
  source: z.enum(["Website","Referral","Walk-in","Call","Other"]),
  status: z.enum(["New","Qualified","Contacted","Visited","Negotiation","Converted","Dropped"]).default("New"),
  notes: z.string().max(1000).optional(),
  tags: z.array(z.string()).optional(),
});`,
  "hooks/useDebounce.ts": `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}`,
  "types/buyer.ts": `export type Buyer = {
  id: string;
  fullName: string;
  email?: string;
  phone: string;
  city: "Chandigarh"|"Mohali"|"Zirakpur"|"Panchkula"|"Other";
  propertyType: "Apartment"|"Villa"|"Plot"|"Office"|"Retail";
  bhk?: "1"|"2"|"3"|"4"|"Studio";
  purpose: "Buy"|"Rent";
  budgetMin?: number;
  budgetMax?: number;
  timeline: "0-3m"|"3-6m"|">6m"|"Exploring";
  source: "Website"|"Referral"|"Walk-in"|"Call"|"Other";
  status: "New"|"Qualified"|"Contacted"|"Visited"|"Negotiation"|"Converted"|"Dropped";
  notes?: string;
  tags?: string[];
  ownerId: string;
  updatedAt: string;
};`,
};

folders.forEach((f) => {
  const dir = join(base, f);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
});

for (const [path, content] of Object.entries(files)) {
  const file = join(base, path);
  if (!existsSync(file)) {
    writeFileSync(file, content);
  }
}

console.log("✅ Project structure generated!");
