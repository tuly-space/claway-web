import "next-auth";

declare module "next-auth" {
  interface Session {
    clawayAccessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    clawayAccessToken?: string;
    clawayRefreshToken?: string;
  }
}
