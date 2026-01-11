import { useEffect, useState } from "react";

import { getAuthUser } from "../utils/helpers/getAuthUser";
import AuthContext from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authUser = getAuthUser();
    setUser(authUser);
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const authUser = getAuthUser();
    setUser(authUser);
  };

  // Prevent rendering before auth check
  if (loading) return null; // or a loader component
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
