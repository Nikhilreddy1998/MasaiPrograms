import { createContext, useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { User } from '@/types/user';
import { useAuth } from '@/hooks/useAuth';

interface UserContextType {
  currentUser: User | null;
  users: User[];
  mentors: User[];
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  users: [],
  mentors: [],
  isLoading: true,
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [mentors, setMentors] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Fetch mentors
        const mentorsRef = collection(db, 'users');
        const mentorsQuery = query(mentorsRef, where('role', '==', 'mentor'));
        const mentorsSnapshot = await getDocs(mentorsQuery);
        const fetchedMentors = mentorsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];
        setMentors(fetchedMentors);
        
        // Fetch all users
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const fetchedUsers = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  return (
    <UserContext.Provider value={{ 
      currentUser: user, 
      users, 
      mentors,
      isLoading 
    }}>
      {children}
    </UserContext.Provider>
  );
};