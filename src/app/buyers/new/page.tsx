import Link from "next/link";
import BuyerForm from "@/components/BuyerForm";

export default function NewBuyerPage() {
  return (
    <main>
      <h1>New Buyer</h1>
      <nav>
        <Link href="/buyers">← Back to Buyers</Link>
      </nav>
      <BuyerForm mode="create" />
    </main>
  );
}