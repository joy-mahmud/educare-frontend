
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [userStudent, setUserStudent] = useState(null);

  const SignIn = (email, password) => {
    setLoading(true);
  };

//   const logout = () => {
//     return signOut(auth);
//   };
  useEffect(() => {

  }, []);
  const authInfo = { loading,user };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
