import type { Metadata } from "next";
import "./globals.css";
import { AssessmentProvider } from '@/context/AssessmentContext';
import { LayoutContent } from './LayoutContent';

export const metadata: Metadata = {
  title: "Product Designer Skills Assessment 2025",
  description: "A comprehensive self-assessment tool for product designers covering 13 core competencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/vgi1jmr.css" />
      </head>
      <body className="antialiased">
        <AssessmentProvider>
          <LayoutContent>{children}</LayoutContent>
        </AssessmentProvider>
      </body>
    </html>
  );
}
