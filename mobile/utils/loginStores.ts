import { create } from "zustand";

type LoginState = {
  loading: boolean;
  email: string;
  password: string;
  setEmail: (val: string) => void;
  setLoading: () => void;
  setPassword: (val: string) => void;
};

export const useLoginStore = create<LoginState>((set) => ({
  loading: false,
  email: "",
  password: "",
  setLoading: () => set((state) => ({ loading: !state.loading })),
  setEmail: (val) => set({ email: val }),
  setPassword: (val) => set({ password: val }),
}));

type RegisterState = {
  loading: boolean;
  email: string;
  password: string;
  phone: string;
  pendingVerification: boolean;
  code: string;
  newUser: boolean;
  setLoading: () => void;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  setPhone: (val: string) => void;
  setPendingVerification: () => void;
  setCode: (val: string) => void;
  setNewUser: () => void;
};

export const useRegisterStore = create<RegisterState>((set) => ({
  loading: false,
  email: "",
  password: "",
  phone: "",
  pendingVerification: false,
  code: "",
  newUser: false,
  setLoading: () => set((state) => ({ loading: !state.loading })),
  setEmail: (val) => set({ email: val }),
  setPassword: (val) => set({ password: val }),
  setPhone: (val) => set({ phone: val }),
  setPendingVerification: () =>
    set((state) => ({ pendingVerification: !state.pendingVerification })),
  setCode: (val) => set({ code: val }),
  setNewUser: () => set((state) => ({ newUser: !state.newUser })),
}));

type PasswordResetState = {
  email: string;
  password: string;
  code: string;
  successfulCreation: boolean;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  setCode: (val: string) => void;
  setSuccessfulCreation: () => void;
};

export const usePasswordResetStore = create<PasswordResetState>((set) => ({
  email: "",
  password: "",
  code: "",
  successfulCreation: false,
  setEmail: (val) => set({ email: val }),
  setPassword: (val) => set({ password: val }),
  setSuccessfulCreation: () =>
    set((state) => ({ successfulCreation: !state.successfulCreation })),
  setCode: (val) => set({ code: val }),
}));

type AuthState = {
  token: string | null;
  setToken: (val: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  setToken: (val) => set({ token: val }),
}));
