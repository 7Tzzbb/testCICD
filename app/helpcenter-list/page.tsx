"use client"

import {Suspense} from "react";
import {WalletWatcher} from "@/components/wallet-watcher";
import {useLanguage} from "@/lib/i18n/language-context";
import dynamic from "next/dynamic";
const HelpCenterListPage = dynamic(() =>
  import("@/components/helpcenter-list-page"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});
export default function HelpCenterListRoute() {
  const {t} = useLanguage()
  return  (<Suspense fallback={<div>{t('loading')}</div>}>
    <WalletWatcher/>
    <HelpCenterListPage/>
  </Suspense>)
}