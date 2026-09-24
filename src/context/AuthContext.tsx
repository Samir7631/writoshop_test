import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "user" | "admin";
export type AuthProviderName = "password" | "google";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  provider: AuthProviderName;
  avatar?: string;
};

type LoginResult = {
  success: boolean;
  error?: string;
  user?: AuthUser;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginWithPassword: (email: string, password: string) => LoginResult;
  loginWithGoogleCredential: (credential: string) => LoginResult;
  logout: () => void;
  dashboardPath: string;
};

const STORAGE_KEY = "writoshop-auth-v1";

const demoAccounts = [
  {
    email: "user@writoshop.com",
    password: "User@123",
    user: {
      id: "usr_demo_001",
      name: "Demo Reader",
      email: "user@writoshop.com",
      role: "user" as const,
      provider: "password" as const,
    },
  },
  {
    email: "admin@writoshop.com",
    password: "Admin@123",
    user: {
      id: "adm_demo_001",
      name: "WritoShop Admin",
      email: "admin@writoshop.com",
      role: "admin" as const,
      provider: "password" as const,
    },
  },
];

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function decodeGoogleCredential(credential: string) {
  try {
    const payload = credential.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as {
      sub?: string;
      email?: string;
      name?: string;
      picture?: string;
    };
  } catch {
    return null;
  }
}

function roleForGoogleEmail(email: string): UserRole {
  const configuredAdmins = (import.meta.env.VITE_ADMIN_EMAILS as string | undefined)
    ?.split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean) ?? [];

  return configuredAdmins.includes(email.toLowerCase()) ? "admin" : "user";
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  const persist = (nextUser: AuthUser | null) => {
    setUser(nextUser);
    if (typeof window === "undefined") return;
    if (nextUser) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value = useMemo<AuthContextValue>(() => {
    const loginWithPassword = (email: string, password: string): LoginResult => {
      const normalizedEmail = email.trim().toLowerCase();
      const account = demoAccounts.find(
        (item) =>
          item.email.toLowerCase() === normalizedEmail &&
          item.password === password,
      );

      if (!account) {
        return {
          success: false,
          error: "Invalid email or password. Use one of the prototype accounts shown below.",
        };
      }

      persist(account.user);
      return { success: true, user: account.user };
    };

    const loginWithGoogleCredential = (credential: string): LoginResult => {
      const payload = decodeGoogleCredential(credential);
      if (!payload?.email) {
        return {
          success: false,
          error: "Google returned an unreadable credential.",
        };
      }

      const googleUser: AuthUser = {
        id: payload.sub ? `google_${payload.sub}` : `google_${payload.email}`,
        name: payload.name || payload.email.split("@")[0],
        email: payload.email,
        role: roleForGoogleEmail(payload.email),
        provider: "google",
        avatar: payload.picture,
      };

      persist(googleUser);
      return { success: true, user: googleUser };
    };

    const logout = () => persist(null);

    return {
      user,
      isAuthenticated: Boolean(user),
      loginWithPassword,
      loginWithGoogleCredential,
      logout,
      dashboardPath: user?.role === "admin" ? "/admin" : "/dashboard",
    };
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
