"use client"

import {useState, useEffect} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {ArrowLeft, ArrowUpRight, AlertTriangle} from "lucide-react"
import Link from "next/link"
import {useToast} from "@/hooks/use-toast"
import {useRouter, useSearchParams} from "next/navigation"
import {motion} from "framer-motion"
import {useLanguage} from "@/lib/i18n/language-context";
import {assetStatementRecordAdd, getAssetStatementDetail} from "@/lib/api";

interface Asset {
    id: string
    name: string
    type: string
    amount: string
    value: number
    icon: string
    change: string
    description?: string
    address?: string
}

export default function TransferOutPage() {
    const router = useRouter()
    const {t} = useLanguage()
    const searchParams = useSearchParams();
    const {toast} = useToast()
    const [isLoading, setIsLoading] = useState(true)
    const [asset, setAsset] = useState<Asset | null>(null)
    const [receiverAddress, setReceiverAddress] = useState("")
    const [transferAmount, setTransferAmount] = useState("")
    const [actualDeduction, setActualDeduction] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const id = searchParams.get('id');
    // 模拟数据加载
    useEffect(() => {
        getInfo()
        if (localStorage.getItem("walletPublicKey")) {
            const token = localStorage.getItem("walletPublicKey")
            setReceiverAddress(token)
        }
    }, [])
    // 请求详情
    const getInfo = async () => {
        const res = await getAssetStatementDetail(id)
        if (res.code == 0) {
            setIsLoading(false)
            setAsset(res.data)
        } else {
            toast({
                description: t(res.message),
                variant: "destructive",
                duration: 1500
            })
        }
    }

    // 处理转出数量变更
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        // 只允许输入数字和小数点
        if (/^\d*\.?\d*$/.test(value) || value === "") {
            setTransferAmount(value)
            // 计算实际扣减数量
            if (value) {
                const amount = parseFloat(value)
                setActualDeduction(amount * (1 + asset.sellRate))
            } else {
                setActualDeduction(0)
            }
        }
    }

    // 处理取消
    const handleCancel = () => {
        router.back()
    }

    // 处理确认转出
    const handleConfirm = async () => {
        if (!receiverAddress) {
            toast({
                title: t('enterReceiverAddress'),
                description: t('receiverAddressRequired'),
                variant: "destructive",
                duration: 1500
            })
            return
        }

        if (!transferAmount || parseFloat(transferAmount) <= 0) {
            toast({
                title: t('enterValidAmount'),
                description: t('amountGreaterThanZero'),
                variant: "destructive",
                duration: 1500
            })
            return
        }

        // 转出处理
        setIsSubmitting(true)
        const res = await assetStatementRecordAdd({
            type: 4, // 转出
            "assetId": asset.assetsId,
            "fromUid": localStorage.getItem('userId'),
            // "toUid": receiverAddress,
            "transactionValue": transferAmount,
        })
        if (res.code == 0) {
            setIsSubmitting(false)
            toast({
                title: t('withdrawSuccess'),
                description: `${t('withdrawn')}${transferAmount}${t('to')}${receiverAddress}`,
                duration: 1500
            })
           router.back()
        } else {
            setIsSubmitting(false)
            toast({
                description: t(res.message),
                variant: "destructive",
                duration: 1500
            })
        }
    }

    // 获取资产类型对应的颜色
    const getTypeColor = (type: string) => {
        switch (type) {
            case 1:
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case 2:
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
        }
    }
    // 提取资产数量
    const getAssetAmount = (asset: Asset | null) => {
        if (!asset) return 0
        return asset.assetsBalance ?? 0
        // const parts = asset.assetsBalance.split(" ")
        // return parts.length > 0 ? parseFloat(parts[0].replace(/,/g, "")) : 0
    }

    if (isLoading || !asset) {
        return (
            <div
                className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
                <header
                    className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                    <div className="container flex items-center h-14 px-4">
                        <Button variant="ghost" size="icon" className="mr-2" asChild onClick={handleCancel}>
                            <ArrowLeft className="h-5 w-5"/>
                        </Button>
                        <h1 className="font-bold text-lg">{t('pushPointsInfo')}</h1>
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
            className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
            <header
                className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                <div className="container flex items-center h-14 px-4">
                    <Button variant="ghost" size="icon"
                            className="mr-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" asChild
                            onClick={handleCancel}>
                        <ArrowLeft className="h-5 w-5"/>
                    </Button>
                    <div className="flex items-center">
                        <h1 className="font-bold text-lg">{t('pushInfo')}{asset.assetsName}</h1>
                    </div>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getTypeColor(asset.type)}`}>
                    {asset.type == 1 ? '积分' : 'RWA'}
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
                    {/* 转出详情 */}
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
                    <ArrowUpRight className="h-4 w-4"/>
                  </span>
                                    {t('transferOutDetail')}
                                </h2>

                                {/* 接收平台地址 */}
                                <div className="mb-4">
                                    <label htmlFor="receiver-address" className="block text-sm font-medium mb-1">
                                        {t('receiverPlatformAddress')}
                                    </label>
                                    <Input
                                        id="receiver-address"
                                        placeholder={t('enterReceiverAddress')}
                                        value={receiverAddress}
                                        disabled
                                        className="bg-primary/5 hover:bg-primary/10 focus:bg-white dark:focus:bg-gray-800 transition-colors"
                                    />
                                    {/*onChange={(e) => setReceiverAddress(e.target.value)}*/}
                                </div>

                                {/* 可用积分余额 */}
                                <div className="mb-4 p-3 bg-primary/5 rounded-lg">
                                    <div
                                        className="text-sm text-gray-600 dark:text-gray-400">{t('available')}{asset.assetsName}{t('balance')}</div>
                                    <div className="text-xl font-bold">
                                        {asset.assetsBalance}
                                        <span className="text-sm text-gray-500 ml-2">≈ ¥{asset.sumPrice}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* 转出数量 */}
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2, duration: 0.4}}
                        className="w-full"
                    >
                        <Card
                            className="w-full mb-4 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-background to-primary/10 vibrant-card hover-glow">
                            <CardContent className="p-4">
                                <label htmlFor="transfer-amount" className="block text-sm font-medium mb-1">
                                    {t('enterTransferOutAmount')}
                                </label>
                                <Input
                                    id="transfer-amount"
                                    type='number'
                                    placeholder={`${t('maxTransferOut')} ${getAssetAmount(asset)}`}
                                    value={transferAmount}
                                    onChange={handleAmountChange}
                                    className="bg-primary/5 hover:bg-primary/10 focus:bg-white dark:focus:bg-gray-800 transition-colors text-lg font-bold mb-3"
                                />

                                {/* 手续费和实际扣减 */}
                                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    <div className="flex justify-between">
                                        <span>{t('feeRate')}：</span>
                                        <span className="font-medium">{asset.sellRate * 100}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>{t('actualDeductQuantity')}：</span>
                                        <span className="font-medium">
                                {actualDeduction.toFixed(transferAmount.includes(".") ? transferAmount.split(".")[1]?.length || 2 : 2)}
                    </span>
                                    </div>
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
                                            <li>{t('transferNote')}</li>
                                            <li>{t('confirmAddressWarning')}</li>
                                            <li>{t('irreversibleWarning')}</li>
                                            <li>{t('transferFeeNote')}{asset.sellRate * 100}%{t('feeSuffix')}</li>
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
                        <Button
                            variant="default"
                            className="flex items-center justify-center gap-2 h-12 bg-primary hover:bg-primary/90 transition-colors hover-scale"
                            onClick={handleConfirm}
                            disabled={isSubmitting || !receiverAddress || !transferAmount || parseFloat(transferAmount) <= 0}
                        >
                            {isSubmitting ? t('processing') : t('confirmWithdraw')}
                        </Button>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    )
}