"use client"

import {useEffect, useState} from "react"
import {Search, Bell, ArrowRight, FileX} from "lucide-react"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {MarketTicker} from "./market-ticker"
import {AssetCard} from "./asset-card"
import {BottomNavigation} from "./bottom-navigation"
import {LanguageSelector} from "./language-selector"
import {useToast} from "@/hooks/use-toast"
import {FadeIn, SlideUp, StaggerContainer, StaggerItem, ScrollReveal} from "@/lib/animations"
import {motion, AnimatePresence} from "framer-motion"
import {useLanguage} from "@/lib/i18n/language-context"
import {getActivityList, getAssetsPageList, getHotTransaction, getPlatformAnnouncements} from "@/lib/api"
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function HomePage() {
    const {toast} = useToast()
    const {t} = useLanguage()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('0')
    const [noticeList, setNoticeList] = useState([])
    const [activityList, setActivityList] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const pageSize = 10
    useEffect(() => {
        getNoticeList()
        getActivity()
        getAssetsPage('1')
        // getHotTransactions()
    }, [])
    // 切换语言
    const changeLang = () => {
        getNoticeList()
        getActivity()
    }
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
                description: t(res.message),
                duration: 1500
            })
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
    // 公告列表
    const getNoticeList = async () => {
        const language = localStorage.getItem('language') ?? 'zh'
        const r = await getPlatformAnnouncements(1, 4, language)
        if (r.code == 0) {
            setNoticeList(r.data.content)
        } else {
            toast({
                title: t('tip'),
                description: t(r.message),
                duration: 1500
            })
        }
    }
    // 活动列表
    const getActivity = async () => {
        const language = localStorage.getItem('language') ?? 'zh'
        const r = await getActivityList(1, 4, language)
        if (r.code == 0) {
            setActivityList(r.data.content)
        } else {
            toast({
                title: t('tip'),
                description: t(r.message),
                duration: 1500
            })
        }
    }
    // 格式化活動類型
    const formatActivityType = (type: any) => {
        switch (type) {
            case '1':
                return t('airdropEvent')
            case '2':
                return t('inviteFriendsToRegister')
            case '3':
                return t('newUserRegistrationReward')
            case '4':
                return t('newUserGift')
        }
    }

    // 格式化公告類型
    const formatNoticeType = (type: any) => {
        switch (type) {
            case '1':
                return t('announcement.system')
            case '2':
                return t('announcement.event')
            case '3':
                return t('announcement.feature_update')
            case '4':
                return t('announcement.new_user_gift')
            case '5':
                return t('announcement.marketing')
        }
    }

    // 进入热门活动列表
    const goToHotActivities = () => {
        router.push('/hotActivities-list')
    }
    // 切换rwa 积分
    const changeTab = (value: string) => {
        setActiveTab(value)
        setAssetsList([])
        if (value != 0) {
            getAssetsPage(value)
        }
    }

    return (
        <div
            className="flex flex-col min-h-screen bg-gradient-to-br from-white via-[hsl(var(--pastel-green))] to-[hsl(var(--pastel-blue))] dark:bg-gray-900">
            {/* 顶部导航栏 */}
            <header
                className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 border-b border-primary/10 dark:border-gray-700">
                <FadeIn className="container flex items-center justify-between h-14 px-4">
                    <div className="flex items-center gap-2">
                        <motion.div whileHover={{rotate: 10, scale: 1.1}} whileTap={{scale: 0.9}}>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Logo"/>
                                <AvatarFallback>DP</AvatarFallback>
                            </Avatar>
                        </motion.div>
                        <h1
                            className="font-bold text-lg bg-gradient-to-r from-[#0097FF] to-[#8F4BFF] text-transparent bg-clip-text"
                            style={{
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}>
                            {t('appName')}
                        </h1>
                    </div>
                    <div className="flex items-center gap-1">
                        <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                            <LanguageSelector onSuccess={changeLang}/>
                        </motion.div>
                        {/*<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>*/}
                        {/*  <Button*/}
                        {/*    variant="ghost"*/}
                        {/*    size="icon"*/}
                        {/*    onClick={() => toast({ title: t('appName'), description: t('loading') })}*/}
                        {/*  >*/}
                        {/*    <Bell className="h-5 w-5" />*/}
                        {/*  </Button>*/}
                        {/*</motion.div>*/}
                    </div>
                </FadeIn>
            </header>

            <main className="flex-1 container px-4 py-4 pb-16">
                {/* 行情滚动条 */}
                <SlideUp delay={0.2} className="mb-4">
                    <MarketTicker/>
                </SlideUp>

                {/* 主要内容区 */}
                <SlideUp delay={0.3}>
                    <Tabs defaultValue={"0"} className="mb-4" onValueChange={(value) => changeTab(value)}>
                        <TabsList className="grid grid-cols-3 mb-4 bg-white/50 backdrop-blur-sm">
                            <TabsTrigger value={"0"} className="relative z-10">
                                {t('all')}
                            </TabsTrigger>
                            <TabsTrigger value={"1"} className="relative z-10">
                                {t('points')}
                            </TabsTrigger>
                            <TabsTrigger value={"2"} className="relative z-10">
                                {t('rwa')}
                            </TabsTrigger>
                        </TabsList>
                        <AnimatePresence mode="wait">
                            {/* 积分\RWA标签页 */}
                            {
                                activeTab == 0 ? (
                                    <div className='mb-2'>
                                        <Card
                                            className="mb-2 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
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
                                                            whileHover={{x: 5}}
                                                            whileTap={{scale: 0.95}}
                                                            className="bg-[hsl(var(--primary))] text-white p-2 rounded-full"
                                                        >
                                                            <ArrowRight className="h-5 w-5"/>
                                                        </motion.div>
                                                    </div>
                                                    <div
                                                        className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                                        <Badge
                                                            className="bg-[hsl(var(--pastel-blue))] text-[hsl(var(--primary))] whitespace-nowrap">
                                                            {t('airlinePoints')}
                                                        </Badge>
                                                        <Badge
                                                            className="bg-[hsl(var(--pastel-green))] text-[hsl(var(--primary))] whitespace-nowrap">
                                                            {t('mallPoints')}
                                                        </Badge>
                                                        <Badge
                                                            className="bg-[hsl(var(--pastel-yellow))] text-amber-600 whitespace-nowrap">
                                                            {t('hotelPoints')}
                                                        </Badge>
                                                        <Badge
                                                            className="bg-[hsl(var(--pastel-purple))] text-[hsl(var(--accent))] whitespace-nowrap">
                                                            {t('bankPoints')}
                                                        </Badge>
                                                    </div>
                                                </CardContent>
                                            </Link>
                                        </Card>

                                        <Card
                                            className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                                            <Link href="/rwa-market">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="font-semibold text-lg mb-1">{t('rwaMarket')}</h3>
                                                            <p className="text-sm text-gray-500">{t('rwaCategoryDesc')}</p>
                                                        </div>
                                                        <motion.div
                                                            whileHover={{x: 5}}
                                                            whileTap={{scale: 0.95}}
                                                            className="bg-[hsl(var(--secondary))] text-white p-2 rounded-full"
                                                        >
                                                            <ArrowRight className="h-5 w-5"/>
                                                        </motion.div>
                                                    </div>
                                                    <div
                                                        className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                                        <Badge
                                                            className="bg-[hsl(var(--pastel-yellow))] text-amber-600 whitespace-nowrap">
                                                            {t('goldShares')}
                                                        </Badge>
                                                        <Badge
                                                            className="bg-[hsl(var(--pastel-purple))] text-[hsl(var(--accent))] whitespace-nowrap">
                                                            {t('artworks')}
                                                        </Badge>
                                                        <Badge
                                                            className="bg-[hsl(var(--pastel-blue))] text-cyan-600 whitespace-nowrap">
                                                            {t('realEstateShares')}
                                                        </Badge>
                                                        <Badge
                                                            className="bg-[hsl(var(--pastel-yellow))] text-amber-600 whitespace-nowrap">
                                                            {t('jewelryDiamonds')}
                                                        </Badge>
                                                    </div>
                                                </CardContent>
                                            </Link>
                                        </Card>
                                    </div>
                                ) : (
                                    <TabsContent value={activeTab} key={activeTab} className="space-y-4">
                                        <StaggerContainer className="grid grid-cols-2 gap-2">
                                            {assetsList.map((item) => (
                                                <StaggerItem key={item.id}>
                                                    <AssetCard
                                                        name={item.assetsName}
                                                        type={item.type}
                                                        price={item.priceCeiling}
                                                        change={item.buyRate?.toString() + '%'}
                                                        image="/placeholder.svg?height=40&width=40"
                                                        colorScheme="mint"
                                                    />
                                                </StaggerItem>
                                            ))}
                                        </StaggerContainer>
                                        {/*{*/}
                                        {/*  activeTab == '1' ? (*/}
                                        {/*    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>*/}
                                        {/*      <Button variant="outline" className="w-full bg-white/50 backdrop-blur-sm hover:bg-white/80">*/}
                                        {/*        {t('viewMorePoints')}*/}
                                        {/*      </Button>*/}
                                        {/*    </motion.div>*/}
                                        {/*  ) : (*/}
                                        {/*    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>*/}
                                        {/*      <Button variant="outline" className="w-full bg-white/50 backdrop-blur-sm hover:bg-white/80">*/}
                                        {/*        {t('viewMoreRWA')}*/}
                                        {/*      </Button>*/}
                                        {/*    </motion.div>*/}
                                        {/*  )*/}
                                        {/*}*/}
                                    </TabsContent>
                                )
                            }
                        </AnimatePresence>
                    </Tabs>
                </SlideUp>

                {/* 活动 */}
                <ScrollReveal>
                    <Card className="mb-4 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{t('hotActivities')}</h3>
                                {activityList.length > 0 && (
                                    <Button variant="link" size="sm" className="p-0"
                                            onClick={goToHotActivities}>
                                        {t('viewAll')}
                                    </Button>
                                )}
                            </div>
                            <div className="space-y-2">
                                {activityList.length > 0 ? (
                                    activityList.map((activity) => (
                                        <motion.div
                                            key={activity.id}
                                            className="flex items-center gap-2 p-2 bg-gradient-to-r from-[hsl(var(--pastel-blue))] to-[hsl(var(--pastel-green))] rounded-md"
                                            whileHover={{scale: 1.02, y: -2}}
                                            transition={{type: "spring", stiffness: 400, damping: 10}}
                                        >
                                            <Badge variant="outline"
                                                   className="bg-white/50 backdrop-blur-sm text-blue-500">
                                                {formatActivityType(activity.type)}
                                            </Badge>
                                            <span className="text-sm">{activity.name}</span>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div
                                        className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                        <p className="text-lg font-medium">{t('noHotActivities')}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </ScrollReveal>
                {/* 公告栏 */}
                <ScrollReveal>
                    <Card className="mb-4 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{t('platformAnnouncement')}</h3>
                                {noticeList.length > 0 && (
                                    <Button variant="link" size="sm" className="p-0">
                                        {t('viewAll')}
                                    </Button>
                                )}
                            </div>
                            <div className="space-y-2">
                                {noticeList.length > 0 ? (
                                    noticeList.map((notice) => (
                                        <motion.div
                                            key={notice.id}
                                            className="flex items-center gap-2 p-2 bg-gradient-to-r from-[hsl(var(--pastel-blue))] to-[hsl(var(--pastel-green))] rounded-md"
                                            whileHover={{scale: 1.02, y: -2}}
                                            transition={{type: "spring", stiffness: 400, damping: 10}}
                                        >
                                            <Link href={`/notice-info?id=${notice.id}`}>
                                                <Badge variant="outline"
                                                       className="bg-white/50 backdrop-blur-sm text-blue-500">
                                                    {formatNoticeType(notice.type)}
                                                </Badge>
                                                <span className="text-sm">{notice?.name}</span>
                                            </Link>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div
                                        className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                        <p className="text-lg font-medium">{t('noPlatformAnnouncement')}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </ScrollReveal>
                {/*  热门交易*/}
                {/*<ScrollReveal>*/}
                {/*    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">*/}
                {/*        <CardContent className="p-4">*/}
                {/*            <div className="flex items-center mb-2">*/}
                {/*                <h3 className="font-semibold">{t('hotTransactions')}</h3>*/}
                {/*            </div>*/}
                {/*            <div className="space-y-2">*/}
                {/*                <InfiniteScroll*/}
                {/*                    dataLength={hotTransactions.length}*/}
                {/*                    next={getHotTransactions}*/}
                {/*                    hasMore={hasMore}*/}
                {/*                    loader={<h4>{t('loading')}</h4>}*/}
                {/*                    endMessage={<p style={{textAlign: 'center'}}>{t('noData')}</p>}*/}
                {/*                    scrollableTarget="scrollableDiv">*/}
                {/*                    {*/}
                {/*                        hotTransactions.map((item, index) => (*/}
                {/*                            <motion.div*/}
                {/*                                key={index}*/}
                {/*                                className="flex items-center justify-between p-2 bg-gradient-to-r from-[hsl(var(--pastel-blue))] to-[hsl(var(--pastel-green))] rounded-md mb-2"*/}
                {/*                                whileHover={{scale: 1.02, y: -2}}*/}
                {/*                                transition={{type: "spring", stiffness: 400, damping: 10}}*/}
                {/*                            >*/}
                {/*                                <div className="flex items-center gap-2">*/}
                {/*                                    <Badge variant="outline"*/}
                {/*                                           className="bg-white/50 backdrop-blur-sm text-cyan-500">*/}
                {/*                                        {item.type == 1 ? t('placeBuyOrder') : t('placeSellOrder')}*/}
                {/*                                    </Badge>*/}
                {/*                                    <span className="text-sm">{item.assetName}-{item.amount}</span>*/}
                {/*                                </div>*/}
                {/*                                <span className="text-sm font-medium">{item.price}</span>*/}
                {/*                            </motion.div>*/}
                {/*                        ))*/}
                {/*                    }*/}
                {/*                </InfiniteScroll>*/}
                {/*            </div>*/}
                {/*        </CardContent>*/}
                {/*    </Card>*/}
                {/*</ScrollReveal>*/}
            </main>

            {/* 底部导航 */}
            <BottomNavigation/>
        </div>
    )
}
