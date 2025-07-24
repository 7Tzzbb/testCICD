"use client";

import dynamic from "next/dynamic";
import {Suspense} from "react";
import {useLanguage} from "@/lib/i18n/language-context";
import {WalletWatcher} from "@/components/wallet-watcher";
// import MyOrdersPage from '@/components/points-market/my-orders-page'

const MyOrdersPage = dynamic(() => import("@/components/points-market/my-orders-page"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});

export default function MyOrders() {
  const {t} = useLanguage();

  return (
      <Suspense fallback={<div>{t("loading")}</div>}>
        <WalletWatcher/>
        <MyOrdersPage/>
      </Suspense>
  );
}
