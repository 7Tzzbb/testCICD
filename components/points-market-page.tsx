"use client"

import {useState, useEffect, useRef} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {BottomNavigation} from "./bottom-navigation"
import {Search, Filter, TrendingUp, TrendingDown, ArrowLeftRight, ChevronLeft} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import Link from "next/link"
import {useLanguage} from "@/lib/i18n/language-context"
import {useToast} from "@/hooks/use-toast"
import {getAssetsPageList} from "@/lib/api"
import InfiniteScroll from 'react-infinite-scroll-component'
import {useRouter} from "next/navigation";

export default function PointsMarketPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const {toast} = useToast()
    const router = useRouter()
    const {t} = useLanguage()
    useEffect(() => {
        setAssetsList([])
        getAssetsPage()
    }, [])
    const [assetsList, setAssetsList] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const pageSize = 10
    // 资产列表
    const getAssetsPage = async (customPage?: number, search?: string) => {
        const currentPage = customPage || page
        const r = await getAssetsPageList(currentPage, pageSize, 1, searchQuery?.trim() || search?.trim())
        if (r.code == 0) {
            const newData = r.data.content
            const totalPages = r.data.totalPages
            // 追加数据
            // setAssetsList((prev) => [...prev, ...newData])
            setAssetsList((prev) =>
                currentPage === 1 ? newData : [...prev, ...newData]
            )
            const nextPage = page + 1
            setPage(nextPage)

            // 判断是否还有更多数据
            setHasMore(nextPage - 1 < totalPages)
        } else {
            toast({
                title: t('tip'),
                description: t(r.message),
                duration: 1500
            })
            setHasMore(false)
        }
    }
    // 搜索
    const search = (query: string) => {
        setHasMore(true)
        setAssetsList([])
        setPage(1)
        setSearchQuery(query)
        getAssetsPage(1, query)
    }
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950">
            <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center">
                <div className="container flex items-center px-4">
                    <Button variant="ghost" size="icon" className="mr-2" asChild onClick={() => router.back()}>
                        <ChevronLeft className="h-5 w-5"/>
                    </Button>
                    <h1 className="font-bold text-xl text-gray-900 dark:text-white">{t('pointsMarket')}</h1>
                    {/*<Button variant="ghost" size="icon" asChild>*/}
                    {/*  <Link href="/points-market/history">*/}
                    {/*    <ArrowLeftRight className="h-5 w-5" />*/}
                    {/*  </Link>*/}
                    {/*</Button>*/}
                </div>
            </header>

            <main className="flex-1 container px-4 py-4">
                {/* 搜索栏 */}
                <div className="flex gap-3 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                        <Input
                            className="pl-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                            placeholder={t('searchPointsPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => search(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon"
                            className="rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300"/>
                    </Button>
                </div>

                {/* 积分交易选项卡 */}
                <Tabs defaultValue="market" className="mb-4">
                    {/* <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="market">市场行情</TabsTrigger>
            <TabsTrigger value="p2p">P2P交易</TabsTrigger>
            <TabsTrigger value="flash">闪兑</TabsTrigger>
          </TabsList> */}

                    <TabsContent value="market" className="space-y-4">
                        <div className="grid grid-cols-3 text-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <div className="text-left">{t('pointsName')}</div>
                            <div className="text-center">{t('price')}</div>
                            <div className="text-right">{t('change24h')}</div>
                        </div>
                        <InfiniteScroll
                            dataLength={assetsList.length}
                            next={getAssetsPage}
                            hasMore={hasMore}
                            loader={<h4>{t('loading')}</h4>}
                            endMessage={<p style={{textAlign: 'center'}}>{t('noData')}</p>}
                            scrollableTarget="scrollableDiv">
                            {
                                    assetsList.map((point) => (
                                        <Link href={`/points-market/info?assetsId=${point.assetsId}&id=${point.id}`}
                                              key={point.id}>
                                            <Card
                                                className="mb-3 shadow-sm hover:shadow-md transition-all duration-200 rounded-lg overflow-hidden"
                                                key={point.id}>
                                                <CardContent className="p-4">
                                                    <div className="grid grid-cols-3 items-center">
                                                        <div>
                                                            <h3 className="font-semibold text-base text-gray-800 dark:text-white">{point.assetsName}</h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{t('transaction')}: {point.volume}</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="font-bold text-base text-gray-900 dark:text-white">{point.price || 0}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p
                                                                className={`text-base font-semibold flex items-center justify-end ${point.rise > 0 ? "text-green-600" : "text-red-600"
                                                                }`}
                                                            >
                                                                {point.rise > 0 ? (
                                                                    <TrendingUp className="h-4 w-4 mr-1"/>
                                                                ) : (
                                                                    <TrendingDown className="h-4 w-4 mr-1"/>
                                                                )}
                                                                {point.rise}%
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))
                            }
                        </InfiniteScroll>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
