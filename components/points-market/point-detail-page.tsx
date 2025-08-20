"use client"

import {useState, useEffect} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {useToast} from "@/hooks/use-toast"
import {
    ArrowLeft,
    Info,
    TrendingUp,
    TrendingDown,
    ShoppingCart,
    ShoppingBag,
    BarChart2,
    List,
    Filter,
    Phone,
    Mail,
    CreditCard,
    Smartphone
} from "lucide-react"
import Link from "next/link"
import {SimpleTransition} from "@/components/simple-transition"
import {useRouter, useSearchParams} from "next/navigation"
import {getAssetsDetail, getOrderMarketPageList, priceTrend} from "@/lib/api"
import InfiniteScroll from "react-infinite-scroll-component";
import {useLanguage} from "@/lib/i18n/language-context"
import {
    Area,
    Bar,
    CartesianGrid,
    Line,
    ComposedChart,
    Legend,
    Tooltip,
    XAxis,
    YAxis,
    LineChart,
    ResponsiveContainer
} from "recharts"
import {ChartContainer, ChartTooltipContent} from "../ui/chart"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Checkbox} from "@/components/ui/checkbox"

// 订单类型
interface Order {
    id: string
    orderNumber: string // 添加订单编号字段
    type: "buy" | "sell"
    pointName: string
    price: string
    priceUSDT: string  // USDT价格
    supportUSDT: boolean // 是否支持USDT付款
    quantity: string
    remainingQuantity: string // 剩余数量
    totalQuantity: string // 总数量
    minQuantity: string // 最低买入/卖出量
    total: string
    date: string
    status: "active" | "completed" | "cancelled"
    paymentMethods: string[] // 支持的付款方式
    contactMethods: string[] // 联系方式
    creditScore: number // 信用值
    avgPaymentTime: string // 平均付款时间
    totalOrders: number // 总成交单数
    arbitrationRate: string // 仲裁率
}

