import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      phone?: string | null;
    } & DefaultSession["user"]
  }

  interface User {
    id: string;
    role: string;
    phone?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    phone?: string | null;
    provider?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const allowedStaffEmails = [
          "management@wholepurple.com",
          "store@wholepurple.com",
          "content@wholepurple.com"
        ];

        if (!allowedStaffEmails.includes(credentials.email.toLowerCase())) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
          phone: user.phone,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // 1. On sign-in, capture user details and provider
      if (user) {
        token.id = user.id;
        token.email = user.email?.toLowerCase().trim();
        token.name = user.name;
        token.image = (user as any).image;
        token.phone = (user as any).phone;
      }
      
      if (account) {
        token.provider = account.provider;
      }

      // 2. Prefer Google Profile data for name/email if using Google
      if (account?.provider === 'google' && profile) {
        token.name = (profile as any).name || token.name;
        token.email = (profile as any).email?.toLowerCase().trim() || token.email;
      }

      // 3. Identify the user email safely for role mapping
      const userEmail = token.email;

      // 4. Strict Role Mapping
      const provider = token.provider;
      
      if (provider === 'credentials' && userEmail === "management@wholepurple.com") {
        token.role = "SYSTEM_ADMIN";
      } else if (provider === 'credentials' && userEmail === "store@wholepurple.com") {
        token.role = "SHOP_MANAGER";
      } else if (provider === 'credentials' && userEmail === "content@wholepurple.com") {
        token.role = "EDITOR";
      } else {
        token.role = "CLIENT";
      }

      // DEBUG: Log the outcome
      const logMessage = `[AUTH CHECK] Time: ${new Date().toISOString()}, Provider: ${provider}, Email: "${userEmail}", Name: "${token.name}", Role Assigned: "${token.role}"\n`;
      console.log(logMessage);
      
      try {
        const fs = require('fs');
        const logPath = '/Users/davidakerele/Documents/wholepurple/scratch/auth_logs.txt';
        fs.appendFileSync(logPath, logMessage);
      } catch (err) {
        console.error('Failed to write to log file:', err);
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.phone = token.phone as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
