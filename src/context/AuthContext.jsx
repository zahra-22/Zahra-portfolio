import { createContext, useState, useEffect } from "react";
import { apiRequest } from "../api";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user from backend JWT cookie when app loads or refreshes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiRequest("/api/auth/me", "GET");
        if (res?.user) {
          setUser(res.user);
        }
      } catch {
        setUser(null); // not logged in
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return null; // prevents UI flicker

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
