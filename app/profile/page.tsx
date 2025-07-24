"use client";

import dynamic from "next/dynamic";
import {Suspense} from "react";
import {useLanguage} from "@/lib/i18n/language-context";
import {WalletWatcher} from "@/components/wallet-watcher";
// import ProfilePage from '@/components/profile-page'
const ProfilePage = dynamic(() => import("@/components/profile-page"), {
    ssr: false,
    loading: () => <div>loading...</div>,
});

export default function Profile() {
    const {t} = useLanguage();
    return (
        <Suspense fallback={<div>{t("loading")}</div>}>
            <WalletWatcher/>
            <ProfilePage/>
        </Suspense>
    );
}
