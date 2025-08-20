"use client"

import {useState, useEffect} from "react"
import {Card, CardContent, CardDescription} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {useToast} from "@/hooks/use-toast"
import {
    ArrowUpRight,
    ArrowDownLeft,
    ArrowLeft,
    ShoppingCart,
    ShoppingBag,
    ArrowDownRight,
    ArrowUpLeft,
    ChevronRight, FileX
} from "lucide-react"
import Link from "next/link"
import {PageTransition} from "./page-transition"
import {useRouter, useSearchParams} from "next/navigation"
import {
    getAssetsDetail,
    getAssetStatementDetail,
    getAssetStatementRecordPageList,
    getOrdersTransactionPageRecord
} from "@/lib/api"
import InfiniteScroll from 'react-infinite-scroll-component'
import {useLanguage} from "@/lib/i18n/language-context"

// 资产类型
interface Asset {
    id: string
    name: string
    type: string
    amount: string
    value: number
    icon: string
    change: string
    description?: string
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

export default function AssetMydetailPage() {
    const router = useRouter()
    const {toast} = useToast()
    const [isLoading, setIsLoading] = useState(true)
    const [asset, setAsset] = useState(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const searchParams = useSearchParams()
    const assetId = searchParams.get('assetId')
    const id = searchParams.get('id')
    const {t} = useLanguage()

    useEffect(() => {
        setAssetStatementRecords([])
        getAssetInfo(id)
        getAssetAtatementRecord(1, 'ALL')
    }, [])

    const [isTradingTime, setIsTradingTime] = useState(false)
    useEffect(() => {
        const checkTradingTime = () => {
            // ✅ 如果为 null，视为全天可交易
            if (asset?.transactionTime === null) {
                setIsTradingTime(true)
                return
            }

            if (!asset?.transactionTime || !Array.isArray(asset.transactionTime)) {
                setIsTradingTime(false)
                return
            }

            const now = new Date()
            const nowMinutes = now.getHours() * 60 + now.getMinutes()

            const inTimeRange = asset.transactionTime.some(({startTime, endTime}) => {
                const [startH, startM] = startTime.split(':').map(Number)
                const [endH, endM] = endTime.split(':').map(Number)
                const start = startH * 60 + startM
                const end = endH * 60 + endM
                return nowMinutes >= start && nowMinutes <= end
            })

            setIsTradingTime(inTimeRange)
        }
        checkTradingTime()

        const timer = setInterval(checkTradingTime, 30 * 1000) // 每30秒检测一次
        return () => clearInterval(timer)
    }, [asset])


    const [tab, setTab] = useState('ALL')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const pageSize = 10
    const [assetStatementRecords, setAssetStatementRecords] = useState([])
    // 资产变动列表
    const getAssetAtatementRecord = async (customPage?: number, type?: any) => {
        const currentPage = customPage || page
        const res = await getAssetStatementRecordPageList(currentPage, pageSize, type, assetId)
        if (res.code == 0) {
            const newData = res.data.content
            const totalPages = res.data.totalPages
            // 追加数据
            setAssetStatementRecords((prev) =>
                currentPage == 1 ? newData : [...prev, ...newData]
            )
            setIsLoading(false)
            const nextPage = currentPage + 1
            setPage(nextPage)
            // 判断是否还有更多数据
            setHasMore(nextPage - 1 < totalPages)
        } else {
            toast({
                description: t(res.message),
                duration: 1500
            })
        }
    }
    // 请求资产详情
    const getAssetInfo = async (id: any) => {
        const res = await getAssetStatementDetail(id)
        if (res.code == 0) {
            if (res.data.transactionTime) {
                res.data.transactionTime = JSON.parse(res.data.transactionTime)
            }
            setAsset(res.data)
        } else {
            router.back()
            toast({
                title: t('tip'),
                description: t(res.message),
                duration: 1500
            })
        }
    }

    // 处理资产转入
    const handleTransferIn = () => {
        router.push(`/assets/transfer-in/info?id=${id}`)
    }

    // 处理资产转出
    const handleTransferOut = () => {
        router.push(`/assets/transfer-out/info?id=${id}`)
    }

    // 处理资产买入
    const handleBuy = () => {
        router.push(`/assets/buy/info?id=${asset.id}`)
    }

    // 处理资产卖出
    const handleSell = () => {
        router.push(`/assets/sell/info?id=${asset.id}`)
    }
    // 格式化状态
    const formatStatus = (status: number) => {
        switch (status) {
            case 1:
                return t('pendingPayment')
            case 2:
                return t('pendingRelease')
            case 3:
                return t('cancelled')
            case 4:
                return t('completed')
        }
    }
    // 格式化文字
    const formatStatusText = (row: any) => {
        // switch (row.type) {
        //     case 1:
        //         if (row.userIdBuy == localStorage.getItem('userId')) {
        //             return t('depositAction') // 转入
        //         } else {
        //             return t('withdrawAction') // 转出
        //         }
        //     case 2:
        //         if (row.userIdBuy == localStorage.getItem('userId')) {
        //             return t('withdrawAction') // 转出
        //         } else {
        //             return t('depositAction') // 转入
        //         }
        // }
        switch (row.type) {
            case 1:
                return t('buy')
            case 2:
                return t('sell')
            case 3:
                return t('depositAction')
            case 4:
                return t('pushInfo')
        }
    }
    // 格式化背景色
    const transactionCss = (row: any) => {
        switch (row.type) {
            case 1:
            case 3:
                return "bg-green-100" // 转入
            case 2:
            case 4:
                return "bg-red-100" // 转出
        }
        // switch (row.type) {
        //     case 1:
        //         if (row.userIdBuy == localStorage.getItem('userId')) {
        //             return "bg-green-100" // 转入
        //         } else {
        //             return "bg-red-100"// 转出
        //         }
        //     case 2:
        //         if (row.userIdBuy == localStorage.getItem('userId')) {
        //             return "bg-red-100" // 转出
        //         } else {
        //             return "bg-green-100" // 转入
        //         }
        // }
    }

    // 格式化ICON
    const formatStatusIcon = (row: any) => {
        switch (row.type) {
            case 1:
            case 3:
                return <ArrowDownRight className="h-5 w-5 text-green-500"/> // 转入
            case 2:
            case 4:
                return <ArrowUpRight className="h-5 w-5 text-red-500"/> // 转出
        }
        // switch (row.type) {
        //     case 1:
        //         if (row.userIdBuy == localStorage.getItem('userId')) {
        //             return <ArrowDownRight className="h-5 w-5 text-green-500"/> // 转入
        //         } else {
        //             return <ArrowUpRight className="h-5 w-5 text-red-500"/> // 转出
        //         }
        //     case 2:
        //         if (row.userIdBuy == localStorage.getItem('userId')) {
        //             return <ArrowUpRight className="h-5 w-5 text-red-500"/> // 转出
        //         } else {
        //             return <ArrowDownRight className="h-5 w-5 text-green-500"/> // 转入
        //         }
        // }
    }

    // 切换tab
    const handleCurrencyChange = (t: string) => {
        setTab(t)
        getAssetAtatementRecord(1, t)
        setAssetStatementRecords([])
    }

    if (isLoading || !asset) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <header
                    className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="container flex items-center h-14 px-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5"/>
                        </Button>
                        <h1 className="font-bold text-lg ml-2">{t('assetDetail')}</h1>
                    </div>
                </header>
                <main className="flex-1 container px-4 py-4 flex items-center justify-center">
                    <p className="text-muted-foreground">{t('loading')}</p>
                </main>
            </div>
        )
    }

