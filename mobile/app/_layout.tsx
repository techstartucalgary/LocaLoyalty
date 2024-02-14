import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { useAuthStore, useRegisterStore } from "../utils/loginStores";
import Providers from "./providers";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { newUser } = useRegisterStore();
  const { setToken } = useAuthStore();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";
    console.log("isSignedIn", isSignedIn);

    if (isSignedIn) {
      async function fetchToken() {
        const toFetch = await getToken();
        setToken(toFetch);
      }

      fetchToken();

      if (!inTabsGroup && newUser) {
        router.replace("/tutorial");
      } else if (!inTabsGroup) {
        router.replace("/home");
      }
    } else if (!isSignedIn) {
      router.replace("login");
    }
  }, [isSignedIn]);

  return <Slot />;
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <Providers>
        <InitialLayout />
      </Providers>
    </ClerkProvider>
  );
};

export default RootLayoutNav;
