export type UserRole = "CLIENT" | "CAREGIVER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role?: UserRole;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}
