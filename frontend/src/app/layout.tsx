import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProvidersWrapper from "@/components/general/ProvidersWrapper";
import Navbar from "@/components/navbar/Navbar";
import { getServerSession } from "next-auth";
import Sidebar from "@/components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NutriCop",
  description: "Your Personal Nutrition Tracker",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ProvidersWrapper session={session}>
          <main className="dark">{children}</main>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
