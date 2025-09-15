"use client";

import Link from "next/link";
import BuyersTable from "@/components/BuyersTable";
import BuyersFilters from "@/components/BuyersFilters";
import Layout from "@/components/Layout";
import {
  FaPlus,
  FaFileExport,
  FaChartLine,
  FaUserFriends,
  FaCheckCircle,
  FaHourglass,
  FaTimesCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function BuyersPage() {
  return (
    <Layout>
      {/* Enhanced header with animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 bg-gradient-to-r from-primary-900 to-primary-700 text-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Buyers</h1>
            <p className="mt-2 text-primary-100">
              Track and manage your buyer leads effectively
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link
              href="/buyers/new"
              className="px-4 py-2 rounded-md bg-white text-primary-700 hover:bg-primary-50 transition flex items-center gap-2 font-medium shadow-sm"
            >
              <FaPlus size={14} /> Add Buyer
            </Link>
            <Link
              href="/buyers/import-export"
              className="px-4 py-2 rounded-md bg-primary-800 text-white hover:bg-primary-600 transition flex items-center gap-2 font-medium shadow-sm border border-primary-600"
            >
              <FaFileExport size={14} /> Import/Export
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Dashboard stats with animation and hover effects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500 flex items-center"
        >
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
            <FaUserFriends className="text-blue-600 dark:text-blue-400 text-xl" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Total Buyers
            </p>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                147
              </p>
              <p className="ml-2 text-xs font-medium text-green-600 dark:text-green-400">
                <span className="flex items-center">
                  ↑ 12% <span className="ml-1">from last month</span>
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500 flex items-center"
        >
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
            <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Converted
            </p>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                36
              </p>
              <p className="ml-2 text-xs font-medium text-green-600 dark:text-green-400">
                <span className="flex items-center">
                  ↑ 5% <span className="ml-1">from last month</span>
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-yellow-500 flex items-center"
        >
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full mr-4">
            <FaHourglass className="text-yellow-600 dark:text-yellow-400 text-xl" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              In Progress
            </p>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                89
              </p>
              <p className="ml-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  No change from last month
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-red-500 flex items-center"
        >
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mr-4">
            <FaTimesCircle className="text-red-600 dark:text-red-400 text-xl" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Dropped
            </p>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                22
              </p>
              <p className="ml-2 text-xs font-medium text-red-600 dark:text-red-400">
                <span className="flex items-center">
                  ↑ 3% <span className="ml-1">from last month</span>
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick overview chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <FaChartLine className="mr-2 text-primary-600" /> Buyer Leads
            Overview
          </h2>
          <select className="text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          Chart would render here (showing leads by status and date)
        </div>
      </motion.div>

      {/* Enhanced filter section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <BuyersFilters />
      </motion.div>

      {/* Enhanced table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <BuyersTable />
      </motion.div>
    </Layout>
  );
}