export default function PointDetailPage() {
    const router = useRouter()
    const {toast} = useToast()
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState<Order[]>([])
    const searchParams = useSearchParams();
    const assetsId = searchParams.get('assetsId');
    const id = searchParams.get('id');

    const {t} = useLanguage()
    const [asset, setAsset] = useState<any>()

    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const pageSize = 10
    const [priceHistory, setPriceHistory] = useState([])
    const [rwa, setRwa] = useState(null)


    // 添加筛选状态
    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([])
    const [selectedContactMethods, setSelectedContactMethods] = useState<string[]>([])

    // 支付方式选项
    const paymentOptions = [
        {id: "bank", label: t('bankCard'), category: t('bankCard')},
        {id: "alipay", label: t('bankAlipay'), category: t('electronicPayment')},
        {id: "wechat", label: t('wechatPay'), category: t('electronicPayment')},
        {id: "paypal", label: "PayPal", category: t('electronicPayment')},
        {id: "applepay", label: "Apple Pay", category: t('electronicPayment')},
        {id: "googlepay", label: "Google Pay", category: t('electronicPayment')},
        {id: "samsungpay", label: "Samsung Pay", category: t('electronicPayment')},
        {id: "stripe", label: "Stripe", category: t('electronicPayment')},
        {id: "usdt", label: "USDT", category: t('cryptoCurrency')},
        {id: "usdc", label: "USDC", category: t('cryptoCurrency')},
    ]

    // 联系方式选项
    const contactOptions = [
        {id: "phone", label: t('phoneNumber'), icon: Phone},
        {id: "email", label: t('email'), icon: Mail},
        {id: "wechat", label: t('wechatId'), icon: Smartphone},
        {id: "qq", label: t('qqId'), icon: Smartphone},
        {id: "telegram", label: "Telegram", icon: Smartphone},
        {id: "discord", label: "Discord", icon: Smartphone},
        {id: "instagram", label: "Instagram", icon: Smartphone},
        {id: "facebook", label: "Facebook", icon: Smartphone},
        {id: "twitter", label: "Twitter", icon: Smartphone},
        {id: "youtube", label: "YouTube", icon: Smartphone},
    ]

    // 处理支付方式选择变化
    const handlePaymentMethodChange = (method: string) => {
        setSelectedPaymentMethods(prev => {
            if (prev.includes(method)) {
                return prev.filter(m => m !== method)
            } else {
                return [...prev, method]
            }
        })
    }

    // 处理联系方式选择变化
    const handleContactMethodChange = (method: string) => {
        setSelectedContactMethods(prev => {
            if (prev.includes(method)) {
                return prev.filter(m => m !== method)
            } else {
                return [...prev, method]
            }
        })
    }

    // 重置筛选条件
    const resetFilters = () => {
        setSelectedPaymentMethods([])
        setSelectedContactMethods([])
    }

    // 筛选订单
    const filterOrders = (orders: Order[]) => {
        return orders.filter(order => {
            // 如果没有选择任何筛选条件，则显示所有订单
            if (selectedPaymentMethods.length === 0 && selectedContactMethods.length === 0) {
                return true
            }

            // 检查支付方式
            const paymentMatch = selectedPaymentMethods.length === 0 ||
                selectedPaymentMethods.some(method => order.paymentMethods.includes(method))

            // 检查联系方式
            const contactMatch = selectedContactMethods.length === 0 ||
                selectedContactMethods.some(method => order.contactMethods.includes(method))

            return paymentMatch && contactMatch
        })
    }
    // 初始化
    useEffect(() => {
        setOrders([])
        getAssetInfo(id)
        getMarketList(1, '')
        getPriceTrend('LAST_24_HOURS')
    }, [])
    // 切换时间
    const [activeFilter, setActiveFilter] = useState('LAST_24_HOURS')
    const handleFilterChange = (type: string) => {
        setActiveFilter(type)
        getPriceTrend(type)
    }
    // 走势图
    const getPriceTrend = async (range: any) => {
        const res = await priceTrend(assetsId, range)
        if (res.code == 0) {
            setPriceHistory(res.data)
        } else {
            toast({
                description: t(res.message),
                duration: 1500
            })
        }
    }

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

    // 资产详情
    const getAssetInfo = async (id: any) => {
        const res = await getAssetsDetail(id)
        if (res.code == 0) {
            setIsLoading(false)
            if (res.data.transactionTime) {
                res.data.transactionTime = JSON.parse(res.data.transactionTime)
            }
            setAsset(res.data)
        } else {
            toast({
                title: t('fetchAssetDetailFailed'),
                description: t(res.message),
                variant: "destructive",
                duration: 1500
            })
        }
    }
    // 市场订单
    const getMarketList = async (customPage?: any, t?: any) => {
        const currentPage = customPage || page
        const res = await getOrderMarketPageList(currentPage, pageSize, t, assetsId)
        if (res.code == 0) {
            const newData = res.data.content
            const totalPages = res.data.totalPages
            // 追加数据
            setOrders((prev) =>
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
    const getOderList = () => {
        getMarketList(page, tab)
    }
    const [tab, setTab] = useState('0')
    // 切换订单类型
    const changeTab = (t: string) => {
        setOrders([])
        getMarketList(1, t == 0 ? '' : t)
        setTab(t)
    }
    // 处理资产买入
    const handleBuy = () => {
        router.push(`/points-market/buy?id=${asset?.id}`)
    }

    // 处理资产卖出
    const handleSell = () => {
        router.push(`/points-market/sell?id=${asset?.id}`)
    }
    // 仲裁
    const handleArbitrate = (order: Order) => {
        router.push(`/points-market/arbitrate?id=${order.id}`)
    }

    // 格式化支付方式
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
                case 'E_WALLET':
                    return t('wallet')
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

    if (isLoading || !asset) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <header
                    className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="container flex items-center h-14 px-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5"/>
                        </Button>
                        <h1 className="font-bold text-lg ml-2">{t('pointsDetail')}</h1>
                    </div>
                </header>
                <main className="flex-1 container px-4 py-4 flex items-center justify-center">
                    <p className="text-muted-foreground">{t('loading')}</p>
                </main>
            </div>
        )
    }

    return (
        // 使用 SimpleTransition 替代 PageTransition
        <SimpleTransition>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <header
                    className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="container flex items-center h-14 px-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5"/>
                        </Button>
                        <h1 className="font-bold text-lg ml-2">{asset.assetsName}{t('details')}</h1>
                        {/*<div className="ml-auto">*/}
                        {/*    <Button variant="ghost" size="icon" onClick={() => setShowInfo(!showInfo)}>*/}
                        {/*        <Info className="h-5 w-5" />*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                    </div>
                </header>

                <main className="flex-1 container px-4 py-4">
                    {/* 积分信息卡片 */}
                    <Card className="mb-4 overflow-hidden">
                        <CardContent className="p-0">
                            <Link href="/point">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                                    <h2 className="text-xl font-bold">{asset.assetsName}</h2>
                                    <p className="text-sm opacity-90">{t('issuer')}: {asset.issuer}</p>
                                </div>
                            </Link>
                            <div className="p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{asset.assetsDetail}</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('totalSupply')}</p>
                                        <p className="font-medium">{asset.maxOrderSell}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{t('circulation')}</p>
                                        <p className="font-medium">{asset.circulation}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* 价格趋势图 */}
                    <Card className="mb-4 ">
                        <CardContent className="p-4 ">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold mb-2">{t('priceAndVolumeTrend')}</h2>
                                <div className="flex space-x-2 mb-2">
                                    <button
                                        className={`px-3 py-1 rounded-md text-xs font-medium ${activeFilter === 'LAST_24_HOURS' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'}`}
                                        onClick={() => handleFilterChange('LAST_24_HOURS')}>
                                        24 {t('hour')}
                                    </button>
                                    <button
                                        className={`px-3 py-1 rounded-md text-xs font-medium ${activeFilter === 'LAST_7_DAYS' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'}`}
                                        onClick={() => handleFilterChange('LAST_7_DAYS')}>
                                        7 {t('day')}
                                    </button>
                                    <button
                                        className={`px-3 py-1 rounded-md text-xs font-medium ${activeFilter === 'LAST_30_DAYS' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'}`}
                                        onClick={() => handleFilterChange('LAST_30_DAYS')}>
                                        30 {t('day')}
                                    </button>
                                </div>
                            </div>
                            <div className="h-52 w-full">
                                <ChartContainer
                                    config={{
                                        price: {
                                            label: t('priceGeneral'),
                                            color: "hsl(var(--primary))",
                                        },
                                        // volume: {
                                        //     label: t('volume'),
                                        //     color: "hsl(var(--secondary))",
                                        // }
                                    }}
                                >
                                    <ComposedChart data={priceHistory}>
                                        <defs>
                                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                            </linearGradient>
                                            {/*<linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">*/}
                                            {/*    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8} />*/}
                                            {/*    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />*/}
                                            {/*</linearGradient>*/}
                                        </defs>

                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis
                                            dataKey="date"
                                        />


                                        {/*<XAxis*/}
                                        {/*    dataKey="date"*/}
                                        {/*    interval={Math.floor(priceHistory.length / 10)}*/}
                                        {/*    tick={{ fontSize: 10, fill: '#94a3b8' }} // 可根据主题自定义*/}
                                        {/*    angle={-45}*/}
                                        {/*    textAnchor="end"*/}
                                        {/*    height={60}*/}
                                        {/*/>*/}

                                        <YAxis
                                            yAxisId="left"
                                            orientation="left"
                                            tick={{ fontSize: 12 }}
                                        />
                                        {/*<YAxis*/}
                                        {/*    yAxisId="right"*/}
                                        {/*    orientation="right"*/}
                                        {/*    tick={{ fontSize: 12 }}*/}
                                        {/*/>*/}

                                        <Tooltip
                                            content={<ChartTooltipContent />}
                                            formatter={(value, name) => {
                                                if (name === "price") return [`${value}`, t('priceGeneral')];
                                                if (name === "volume") return [`${value}`, t('volume')];
                                                return [value, name];
                                            }}
                                            labelFormatter={(label) =>
                                                new Date(label).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })
                                            }
                                        />

                                        <Legend />

                                        <Area
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey="price"
                                            name={t('priceGeneral')}
                                            stroke="hsl(var(--primary))"
                                            fillOpacity={1}
                                            fill="url(#colorPrice)"
                                            strokeWidth={2}
                                            dot={false}
                                        />

                                        {/*<Line*/}
                                        {/*    yAxisId="right"*/}
                                        {/*    type="monotone"*/}
                                        {/*    dataKey="volume"*/}
                                        {/*    name={t('volume')}*/}
                                        {/*    stroke="hsl(var(--secondary))"*/}
                                        {/*    fill="url(#colorVolume)"*/}
                                        {/*    fillOpacity={0.3}*/}
                                        {/*    strokeWidth={2}*/}
                                        {/*    dot={false}*/}
                                        {/*/>*/}
                                    </ComposedChart>
                                </ChartContainer>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('currentPrice')}</p>
                                    <p className="text-xl font-bold">{asset.price || 0}</p>
                                    <div className="flex items-center mt-1">
                                        <TrendingUp className="h-4 w-4 text-green-500 mr-1"/>
                                        <span className={`text-sm text-green-500`}>2</span>
                                        <span className="text-xs text-gray-500 ml-1">24h</span>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('volume24h')}</p>
                                    <p className="text-xl font-bold">{asset.volume}</p>
                                    <div className="flex items-center mt-1">
                                        <BarChart2 className="h-4 w-4 text-blue-500 mr-1"/>
                                        <span className="text-xs text-gray-500">{t('turnover')}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-3 gap-4 mt-6 mb-2">
                        {/*<Button className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"*/}
                        {/*        onClick={handleBuy}>*/}
                        {/*    <ShoppingCart className="h-4 w-4 mr-2" />*/}
                        {/*    {t('postBuyRequest')}*/}
                        {/*</Button>*/}
                        {/*<Button className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"*/}
                        {/*        onClick={handleSell}>*/}
                        {/*    <ShoppingBag className="h-4 w-4 mr-2" />*/}
                        {/*    {t('postSell')}*/}
                        {/*</Button>*/}
                        {/*求购*/}
                        <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
                                disabled={!isTradingTime}
                                onClick={handleBuy}>
                            <ShoppingCart className="h-4 w-4 mr-2"/>
                            {t('postBuyRequest')}
                        </Button>
                        {/*出售*/}
                        <Button className="bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
                                disabled={!isTradingTime}
                                onClick={handleSell}>
                            <ShoppingBag className="h-4 w-4 mr-2"/>
                            {t('postSell')}
                        </Button>
                        {/*我的订单*/}
                        <Button
                            className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 flex items-center justify-center"
                            asChild
                        >
                            <Link href="/points-market/my-orders">
                                <List className="h-4 w-4 mr-2"/>
                                {t('myOrders')}
                            </Link>
                        </Button>
                    </div>

                    {/* 市场订单 */}
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2 mb-2">
                            <h2 className="text-lg font-semibold">{t('marketOrders')}</h2>
                            {/* 筛选按钮 */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="flex items-center">
                                        <Filter className="h-4 w-4 mr-1"/>
                                        {t('filter')}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-medium mb-2">{t('paymentMethod')}</h3>
                                            <div className="space-y-2">
                                                <h4 className="text-sm text-gray-500">{t('bankCard')}</h4>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {paymentOptions.filter(option => option.category === t('bankCard')).map(option => (
                                                        <div key={option.id} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`payment-${option.id}`}
                                                                checked={selectedPaymentMethods.includes(option.id)}
                                                                onCheckedChange={() => handlePaymentMethodChange(option.id)}
                                                            />
                                                            <label htmlFor={`payment-${option.id}`} className="text-sm">
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>

                                                <h4 className="text-sm text-gray-500 mt-2">{t('electronicPayment')}</h4>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {paymentOptions.filter(option => option.category === t('electronicPayment')).map(option => (
                                                        <div key={option.id} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`payment-${option.id}`}
                                                                checked={selectedPaymentMethods.includes(option.id)}
                                                                onCheckedChange={() => handlePaymentMethodChange(option.id)}
                                                            />
                                                            <label htmlFor={`payment-${option.id}`} className="text-sm">
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>

                                                <h4 className="text-sm text-gray-500 mt-2">{t('cryptoCurrency')}</h4>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {paymentOptions.filter(option => option.category === t('cryptoCurrency')).map(option => (
                                                        <div key={option.id} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`payment-${option.id}`}
                                                                checked={selectedPaymentMethods.includes(option.id)}
                                                                onCheckedChange={() => handlePaymentMethodChange(option.id)}
                                                            />
                                                            <label htmlFor={`payment-${option.id}`} className="text-sm">
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-medium mb-2">{t('contactInfo')}</h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                {contactOptions.map(option => {
                                                    const Icon = option.icon
                                                    return (
                                                        <div key={option.id} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`contact-${option.id}`}
                                                                checked={selectedContactMethods.includes(option.id)}
                                                                onCheckedChange={() => handleContactMethodChange(option.id)}
                                                            />
                                                            <label htmlFor={`contact-${option.id}`}
                                                                   className="text-sm flex items-center">
                                                                <Icon className="h-3 w-3 mr-1"/>
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <Button variant="outline" size="sm" onClick={resetFilters}>
                                                {t('filterReset')}
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <Tabs defaultValue="0"
                              onValueChange={(value) => changeTab(value)}>
                            <TabsList className="w-full mb-4">
                                <TabsTrigger value="0" className="flex-1">{t('all')}</TabsTrigger>
                                <TabsTrigger value="1" className="flex-1">{t('marketBuyOrderLabel')}</TabsTrigger>
                                <TabsTrigger value="2" className="flex-1">{t('marketSellOrderLabel')}</TabsTrigger>
                            </TabsList>

                            <TabsContent value={tab}>
                                <InfiniteScroll
                                    dataLength={orders.length}
                                    next={getOderList}
                                    hasMore={hasMore}
                                    loader={<h4>{t('loading')}</h4>}
                                    endMessage={<p style={{textAlign: 'center'}}>{t('noData')}</p>}
                                    scrollableTarget="scrollableDiv">
                                    {orders.map(order => (
                                        <Card key={order.id} className="mb-3">

                                            <CardContent className="p-3">
                                                <div className="flex flex-col">
                                                    {/* 订单编号 */}
                                                    <div className="text-xs text-gray-500 mb-1">
                                                        {t('orderNumber')}: {order.orderId}
                                                    </div>

                                                    {/* 价格信息 */}
                                                    <div className="flex justify-between items-center mb-2">
                                                        <div>
                                                            <div className="flex items-center">
                                                                {order.type == 1 ? (
                                                                    <ShoppingBag
                                                                        className="h-4 w-4 text-green-500 mr-1"/>
                                                                ) : (
                                                                    <ShoppingCart
                                                                        className="h-4 w-4 text-red-600 mr-1"/>
                                                                )}
                                                                {order.type == 1 ? (
                                                                    <span
                                                                        className="text-sm font-medium text-green-500">{t('buyRequest')}</span>
                                                                ) : (
                                                                    <span
                                                                        className="text-sm font-medium text-red-500">{t('marketSellLabel')}</span>
                                                                )
                                                                }
                                                            </div>
                                                            <div className="flex items-center mt-1">
                                                                <p className="text-base font-bold">￥{order.price}</p>
                                                                {order.autoManaged ? (
                                                                    <p className="text-xs text-gray-500 ml-2">{t('supportUSDT')}</p>
                                                                ) : (
                                                                    <p className="text-xs text-gray-500 ml-2"></p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {order.type == 2 ? (
                                                            <Button variant="outline" size="sm"
                                                                    disabled={!isTradingTime}
                                                                    className="text-green-500 border-green-500 hover:bg-green-50"
                                                                    onClick={() => handleArbitrate(order)}>
                                                                {t('buy')}
                                                            </Button>
                                                        ) : (
                                                            <Button variant="outline" size="sm"
                                                                    disabled={!isTradingTime}
                                                                    className="text-red-500 border-red-500 hover:bg-red-50"
                                                                    onClick={() => handleArbitrate(order)}>
                                                                {t('sell')}
                                                            </Button>
                                                        )}

                                                    </div>

                                                    {/* 数量进度条 */}
                                                    <div className="mb-2">
                                                        <div className="flex justify-between text-xs mb-1">
                                                            <span>{t('amount')}: {order.filledAmount}/{order.amount}</span>
                                                            <span>{order.type == 2 ? t('minBuy') : t('minSell')}: {order.minimumAmount}</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2 ">
                                                            <div
                                                                className="bg-green-500 vibrant-gradient-progress vibrant-card hover:shadow-xl transition-all bg-gradient-to-br h-2 rounded-full"
                                                                style={{width: `${(parseInt(order.filledAmount) / parseInt(order.amount)) * 100}%`}}
                                                            ></div>
                                                        </div>
                                                    </div>

                                                    {/* 支付和联系方式 */}
                                                    <div className="flex justify-between mb-2">
                                                        <div>
                                                            <p className="text-xs text-gray-500 mb-1">{t('paymentMethod')}:</p>
                                                            <div className="flex space-x-1">
                                                                {order.paymentMethods && order.paymentMethods.length ? (
                                                                    formatPayType(order.paymentMethods).map((method, index) => (
                                                                        <span key={index} className="p-1 bg-gray-100 rounded">
      <span className="text-blue-500 text-xs">{method}</span>
    </span>
                                                                    ))
                                                                ) : (
                                                                    <span className="text-gray-400 text-xs">{t('noDatas')}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-gray-500 mb-1">{t('contactInfo')}:</p>
                                                            <div className="flex space-x-1">
                                                                {order.formatcontactMethods && order.contactMethods.length ? (
                                                                    formatPayType(order.contactMethods).map((method, index) => (
                                                                        <span key={index} className="p-1 bg-gray-100 rounded">
      <span className="text-blue-500 text-xs">{method}</span>
    </span>
                                                                    ))
                                                                ) : (
                                                                    <span className="text-gray-400 text-xs">{t('noDatas')}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* 信用信息 */}
                                                    <div className="grid grid-cols-4 gap-2 text-xs">
                                                        <div>
                                                            <p className="text-gray-500 text-center">{t('creditScore')}</p>
                                                            <p className="font-medium text-center">{order.creditScore}</p>
                                                        </div>
                                                        <div>
                                                            {/*<p className="text-gray-500 text-center">{order.type == 1 ? '平均付款' : '平均放行'}</p>*/}
                                                            <p className="text-gray-500 text-center">{t('averagePayment')}</p>
                                                            <p className="font-medium text-center">{order.avgTime}/{t('minutes')}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 text-center">{t('orderCount')}</p>
                                                            <p className="font-medium text-center">{order.numOrder}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 text-center">{t('arbitrationRate')}</p>
                                                            <p className="font-medium text-center">{order.arbitrationRate}%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </InfiniteScroll>

                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </SimpleTransition>
    )
}
