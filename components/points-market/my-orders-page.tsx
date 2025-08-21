"use client"

import {useState, useEffect} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Badge} from "@/components/ui/badge"
import {ArrowLeft, CheckCircle, Clock, XCircle, AlertCircle, ShieldCheck, FileText} from "lucide-react"
import Link from "next/link"
import {SimpleTransition} from "@/components/simple-transition"
import {useRouter} from "next/navigation"
import {BottomNavigation} from "@/components/bottom-navigation"
import {
    cancelOrder,
    cancelOrderTransaction,
    getArbitrationRecordPageList,
    getOrderCount,
    getOrderPageList,
    getOrdersTransactionPageList,
    getOrderTransactionPageList,
    getPaymentMethodList,
    updateOrderTransactionStatus
} from "@/lib/api"
import {useToast} from "@/hooks/use-toast"
import InfiniteScroll from 'react-infinite-scroll-component'
import {API_BASE_URL} from "@/lib/config"
import {useLanguage} from "@/lib/i18n/language-context"
import {
    Dialog,
    DialogContent, DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {FadeIn} from "@/lib/animations";

// 订单类型定义
interface Order {
    id: string
    orderId: string
    type: number
    pointName: string
    status: number
    price: string
    quantity: string
    total: string
    date: string
    paymentMethods: string[]
    contactMethods: string[]
    counterparty?: string
    isArbitration?: boolean
}

// 订单卡片组件
function OrderCard({
                       order, currentTab, onCancel, onRelease, toInfo, onCancelOrder
                   }: {
    order: Order, currentTab: string, onCancel: any, onRelease: any, toInfo: any, onCancelOrder: any
}) {
    const {t} = useLanguage()
    const getStatusText = (status: number) => {
        switch (status) {
            case 1:
                return t('pendingPayment')
            case 2:
                return t('pendingRelease')
            case 4:
                return t('completed')
        }
    }
    const getStatusTexts = (status: number) => {
        switch (status) {
            case 1:
                return t('incomplete')
            case 2:
                return t('completed')
            case 3:
                return t('cancelOrders')
        }
    }
    const router = useRouter()
    const {toast} = useToast()
    const statusText = getStatusText(order.status)
    const statusTexts = getStatusTexts(order.status)


// 状态辅助函数
    const getStatusIcon = (status: number) => {
        switch (status) {
            case 1:
                return <AlertCircle className="h-4 w-4 text-amber-500"/>
            case 2:
                return <Clock className="h-4 w-4 text-purple-500"/>
            case 4:
                return <Clock className="h-4 w-4 text-blue-500"/>
        }
    }

    // 状态辅助函数
    const getStatusIcons = (status: number) => {
        switch (status) {
            case 1:
                return <Clock className="h-4 w-4 text-blue-500"/>
            case 2:
                return <Clock className="h-4 w-4 text-purple-500"/>
            case 3:
                return <AlertCircle className="h-4 w-4 text-amber-500"/>
        }
    }
    const getStatusClasss = (status: number) => {
        switch (status) {
            case 1:
                return "bg-blue-500/10 text-blue-500 border-blue-500/30"
            case 2:
                return "bg-purple-500/10 text-purple-500 border-purple-500/30"
            case 3:
                return "bg-amber-500/10 text-amber-500 border-amber-500/30"
        }
    }
    const getStatusClass = (status: number) => {
        switch (status) {
            case 1:
                return "bg-amber-500/10 text-amber-500 border-amber-500/30"
            case 2:
                return "bg-purple-500/10 text-purple-500 border-purple-500/30"
            case 4:
                return "bg-blue-500/10 text-blue-500 border-blue-500/30"
        }
    }

// 格式化支付方式
//   const formatPayType = (type: string) => {
//     switch (type) {
//       case 'BANK_CARD':
//         return t('bankCard')
//       case 'E_WALLET':
//         return t('wallet')
//       case 'CRYPTO':
//         return t('cryptoCurrency')
//     }
//   }
    const formatPayType = (typeStr: string): string[] => {
        return typeStr.split(',').map(type => {
            switch (type.trim()) {
                case 'BANK_CARD':
                case "UNION_PAY":
                case "VISA":
                case "MASTERCARD":
                case "JCB":
                case "AE":
                    return t('bankCard')
                case 'CRYPTO':
                case 'USDT':
                case 'USDC':
                    return t('cryptoCurrency')
                case 'E_WALLET':
                    return t('wallet')
                case 'WECHAT':
                    return t('bankWeChat')
                case 'ALIPAY':
                    return t('bankAlipay')
                case 'PAYPAL':
                    return "PayPal"
                case 'APPLE_PAY':
                    return "Apple Pay"
                case 'GOOGLE_PAY':
                    return "Google Pay"
                case 'SAMSUNG_PAY':
                    return "Samsung Pay"
                case 'STRIPE':
                    return "Stripe"
                default:
                    return type
            }
        })
    }
// 格式化联系方式
    const formatcontactMethods = (typeStr: string): string[] => {
        return typeStr.split(',').map(type => {
            switch (type.trim()) {
                case 'MOBILE':
                    return t('phoneNumber')
                case 'EMAIL':
                    return t('email')
                case 'SOCIAL':
                    return t('socialMedia')
                case 'WECHAT':
                    return t('bankWeChat')
                case 'QQ':
                    return 'QQ'
                case 'TELEGRAM':
                    return 'TELEGRAM'
                case 'DISCORD':
                    return 'DISCORD'
                case 'INSTAGRAM':
                    return 'INSTAGRAM'
                case 'FACEBOOK':
                    return 'FACEBOOK'
                case 'TWITTER':
                    return 'TWITTER'
                case 'LINKEDIN':
                    return 'LINKEDIN'
                default:
                    return type
            }
        })
    }

    return (
        <Card className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all mb-4">
            {/* 卡片头部 */}
            <div className="flex justify-between items-center mb-3">
                {(currentTab === '0' || currentTab === '1') ? (
                    <>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline"
                                   className={order.type === 1 ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900" : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900"}
                            >
                                {currentTab == 0 ? t('buying') : t('selling')}
                            </Badge>
                            <div className="text-sm font-medium">{order.pointName}</div>
                        </div>
                        <Badge variant="outline"
                               className={`${getStatusClasss(order.status)} px-2 py-1 rounded-full text-xs font-medium`}>
                            <div className="flex items-center gap-1">
                                {getStatusIcons(order.status)}
                                <span>{currentTab == 0 ? t('buying') : t('selling')}</span>
                            </div>
                        </Badge>
                    </>
                ) : (
                    <div className="flex items-center justify-between gap-2 w-full">
                        <div>
                            <Badge variant="outline"
                                   className={order.type === 1 ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900" : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900"}
                            >
                                {statusText}
                            </Badge>
                        </div>
                        <Badge variant="outline"
                               className={`${getStatusClass(order.status)} px-2 py-1 rounded-full text-xs font-medium`}>
                            <div className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                <span>{statusText}</span>
                            </div>
                        </Badge>
                    </div>
                )}
            </div>

            {/* 订单详情 */}
            <div className="grid grid-cols-3 gap-2 mb-2">
                <OrderDetailItem label={t('price')} value={order.price}/>
                <OrderDetailItem label={t('amount')} value={order.amount}/>
                <OrderDetailItem label={t('total')} value={order.total.toFixed(2)}/>
            </div>
            {/* 数量进度条 */}
            {(currentTab === '0' || currentTab === '1') && (
                <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                        <span>{t('amount')}: {order.filledAmount}/{order.amount}</span>
                        <span>{t('minBuy')}: {order.minimumAmount}</span>
                    </div>
                    <div className="bg-gray-200 rounded-full w-full h-2">
                        <div
                            className="bg-green-500 h-2 w-full rounded-full vibrant-gradient-progress vibrant-card hover:shadow-xl transition-all bg-gradient-to-br"
                            style={{width: `${(order.filledAmount / order.amount) * 100}%`}}
                        ></div>
                    </div>
                </div>
            )}

            {/* 卡片底部 */}
            <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div>
                    <div>{t('orderNumber')}: {order.orderId}</div>
                    <div>{t('time')}: {order.createdAt}</div>
                    {(currentTab === '0' || currentTab === '1') && (
                        <div>
                            <div>
                                <div className="mb-1">
                                    {t('paymentMethod')}:
                                </div>
                                <div>
                                    {order.paymentMethods && order.paymentMethods.length ? (
                                        formatPayType(order.paymentMethods).map((method, index) => (
                                            <Badge className="bg-gray-200 text-balck whitespace-nowrap mr-1 mb-1"
                                                   key={index}>
                                                {method}
                                            </Badge>
                                        ))
                                    ) : (
                                        <Badge className="bg-gray-200 text-balck whitespace-nowrap mr-1 mb-1">
                                            {t('noDatas')}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="mb-1">
                                    {t('contactInfo')}:
                                </div>
                                <div>
                                    {order.contactMethods && order.contactMethods.length ? (
                                        formatcontactMethods(order.contactMethods).map((method, index) => (
                                            <Badge className="bg-gray-200 text-balck whitespace-nowrap mr-1 mb-1"
                                                   key={index}>
                                                {method}
                                            </Badge>
                                        ))
                                    ) : (
                                        <Badge className="bg-gray-200 text-balck whitespace-nowrap mr-1 mb-1">
                                            {t('noDatas')}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {(currentTab === '0' || currentTab === '1') && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10 p-0"
                            >
                                {t('cancelOrder')}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>{t('confirmCancelOrderQuestion')}</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {t('confirmCancelPrompt')}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onCancelOrder(order)}>
                                    {t('confirmCancel')}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}

                {(order.status === 1) && (currentTab === '2' || currentTab === '3' || currentTab === '4') &&
                    order.userIdBuy == localStorage.getItem('userId') && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10 p-0"
                                >
                                    {t('cancelOrder')}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>{t('confirmCancelOrderQuestion')}</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {t('confirmCancelPrompt')}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => onCancel(order)}>
                                        {t('confirmCancel')}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                {/*付款*/}
                {((order.status === 1)) && (currentTab === '2' || currentTab === '3' || currentTab === '4')
                    && order.userIdBuy == localStorage.getItem('userId')
                    && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 p-0"
                            onClick={() => router.push(`/points-market/order/info?id=${order.id}`)}
                        >
                            {t('goToPay')}
                        </Button>
                    )}
                {/*详情*/}
                {currentTab === '3' && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 p-0"
                        onClick={() => toInfo(order)}
                    >
                        {t('details')}
                    </Button>
                )}
                {/*放行*/}
                {(order.status === 2)
                    && (currentTab === '2' || currentTab === '3' || currentTab === '4')
                    && order.userIdBuy != localStorage.getItem('userId') && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs text-green-500 hover:text-green-600 hover:bg-green-500/10 p-0"
                                >
                                    {t('confirmRelease')}
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle> {t('confirmReleaseOrderQuestion')}</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {t('confirmReleasePrompt')}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => onRelease(order)}>
                                        {t('confirmRelease')}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
            </div>
        </Card>
    )
}

// 订单详情项组件
function OrderDetailItem({label, value}: { label: string; value: string }) {
    return (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{value}</div>
        </div>
    )
}

// 主订单页面组件
export default function MyOrdersPage() {
    const {toast} = useToast()
    const {t} = useLanguage()

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState<Order[]>([])
    const [showArbitrationOrders, setShowArbitrationOrders] = useState(false)
    const [tab, setTab] = useState('0')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const pageSize = 10
    useEffect(() => {
        setOrders([])
        getOrderPageLists("1")
        orderCount()
    }, []) // 移除对page的依赖,因为page变量在后面才声明
    // 分页处理
    const getOrderList = () => {
        switch (tab) {
            case "0":
                getOrderPageLists("1")
                break
            case "1":
                getOrderPageLists("2")
                break
            case "2":
                getOrdersTransactionPageLists(1)
                break
            case "3":
                getOrdersTransactionPageLists(2)
                break
            case "4":
                getOrdersTransactionPageLists(4)
                break
        }
    }
    const getOrderListInit = () => {
        orderCount()
        switch (tab) {
            case "0":
                getOrderPageLists("1", 1)
                break
            case "1":
                getOrderPageLists("2", 1)
                break
            case "2":
                getOrdersTransactionPageLists(1, 1)
                break
            case "3":
                getOrdersTransactionPageLists(2, 1)
                break
            case "4":
                getOrdersTransactionPageLists(4, 1)
                break
        }
    }
    const [arbitrationRecords, setArbitrationRecords] = useState([])
    // 打开仲裁记录
    const openArbitrationRecord = () => {
        setShowArbitrationOrders(!showArbitrationOrders)
        if (!showArbitrationOrders) {
            getArbitrationRecordList(1)
        } else {
            getOrderListInit()
        }
    }
    // 仲裁记录
    const getArbitrationRecordList = async (customPage?: number) => {
        const currentPage = customPage || page
        const res = await getArbitrationRecordPageList(currentPage, pageSize)
        if (res.code == 0) {
            if (res.data.content && res.data.content.length) {
                res.data.content.forEach((item: any) => {
                    item.arbitrationImg = JSON.parse(item.arbitrationImg)
                })
            }
            const newData = res.data.content
            const totalPages = res.data.totalPages
            // 追加数据
            setArbitrationRecords((prev) =>
                currentPage == 1 ? newData : [...prev, ...newData]
            )
            setIsLoading(false)
            const nextPage = currentPage + 1
            setPage(nextPage)

            // 判断是否还有更多数据
            setHasMore(nextPage - 1 < totalPages)
        } else {
            setIsLoading(false)
            toast({
                description: t(res.message),
                duration: 1500
            })
        }
    }
    const [orderCounts, setOrderCounts] = useState({})
    // 订单数量
    const orderCount = async () => {
        const res = await getOrderCount()
        if (res.code == 0) {
            setOrderCounts(res.data)
        } else {
            toast({
                description: t(res.message),
                duration: 1500
            })
        }
    }

    // 切换状态
    const changeTab = (tab: string) => {
        setPage(1)
        setOrders([])
        setTab(tab)
        switch (tab) {
            case "0":
                getOrderPageLists("1", 1)
                break
            case "1":
                getOrderPageLists("2", 1)
                break
            case "2":
                getOrdersTransactionPageLists(1, 1)
                break
            case "3":
                getOrdersTransactionPageLists(2, 1)
                break
            case "4":
                getOrdersTransactionPageLists(4, 1)
                break
        }
    }
    // 订单列表
    const getOrderPageLists = async (type: string, customPage?: number) => {
        const currentPage = customPage || page
        const r = await getOrderPageList(currentPage, pageSize, type, '')
        if (r.code == 0) {
            const newData = r.data.content
            const totalPages = r.data.totalPages
            const nextPage = currentPage + 1
            // 追加数据
            setOrders((prev) =>
                currentPage == 1 ? newData : [...prev, ...newData]
            )
            setIsLoading(false)
            setPage(nextPage)
            // 判断是否还有更多数据
            setHasMore(nextPage - 1 < totalPages)
        } else {
            setIsLoading(false)
            toast({description: t(r.message), duration: 1500})
            setHasMore(false)
        }
    }
    // 浏览图片
    const [previewUrl, setPreviewUrl] = useState(null)
    // 成交订单列表
    const getOrdersTransactionPageLists = async (type: number, customPage?: number) => {
        const currentPage = customPage || page
        const r = await getOrdersTransactionPageList(currentPage, pageSize, type)
        if (r.code == 0) {
            const newData = r.data.content
            const totalPages = r.data.totalPages
            const nextPage = currentPage + 1
            // 追加数据
            setOrders((prev) =>
                currentPage == 1 ? newData : [...prev, ...newData]
            )
            setIsLoading(false)
            setPage(nextPage)
            // 判断是否还有更多数据
            setHasMore(nextPage - 1 < totalPages)
        } else {
            setIsLoading(false)
            toast({description: t(r.message), duration: 1500})
            setHasMore(false)
        }
    }
    // 进入详情
    const toInfo = (order: Order) => {
        router.push(`/points-market/order/orderinfo?id=${order.id}`)
    }
    // 取消订单成交单
    const handleCancelOrder = async (order: Order) => {
        const res = await cancelOrderTransaction(order.id)
        if (res.code == 0) {
            toast({
                title: t('orderCanceled'),
                description: `${t('orders')} ${order.orderId} ${t('cancelSuccess')}。`,
                duration: 1500
            })
            setOrders([])
            getOrderListInit()
        } else {
            toast({
                description: t(res.message),
                duration: 1500
            })
        }
    }
    // 取消订单
    const onCancelOrder = async (order: Order) => {
        const res = await cancelOrder(order.orderId)
        if (res.code == 0) {
            toast({
                title: t('orderCanceled'),
                description: `${t('orders')} ${order.orderId} ${t('cancelSuccess')}。`,
                duration: 1500
            })
            setOrders([])
            getOrderListInit()
        } else {
            toast({
                description: t(res.message),
                duration: 1500
            })
        }
    }
    // 放行
    const handleReleaseOrder = async (order: Order) => {
        const res = await updateOrderTransactionStatus(order.id)
        if (res.code == 0) {
            toast({
                title: t('orderReleased'),
                description: `${t('orders')} ${order.orderId} ${t('releaseSuccess')}。`,
                duration: 1500
            })
            setOrders([])
            getOrderListInit()
        } else {
            toast({
                description: t(res.message),
                duration: 1500
            })
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
                <header
                    className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 border-b border-primary/10 dark:border-gray-700">
                    <FadeIn className="container flex items-center justify-between h-14 px-4">
                        <h1
                            className="font-bold text-lg bg-gradient-to-r from-[#0097FF] to-[#8F4BFF] text-transparent bg-clip-text"
                            style={{
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {t('myOrders')}
                        </h1>
                    </FadeIn>
                </header>
                <main className="flex-1 container px-4 py-4 flex items-center justify-center">
                    <p className="text-muted-foreground">{t('loading')}</p>
                </main>
            </div>
        )
    }

    return (
        <SimpleTransition>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <header
                    className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 border-b border-primary/10 dark:border-gray-700">
                    <FadeIn className="container flex items-center justify-between h-14 px-4">
                        <h1
                            className="font-bold text-lg bg-gradient-to-r from-[#0097FF] to-[#8F4BFF] text-transparent bg-clip-text"
                            style={{
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {t('myOrders')}
                        </h1>
                    </FadeIn>
                </header>

                <main className="flex-1 container px-4 py-4">
                    {/* 订单统计卡片 */}
                    <Card className="mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <CardContent className="p-4">
                            <div className="grid grid-cols-3 gap-3 mb-3">
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center shadow-sm">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{t('totalOrders')}</div>
                                    <div
                                        className="text-xl font-bold text-blue-600 dark:text-blue-400">{orderCounts.total}</div>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center shadow-sm">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">{t('buyOrderCount')}</div>
                                    <div
                                        className="text-xl font-bold text-green-600 dark:text-green-400">{orderCounts.buyOrder}</div>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center shadow-sm">
                                    <div
                                        className="text-sm text-gray-500 dark:text-gray-400">{t('sellOrderCount')}</div>
                                    <div
                                        className="text-xl font-bold text-red-600 dark:text-red-400">{orderCounts.sellOrder}</div>
                                </div>
                                <div
                                    className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center shadow-sm">
                                    <div
                                        className="text-sm text-gray-500 dark:text-gray-400">{t('totalCompletedOrders')}</div>
                                    <div
                                        className="text-xl font-bold text-purple-600 dark:text-purple-400">{orderCounts.dealOrder}</div>
                                </div>
                                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center shadow-sm">
                                    <div
                                        className="text-sm text-gray-500 dark:text-gray-400">{t('arbitrationCount')}</div>
                                    <div
                                        className="text-xl font-bold text-amber-600 dark:text-amber-400">{orderCounts.arbitration}</div>
                                </div>
                                <div
                                    className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 flex flex-col items-center justify-center shadow-sm">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto p-0 text-indigo-600 dark:text-indigo-400 hover:bg-transparent"
                                        onClick={openArbitrationRecord}
                                    >
                                        <FileText className="h-4 w-4 mr-1"/>
                                        <span>{t('arbitrationRecords')}</span>
                                    </Button>
                                </div>
                            </div>
                            <div
                                className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                                {t('orderLimitDescription')}
                            </div>
                        </CardContent>
                    </Card>

                    {showArbitrationOrders ? (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">{t('arbitrationOrders')}</h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowArbitrationOrders(false)}
                                >
                                    {t('allOrders')}
                                </Button>
                            </div>

                            <InfiniteScroll
                                dataLength={arbitrationRecords.length}
                                next={getArbitrationRecordList}
                                hasMore={hasMore}
                                loader={<h4 className="text-center text-muted-foreground py-4">{t('loading')}</h4>}
                                endMessage={<p
                                    className="text-center text-muted-foreground py-4">{t('noArbitrationOrders')}</p>}
                                scrollableTarget="scrollableDiv">
                                {
                                    arbitrationRecords.map((arbitration) =>
                                        <Card
                                            key={arbitration.id}
                                            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all mb-4"
                                        >
                                            <div className="flex flex-col md:flex-row md:justify-between mb-3">
                                                {/* 订单详情 */}
                                                <div className="grid grid-cols-2 gap-2 mb-4 md:mb-0 md:w-1/2">
                                                    <OrderDetailItem label={t('arbitrationOrderId')}
                                                                     value={arbitration.transactionsId}/>
                                                    <OrderDetailItem label={t('arbitrationStatus')}
                                                                     value={arbitration.status === 1 ? t('pending') : t('completed')}/>
                                                    <OrderDetailItem label={t('initiator')}
                                                                     value={arbitration.initiatorId}/>
                                                    <OrderDetailItem label={t('respondent')}
                                                                     value={arbitration.respondentId}/>
                                                </div>
                                                <div className="grid grid-cols-1 gap-2 mb-4 md:mb-0 md:w-1/2">
                                                    <OrderDetailItem label={t('arbitrationDetails')}
                                                                     value={arbitration.arbitrationDetails}/>
                                                </div>
                                                {/* 仲裁图片 */}
                                                <div className="md:w-1/2 md:pl-4">
                                                    <div className="mt-2">
                                                        <h4 className="text-sm font-medium mb-1">{t('arbitrationEvidence')}</h4>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {arbitration.arbitrationImg.map((item, i) => (
                                                                <img key={i} src={item} alt="Arbitration Evidence"
                                                                     onClick={() => setPreviewUrl(item)}
                                                                     className="w-full h-24 object-cover rounded-md shadow-sm"/>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    )
                                }
                            </InfiniteScroll>
                        </div>
                    ) : (
                        /* 订单标签页 */
                        <Tabs defaultValue="0" className="w-full" onValueChange={(value) => changeTab(value)}>
                            <TabsList className="grid grid-cols-5 mb-4 bg-muted overflow-x-auto overflow-x-auto">
                                <TabsTrigger value="0" badge={orderCounts.buyOrder}
                                             className="data-[state=active]:bg-background whitespace-nowrap">
                                    {t('buying')}
                                </TabsTrigger>
                                <TabsTrigger value="1" badge={orderCounts.sellOrder}
                                             className="data-[state=active]:bg-background whitespace-nowrap">
                                    {t('selling')}
                                </TabsTrigger>
                                <TabsTrigger value="2" badge={orderCounts.pendingPayment}
                                             className="data-[state=active]:bg-background whitespace-nowrap">
                                    {t('pendingPayment')}
                                </TabsTrigger>
                                <TabsTrigger value="3" badge={orderCounts.pendingReleased}
                                             className="data-[state=active]:bg-background whitespace-nowrap">
                                    {t('pendingRelease')}
                                </TabsTrigger>
                                <TabsTrigger value="4" badge={orderCounts.done}
                                             className="data-[state=active]:bg-background whitespace-nowrap">
                                    {t('completed')}
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value={tab} className="mt-0 space-y-4">
                                <InfiniteScroll
                                    dataLength={orders.length}
                                    next={getOrderList}
                                    hasMore={hasMore}
                                    loader={<h4>{t('loading')}</h4>}
                                    endMessage={<p
                                        className="text-center text-muted-foreground py-4">{t('noOrders')}</p>}
                                    scrollableTarget="scrollableDiv">
                                    {
                                        orders.map((order, i) => <OrderCard key={i}
                                                                            order={order}
                                                                            currentTab={tab}
                                                                            onCancel={handleCancelOrder}
                                                                            onRelease={handleReleaseOrder}
                                                                            toInfo={toInfo}
                                                                            onCancelOrder={onCancelOrder}/>
                                        )
                                    }
                                </InfiniteScroll>
                            </TabsContent>
                        </Tabs>
                    )}
                </main>

                {/*预览*/}
                <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
                    <DialogContent className="max-w-md p-0">
                        <div>
                            {previewUrl && (
                                <img
                                    onClick={() => setPreviewUrl(null)}
                                    src={previewUrl}
                                    alt="preview"
                                    className="w-full h-auto rounded"
                                />
                            )}
                        </div>
                    </DialogContent>
                </Dialog>

                <BottomNavigation/>
            </div>
        </SimpleTransition>
    )
}
