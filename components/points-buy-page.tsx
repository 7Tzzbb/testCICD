"use client"

import {useState, useEffect} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import {ArrowLeft, ShoppingCart, AlertTriangle, CreditCard} from "lucide-react"
import {useRouter, useSearchParams} from "next/navigation"
import {motion} from "framer-motion"
import {useToast} from "@/hooks/use-toast"
import {getAssetsDetail, getAssetStatementDetail, getContactMethodList, getPaymentMethodList, orderAdd} from "@/lib/api"
import {useLanguage} from "@/lib/i18n/language-context";


interface Asset {
    id: string
    name: string
    assetsId: number
    type: string
    amount: string
    value: number
    icon: string
    change: string
    description?: string
}

export default function AssetBuyPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [asset, setAsset] = useState(null)
    const [buyPrice, setBuyPrice] = useState("")
    const [buyAmount, setBuyAmount] = useState("")
    const [minTradeAmount, setMinTradeAmount] = useState("100")
    const [canSplit, setCanSplit] = useState(false)
    const [remarks, setRemarks] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [autoManaged, setAutoManaged] = useState(0) // 0=否，1=是
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const {toast} = useToast()
    const {t} = useLanguage()
    useEffect(() => {
        getAssetInfo(id)
        getCollectionMethodList()
        contactMethodList()
    }, [])

    // 支付方式
    const [paymentMethods, setPaymentMethods] = useState([])
    const getCollectionMethodList = async () => {
        const r = await getPaymentMethodList()
        if (r.code == 0) {
            setPaymentMethods(r.data)
        } else {
            toast({
                description: t(r.message),
                variant: "destructive",
                duration: 1500
            })
        }
    }
    // 联系方式
    const [contactMethods, setContactMethods] = useState([])
    // 联系方式列表
    const contactMethodList = async () => {
        const result = await getContactMethodList()
        if (result.code == 0) {
            setContactMethods(result.data)
        } else {
            toast({
                description: t(result.message),
                variant: "destructive",
                duration: 1500
            })
        }
    }
    // 请求资产详情
    const getAssetInfo = async (id: string) => {
        const res = await getAssetsDetail(id)
        if (res.code == 0) {
            setAsset(res.data)
            setIsLoading(false)
        } else {
            // router.back()
            toast({
                title: t('tip'),
                description: t(res.message),
                duration: 1500
            })
        }
    }
    // 计算实际收到数量
    const calculateActualAmount = (amount: string) => {
        if (!amount) return 0
        const numAmount = parseFloat(amount)
        return numAmount * (1 - asset.buyRate)
    }

    // 计算应支付总金额
    const calculateTotalPayment = () => {
        if (!buyPrice || !buyAmount) return 0
        return parseFloat(buyPrice) * parseFloat(buyAmount)
    }

    // 处理买入数量变更
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        // 只允许输入数字和小数点
        if (/^\d*\.?\d*$/.test(value) || value === "") {
            setBuyAmount(value)
        }
    }

    // 处理价格变更
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        // 只允许输入数字和小数点
        if (/^\d*\.?\d*$/.test(value) || value === "") {
            setBuyPrice(value)
        }
    }

    // 处理最小成交数量变更
    const handleMinTradeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        // 只允许输入数字和小数点
        if (/^\d*\.?\d*$/.test(value) || value === "") {
            setMinTradeAmount(value)
        }
    }

    // 处理取消
    const handleCancel = () => {
        router.back()
    }

    // 处理确认挂买
    const handleConfirm = async () => {
        if (!buyPrice || parseFloat(buyPrice) <= 0) {
            toast({
                title: t('enterValidBuyPrice'),
                description: t('buyPriceGreaterThan0'),
                variant: "destructive",
                duration: 1500
            })
            return
        }

        if (!buyAmount || parseFloat(buyAmount) <= 0) {
            toast({
                title: t('enterValidBuyQuantity'),
                description: t('buyQuantityGreaterThan0'),
                variant: "destructive",
                duration: 1500
            })
            return
        }

        if (canSplit && (!minTradeAmount || parseFloat(minTradeAmount) < asset?.minBuyQuantity)) {
            toast({
                title: t('enterValidMinQuantity'),
                description: t('minQuantityAtLeast') + asset?.minBuyQuantity,
                variant: "destructive",
                duration: 1500
            })
            return
        }

        if (paymentMethodsChecked.length === 0) {
            toast({
                title: t('pleaseSelectPaymentMethod'),
                description: t('specifyBuyerPaymentMethod'),
                variant: "destructive",
                duration: 1500
            })
            return
        }
        if (contactMethodListChecked.length === 0) {
            toast({
                title: t('pleaseSelectContactMethod'),
                variant: "destructive",
                duration: 1500
            })
            return
        }

        setIsSubmitting(true)

        const res = await orderAdd({
            assetsId: asset?.assetsId,
            type: 1,
            price: parseFloat(buyPrice),
            amount: parseFloat(buyAmount),
            isSplit: canSplit ? 1 : 0,
            minimumAmount: parseFloat(minTradeAmount),
            total: calculateTotalPayment(),
            contactMethods: contactMethodListChecked.join(','),
            paymentMethods: paymentMethodsChecked.join(','),
            autoManaged: autoManaged,
            remark: remarks,
        })
        if (res.code == 0) {
            setIsSubmitting(false)
            toast({
                title: t('purchasePostSuccess'),
                description: `${t('purchasePosted')}${buyAmount}${asset?.assetsName}，${t('price')}${buyPrice}`,
                duration: 1500
            })
            // router.push(`/assets/detail/${id}`)
            router.back()
        } else {
            setIsSubmitting(false)
            if (res.message == 'error.least_deal_amount_not_reached') {
                toast({
                    description: t('error.least_deal_amount_not_reached') + ',' + t('minimumPurchaseQuantity') + asset?.minBuyQuantity,
                    duration: 1500
                })
            } else {
                toast({
                    description: t(res.message),
                    duration: 1500
                })
            }
        }

    }
    // 选中的联系方式、支付方式
    const [paymentMethodsChecked, setPaymentMethodsChecked] = useState([])
    const [contactMethodListChecked, setContactMethodListChecked] = useState([])

    // 获取资产类型对应的颜色
    const getTypeColor = (type: number) => {
        switch (type) {
            // case "加密货币":
            //   return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
            case 1:
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case 2:
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            // default:
            // return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
        }
    }
    // 格式化联系方式
    const formatcontactMethods = (type: string) => {
        switch (type) {
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
        }
    }
