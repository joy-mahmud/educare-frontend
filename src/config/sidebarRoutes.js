import { Home, Users, CreditCard, PlusCircle } from "lucide-react";

export const sidebarRoutes = [
  {
    path: "/",
    label: "Home",
    icon: Home,
  },
  {
    path: "/dashboard/all-payments",
    label: "All Payments",
    icon: CreditCard,
    roles: ["admin"],
  },
  {
    path: "/dashboard/all-student-info",
    label: "Student List",
    icon: Users,
    roles: ["admin", "teacher"],
  },
  {
    path: "/dashboard/all-teacher-info",
    label: "All Teachers",
    icon: Users,
    roles: ["admin"],
  },
  {
    path: "/dashboard/add-teacher",
    label: "Add New Teacher",
    icon: PlusCircle,
    roles: ["admin"],
  },
  {
    path: "/dashboard/result-entry",
    label: "Result Entry",
    icon: PlusCircle,
    roles: ["admin", "teacher"],
  },
];
