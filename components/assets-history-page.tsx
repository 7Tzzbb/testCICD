"use client"

import {useState, useEffect} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {ArrowUpRight, ArrowDownLeft, ArrowLeft, ArrowDownRight, FileX} from "lucide-react"
import Link from "next/link"
import {assetStatementTotalAsset, getAssetStatementRecordPageList, getRecentTransaction} from "@/lib/api"
import {useToast} from "@/hooks/use-toast"
import InfiniteScroll from 'react-infinite-scroll-component'
import {useLanguage} from "@/lib/i18n/language-context"

// 交易记录类型
interface Transaction {
    id: string
    type: string
    assetName: string
    amount: string
    date: string
    status: "completed" | "pending" | "failed"
    usdtValue: number // 添加USDT价值字段
}

export default function AssetsHistoryPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState("all")

    const [tab, setTab] = useState('0')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const pageSize = 10
    const [assetStatementRecords, setAssetStatementRecords] = useState([])
    const {toast} = useToast()
    const {t} = useLanguage()

    // 模拟数据加载 - 仅显示USDT相关交易
    useEffect(() => {
        setAssetStatementRecords([])
        getAssetStatementRecordList(1, 0)
    }, [])

    // 个人变动记录
    const getAssetStatementRecordList = async (customPage?: number, type?: any) => {
        const currentPage = customPage || page
        const res = await getRecentTransaction(currentPage, pageSize, type)
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

    // 获取交易状态图标
    const getStatusIcon = (status: Transaction['status']) => {
        switch (status) {
            case "completed":
                return <div className="h-2 w-2 rounded-full bg-green-500"></div>
            case "pending":
                return <div className="h-2 w-2 rounded-full bg-amber-500"></div>
            case "failed":
                return <div className="h-2 w-2 rounded-full bg-red-500"></div>
        }
    }
    // 切换tab
    const handleCurrencyChange = (t: string) => {
        setTab(t)
        getAssetStatementRecordList(1, t)
        setAssetStatementRecords([])
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <header
                className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="container flex items-center h-14 px-4">
                    <Button variant="ghost" size="icon" className="mr-2" asChild>
                        <Link href="/assets">
                            <ArrowLeft className="h-5 w-5"/>
                        </Link>
                    </Button>
                    <h1 className="font-bold text-lg">{t('recentTransactions')}</h1>
                </div>
            </header>

            <main className="flex-1 container px-4 py-4">

                {isLoading ? (
                    // 加载状态
                    <div className="space-y-4">
                        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">

                        <Tabs defaultValue="0" className="w-full"
                              onValueChange={(value) => handleCurrencyChange(value)}>
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="0">{t('all')}</TabsTrigger>
                                <TabsTrigger value="1">{t('depositAction')}</TabsTrigger>
                                <TabsTrigger value="2">{t('pushInfo')}</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <div className="space-y-3 mt-4">
                            <InfiniteScroll
                                dataLength={assetStatementRecords.length}
                                next={getAssetStatementRecordList}
                                hasMore={hasMore}
                                loader={<h4>{t('loading')}</h4>}
                                endMessage={<p style={{textAlign: 'center'}}>{t('noData')}</p>}
                                scrollableTarget="scrollableDiv">
                                {
                                    assetStatementRecords.map((transaction, i) => (
                                        <Card key={i} className="hover:shadow-md transition-shadow mb-2">
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
                                                        {/*<p className={`font-bold text-lg ${transaction.changesAmount ? "text-green-500" : "text-red-500"}`}>*/}
                                                        {/*  {transaction.changesAmount}*/}
                                                        {/*</p>*/}
                                                        {/*<p className="text-sm text-gray-500">*/}
                                                        {/*  ≈ ¥{(Math.abs(transaction.estimatedValue) * 7.2).toFixed(2)}*/}
                                                        {/*</p>*/}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                }
                            </InfiniteScroll>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}