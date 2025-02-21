import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sign-pdf.app"),
  title: {
    default: "SignPDF - Secure Digital PDF Signing with QR Verification",
    template: "%s | SignPDF",
  },
  description:
    "Securely sign and verify PDF documents with digital signatures, QR code verification, and role-based access control. Enterprise-grade document security and tracking.",
  applicationName: "SignPDF",
  authors: [
    {
      name: " Team",
      url: "https://sign-pdf.app/about",
    },
  ],
  generator: "Next.js",
  keywords: [
    "PDF signing",
    "digital signature",
    "document verification",
    "QR code verification",
    "secure document sharing",
    "electronic signature",
    "document tracking",
    "PDF security",
    "role-based access",
    "document management",
  ],
  creator: "SignPDF Team",
  publisher: "SignPDF",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Technology",
  classification: "Business & Productivity Software",

  openGraph: {
    type: "website",
    siteName: "SignPDF",
    title: "SignPDF - Secure Digital PDF Signing with QR Verification",
    description:
      "Securely sign and verify PDF documents with digital signatures, QR code verification, and role-based access control.",
    url: "https://sign-pdf.app",
    images: [
      {
        url: "/images/og-social-card.png",
        width: 1200,
        height: 630,
        alt: "SignPDF - Secure Digital PDF Signing Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SignPDF - Secure Digital PDF Signing",
    description:
      "Sign, verify, and manage PDFs with enterprise-grade security.",
    images: ["/images/twitter-card.png"],
    creator: "@YourTwitterHandle",
    site: "@YourCompanyTwitter",
  },

  verification: {
    google: "paste-your-google-verification-code-here",
    yandex: "paste-your-yandex-verification-code-here",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      {
        url: "/icons/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/icons/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icons/favicon/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        url: "/icons/android/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icons/apple/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        url: "/icons/apple/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        url: "/icons/apple/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        url: "/icons/apple/apple-icon-76x76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        url: "/icons/apple/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/icons/apple/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/icons/apple/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/icons/apple/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/icons/apple/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [{ rel: "manifest", url: "/manifest.json" }],
  },

  manifest: "/manifest.json",

  alternates: {
    canonical: "https://sign-pdf.app",
  },

  appleWebApp: {
    capable: true,
    title: "SignPDF",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* Add any additional meta tags here */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
