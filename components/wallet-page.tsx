"use client"

import {useState, useEffect} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {BottomNavigation} from "./bottom-navigation"
import {Copy, QrCode, ArrowUpRight, ArrowDownLeft, Shield, CreditCard, Wallet} from "lucide-react"
import {Input} from "@/components/ui/input"
import {useToast} from "@/hooks/use-toast"
import Link from "next/link"
import {PageTransition} from "./page-transition"
import {useLanguage} from "@/lib/i18n/language-context";

export default function WalletPage() {
    const {toast} = useToast()
    const [walletAddress, setWalletAddress] = useState("0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t")
    const [isLoading, setIsLoading] = useState(true)

    // 模拟数据加载
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [])
    const {t} = useLanguage()
    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletAddress)
        toast({
            title: t('copied'),
            description: t('walletCopied'),
            duration: 1500
        })
    }

    return (
        <PageTransition>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
                <header
                    className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mobile-slide-up">
                    <div className="container flex items-center justify-between h-14 px-4">
                        <h1 className="font-bold text-lg gradient-text-primary">{t('walletCenter')}</h1>
                        <Button variant="ghost" size="icon" className="hover-scale" asChild>
                            <Link href="/wallet/security">
                                <Shield className="h-5 w-5 text-primary"/>
                            </Link>
                        </Button>
                    </div>
                </header>

                <main className="flex-1 container px-4 py-4">
                    {isLoading ? (
                        // 加载状态
                        <div className="space-y-4 mobile-fade-in">
                            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                        </div>
                    ) : (
                        <div className="space-y-4 mobile-fade-in">
                            {/* 钱包卡片 */}
                            <Card
                                className="mb-4 bg-gradient-to-r from-primary/80 to-primary text-white vibrant-card hover-glow">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-xl font-bold">{t('myWallet')}</h2>
                                            <p className="text-sm opacity-90">{t('multiChainAssetMgmt')}</p>
                                        </div>
                                        <Wallet className="h-6 w-6 animate-float"/>
                                    </div>
                                    <div className="mb-4 hover-scale">
                                        <p className="text-sm opacity-90">{t('totalAssets')}</p>
                                        <p className="text-3xl font-bold animate-pulse-soft">25,380.52</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="secondary" size="sm"
                                                className="bg-white/20 hover:bg-white/30 text-white hover-scale">
                                            <ArrowUpRight className="h-4 w-4 mr-1"/>
                                            {t('deposit')}
                                        </Button>
                                        <Button variant="secondary" size="sm"
                                                className="bg-white/20 hover:bg-white/30 text-white hover-scale">
                                            <ArrowDownLeft className="h-4 w-4 mr-1"/>
                                            {t('withdraw')}
                                        </Button>
                                        <Button variant="secondary" size="sm"
                                                className="bg-white/20 hover:bg-white/30 text-white hover-scale"
                                                asChild>
                                            <Link href="/wallet/transfer">{t('transfer')}</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* 钱包地址 */}
                            <Card className="mb-4 vibrant-card hover-glow">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-medium gradient-text-primary">{t('walletAddress')}</h3>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" className="hover-scale"
                                                    onClick={copyToClipboard}>
                                                <Copy className="h-4 w-4 text-primary"/>
                                            </Button>
                                            <Button variant="ghost" size="icon" className="hover-scale">
                                                <QrCode className="h-4 w-4 text-primary"/>
                                            </Button>
                                        </div>
                                    </div>
                                    <Input value={walletAddress} readOnly
                                           className="font-mono text-xs border-primary/20 focus:border-primary/50"/>
                                </CardContent>
                            </Card>

                            {/* 资产列表 */}
                            <Tabs defaultValue="crypto" className="mb-4">
                                <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                                    <TabsTrigger value="crypto"
                                                 className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all duration-200">数字货币</TabsTrigger>
                                    <TabsTrigger value="fiat"
                                                 className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all duration-200">法币</TabsTrigger>
                                    <TabsTrigger value="payment"
                                                 className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary transition-all duration-200">支付方式</TabsTrigger>
                                </TabsList>

                                <TabsContent value="crypto" className="space-y-4 mt-4">
                                    <Card className="vibrant-card hover-glow">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center animate-pulse-soft">
                                                        <span className="text-orange-500 font-bold">B</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium">{t('bitcoin')}</h3>
                                                        <p className="text-sm text-gray-500">BTC</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold gradient-text-primary">0.0256</p>
                                                    <p className="text-sm text-gray-500">≈ 8,652.32 </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* 其他资产项... */}
                                </TabsContent>

                                {/* 其他标签内容... */}
                            </Tabs>
                        </div>
                    )}
                </main>

                <BottomNavigation/>
            </div>
        </PageTransition>
    )
}
