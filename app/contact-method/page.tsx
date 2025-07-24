"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ChevronLeft} from "lucide-react"
import Link from "next/link"
import {ContactMethodManager} from "@/components/contact-method-manager"
import {useLanguage} from "@/lib/i18n/language-context";
import {WalletWatcher} from "@/components/wallet-watcher";

export default function ContactMethodPage() {
    const {t} = useLanguage()
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <header
                className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="container flex items-center h-14 px-4">
                    <Button variant="ghost" size="icon" className="mr-2" asChild>
                        <Link href="/profile">
                            <ChevronLeft className="h-5 w-5"/>
                        </Link>
                    </Button>
                    <h1 className="font-bold text-lg">{t('contactMethods')}</h1>
                </div>
            </header>

            <main className="flex-1 container px-4 py-4">
                <WalletWatcher/>
                <Card className="mb-4">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{t('contactMethods')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ContactMethodManager/>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}