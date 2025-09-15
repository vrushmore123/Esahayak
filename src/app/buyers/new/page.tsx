import Link from "next/link";
import BuyerForm from "@/components/BuyerForm";

export default function NewBuyerPage() {
  return (
    <main className="max-w-9xl mx-auto bg-teal-100 p-10">
      <h1 className="text-3xl font-bold text-center">New Buyer</h1>
      <nav>
        <Link href="/" className="flex-1 pb-6"> ← Back </Link>
      </nav>
      <BuyerForm mode="create" />
    </main>
  );
}
