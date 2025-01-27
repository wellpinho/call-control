import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeaderComponent } from "@/components/header";
import { AuthProvider } from "@/providers/authProvider";
import { ModalProvider } from "@/providers/modal";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Call Control",
    description: "Created by Wellington Pinho",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <AuthProvider>
                    <ModalProvider>
                        <HeaderComponent />
                        {children}
                    </ModalProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
