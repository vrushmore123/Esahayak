import Link from "next/link";
import BuyersTable from "@/components/BuyersTable";
import BuyersFilters from "@/components/BuyersFilters";

export default function BuyersPage() {
  return (
    <main>
      <h1>Buyers</h1>
      <BuyersFilters />
      <BuyersTable />
      <h2>Buyer Leads App</h2>
      <ul>
        <li>
          <Link href="/buyers">Buyers List & Search</Link>
        </li>
        <li>
          <Link href="/buyers/new">Create New Buyer</Link>
        </li>
        <li>
          <Link href="/buyers/import-export">Import/Export Buyers</Link>
        </li>
      </ul>
    </main>
  );
}