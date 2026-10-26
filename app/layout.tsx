import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Noto_Sans_Devanagari, Plus_Jakarta_Sans } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL ?? "https://vidyasafar.netlify.app"),
  title: {
    default: "VidyaSafar — The Safe Journey of Learning",
    template: "%s · VidyaSafar",
  },
  description:
    "VidyaSafar is India's school transit trust network: live GPS, a verified boarding register, and digital fee settlement for parents, schools, and fleet operators.",
  applicationName: "VidyaSafar",
  openGraph: {
    title: "VidyaSafar — The Safe Journey of Learning",
    description:
      "School transport built on trust. Live buses, one-tap boarding, and a command console for the campus gate.",
    siteName: "VidyaSafar",
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${devanagari.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface font-sans text-ink">
        <ToastProvider>
          <div className="flex min-h-full flex-1 flex-col">{children}</div>
        </ToastProvider>
      </body>
    </html>
  );
}
