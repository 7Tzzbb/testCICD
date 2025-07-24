"use client"

import {Suspense} from "react"
import {useLanguage} from "@/lib/i18n/language-context";
import {WalletWatcher} from "@/components/wallet-watcher";
import dynamic from "next/dynamic";
const TransferOutPage = dynamic(() =>
    import("@/components/transfer-out-page"), {
    ssr: false,
    loading: () => <div>loading...</div>,
});
export default function TransferOut() {
    const {t} = useLanguage()
    return (<Suspense fallback={<div>{t('loading')}</div>}>
        <WalletWatcher/>

        <TransferOutPage/>
    </Suspense>)
}