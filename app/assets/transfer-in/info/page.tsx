"use client"

import {Suspense} from "react"
import {useLanguage} from "@/lib/i18n/language-context";
import {WalletWatcher} from "@/components/wallet-watcher";
import dynamic from "next/dynamic";
const TransferInPage = dynamic(() =>
    import("@/components/transfer-in-page"), {
    ssr: false,
    loading: () => <div>loading...</div>,
});
export default function TransferIn() {
    const {t} = useLanguage()
    return (<Suspense fallback={<div>{t('loading')}</div>}>
        <WalletWatcher/>

        <TransferInPage/>
    </Suspense>)
}