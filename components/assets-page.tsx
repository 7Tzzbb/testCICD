"use client"

import {useState, useEffect} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {BottomNavigation} from "./bottom-navigation"
import {PageTransition} from "./page-transition"
import {useToast} from "@/hooks/use-toast"
import {
    ArrowUpRight,
    ArrowDownLeft,
    BarChart3,
    Clock,
    Filter,
    ChevronRight,
    Copy,
    Share2,
    AlertCircle,
    RefreshCwIcon,
    TrendingUp,
    TrendingDown,

} from "lucide-react"
import Link from "next/link"
import {
    assetStatementTotalAsset,
    getAssetsPageList,
    getAssetStatementPageList,
    exchangeRate,
    getRecentTransaction
} from "@/lib/api"
import InfiniteScroll from 'react-infinite-scroll-component'
import {useLanguage} from "@/lib/i18n/language-context"
import {copyToClipboard} from "@/lib/utils";

// 货币类型
type Currency = "CNY" | "USD" | "JPY" | "KRW" | "SGD" | "THB" | "IDR" | "MYR"

// 资产类型
interface Asset {
    id: string
    name: string
    type: string
    amount: string
    value: number
    icon: string
    change: string
}

// 交易记录类型
interface Transaction {
    id: string
    type: string
    assetName: string
    amount: string
    date: string
    status: "completed" | "pending" | "failed"
}

