"use client";
import {Suspense} from "react";
import {WalletWatcher} from "@/components/wallet-watcher";
import {useLanguage} from "@/lib/i18n/language-context";
import dynamic from "next/dynamic";
const NoticeListPage = dynamic(() =>
    import("@/components/notice-list-page"), {
    ssr: false,
    loading: () => <div>loading...</div>,
});
export default function NoticeListRoute() {
  const {t} = useLanguage()
  return (
      <Suspense fallback={<div>{t("loading")}</div>}>
        <WalletWatcher/>
        <NoticeListPage/>
      </Suspense>
  );
}
