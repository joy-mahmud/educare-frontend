import React from "react";
import { X, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { sidebarRoutes } from "../../config/sidebarRoutes";

const Sidebar = ({ sidebarOpen, setSidebarOpen, role = "admin" }) => {
  return (
    <div
      className={`fixed md:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
      style={{
        background: "linear-gradient(180deg, #082567 0%, #103B99 100%)",
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white border-opacity-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-white hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarRoutes
            .filter((route) => !route.roles || route.roles.includes(role))
            .map((route) => {
              const Icon = route.icon;

              return (
                <NavLink
                  key={route.path}
                  to={route.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-white bg-opacity-20 text-primary"
                        : "text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-primary"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{route.label}</span>
                </NavLink>
              );
            })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white border-opacity-20">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-white hover:text-primary hover:bg-opacity-10 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
