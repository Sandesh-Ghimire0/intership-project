import { create } from "zustand";
import { IUser } from "../types/type";
import { persist } from "zustand/middleware";

interface AuthState {
    user: IUser | null;
    accessToken: string | null;
    login: (user: IUser, token: string) => void;
    logout: () => void;
    hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            hasHydrated: false,
            setHasHydrated: (state) => {
                set({ hasHydrated: state });
            },
            login: (user, token) => {
                set({ user, accessToken: token });
            },
            logout: () => {
                set({ user: null, accessToken: null });
                localStorage.removeItem("auth-storage");
            },
        }),
        {
            name: "auth-storage",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        },
    ),
);

/**
 * when page wrapped by AuthGuard component is refreshed, initially the value of accessToken is null because persist middleware has not finished reading the 
 * localstorage due to which page gets redirected to login page even if their is token in local storage
 * To solve this we need to implement "hydration check". This check will ensure that AuthGuard component will only render children after zustand state is loaded
 * with "auth-storage"(localstorage)
 */
