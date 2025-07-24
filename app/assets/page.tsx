"use client";

import dynamic from "next/dynamic";
import {Suspense} from "react";
import {useLanguage} from "@/lib/i18n/language-context";
import {WalletWatcher} from "@/components/wallet-watcher";

const AssetsPage = dynamic(() => import("@/components/assets-page"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

export default function Assets() {
  const {t} = useLanguage();

  return (
      <Suspense fallback={<div>{t("loading")}</div>}>
        <WalletWatcher/>
        <AssetsPage/>
      </Suspense>
  );
}
