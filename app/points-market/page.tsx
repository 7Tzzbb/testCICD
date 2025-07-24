"use client";

import dynamic from "next/dynamic";
import {Suspense} from "react";
import {useLanguage} from "@/lib/i18n/language-context";
import {WalletWatcher} from "@/components/wallet-watcher";


const PointsMarketPage = dynamic(() => import("@/components/points-market-page"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

export default function PointsMarket() {
  const {t} = useLanguage();

  return (
      <Suspense fallback={<div>{t("loading")}</div>}>
        <WalletWatcher/>
        <PointsMarketPage/>
      </Suspense>
  );
}

