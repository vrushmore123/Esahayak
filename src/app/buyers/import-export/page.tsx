import Link from "next/link";
import ImportExport from "@/components/ImportExport";

export default function ImportExportPage() {
  return (
    <main>
      <h1>Import / Export Buyers</h1>
      <nav>
        <Link href="/">← Back </Link>
      </nav>
      <ImportExport />
    </main>
  );
}
