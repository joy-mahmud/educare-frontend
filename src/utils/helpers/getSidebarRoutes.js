import { sidebarRoutes } from "../../config/sidebarRoutes";

export const getSidebarRoutes = (role) => {
  return sidebarRoutes.filter((route) => {
    if (!route.roles) return true;
    return route.roles.includes(role);
  });
};
