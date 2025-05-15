import { createContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/user';
import { mockUser } from '@/data/mockUser';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in (from localStorage in this demo)
    const checkAuth = () => {
      const storedUser = localStorage.getItem('edutech_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string, role: UserRole) => {
    // In a real app, this would make an API call to authenticate
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo authentication - in a real app this would verify credentials
    if (email && password) {
      // Set the user with the requested role for demo purposes
      const loggedInUser = {
        ...mockUser,
        role: role
      };
      
      setUser(loggedInUser);
      localStorage.setItem('edutech_user', JSON.stringify(loggedInUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('edutech_user');
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};