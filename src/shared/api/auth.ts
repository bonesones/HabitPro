import { User } from "@prisma/client";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signIn, SignInOptions } from "next-auth/react";

import { aFetch } from "./aFetch";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth environment variables");
}

export const signInCredentials = (credentials: SignInOptions) =>
  signIn("credentials", credentials);

export const signInGoogle = (options: SignInOptions) =>
  signIn("google", options);

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const response = await aFetch("/api/user/signIn", {
          method: "POST",
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          throw new Error("Invalid credentials");
        }

        const user: Pick<User, "id" | "email"> = await response.json();

        const authUser = {
          id: String(user.id),
          email: user.email,
        };

        return authUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.email = token.email;
      }

      return session;
    },
  },
});
