import { supabase } from "@/libs/supabase";
import { AuthState, User } from "@/types"; // Import the types defined above
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set, get) => ({
  // ======================================================
  // ⚛️ State
  // ======================================================
  user: null,
  isLoading: true, // Start in loading state until session is checked
  isAuthenticated: false,
  signupData: null,

  // ======================================================
  // ⚙️ Actions / State Mutators
  // ======================================================

  setSignupData: (data: any) =>
    set({
      signupData: data,
    }),

  clearSignupData: () =>
    set({
      signupData: null,
    }),

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setLoading: (loading) => set({ isLoading: loading }),

  // ======================================================
  // 🔑 Core Auth Logic
  // ======================================================

  /**
   * Attempts to sign the user out. The state is then updated
   * automatically by the 'onAuthStateChange' listener.
   */
  signOut: async () => {
    set({ isLoading: true });
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Supabase SignOut Error:", error.message);
    // The state will be set to null/false by initializeAuth's listener
  },

  /**
   * Fetches the Supabase Auth user and then retrieves the associated
   * user profile from the 'profiles' table.
   */
  refreshUser: async () => {
    set({ isLoading: true });

    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    // Fetch the custom user profile data
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .maybeSingle();

    if (profile) {
      set({
        // Merge auth data with profile data if needed,
        // but casting the profile as User works if IDs match
        user: profile as User,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      // User exists in auth but not in profiles (e.g., failed signup step)
      console.warn("Auth user found, but no matching profile.");
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  /**
   * Initializes the auth state by checking the initial session and
   * setting up the real-time listener for future changes.
   */
  initializeAuth: () => {
    // 1. Initial Session Check (Async)
    // Check if there is an existing session when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // If session exists, fetch the full profile
        get().refreshUser();
      } else {
        // No session found, mark as loaded and unauthenticated
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    });

    // 2. Real-time Subscription (Sets up the listener)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth State Change:", event);

      if (
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED" ||
        event === "INITIAL_SESSION"
      ) {
        // When session is active, fetch user data
        get().refreshUser();
      } else if (event === "SIGNED_OUT") {
        // When user signs out, clear state
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
      // Handle USER_UPDATED if you want to reflect meta updates immediately
    });

    // Return the unsubscribe function for cleanup in the component's useEffect
    return () => {
      subscription.unsubscribe();
    };
  },
}));
