import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Local CBO && Sacco App",
  description: "An App for managing saccos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>{children}
        <Toaster />
      </body>
    </html>
  );
}
