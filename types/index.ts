import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export type UserRole = "CLIENT" | "CAREGIVER" | "ADMIN";

// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   phone: string;
//   role?: UserRole;
//   created_at: string;
// }

// export interface AuthState {
//   user: User | null;
//   isLoading: boolean;
//   isAuthenticated: boolean;
//   setUser: (user: User | null) => void;
//   setLoading: (loading: boolean) => void;
//   signOut: () => Promise<void>;
//   refreshUser: () => Promise<void>;
//   signupData: any;
//   setSignupData: (data: any) => void;
//   clearSignupData: () => void;
// }

// Assuming '@/types.ts'

// Define the User Profile structure (what you fetch from the 'profiles' table)
export interface User {
  id: string; // The Supabase Auth user ID
  email: string;
  username: string;
  avatar_url: string | null;
  // Add any other profile fields here
}

// Define the structure of your Zustand store state and actions
export interface AuthState {
  // State
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signupData: any | null; // Placeholder for signup data if collected across steps

  // Actions
  setSignupData: (data: any) => void;
  clearSignupData: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;

  // Core Auth Functions
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  initializeAuth: () => () => void; // Returns an unsubscribe function
}
