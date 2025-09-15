import Link from "next/link";
import BuyerForm from "@/components/BuyerForm";
import BuyerHistory from "@/components/BuyerHistory";

export default function BuyerDetailPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1>Buyer Details / Edit</h1>
      <nav>
        <Link href="/buyers">← Back to Buyers</Link>
      </nav>
      <BuyerForm mode="edit" buyerId={params.id} />
      <BuyerHistory buyerId={params.id} />
    </main>
  );
}