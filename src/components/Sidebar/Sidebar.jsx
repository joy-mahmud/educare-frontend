import React from "react";
import { X, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { getSidebarRoutes } from "../../utils/helpers/getSidebarRoutes";
import Swal from "sweetalert2";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  if (loading) return;

  const routes = getSidebarRoutes(user?.role);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#082567",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/");
        Swal.fire({
          title: "Logged Out!",
          text: "Your have successfully logged out.",
          icon: "success",
        });
      }
    });
  };
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
          {routes.map((route) => {
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
          <button
            onClick={handleLogout}
            className="hover:cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-white hover:text-primary hover:bg-opacity-10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
