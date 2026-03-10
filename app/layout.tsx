import type { Metadata } from "next";
import "../src/index.css";
import ClientLayout from "./client-layout";
import Header from "../src/components/Header";
import FAQ from "../src/components/FAQ";
import Contact from "../src/components/Contact";

export const metadata: Metadata = {
    title: "مشروع فطرة | لحياة أسرية متوازنة",
    description: "مشروع فطرة هو مبادرة طموحة تهدف إلى تعزيز الوعي الأسري والمجتمعي من خلال برامج تثقيفية وورش عمل متخصصة.",
    icons: {
        icon: "/logo.webp",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl">
            <body className="min-h-screen font-sans text-right">
                <Header />
                <main>
                    <ClientLayout>{children}</ClientLayout>
                </main>
                <FAQ />
                <Contact />
            </body>
        </html>
    );
}