    return (
        <PageTransition>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <header
                    className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="container flex items-center h-14 px-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5"/>
                        </Button>
                        <h1 className="font-bold text-lg ml-2">{asset.assetsName}{t('details')}</h1>
                    </div>
                </header>

                <main className="flex-1 container px-4 py-4">
                    <div className="space-y-4">
                        {/* 资产信息卡片 */}
                        <Card
                            className="mb-4 vibrant-gradient vibrant-card hover:shadow-xl transition-all bg-gradient-to-br from-primary/80 to-primary text-white vibrant-card hover-glow">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                                        <span className="text-2xl">{asset.type == 1 ? '🪙' : '🏦'}</span>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">{asset.assetsName}</h2>
                                        <p className="text-sm opacity-90">{asset.type == 1 ? t('points') : t('rwa')}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <p className="text-sm opacity-80">{t('assetAmount')}</p>
                                        <p className="text-xl font-bold">{asset.assetsBalance || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-80">{t('valuation')}(CNY)</p>
                                        <p className="text-xl font-bold">{asset.sumPrice || 0}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm opacity-80">{t('frozenAmount')}</p>
                                        <p className="text-xl font-bold">{asset.freeze || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm opacity-80">{t('increaseRate24h')}</p>
                                        <p className={`text-xl font-bold ${asset.rise > 0 ? "text-green-300" : "text-red-300"}`}>
                                            {asset.rise}
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-4 p-3 bg-white/10 rounded-lg">
                                    <p className="text-sm">{asset.assetsDetail}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        variant="secondary"
                                        className="bg-white/20 hover:bg-white/30 text-white hover-scale"
                                        onClick={handleTransferIn}
                                    >
                                        <ArrowDownRight className="h-4 w-4 mr-1"/>
                                        {t('withdrawAsset')}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="bg-white/20 hover:bg-white/30 text-white hover-scale"
                                        onClick={handleTransferOut}
                                    >
                                        <ArrowUpRight className="h-4 w-4 mr-1"/>
                                        {t('pushPointsInfo')}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        disabled={!isTradingTime}
                                        className="bg-white/20 hover:bg-white/30 text-white hover-scale"
                                        onClick={handleBuy}
                                    >
                                        <ShoppingCart className="h-4 w-4 mr-1"/>
                                        {t('buyAsset')}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        disabled={!isTradingTime}
                                        className="bg-white/20 hover:bg-white/30 text-white hover-scale"
                                        onClick={handleSell}
                                    >
                                        <ShoppingBag className="h-4 w-4 mr-1"/>
                                        {t('sellAsset')}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 资产变动记录 */}
                        <div className="mb-4 qb-16">
                            {/*标题*/}
                            <div className="flex items-center mb-3 justify-between">
                                <h3 className="font-medium text-lg mb-3">{t('assetChangeRecord')}</h3>
                                <Button variant="ghost" size="sm" className="text-primary hover-scale" onClick={() => {
                                    router.push('/points-market/my-orders/')
                                }}>
                                    {t('myOrders')}
                                </Button>
                            </div>
                            <Tabs defaultValue="ALL" className="w-full mb-4"
                                  onValueChange={(value) => handleCurrencyChange(value)}>
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="ALL">{t('all')}</TabsTrigger>
                                    <TabsTrigger value="BUY_AND_SELL">{t('buySell')}</TabsTrigger>
                                    <TabsTrigger value="TRANSFER_IN_AND_OUT">{t('getOrPushInfo')}</TabsTrigger>
                                </TabsList>
                            </Tabs>

                            <div className="space-y-3">
                                <InfiniteScroll
                                    dataLength={assetStatementRecords.length}
                                    next={getAssetAtatementRecord}
                                    hasMore={hasMore}
                                    loader={<h4>{t('loading')}</h4>}
                                    endMessage={<p style={{textAlign: 'center'}}>{t('noData')}</p>}
                                    scrollableTarget="scrollableDiv">
                                    {
                                        assetStatementRecords.map((transaction, i) => (
                                            <Card key={i} className="vibrant-card hover-glow mb-2">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`h-10 w-10 rounded-full ${transactionCss(transaction)} flex items-center justify-center`}>
                                                                {formatStatusIcon(transaction)}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-medium">
                                                                    {formatStatusText(transaction)}
                                                                </h3>
                                                                <span
                                                                    className="text-sm text-gray-500 dark:text-gray-400">{transaction.createdAt}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className={`font-bold ${transaction.type == 1 ? 'text-green-500' : 'text-red-500'}`}>
                                                                {transaction.transactionValue}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                ${transaction.estimatedValue ?? 0}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    }
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </PageTransition>
    )
}
