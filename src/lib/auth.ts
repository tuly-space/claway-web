import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, trigger }) {
      if (trigger === "signIn" && account?.provider === "google") {
        if (!apiUrl) {
          throw new Error("NEXT_PUBLIC_API_URL is not configured");
        }

        if (typeof account.access_token !== "string") {
          throw new Error("Google access token missing from OAuth response");
        }

        const response = await fetch(`${apiUrl}/auth/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: account.access_token,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to exchange Google token with claway-api: ${response.status} ${errorText}`,
          );
        }

        const data = (await response.json()) as {
          access_token?: string;
          refresh_token?: string;
        };

        token.clawayAccessToken = data.access_token;
        token.clawayRefreshToken = data.refresh_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.clawayAccessToken =
        typeof token.clawayAccessToken === "string"
          ? token.clawayAccessToken
          : undefined;

      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);

export { authHandler };