// 返回
    const toBack = () => {
        // router.push(`/assets/detail/${asset?.assetsId}?id=${asset?.id}`)
        router.back()
    }
    // 提取资产单位
    // const getAssetUnit = (asset: Asset | null) => {
    //   if (!asset) return ""
    //   const parts = asset.amount.split(" ")
    //   return parts.length > 1 ? parts[1] : ""
    // }

    if (isLoading || !asset) {
        return (
            <div
                className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
                <header
                    className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                    <div className="container flex items-center h-14 px-4">
                        <Button variant="ghost" size="icon" onClick={toBack}>
                            <ArrowLeft className="h-5 w-5"/>
                        </Button>
                        <h1 className="font-bold text-lg">{t('buyAssets')}</h1>
                    </div>
                </header>

                <main className="flex-1 container px-4 py-6">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-full max-w-md space-y-4">
                            <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                            <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                                <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div
            className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 pb-16">
            <header
                className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                <div className="container flex items-center h-14 px-4">
                    <Button variant="ghost" size="icon" onClick={toBack}>
                        <ArrowLeft className="h-5 w-5"/>
                    </Button>
                    <div className="flex items-center">
                        <span className="text-2xl mr-2">{asset.type == 1 ? t('points') : t('rwa')}</span>
                        <h1 className="font-bold text-lg"> {t('buyRequest')} {asset.assetsName}</h1>
                    </div>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getTypeColor(asset.type)}`}>
            {asset.type == 1 ? t('points') : t('rwa')}
          </span>
                </div>
            </header>

            <main className="flex-1 container px-4 py-6">
                <motion.div
                    className="flex flex-col items-center max-w-md mx-auto"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    {/* 买入详情 */}
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.1, duration: 0.4}}
                        className="w-full"
                    >
                        <Card
                            className="w-full mb-4 shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary vibrant-card hover-glow">
                            <CardContent className="p-4">
                                <h2 className="text-lg font-medium mb-4 flex items-center">
                  <span className="bg-primary/20 text-primary p-1 rounded-md mr-2">
                    <ShoppingCart className="h-4 w-4"/>
                  </span>
                                    {t('buyRequest')} {asset.assetsName}
                                </h2>

                                {/* 输入价格 */}
                                <div className="mb-4">
                                    <label htmlFor="buy-price" className="block text-sm font-medium mb-1">
                                        {t('enterPrice')}
                                    </label>
                                    <Input
                                        type='number'
                                        id="buy-price"
                                        placeholder={t('pleaseEnterBuyPrice')}
                                        value={buyPrice}
                                        onChange={handlePriceChange}
                                        className="bg-primary/5 hover:bg-primary/10 focus:bg-white dark:focus:bg-gray-800 transition-colors"
                                    />
                                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex justify-between">
                                            <span>{t('minAskPrice')}: {asset.priceFloor}</span>
                                            <span>{t('maxAskPrice')}: {asset.priceCeiling}</span>
                                        </div>
                                        <div className="mt-1">
                                            <span>{t('highestMarketBuyPrice')}: {asset.maxPrice}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 输入买入数量 */}
                                <div className="mb-4">
                                    <div className="flex justify-between">
                                        <label htmlFor="buy-amount" className="block text-sm font-medium mb-1">
                                            {t('buyQuantity')}
                                        </label>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{t('minimumPurchaseQuantity')}{asset.minBuyQuantity}</span>
                                    </div>
                                    <Input
                                        type='number'
                                        id="buy-amount"
                                        placeholder={t('minimumPurchaseQuantity') + asset.minBuyQuantity}
                                        value={buyAmount}
                                        onChange={handleAmountChange}
                                        className="bg-primary/5 hover:bg-primary/10 focus:bg-white dark:focus:bg-gray-800 transition-colors"
                                    />
                                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                                        <div className="flex justify-between">
                                            <span>{t('feeRate')}: {asset.buyRate * 100}%</span>
                                            <span>{t('actualReceivedAmount')}: {calculateActualAmount(buyAmount).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 应支付总金额 */}
                                <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                                    <div
                                        className="text-sm text-gray-600 dark:text-gray-400">{t('totalAmountPayable')}</div>
                                    <div className="text-xl font-bold">
                                        ¥{calculateTotalPayment().toLocaleString()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* 交易选项 */}
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2, duration: 0.4}}
                        className="w-full"
                    >
                        <Card
                            className="w-full mb-4 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-background to-primary/10 vibrant-card hover-glow">
                            <CardContent className="p-4">
                                {/* 可拆分选项 */}
                                <div className="mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="can-split"
                                            checked={canSplit}
                                            onCheckedChange={(checked) => setCanSplit(checked as boolean)}
                                        />
                                        <label
                                            htmlFor="can-split"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {t('allowPartialMatch')}
                                        </label>
                                    </div>
                                </div>

                                {/* 最小成交数量 */}
                                {canSplit && (
                                    <div className="mb-4 ml-6">
                                        <label htmlFor="min-trade-amount" className="block text-sm font-medium mb-1">
                                            {t('minTransactionAmount')}
                                        </label>
                                        <Input
                                            type='number'
                                            id="min-trade-amount"
                                            placeholder={t('minAmountLimitTip')}
                                            value={minTradeAmount}
                                            onChange={handleMinTradeAmountChange}
                                            className="bg-primary/5 hover:bg-primary/10 focus:bg-white dark:focus:bg-gray-800 transition-colors"
                                        />
                                    </div>
                                )}

                                {/* 支付方式 */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                                        {t('supportedPayment')}
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {paymentMethods.map((item) => (
                                            <div
                                                className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                key={item.id}
                                            >
                                                <Checkbox
                                                    id={item.id}
                                                    checked={paymentMethodsChecked.includes(item.id)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setPaymentMethodsChecked([...paymentMethodsChecked, item.id]);
                                                        } else {
                                                            setPaymentMethodsChecked(paymentMethodsChecked.filter((id) => id !== item.id));
                                                        }
                                                    }}
                                                    className="h-5 w-5 text-primary"
                                                />
                                                <label
                                                    htmlFor={item.id}
                                                    className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    {item.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 联系方式 */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                                        {t('contactInfo')}
                                    </label>
                                    <div className="space-y-3">
                                        {contactMethods.map((item) => (
                                            <div
                                                className="flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                key={item.id}
                                            >
                                                <Checkbox
                                                    id={item.id}
                                                    checked={contactMethodListChecked.includes(item.id)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setContactMethodListChecked([...contactMethodListChecked, item.id]);
                                                        } else {
                                                            setContactMethodListChecked(contactMethodListChecked.filter((id) => id !== item.id));
                                                        }
                                                    }}
                                                    className="h-5 w-5 text-primary"
                                                />
                                                <label
                                                    htmlFor={item.id}
                                                    className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    <span
                                                        className="text-primary">{formatcontactMethods(item.type)}</span>: {item.value}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* 托管 */}
                                <div className="mb-4">
                                    <label
                                        className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                                        {t('enableEscrowTip')}
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="flex items-center space-x-2 rounded-md p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                            <Checkbox
                                                id="payment-bank"
                                                checked={autoManaged === 1}
                                                onCheckedChange={(checked) =>
                                                    setAutoManaged(checked ? 1 : 0)
                                                }
                                            />
                                            <label
                                                htmlFor="payment-bank"
                                                className="flex items-center text-sm font-medium leading-none text-gray-800 dark:text-gray-200"
                                            >
                                                <CreditCard className="h-5 w-5 mr-2 text-blue-500"/>
                                                {t('escrowExplanation')}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {/* 备注 */}
                                <div className="mb-2">
                                    <label htmlFor="remarks" className="block text-sm font-medium mb-1">
                                        {t('remark')}
                                    </label>
                                    <Textarea
                                        id="remarks"
                                        placeholder={t('pleaseEnterRemark')}
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                        className="bg-primary/5 hover:bg-primary/10 focus:bg-white dark:focus:bg-gray-800 transition-colors"
                                        rows={3}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* 重要提示 */}
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3, duration: 0.4}}
                        className="w-full"
                    >
                        <Card
                            className="w-full mb-6 border-l-4 border-l-amber-500 dark:border-l-amber-600 shadow-md hover:shadow-lg transition-all duration-300 vibrant-card hover-glow">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5"/>
                                    <div>
                                        <h2 className="text-lg font-medium mb-2 text-amber-600 dark:text-amber-400">{t('importantNotice')}</h2>
                                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                            <li>{t('buyOrderTip')}</li>
                                            <li>{t('tradeSuccessTip')}</li>
                                            <li>{t('buyWillCharge')}{asset.buyRate * 100}%{t('feeSuffix')}</li>
                                            <li>{t('ensurePaymentAvailable')}</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* 按钮区域 */}
                    <motion.div
                        className="grid grid-cols-2 gap-4 w-full"
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.4, duration: 0.4}}
                    >
                        <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2 h-12 hover:bg-primary/10 dark:hover:bg-gray-800 transition-colors hover-scale"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            {t('cancel')}
                        </Button>
                        {/* disabled={isSubmitting || !buyPrice || !buyAmount || parseFloat(buyAmount) < 500} */}
                        <Button
                            variant="default"
                            className="flex items-center justify-center gap-2 h-12 bg-primary hover:bg-primary/90 transition-colors hover-scale"
                            onClick={handleConfirm}
                        >
                            {isSubmitting ? t('processing') : t('postBuyRequest')}
                        </Button>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    )
}
