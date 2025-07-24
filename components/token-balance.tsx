import {Card, CardContent} from "@/components/ui/card"
import {BarChart3} from "lucide-react"
import {useLanguage} from "@/lib/i18n/language-context";

interface TokenBalanceProps {
    account: string
    balance: string
}

export function TokenBalance({account, balance}: TokenBalanceProps) {
    const {t} = useLanguage()
    return (
        <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center space-y-2">
                <div className="p-2 bg-primary/10 rounded-full">
                    <BarChart3 className="w-8 h-8 text-primary"/>
                </div>
                <h3 className="text-xl font-semibold">{t('accountBalance')}</h3>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <p className="text-3xl font-bold">{Number.parseFloat(balance).toFixed(4)} ETH</p>
                        <p className="text-sm text-muted-foreground">
                            {t('address')}: {account.substring(0, 6)}...{account.substring(account.length - 4)}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
