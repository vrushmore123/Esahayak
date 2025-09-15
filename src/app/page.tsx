// "use client";
import Link from "next/link";
import Layout from "@/components/Layout";
import {
  FaUsers,
  FaUserPlus,
  FaFileImport,
  FaChartLine,
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";
import Image from "next/image";

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-700 text-black rounded-xl shadow-xl mb-8 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-8 md:p-12 md:w-3/5">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Buyer Leads Management System
            </h1>
            <p className="text-primary-100 text-lg mb-6">
              Efficiently track, manage, and convert your property buyer leads
              with our comprehensive management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/buyers"
                className="bg-white text-primary-700 hover:bg-primary-50 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition shadow-md"
              >
                <FaUsers /> View All Buyers
              </Link>
              <Link
                href="/buyers/new"
                className="bg-primary-800 text-black hover:bg-primary-600 border border-primary-600 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition shadow-md"
              >
                <FaUserPlus /> Add New Buyer
              </Link>
            </div>
          </div>
          <div className="hidden md:block md:w-2/5 relative">
            <div className="absolute inset-0 bg-primary-800 opacity-20"></div>
            <div className="h-full flex items-center justify-center p-6">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 shadow-2xl">
                <FaChartLine className="text-8xl text-black/80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Total Leads
              </p>
              <p className="text-3xl font-bold mt-1">147</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <FaUsers className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
          </div>
          <div className="mt-4 text-xs text-green-600 font-medium">
            ↑ 12% from last month
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Conversion Rate
              </p>
              <p className="text-3xl font-bold mt-1">24.5%</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <FaChartLine className="text-green-600 dark:text-green-400 text-xl" />
            </div>
          </div>
          <div className="mt-4 text-xs text-green-600 font-medium">
            ↑ 3.2% from last month
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Active Cities
              </p>
              <p className="text-3xl font-bold mt-1">5</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <FaSearch className="text-purple-600 dark:text-purple-400 text-xl" />
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-600 dark:text-gray-400 font-medium">
            Chandigarh, Mohali, Zirakpur, Panchkula, Other
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-black mb-6">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link href="/buyers" className="group">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-primary-500 dark:group-hover:border-primary-500">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                <FaUsers className="text-blue-600 dark:text-blue-400 text-xl group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                Buyers List & Search
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              View all buyer leads, search, filter, and manage your prospects
              efficiently.
            </p>
            <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:translate-x-1 transition-transform">
              Access <FaArrowRight className="ml-2" />
            </div>
          </div>
        </Link>

        <Link href="/buyers/new" className="group">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-primary-500 dark:group-hover:border-primary-500">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                <FaUserPlus className="text-green-600 dark:text-green-400 text-xl group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                Create New Buyer
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add a new buyer lead to your database with comprehensive details
              and tracking.
            </p>
            <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:translate-x-1 transition-transform">
              Create <FaArrowRight className="ml-2" />
            </div>
          </div>
        </Link>

        <Link href="/buyers/import-export" className="group">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-full hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-primary-500 dark:group-hover:border-primary-500">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full mr-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                <FaFileImport className="text-yellow-600 dark:text-yellow-400 text-xl group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-black">
                Import/Export Buyers
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Bulk import leads from CSV or export your filtered buyer list for
              reporting.
            </p>
            <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium group-hover:translate-x-1 transition-transform">
              Manage <FaArrowRight className="ml-2" />
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-black mb-6">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-start p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750"
            >
              <div className="bg-primary-100 dark:bg-primary-900/30 p-2 rounded-full mr-4">
                <FaUsers className="text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-black">
                  New buyer lead added
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  John Doe from Chandigarh is looking for a 3BHK Apartment
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                  2 hours ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
