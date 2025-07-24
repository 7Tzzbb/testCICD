"use client"

import {useState, Suspense, useEffect} from "react"
import {useRouter, useSearchParams} from "next/navigation"
import {
    ArrowLeft,
    ShoppingCart
} from "lucide-react"
import {Button} from "@/components/ui/button"
import {SimpleTransition} from "@/components/simple-transition"
import {arbitrationAdd, getOrdersDetailInfo} from "@/lib/api"
import {useLanguage} from "@/lib/i18n/language-context";
import {WalletWatcher} from "@/components/wallet-watcher";
import dynamic from "next/dynamic";

const ArbitrateContent = dynamic(
    () => import("@/components/arbitrate-content").then(mod => mod.ArbitrateContent),
    {
        ssr: false,
        loading: () => <div className="p-4 text-muted-foreground">Loading...</div>,
    }
)

export default function ArbitratePage() {
    const router = useRouter()
    const {t} = useLanguage()
    return (
        <SimpleTransition>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <WalletWatcher/>
                <header className="sticky top-0 z-10 bg-white shadow-md h-16">
                    <div className="container flex items-center h-14 px-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-6 w-6 text-gray-900"/>
                        </Button>
                        <h1 className="font-bold text-xl ml-2 text-gray-900"> {t('details')}</h1>
                    </div>
                </header>

                <Suspense fallback={<div className="p-4 text-muted-foreground">{t('loading')}</div>}>
                    <ArbitrateContent/>
                </Suspense>
            </div>
        </SimpleTransition>
    )
}
