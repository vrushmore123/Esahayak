import React from "react";

export default function BuyerHistory({ buyerId }: { buyerId: string }) {
  // This will be implemented later to show history from the database
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        History
      </h2>
      <div className="text-gray-500 dark:text-gray-400">
        <p>Recent changes will appear here.</p>
      </div>
    </div>
  );
}
