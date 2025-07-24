"use client"

import {Suspense} from "react"
import {useLanguage} from "@/lib/i18n/language-context";
import {WalletWatcher} from "@/components/wallet-watcher";
import dynamic from "next/dynamic";
const OrderMyDetailPage = dynamic(() =>
    import("@/components/points-market/order-mydetail-page"), {
    ssr: false,
    loading: () => <div>loading...</div>,
});
export default function OrderDetail() {
    const {t} = useLanguage()
    return (<Suspense fallback={<div>{t('loading')}</div>}>
        <WalletWatcher/>
        <OrderMyDetailPage/>
    </Suspense>)
}
