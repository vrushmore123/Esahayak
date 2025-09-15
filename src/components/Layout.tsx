"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaFileImport,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaSearch,
  FaChevronDown,
  FaUserCircle,
  FaCog,
  FaQuestionCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path
      ? "bg-primary-600 text-black"
      : "text-secondary-200 hover:bg-primary-700 hover:text-black";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-black" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      {/* Top Navbar */}
      <header
        className={`fixed top-0 right-0 left-0 z-30 ${
          sidebarOpen ? "md:ml-64" : ""
        } transition-all duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <div className="flex items-center justify-between h-16 px-4">
          {/* Left section */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className="ml-4 md:hidden">
              <h1 className="text-lg font-semibold">Buyer Leads</h1>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="hidden md:block flex-grow max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-100 border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-yellow-400"
                  : "bg-gray-100 text-gray-600"
              } hover:bg-primary-100`}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`p-2 rounded-full ${
                  darkMode
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-100 text-gray-600"
                } hover:bg-primary-100 focus:outline-none`}
              >
                <FaBell />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {/* Notifications dropdown */}
              {notificationsOpen && (
                <div
                  className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  } ring-1 ring-black ring-opacity-5`}
                >
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div
                      className={`p-4 ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      } cursor-pointer`}
                    >
                      <p className="font-medium">New lead added</p>
                      <p className="text-sm text-gray-500">
                        John Doe from Chandigarh
                      </p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                    <div
                      className={`p-4 ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                      } cursor-pointer`}
                    >
                      <p className="font-medium">Status update</p>
                      <p className="text-sm text-gray-500">
                        Lead #1234 moved to Negotiation
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                    </div>
                  </div>
                  <div className="p-2 border-t border-gray-200 text-center">
                    <button className="text-primary-600 text-sm hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-black">
                  <FaUserCircle className="w-7 h-7" />
                </div>
                <span className="hidden md:block font-medium">John Doe</span>
                <FaChevronDown className="hidden md:block w-4 h-4 text-gray-500" />
              </button>

              {/* Profile dropdown */}
              {profileOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                    darkMode
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  } ring-1 ring-black ring-opacity-5`}
                >
                  <div className="py-1">
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center">
                        <FaUserCircle className="mr-3 text-gray-500" />
                        Profile
                      </div>
                    </a>
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center">
                        <FaCog className="mr-3 text-gray-500" />
                        Settings
                      </div>
                    </a>
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center">
                        <FaQuestionCircle className="mr-3 text-gray-500" />
                        Help
                      </div>
                    </a>
                    <div className="border-t border-gray-200 my-1"></div>
                    <a
                      href="#"
                      className={`block px-4 py-2 text-sm ${
                        darkMode
                          ? "hover:bg-gray-700 text-red-400"
                          : "hover:bg-gray-100 text-red-600"
                      }`}
                    >
                      <div className="flex items-center">
                        <FaSignOutAlt className="mr-3" />
                        Sign out
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search (expanded) */}
        {searchOpen && (
          <div className="p-2 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600"
                    : "bg-gray-100 border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        )}
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 transition-all duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${darkMode ? "bg-gray-800" : "bg-primary-900"} text-black shadow-xl`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-opacity-20 border-gray-600">
          <h2 className="text-xl font-bold tracking-wide">Buyer Leads</h2>
          <button
            className="md:hidden text-gray-300 hover:text-black"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-6 mb-4 border-b border-opacity-20 border-gray-600">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center">
              <FaUserCircle className="w-9 h-9 text-black" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">Sales Manager</p>
            </div>
          </div>
        </div>

        <nav className="px-4 py-2">
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Main
          </h3>
          <ul className="mt-2 space-y-1">
            <li>
              <Link
                href="/"
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive(
                  "/"
                )}`}
              >
                <FaHome className="mr-3" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/buyers"
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive(
                  "/buyers"
                )}`}
              >
                <FaUsers className="mr-3" />
                <span>All Buyers</span>
                <span className="ml-auto bg-primary-700 text-xs px-2 py-1 rounded-full">
                  147
                </span>
              </Link>
            </li>
          </ul>

          <h3 className="mt-6 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Actions
          </h3>
          <ul className="mt-2 space-y-1">
            <li>
              <Link
                href="/buyers/new"
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive(
                  "/buyers/new"
                )}`}
              >
                <FaUserPlus className="mr-3" />
                <span>Add Buyer</span>
              </Link>
            </li>
            <li>
              <Link
                href="/buyers/import-export"
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${isActive(
                  "/buyers/import-export"
                )}`}
              >
                <FaFileImport className="mr-3" />
                <span>Import/Export</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-opacity-20 border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm">Dark Mode</span>
            <button
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${
                darkMode ? "bg-primary-600" : "bg-gray-600"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                  darkMode ? "translate-x-6" : ""
                }`}
              ></div>
            </button>
          </div>
          <button className="flex items-center w-full px-4 py-2 text-left rounded-md bg-red-600 hover:bg-red-700 transition-colors">
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : ""
        }`}
      >
        <div className="p-6">{children}</div>
      </main>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
