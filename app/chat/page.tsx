"use client"

import {useLanguage} from "@/lib/i18n/language-context";
import {WalletWatcher} from "@/components/wallet-watcher";

export default function ChatPage() {
    const BASE_URL = 'http://13.251.81.128:3000'
    const WEBSITE_TOKEN = 'yL2WGLHJeVBDDjLCgn6aGgpy'
    const iframeUrl = `${BASE_URL}/widget?website_token=${WEBSITE_TOKEN}`
    const {t} = useLanguage()
    return (
        <div className="h-screen w-screen p-0 m-0 overflow-hidden pb-16">
            <WalletWatcher/>
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
