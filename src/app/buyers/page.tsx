import Link from "next/link";
import BuyersTable from "@/components/BuyersTable";
import BuyersFilters from "@/components/BuyersFilters";
import Layout from "@/components/Layout";
import { FaPlus, FaFileExport } from "react-icons/fa";

export default function BuyersPage() {
  return (
    <Layout>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Buyers</h1>
          <p className="text-gray-600 mt-1">
            Manage your buyer leads in one place
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Link
            href="/buyers/new"
            className="px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700 transition flex items-center gap-2"
          >
            <FaPlus size={14} /> Add Buyer
          </Link>
          <Link
            href="/buyers/import-export"
            className="px-4 py-2 rounded bg-secondary-200 text-secondary-800 hover:bg-secondary-300 transition flex items-center gap-2"
          >
            <FaFileExport size={14} /> Import/Export
          </Link>
        </div>
      </div>

      {/* Dashboard stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-card border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Buyers</p>
          <p className="text-2xl font-bold">147</p>
          <p className="text-xs text-green-600 mt-1">
            ↑ 12% from last month
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-card border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Converted</p>
          <p className="text-2xl font-bold">36</p>
          <p className="text-xs text-green-600 mt-1">
            ↑ 5% from last month
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-card border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">In Progress</p>
          <p className="text-2xl font-bold">89</p>
          <p className="text-xs text-gray-600 mt-1">
            No change from last month
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-card border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Dropped</p>
          <p className="text-2xl font-bold">22</p>
          <p className="text-xs text-red-600 mt-1">
            ↑ 3% from last month
          </p>
        </div>
      </div>

      <BuyersFilters />
      <BuyersTable />
    </Layout>
  );
}