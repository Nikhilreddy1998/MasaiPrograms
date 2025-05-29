import { createContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { User, UserRole, MentorType, BASE_RATES } from '@/types/user';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole,
    mentorType: MentorType,
    bankDetails?: {
      accountNumber: string;
      ifscCode: string;
      country: string;
    }
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              name: userData.name,
              role: userData.role,
              isActive: userData.isActive,
              mentorType: userData.mentorType,
              bankDetails: userData.bankDetails
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error('Error loading user data');
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole,
    mentorType: MentorType,
    bankDetails?: {
      accountNumber: string;
      ifscCode: string;
      country: string;
    }
  ) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      const userData = {
        name,
        email,
        role,
        isActive: true,
        createdAt: new Date().toISOString(),
        mentorType: role === 'mentor' ? mentorType : null,
        baseRate: role === 'mentor' ? BASE_RATES[mentorType] : null,
        bankDetails: bankDetails || null
      };

      // Create user document in Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);

      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name,
        role,
        isActive: true,
        mentorType: role === 'mentor' ? mentorType : undefined,
        bankDetails
      });

      toast.success('Account created successfully');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (!userDoc.exists()) {
        throw new Error('User data not found');
      }

      const userData = userDoc.data();
      setUser({
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        name: userData.name,
        role: userData.role,
        isActive: userData.isActive,
        mentorType: userData.mentorType,
        bankDetails: userData.bankDetails
      });

      toast.success('Logged in successfully');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Failed to log in');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error(error.message || 'Failed to log out');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};