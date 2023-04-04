import { createContext, useState } from "react";
import { getAccessTokenFromLS, getProfileFromLS } from "../utils/auth";

const initialAuthContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  userProfile: getProfileFromLS() || null,
  setIsAuthenticated: () => null,
  setUserProfile: () => null,
};

export const AuthContext = createContext(initialAuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthContext.isAuthenticated);
  const [userProfile, setUserProfile] = useState(initialAuthContext.userProfile);
  return (
    <AuthContext.Provider value={{ userProfile, isAuthenticated, setIsAuthenticated, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
