import { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";

export const metadata: Metadata = { title: 'Horizon' }

const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem('horizon-theme');
    var light = saved === 'light' || (!saved && window.matchMedia('(prefers-color-scheme: light)').matches);
    var root = document.documentElement;
    root.setAttribute('data-theme', light ? 'light' : 'dark');
    if (light) root.classList.add('light-theme');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
