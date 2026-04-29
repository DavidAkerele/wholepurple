"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '100px',
            padding: '12px 24px',
            fontWeight: 'bold',
          },
          success: {
            style: {
              background: 'var(--accent-green)',
            },
          },
          error: {
            style: {
              background: 'var(--accent-red)',
            },
          },
        }}
      />
      {children}
    </SessionProvider>
  );
}
