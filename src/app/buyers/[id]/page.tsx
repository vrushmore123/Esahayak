import Link from "next/link";
import BuyerForm from "@/components/BuyerForm";
import BuyerHistory from "@/components/BuyerHistory";
import Layout from "@/components/Layout";
import AnimatedWrapper from "@/components/AnimatedWrapper";

// Define the expected structure of the resolved params
interface Props {
  params: Promise<{ id: string }>;
}

// Make the page component async to await params
const BuyerDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <Layout>
      <AnimatedWrapper>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Buyer Details
            </h1>
            <Link
              href="/buyers"
              className="px-4 py-2 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-colors flex items-center gap-2"
            >
              ← Back to Buyers
            </Link>
          </div>
        </div>
        <BuyerForm mode="edit" buyerId={id} />
        <BuyerHistory buyerId={id} />
      </AnimatedWrapper>
    </Layout>
  );
};

export default BuyerDetailPage;
