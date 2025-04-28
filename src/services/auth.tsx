import PocketBase, { type AuthModel } from "pocketbase";
import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";
import { JSX } from "preact";

// Create a PocketBase client instance
const pb = new PocketBase();

// Define types for auth responses
type UserAuthResponse = {
  token: string;
  user: {
    id: string;
    username: string;
    email?: string;
    created: string;
    updated: string;
  };
};

// Define the Auth context type
export type AuthContextType = {
  user: AuthModel | null;
  isLoggedIn: boolean;
  register: (username: string, password: string) => Promise<UserAuthResponse>;
  login: (username: string, password: string) => Promise<UserAuthResponse>;
  logout: () => void;
};

// Create Auth context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth Provider as a functional component
function AuthProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [user, setUser] = useState<AuthModel | null>(pb.authStore.model);
  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);

  // Register a new user
  const register = async (
    username: string,
    password: string,
  ): Promise<UserAuthResponse> => {
    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
      };

      const createdUser = await pb.collection("users").create(data);
      await login(username, password); // Auto login after registration
      return createdUser as unknown as UserAuthResponse;
    } catch (err) {
      console.error("Registration error:", err);
      throw err;
    }
  };

  // Log in an existing user
  const login = async (
    username: string,
    password: string,
  ): Promise<UserAuthResponse> => {
    try {
      const authData = await pb.collection("users").authWithPassword(
        username,
        password,
      );
      setUser(pb.authStore.model);
      setIsLoggedIn(pb.authStore.isValid);
      return authData as unknown as UserAuthResponse;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // Log out the current user
  const logout = () => {
    pb.authStore.clear();
    setUser(null);
    setIsLoggedIn(false);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      setUser(pb.authStore.model);
      setIsLoggedIn(pb.authStore.isValid);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    isLoggedIn,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Export PocketBase client for direct use if needed
export { AuthProvider, pb, useAuth };
