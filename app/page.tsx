"use client";

import dynamic from "next/dynamic";
import {Suspense} from "react";
import {useLanguage} from "@/lib/i18n/language-context";
import {WalletWatcher} from "@/components/wallet-watcher";


const HomePage = dynamic(() => import("@/components/home-page"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

export default function Home() {
  const {t} = useLanguage();
  return (
      <Suspense fallback={<div>{t("loading")}</div>}>
        <WalletWatcher/>
        <HomePage/>
      </Suspense>
  );
}
