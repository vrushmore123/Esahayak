import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers, FaUserPlus, FaFileImport, FaSignOutAlt } from "react-icons/fa";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? "bg-primary-700 text-white" : "text-secondary-300 hover:bg-primary-800 hover:text-white";
  };

  return (
    <div className="min-h-screen bg-secondary-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 w-64 bg-primary-900 text-white transition-all duration-300">
        <div className="p-4 border-b border-primary-800">
          <h2 className="text-xl font-heading font-bold">Buyer Leads</h2>
        </div>
        
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <Link href="/" className={`flex items-center px-4 py-3 rounded-md ${isActive('/')}`}>
                <FaHome className="mr-3" /> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/buyers" className={`flex items-center px-4 py-3 rounded-md ${isActive('/buyers')}`}>
                <FaUsers className="mr-3" /> All Buyers
              </Link>
            </li>
            <li>
              <Link href="/buyers/new" className={`flex items-center px-4 py-3 rounded-md ${isActive('/buyers/new')}`}>
                <FaUserPlus className="mr-3" /> Add Buyer
              </Link>
            </li>
            <li>
              <Link href="/buyers/import-export" className={`flex items-center px-4 py-3 rounded-md ${isActive('/buyers/import-export')}`}>
                <FaFileImport className="mr-3" /> Import/Export
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-primary-800">
          <button className="flex items-center w-full px-4 py-2 text-left rounded-md hover:bg-primary-800">
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
