import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const mukta = Mukta({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Contactlist App",
  description:
    "Built with Next.js 15, TailwindCSS and MongoDB for a modern, secure and fast experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mukta.className} antialiased flex flex-col items-center justify-center max-w-7xl mx-auto sm:px-16 px-6`}
      >
        <Provider>
          <Nav />
          <main className="">{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
