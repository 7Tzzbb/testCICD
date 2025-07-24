"use client"

import { useEffect, useState } from "react"
import { Search, Filter, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottomNavigation } from "./bottom-navigation"
import { MarketTicker } from "./market-ticker"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"
import { motion } from "framer-motion"
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, ScrollReveal } from "@/lib/animations"
import {getAssetsPageList, getHotTransaction} from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import InfiniteScroll from 'react-infinite-scroll-component'

export default function MarketPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const pageSize = 10
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => {
    setHotTransactions([])
    getHotTransactions()
  }, [])
  const [hotTransactions, setHotTransactions] = useState([])
  // 热门交易
  const getHotTransactions = async (customPage?: number) => {
    const currentPage = customPage || page
    const res = await getHotTransaction(currentPage, pageSize)
    if (res.code == 0) {
      const newData = res.data.content
      const totalPages = res.data.totalPages
      // 追加数据
      setHotTransactions((prev) =>
          currentPage == 1 ? newData : [...prev, ...newData]
      )
      const nextPage = currentPage + 1
      setPage(nextPage)

      // 判断是否还有更多数据
      setHasMore(nextPage - 1 < totalPages)

    } else {
      setHasMore(false)
      toast({
        title: t('tip'),
        description: t(result.message),
        duration: 1500
      })
    }
  }
  // 切换
  const changeTab = (value: any) => {
    setAssetsList([])
    setActiveTab(value)
    if (value) {
      getAssetsPage(value)
    }
  }

  const [assetsList, setAssetsList] = useState([])
  // 资产列表
  const getAssetsPage = async (type?: string) => {
    const r = await getAssetsPageList(1, 4, type)
    if (r.code == 0) {
      setAssetsList(r.data.content)
    } else {
      toast({
        title: t('tip'),
        description: t(r.message),
        duration: 1500
      })
    }
  }
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-[hsl(var(--pastel-blue))] to-[hsl(var(--pastel-purple))] dark:bg-gray-900">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 border-b border-primary/10 dark:border-gray-700">
        <FadeIn className="container flex items-center justify-between h-14 px-4">
          <h1
              className="font-bold text-lg bg-gradient-to-r from-[#0097FF] to-[#8F4BFF] text-transparent bg-clip-text"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
          >
            {t("market")}
          </h1>
        </FadeIn>
      </header>

      <main className="flex-1 container px-4 py-4 pb-16">
        {/* 搜索栏 */}
         <SlideUp delay={0.1} className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10 bg-white/80 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-primary/50 focus:scale-[1.01]"
            placeholder={t("search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SlideUp>

        {/* 行情滚动条 */}
        <SlideUp delay={0.2} className="mb-4">
          <MarketTicker />
        </SlideUp>

        {/* 主要内容区 */}
        <SlideUp delay={0.3}>
          <Tabs defaultValue={0} className="mb-4" onValueChange={(value) => changeTab(value)}>
            <TabsList className="grid grid-cols-3 mb-4 bg-white/50 backdrop-blur-sm">
              <motion.div
                  className="absolute h-full bg-primary/10 rounded-md z-0 transition-all duration-300"
                  style={{
                    width: "33.333%",
                    left:
                        activeTab == 0
                            ? "0%"
                            : activeTab == 1
                                ? "33.333%"
                                : "66.666%",
                  }}
                  layoutId="activeTabBackground"
              />
              <TabsTrigger value={0} className="relative z-10">
                {t("all")}
              </TabsTrigger>
              <TabsTrigger value={1} className="relative z-10">
                {t("points")}
              </TabsTrigger>
              <TabsTrigger value={2} className="relative z-10">
                {t("rwa")}
              </TabsTrigger>
            </TabsList>
            {/* 全部标签页 */}
            <TabsContent value={0} className="space-y-4">
              <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <Link href="/points-market">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1 items-center flex">
                          <span>{t('pointsMarket')}</span>
                        </h3>
                        <p className="text-sm text-gray-500">{t('pointCategoryDesc')}</p>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[hsl(var(--primary))] text-white p-2 rounded-full"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      <Badge className="bg-[hsl(var(--pastel-blue))] text-[hsl(var(--primary))] whitespace-nowrap">
                        {t('airlinePoints')}
                      </Badge>
                      <Badge className="bg-[hsl(var(--pastel-green))] text-[hsl(var(--primary))] whitespace-nowrap">
                        {t('mallPoints')}
                      </Badge>
                      <Badge className="bg-[hsl(var(--pastel-yellow))] text-amber-600 whitespace-nowrap">
                        {t('hotelPoints')}
                      </Badge>
                      <Badge className="bg-[hsl(var(--pastel-purple))] text-[hsl(var(--accent))] whitespace-nowrap">
                          {t('bankPoints')}
                      </Badge>
                    </div>
                  </CardContent>
                </Link>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <Link href="/rwa-market">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{t('rwaMarket')}</h3>
                        <p className="text-sm text-gray-500">{t('rwaCategoryDesc')}</p>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-[hsl(var(--secondary))] text-white p-2 rounded-full"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.div>
                    </div>
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      <Badge className="bg-[hsl(var(--pastel-yellow))] text-amber-600 whitespace-nowrap">
                        {t('goldShares')}
                      </Badge>
                      <Badge className="bg-[hsl(var(--pastel-purple))] text-[hsl(var(--accent))] whitespace-nowrap">
                          {t('artworks')}
                      </Badge>
                      <Badge className="bg-[hsl(var(--pastel-blue))] text-cyan-600 whitespace-nowrap">
                          {t('realEstateShares')}
                      </Badge>
                      <Badge className="bg-[hsl(var(--pastel-yellow))] text-amber-600 whitespace-nowrap">
                        {t('jewelryDiamonds')}
                      </Badge>
                    </div>
                  </CardContent>
                </Link>
              </Card>

              <ScrollReveal>
                <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold">{t('hotTransactions')}</h3>
                      {/* <Button variant="link" size="sm" className="p-0">
                        {t("viewAll")}
                      </Button> */}
                    </div>
                    <div className="space-y-2">
                      <InfiniteScroll
                        dataLength={hotTransactions.length}
                        next={getHotTransactions}
                        hasMore={hasMore}
                        loader={<h4>{t('loading')}</h4>}
                        endMessage={<p style={{ textAlign: 'center' }}>{t('noMore')}</p>}
                        scrollableTarget="scrollableDiv">
                        {
                          hotTransactions.map((item, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center justify-between p-2 bg-gradient-to-r from-[hsl(var(--pastel-blue))] to-[hsl(var(--pastel-green))] rounded-md mb-2"
                              whileHover={{ scale: 1.02, y: -2 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-white/50 backdrop-blur-sm text-cyan-500">
                                  {item.type == 1 ? t('placeBuyOrder') : t('placeSellOrder')}
                                </Badge>
                                <span className="text-sm">{item.assetName}-{item.amount}</span>
                              </div>
                              <span className="text-sm font-medium">{item.price}</span>
                            </motion.div>
                          ))
                        }
                      </InfiniteScroll>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </TabsContent>
            {/* 积分标签页 */}
            <TabsContent value={1} className="space-y-4">
              <StaggerContainer className="grid grid-cols-2 gap-4">
                {assetsList.map((asset, index) => (
                    <StaggerItem key={index}>
                      <Link href="/points-market">
                        <motion.div
                            whileHover={{
                              scale: 1.03,
                              y: -5,
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                            whileTap={{ scale: 0.97 }}
                        >
                          <Card className="overflow-hidden">
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-sm">{asset.assetsName}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {t('points')}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold">{asset.price}</span>
                                <span className={`text-xs ${asset.rise ? "text-green-500" : "text-red-500"}`}>
                                {asset.rise}%
                              </span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Link>
                    </StaggerItem>
                ))}
              </StaggerContainer>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full bg-white/50 backdrop-blur-sm hover:bg-white/80" asChild>
                  <Link href="/points-market">{t('viewMorePoints')}</Link>
                </Button>
              </motion.div>
            </TabsContent>

            {/* RWA标签页 */}
            <TabsContent value={2} className="space-y-4">
              <StaggerContainer className="grid grid-cols-2 gap-4">
                {assetsList.map((asset, index) => (
                    <StaggerItem key={asset.name}>
                      <Link href="/rwa-market">
                        <motion.div
                            whileHover={{
                              scale: 1.03,
                              y: -5,
                              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                            }}
                            whileTap={{ scale: 0.97 }}
                        >
                          <Card className="overflow-hidden">
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-sm">{asset.assetsName}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {t('rwa')}
                                </Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold">{asset.price}</span>
                                <span className={`text-xs ${asset.rise ? "text-green-500" : "text-red-500"}`}>
                                {asset.rise}%
                              </span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Link>
                    </StaggerItem>
                ))}
              </StaggerContainer>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full bg-white/50 backdrop-blur-sm hover:bg-white/80" asChild>
                  <Link href="/rwa-market">{t('viewMoreRWA')}</Link>
                </Button>
              </motion.div>
            </TabsContent>
          </Tabs>
        </SlideUp>
      </main>

      {/* 底部导航 */}
      <BottomNavigation />
    </div>
  )
}