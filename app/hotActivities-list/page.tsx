"use client"

import {Suspense} from "react";
import {WalletWatcher} from "@/components/wallet-watcher";
import {useLanguage} from "@/lib/i18n/language-context";
import dynamic from "next/dynamic";
const HotActivitiesListPage = dynamic(() =>
    import("@/components/hotActivities-list-page"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});
export default function HotActivitiesListRoute() {
  const {t} = useLanguage()
  return (<Suspense fallback={<div>{t('loading')}</div>}>
    <WalletWatcher/>
    <HotActivitiesListPage/>
  </Suspense>)
}