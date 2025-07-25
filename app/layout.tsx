import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { Toaster } from "@/components/ui/toaster";
import { PageTransition } from "@/components/page-transition";
import ChatwootLauncher from "@/components/ChatwootLauncher";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "数字资产与积分交易平台",
    description: "一站式数字资产与积分交易平台，支持积分交易、RWA资产管理、钱包功能",
    generator: "v0.dev",
};

export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: "no",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="zh-CN" suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <LanguageProvider>
                {/*<1WalletWatcher />*/}
                {/* <ChatwootLauncher />*/}
                <PageTransition>{children}</PageTransition>
                <Toaster />
            </LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