export default function AssetsPage() {
    const {toast} = useToast()
    const [isLoading, setIsLoading] = useState(true)
    const [currency, setCurrency] = useState<Currency>("CNY")
    const [totalValue, setTotalValue] = useState(25380.52)
    const [assets, setAssets] = useState<Asset[]>([])
    const [showTransferDialog, setShowTransferDialog] = useState(false)
    const [showTransferOutDialog, setShowTransferOutDialog] = useState(false)
    const [transferOutAddress, setTransferOutAddress] = useState("0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t")
    const [transferOutAmount, setTransferOutAmount] = useState("")
    const [isTransferring, setIsTransferring] = useState(false)


    // 货币符号映射
    const currencySymbols: Record<Currency, string> = {
        CNY: "¥",
        USD: "$",
        JPY: "¥",
        KRW: "₩",
        SGD: "S$",
        THB: "฿",
        IDR: "Rp",
        MYR: "RM"
    }

    const {t} = useLanguage()
    const [walletAddress, setWalletAddress] = useState<string | null>(null)

    // 錢包地址
    useEffect(() => {
        const address = localStorage.getItem('walletPublicKey')
        setWalletAddress(address)
        setCurrency('CNY')
        setAssetsList([])
        getAssetsPage(1)
        getUserTotal()
        getRecentTransactionList(1, 5)
    }, [])

    // 最近交易
    const [recentTransactionList, setRecentTransactionList] = useState([])
    const getRecentTransactionList = async (page: number, size: number) => {
        const res = await getRecentTransaction(page, size)
        if (res.code == 0) {
            setRecentTransactionList(res.data.content)
        } else {
            toast({
                title: t('tip'),
                description: t(res.message),
                duration: 1500
            })
        }
    }
    const [userTotal, setUserTotal] = useState({})
    const [totalAmount, setTotalAmount] = useState('')
    // 获取资产
    const getUserTotal = async () => {
        const res = await assetStatementTotalAsset()
        if (res.code == 0) {
            setUserTotal(res.data)
            setTotalAmount('￥' + res.data.totalBalance)
            // setTotalAmount('≈ ' + res.data.totalBalance)
        } else {
            setIsLoading(false)
            toast({
                title: t('tip'),
                description: t(res.message),
                duration: 1500
            })
        }
    }
    const [assetsList, setAssetsList] = useState([])

    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const pageSize = 10
    // 资产列表
    const getAssetsPage = async (customPage: any) => {
        const currentPage = customPage || page
        const r = await getAssetStatementPageList(currentPage, pageSize, '')
        if (r.code == 0) {
            const newData = r.data.content
            const totalPages = r.data.totalPages
            setIsLoading(false)
            // 追加数据
            setAssetsList((prev) =>
                currentPage == 1 ? newData : [...prev, ...newData]
            )
            const nextPage = page + 1
            setPage(nextPage)

            // 判断是否还有更多数据
            setHasMore(nextPage - 1 < totalPages)
        } else {
            setIsLoading(false)
            toast({
                title: t('tip'),
                description: t(r.message),
                duration: 1500
            })
            setHasMore(false)
        }
    }


    // 处理货币切换
    const handleCurrencyChange = async (value: Currency) => {
        setCurrency(value)
        const res = await exchangeRate(value)
        if (res.code == 0) {
            const convertedValue = userTotal.totalBalance * res.data.rate
            setTotalAmount(`${currencySymbols[value]} ${convertedValue.toLocaleString(undefined, {maximumFractionDigits: 2})}`)
        } else {
            toast({
                title: t('tip'),
                description: t(res.message),
                duration: 1500
            })
        }
    }
    // 处理资产转入
    const handleTransferIn = () => {
        setShowTransferDialog(true)
    }

    // 刷新钱包
    const handleRefreshWallet = async () => {
        try {
            getUserTotal()
            toast({
                title: t('refreshSuccess'),
                duration: 1500
            })
        } catch (err) {
        }
    }
    // 复制地址
    const handleCopyAddress = async () => {
        const success = await copyToClipboard(localStorage.getItem('walletPublicKey'));
        if (success) {
            toast({
                title: t('copySuccess'),
                description: t('copiedToClipboard'),
                duration: 1500
            });
        } else {
            toast({
                title: t('tip'),
                description: t('copyFailed'),
                duration: 1500
            });
        }
    }
    // 分享地址
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: t('myReceivingAddress'),
                    text: `${t('receivingAddress')}: ${walletAddress}`,
                })
            } catch (err) {
                // 用户取消分享或分享失败
                handleCopyAddress()
            }
        } else {
            // 不支持原生分享，回退到复制
            handleCopyAddress()
        }
    }

    // 生成二维码数据URL（这里使用简单的方式，实际项目中可以使用qrcode库）
    const generateQRCode = () => {
        // 这里应该使用真实的二维码生成库，比如 qrcode
        // 为了演示，我们使用一个占位符
        return `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="20" height="20" fill="black"/>
        <rect x="60" y="20" width="20" height="20" fill="black"/>
        <rect x="160" y="20" width="20" height="20" fill="black"/>
        <rect x="20" y="60" width="20" height="20" fill="black"/>
        <rect x="160" y="60" width="20" height="20" fill="black"/>
        <rect x="20" y="160" width="20" height="20" fill="black"/>
        <rect x="60" y="160" width="20" height="20" fill="black"/>
        <rect x="160" y="160" width="20" height="20" fill="black"/>
        <text x="100" y="110" text-anchor="middle" font-size="12" fill="black">QR Code</text>
      </svg>
    `)}`
    }

    // 处理资产转出
    const handleTransferOut = () => {
        setShowTransferOutDialog(true)
    }

    // 处理确认转出
    const handleConfirmTransferOut = async () => {
        if (!transferOutAddress.trim()) {
            toast({
                title: t('error'),
                description: t('pleaseEnterReceivingAddress'),
                variant: "destructive",
                duration: 1500
            })
            return
        }

        const amount = parseFloat(transferOutAmount)
        if (!amount || amount < 1) {
            toast({
                title: t('error'),
                description: t('withdrawMinAmount'),
                variant: "destructive",
                duration: 1500
            })
            return
        }

        setIsTransferring(true)

        // 模拟转出处理
        setTimeout(() => {
            setIsTransferring(false)
            setShowTransferOutDialog(false)
            setTransferOutAddress("0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t")
            setTransferOutAmount("")
            toast({
                title: t('withdrawSuccess'),
                description: `${t('withdrawn')} ${amount} USDT`,
                duration: 1500
            })
        }, 2000)
    }

    // 获取交易状态图标
    const getStatusIcon = (status: any) => {
        switch (status) {
            case 4:
                return <div className="h-2 w-2 rounded-full bg-green-500"></div>
            case 2:
                return <div className="h-2 w-2 rounded-full bg-amber-500"></div>
            case 1:
            case 3:
                return <div className="h-2 w-2 rounded-full bg-red-500"></div>
        }
    }

    return (
        <PageTransition>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
                <header
                    className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="container flex items-center h-14 px-4">
                        <h1
                            className="font-bold text-lg bg-gradient-to-r from-[#0097FF] to-[#8F4BFF] text-transparent bg-clip-text"
                            style={{
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {t('assets')}
                        </h1>
                        {/* <Button variant="ghost" size="icon" className="hover-scale">
              <Filter className="h-5 w-5 text-primary" />
            </Button> */}
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
                            {/* 资产总值卡片 */}
                            <Card className="
              mb-4 vibrant-gradient vibrant-card hover:shadow-xl transition-all duration-300 cursor-pointer border-0 rounded-xl bg-white/80 backdrop-blur-sm shimmer  ">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h2 className="text-xl text-white font-bold">{t('totalAssetValue')}</h2>
                                            <p className="text-sm text-white opacity-90">{t('realTimeValuation')}</p>
                                        </div>
                                        <Select value={currency}
                                                onValueChange={(value) => handleCurrencyChange(value as Currency)}>
                                            <SelectTrigger className="w-20 h-8 bg-white/20 border-white/30 text-white">
                                                <SelectValue placeholder="货币"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="CNY">CNY</SelectItem>
                                                <SelectItem value="USD">USD</SelectItem>
                                                <SelectItem value="JPY">JPY</SelectItem>
                                                <SelectItem value="KRW">KRW</SelectItem>
                                                <SelectItem value="SGD">SGD</SelectItem>
                                                <SelectItem value="THB">THB</SelectItem>
                                                <SelectItem value="IDR">IDR</SelectItem>
                                                <SelectItem value="MYR">MYR</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="mb-4 hover-scale">
                                        <p className="text-3xl font-bold animate-pulse-soft text-white">{totalAmount}</p>
                                    </div>

                                    {/* 钱包地址显示 */}
                                    {/*<div className="mb-4 p-3 bg-white/10 rounded-lg border border-white/20">*/}
                                    {/*    <div className="flex items-center justify-between">*/}
                                    {/*        <div className="flex-1">*/}
                                    {/*            <p className="text-xm text-white mb-1">{t('custodyWalletBalance')}：{userTotal.totalBalance}</p>*/}
                                    {/*        </div>*/}
                                    {/*        <Button*/}
                                    {/*            variant="ghost"*/}
                                    {/*            size="sm"*/}
                                    {/*            className="ml-2 h-8 w-8 p-0 text-white hover:bg-white/20"*/}
                                    {/*            onClick={handleRefreshWallet}*/}
                                    {/*        >*/}
                                    {/*            <RefreshCwIcon className="h-4 w-4"/>*/}
                                    {/*        </Button>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    {/*<div className="items-center grid grid-cols-3 gap-3">*/}
                                    {/*    <Button*/}
                                    {/*        variant="secondary"*/}
                                    {/*        size="sm"*/}
                                    {/*        className="bg-white/20 hover:bg-white/30 text-white hover-scale"*/}
                                    {/*        onClick={handleTransferIn}*/}
                                    {/*    >*/}
                                    {/*        <ArrowUpRight className="h-4 w-4 mr-1"/>*/}
                                    {/*        {t('transferInBalance')}*/}
                                    {/*    </Button>*/}
                                    {/*    <Button*/}
                                    {/*        variant="secondary"*/}
                                    {/*        size="sm"*/}
                                    {/*        className="bg-white/20 hover:bg-white/30 text-white hover-scale"*/}
                                    {/*        onClick={handleTransferOut}*/}
                                    {/*    >*/}
                                    {/*        <ArrowDownLeft className="h-4 w-4 mr-1"/>*/}
                                    {/*        {t('withdrawBalance')}*/}
                                    {/*    </Button>*/}
                                    {/*    <Button*/}
                                    {/*        variant="secondary"*/}
                                    {/*        size="sm"*/}
                                    {/*        className="bg-white/20 hover:bg-white/30 text-white hover-scale"*/}
                                    {/*        asChild*/}
                                    {/*    >*/}
                                    {/*        <Link href="/assets/history">*/}
                                    {/*            <Clock className="h-4 w-4 mr-1"/>*/}
                                    {/*            {t('changeRecord')}*/}
                                    {/*        </Link>*/}
                                    {/*    </Button>*/}
                                    {/*</div>*/}
                                </CardContent>
                            </Card>

                            {/* 资产列表 */}
                            <div className="mb-4">
                                <div className="flex items-center mb-3 justify-between">
                                    <h3 className="font-medium text-lg">{t('assetList')}</h3>
                                    <Button variant="ghost" size="sm" className="text-primary hover-scale">
                                        {t('allAssets')}
                                        <ChevronRight className="h-4 w-4 ml-1"/>
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <InfiniteScroll
                                        dataLength={assetsList.length}
                                        next={getAssetsPage}
                                        hasMore={hasMore}
                                        loader={<h4>{t('loading')}</h4>}
                                        endMessage={<p style={{textAlign: 'center'}}>{t('noData')}</p>}
                                        scrollableTarget="scrollableDiv">
                                        {
                                            assetsList.map((asset, i) => (
                                                <Link key={asset.id}
                                                      href={`/assets/detail/myinfo?id=${asset.id}&assetId=${asset.assetsId}`}>
                                                    <Card className="vibrant-card hover-glow cursor-pointer mb-4">
                                                        <CardContent className="p-4">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <div
                                                                        className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                                    <span
                                                                        className="text-xl">{asset.type == 1 ? '🛍' : '🥇'}</span>
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="font-medium">{asset.assetsName}</h3>
                                                                        <div className="flex items-center">
                                                                        <span
                                                                            className="text-sm text-gray-500 dark:text-gray-400">
                                                                            {asset.type == 1 ? t('points') : t('rwa')}
                                                                        </span>
                                                                            <div
                                                                                className={`text-xs ml-2 flex items-center`}>
                                      <span>
                                        {asset.rise > 0 ? <TrendingUp className="h-3 w-3 mr-0.5 text-green-500"/> :
                                            <TrendingDown className="h-3 w-3 mr-0.5 text-red-500"/>}
                                      </span>
                                                                                <span
                                                                                    className={asset.rise > 0 ? "text-green-500" : "text-red-500"}>
                                        {asset.rise}%
                                      </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="font-bold gradient-text-primary">{asset.assetsBalance || 0}</p>
                                                                    <p className="text-sm text-gray-500">
                                                                        {/*≈ {asset.sumPrice * asset.assetsBalance}*/}
                                                                        ≈{(asset?.sumPrice || 0)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Link>
                                            ))
                                        }
                                    </InfiniteScroll>

                                </div>
                            </div>

                            {/* 最近交易 */}
                            <div className="mb-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-medium text-lg">{t('recentTransactions')}</h3>
                                    <Button variant="ghost" size="sm" className="text-primary hover-scale" asChild>
                                        <Link href="/assets/assets-history">
                                            {t('allRecords')}
                                            <ChevronRight className="h-4 w-4 ml-1"/>
                                        </Link>
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    {recentTransactionList.length === 0 ? (
                                        <p style={{textAlign: 'center'}}>{t('noData')}</p>
                                    ) : (
                                        recentTransactionList.map((transaction, i) => (
                                            <Card key={i}>
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                                {transaction.type == 1 ?
                                                                    <ArrowUpRight className="h-5 w-5 text-green-500"/> :
                                                                    <ArrowDownLeft className="h-5 w-5 text-red-500"/>}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-medium">{transaction.type == 1 ? t('depositAction') : t('pushInfo')} {transaction.assetName}</h3>
                                                                <div className="flex items-center">
                                                                <span
                                                                    className="text-sm text-gray-500 dark:text-gray-400">{transaction.createdAt}</span>
                                                                    <div className="flex items-center ml-2">
                                                                        {getStatusIcon(transaction.status)}
                                                                        <span className="text-xs ml-1">
                                    {transaction.status == 1 ? t('pendingPayment') :
                                        transaction.status == 2 ? t('pendingRelease') : transaction.status == 3 ? t('cancelled') : t('completed')}
                                  </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className={`font-bold ${transaction.transactionValue ? "text-green-500" : "text-red-500"}`}>
                                                                {transaction.transactionValue}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    )}

                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* 转入资产对话框 */}
                <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-center">{t('depositAsset')}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            {/* 提示信息 */}
                            <div
                                className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                                <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400 flex-shrink-0"/>
                                <p className="text-sm text-orange-700 dark:text-orange-300">
                                    {t('onlyTransferBscAssets')}
                                </p>
                            </div>

                            {/* 二维码 */}
                            <div className="flex justify-center p-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <img
                                        src={generateQRCode()}
                                        alt={t('receivingQRCode')}
                                        className="w-48 h-48"
                                    />
                                </div>
                            </div>

                            {/* 收款地址 */}
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-center text-gray-600 dark:text-gray-400">
                                    {t('receivingAddress')}
                                </p>
                                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <p className="text-sm font-mono text-center break-all text-gray-900 dark:text-gray-100">
                                        {walletAddress}
                                    </p>
                                </div>
                            </div>

                            {/* 操作按钮 */}
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={handleShare}
                                >
                                    <Share2 className="h-4 w-4 mr-2"/>
                                    {t('share')}
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleCopyAddress}
                                >
                                    <Copy className="h-4 w-4 mr-2"/>
                                    {t('copy')}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* 转出资产对话框 */}
                <Dialog open={showTransferOutDialog} onOpenChange={setShowTransferOutDialog}>
                    <DialogContent className="mx-4 rounded-lg">
                        <DialogHeader>
                            <DialogTitle>
                                {t('withdrawBalance')}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            {/* BSC网络提示 */}
                            <div
                                className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                <AlertCircle className="h-4 w-4 text-orange-500"/>
                                <span className="text-sm text-orange-700">{t('useBscNetwork')}</span>
                            </div>

                            {/* 收款地址输入框 */}
                            <div className="space-y-2">
                                <Label htmlFor="transfer-address">{t('receivingAddress')}</Label>
                                <Input
                                    id="transfer-address"
                                    value={transferOutAddress}
                                    onChange={(e) => setTransferOutAddress(e.target.value)}
                                    placeholder={t('pleaseEnterReceivingAddress')}
                                    className="font-mono text-sm"
                                />
                            </div>

                            {/* 转出数量输入框 */}
                            <div className="space-y-2">
                                <Label htmlFor="transfer-amount">{t('withdrawAmount')}</Label>
                                <div className="relative">
                                    <Input
                                        id="transfer-amount"
                                        type="number"
                                        value={transferOutAmount}
                                        onChange={(e) => setTransferOutAmount(e.target.value)}
                                        placeholder={t('withdrawMinAmount')}
                                        min="1"
                                        step="0.01"
                                    />
                                    <span
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                                        USDT
                                   </span>
                                </div>
                            </div>

                            {/* 手续费提示 */}
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">{t('serviceFee')}</span>
                                <span className="text-sm font-medium">1 USDT</span>
                            </div>

                            {/* 确认转出按钮 */}
                            <div className="flex gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowTransferOutDialog(false)}
                                    className="flex-1"
                                    disabled={isTransferring}
                                >
                                    {t('cancel')}
                                </Button>
                                <Button
                                    onClick={handleConfirmTransferOut}
                                    className="flex-1"
                                    disabled={isTransferring}
                                >
                                    {isTransferring ? t('withdrawing') : t('confirmWithdraw')}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                {/* ... */}
            </div>
        </PageTransition>
    )
}
