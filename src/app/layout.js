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

export const metadata = {
  icons: {
    icon: "/icon-car.svg", // or .png, .svg
  },
  title: "Car Comparison Dashboard | Compare Vehicles Side-by-Side",
  description:
    "Compare car models side-by-side with detailed specifications. Find the perfect vehicle based on price, performance, and features.",
  keywords:
    "car comparison, vehicle specs, car shopping, automobile comparison, car buying guide",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}
