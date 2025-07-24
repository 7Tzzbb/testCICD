"use client"

import {Button} from "@/components/ui/button"
import {Wallet} from "lucide-react"
import {useLanguage} from "@/lib/i18n/language-context";

interface ConnectWalletProps {
    connectWallet: () => Promise<void>
    isConnecting: boolean
}

export function ConnectWallet({connectWallet, isConnecting}: ConnectWalletProps) {
    const {t} = useLanguage()
    return (
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="p-4 bg-muted rounded-full">
                <Wallet className="w-12 h-12 text-primary"/>
            </div>
            <h3 className="text-xl font-semibold">{t('connectWallet')}</h3>
            <p className="text-center text-muted-foreground">{t('connectWalletDescription')}</p>
            <Button onClick={connectWallet} disabled={isConnecting} className="w-full mt-4">
                {isConnecting ? t('connecting') : t('connectWallet')}
            </Button>
        </div>
    )
}
