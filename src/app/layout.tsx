import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mufid Apps - Sistem Informasi Islami",
  description: "Platform digital islami untuk kajian, agenda kegiatan, program pendidikan, dan kepesertaan. Bersama dalam kebaikan bersama Yayasan Mufid.",
  keywords: ["Mufid", "Islam", "Kajian", "Pendidikan", "Kepesertaan", "Muslim", "Indonesia"],
  authors: [{ name: "Yayasan Mufid" }],
  icons: {
    icon: "https://mufid.or.id/wp-content/themes/yayasan-mufid/assets/images/mufid-logo.svg",
  },
  openGraph: {
    title: "Mufid Apps",
    description: "Platform digital islami untuk kajian, agenda kegiatan, dan program pendidikan",
    url: "https://mufid.or.id",
    siteName: "Mufid Apps",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mufid Apps",
    description: "Platform digital islami untuk kajian, agenda kegiatan, dan program pendidikan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
