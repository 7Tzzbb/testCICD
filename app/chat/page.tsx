"use client"

import {useLanguage} from "@/lib/i18n/language-context";
import {WalletWatcher} from "@/components/wallet-watcher";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";

export default function ChatPage() {
    const { t } = useLanguage()
    const router = useRouter()

    const toBack = () => {
        router.back()
    }
    const BASE_URL = 'http://18.139.247.138:3000'
    const WEBSITE_TOKEN = 'T9ftL1165S9hwAjrJkMJEXa4'
    const iframeUrl = `${BASE_URL}/widget?website_token=${WEBSITE_TOKEN}`
    return (
        <div className="h-screen w-screen p-0 m-0 overflow-hidden pb-16">
            <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                <div className="container flex items-center h-14 px-4">
                    <Button variant="ghost" size="icon" onClick={toBack}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="font-bold text-lg ml-2">{t('onlineService')}</h1>
                </div>
            </header>
            <WalletWatcher />
            <iframe
                src={iframeUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title={t('aiAssistant')}
            />
        </div>
    )
}
