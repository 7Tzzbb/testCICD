"use client"

import {useEffect, useState} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {Search, Filter, ChevronLeft} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import Link from "next/link"
import {useToast} from "@/hooks/use-toast"
import {getAssetsPageList} from "@/lib/api"
import InfiniteScroll from "react-infinite-scroll-component"
import {useLanguage} from "@/lib/i18n/language-context"
import {Input} from "@/components/ui/input"
import {useRouter} from "next/navigation"

export default function RwaMarketPage() {
    const {t} = useLanguage()
    const {toast} = useToast()
    const router = useRouter()

    const [searchQuery, setSearchQuery] = useState('')
    useEffect(() => {
        setAssetsList([])
        getAssetsPage()
    }, [])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const pageSize = 10
    const [assetsList, setAssetsList] = useState([])
    // 资产列表
    const getAssetsPage = async (customPage?: number, search?: string) => {
        const currentPage = customPage || page
        const r = await getAssetsPageList(currentPage, pageSize, 2, searchQuery || search)
        if (r.code == 0) {
            const newData = r.data.content
            const totalPages = r.data.totalPages
            // 追加数据
            // setAssetsList((prev) => [...prev, ...newData])
            setAssetsList((prev) =>
                currentPage == 1 ? newData : [...prev, ...newData]
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
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950 pb-16">
            <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center">
                <div className="container flex items-center px-4">
                    <Button variant="ghost" size="icon" className="mr-2" asChild onClick={() => router.back()}>
                        <ChevronLeft className="h-5 w-5"/>
                    </Button>
                    <h1 className="font-bold text-xl text-gray-900 dark:text-white">{t('rwaMarket')}</h1>
                </div>
            </header>

            <main className="flex-1 container px-4 py-4">
                {/* 搜索栏 */}
                <div className="flex gap-3 mb-4 items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
                        <Input
                            className="pl-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                            placeholder={t('searchRWAPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => search(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon"
                            className="rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300"/>
                    </Button>
                </div>

                {/* RWA资产选项卡 */}
                <Tabs defaultValue={0} className="mb-4">
                    {/* <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="property">不动产</TabsTrigger>
            <TabsTrigger value="metal">贵金属</TabsTrigger>
            <TabsTrigger value="art">艺术品</TabsTrigger>
          </TabsList> */}
                    {/*<Link href={`/assets/detail/info?id=${rwa.id}&assetId=${rwa.assetsId}`}*/}

                    <TabsContent value={0} className="mt-4">
                        <InfiniteScroll
                            dataLength={assetsList.length}
                            next={getAssetsPage}
                            hasMore={hasMore}
                            loader={<h4>{t('loading')}</h4>}
                            endMessage={<p style={{textAlign: 'center'}}>{t('noData')}</p>}
                            scrollableTarget="scrollableDiv">
                            <div className="grid grid-cols-2 gap-4">
                                {assetsList.map((rwa) => (
                                    <Link href={`/points-market/info?id=${rwa.id}&assetId=${rwa.assetsId}`}
                                          key={rwa.id}>
                                        <Card
                                            className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                                            <div className="relative">
                                                <img src={rwa.image || "/placeholder.svg"} alt={rwa.name}
                                                     className="w-full h-40 object-cover"/>
                                                <div className="absolute top-2 right-2">
                                                    <Badge variant="outline"
                                                           className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700">
                                                        {/* <Clock className="h-3 w-3 mr-1" /> */}
                                                        {rwa.issuer}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold text-base text-gray-800 dark:text-white">{rwa.assetsName}</h3>
                                                <div className="flex justify-between items-center mt-1">
                                                    <Badge variant="secondary"
                                                           className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                                        {t('rwa')}
                                                    </Badge>
                                                    <span
                                                        className="text-sm font-medium text-gray-600 dark:text-gray-400">{rwa.rise}</span>
                                                </div>
                                                <p className="font-bold text-base mt-2 text-gray-900 dark:text-white">{rwa.price || 0}</p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </InfiniteScroll>
                    </TabsContent>
                </Tabs>
            </main>

        </div>
    )
}
