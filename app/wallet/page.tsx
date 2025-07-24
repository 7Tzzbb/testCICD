"use client"
import {useLanguage} from "@/lib/i18n/language-context";
import {Suspense} from "react";
import {WalletWatcher} from "@/components/wallet-watcher";
import dynamic from "next/dynamic";
const WalletPage = dynamic(() =>
    import("@/components/wallet-page"), {
    ssr: false,
    loading: () => <div>loading...</div>,
});
export default function Wallet() {
    const {t} = useLanguage()
    return (<Suspense fallback={<div>{t('loading')}</div>}>
        <WalletWatcher/>
        <WalletPage/>
    </Suspense>)
}
