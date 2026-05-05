import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tempAuth, setTempAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ tempAuth, setTempAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);