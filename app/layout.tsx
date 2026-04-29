import { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { NotificationProvider } from "../context/NotificationContext";

export const metadata: Metadata = { title: 'Horizon' }

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>
          <NotificationProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
