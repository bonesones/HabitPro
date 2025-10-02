"use client";

import {
  SessionProvider as NextAuthProvider,
  useSession,
} from "next-auth/react";
import { useEffect } from "react";

import { userStore } from "@/shared/store";

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <NextAuthProvider>
    <SyncUserWithStore />
    {children}
  </NextAuthProvider>
);

const SyncUserWithStore = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (session?.user) {
      userStore.setUser(session.user);
    } else {
      userStore.setUser(null);
    }
  }, [session, status]);

  return null;
};
