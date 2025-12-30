import React, { useState } from "react";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  Calendar,
  Phone,
  Hash,
  Edit2,
  Save,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-gray-600 hover:text-gray-800"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {/* {sidebarLinks.find(link => link.id === activeRoute)?.name} */}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-gray-800">
                  Admin User
                </p>
                <p className="text-xs text-gray-500">admin@institution.edu</p>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: "#082567" }}
              >
                A
              </div>
            </div>
          </div>
        </header>
        <div className="overflow-y-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}
