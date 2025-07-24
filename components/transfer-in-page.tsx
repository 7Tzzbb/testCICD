"use client"

import {useState, useEffect} from "react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {ArrowLeft, Share2, Copy, AlertTriangle, CheckCircle2, ArrowUpRight} from "lucide-react"
import Link from "next/link"
import {useToast} from "@/hooks/use-toast"
import {useRouter, useSearchParams} from "next/navigation"
import {motion} from "framer-motion"
import {useLanguage} from "@/lib/i18n/language-context";
import {Input} from "@/components/ui/input";
import {assetStatementRecordAdd, getAssetStatementDetail, getUserUid} from "@/lib/api";
import {QRCodeCanvas} from "qrcode.react";
import {copyToClipboard} from "@/lib/utils";

interface Asset {
    id: string
    name: string
    type: string
    amount: string
    value: number
    icon: string
    change: string
    description?: string
    address?: string // 添加地址字段
}

export default function TransferInPage() {
    const router = useRouter()
    const {toast} = useToast()
    const [isLoading, setIsLoading] = useState(true)
    const [asset, setAsset] = useState<Asset | null>(null)
    const [copied, setCopied] = useState(false)
    const searchParams = useSearchParams();
    const {t} = useLanguage()
    const id = searchParams.get('id');
    const [transferAmount, setTransferAmount] = useState("")
    const [actualDeduction, setActualDeduction] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [tokenAddress, setTokenAddress] = useState("")
    // 模拟数据加载
    useEffect(() => {
        getInfo()
        if (localStorage.getItem("walletPublicKey")) {
            const token = localStorage.getItem("walletPublicKey")
            setTokenAddress(token)
        }
        // getUid()
    }, [])
    // 获取uid
    // const getUid =async () => {
    //     const res = await getUserUid(tokenAddress)
    //     if (res.code == 0) {
    //     } else {
    //         toast({
    //             description: t(res.message),
    //             variant: "destructive",
    //             duration: 1500
    //         })
    //     }
    // }
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
    // 处理复制地址
    const handleCopyAddress = async () => {

        const success = await copyToClipboard(tokenAddress);
        if (success) {
            toast({
                title: t('copieds'),
                description: t('tokenCopied'),
                duration: 1500
            })
        } else {
            toast({
                title: t('tip'),
                description: t('copyFailed'),
                duration: 1500
            });
        }
    }
    // 处理取消
    const handleCancel = () => {
        router.back()
    }

    // 处理分享
    const handleShare = async () => {
        if (asset?.address && navigator.share) {
            try {
                await navigator.share({
                    title: `${asset.name}转入地址`,
                    text: `这是我的${asset.name}转入地址：${asset.address}`,
                    url: window.location.href,
                })
            } catch (error) {
                toast({
                    title: "分享失败",
                    description: "无法使用分享功能，请手动复制地址",
                    duration: 1500
                })
            }
        } else {
            toast({
                title: "分享功能不可用",
                description: "您的浏览器不支持分享功能，请手动复制地址",
                duration: 1500
            })
        }
    }
    // 处理确认转出
    const handleConfirm = async () => {
        if (!tokenAddress) {
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

        // 转入处理
        setIsSubmitting(true)
        const res = await assetStatementRecordAdd({
            type: 3, // 入
            "assetId": asset.assetsId,
            "fromUid": localStorage.getItem('userId'),
            // "toUid": tokenAddress,
            "transactionValue": transferAmount,
        })
        if (res.code == 0) {
            setIsSubmitting(false)
            toast({
                title: t('transferSuccess2'),
                description: `${t('transferSuccess1')}${transferAmount}${t('to')}${tokenAddress}`,
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
    const getTypeColor = (type: number) => {
        switch (type) {
            case 1:
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case 2:
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
        }
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
                        <h1 className="font-bold text-lg">{t('depositAsset')}</h1>
                    </div>
                </header>

                <main className="flex-1 container px-4 py-6">
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-full max-w-md space-y-4">
                            <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                            <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
                            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
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
                        <span className="text-2xl mr-2">{asset.icon}</span>
                        <h1 className="font-bold text-lg">{t('depositAction')}{asset.name}</h1>
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
                                    {t('transferInDetail')}
                                </h2>

                                {/* 接收平台地址 */}
                                <div className="mb-4">
                                    <label htmlFor="receiver-address" className="block text-sm font-medium mb-1">
                                        {t('receiverPlatformAddress')}
                                    </label>
                                    <Input
                                        id="receiver-address"
                                        placeholder={t('enterReceiverAddress')}
                                        value={tokenAddress}
                                        disabled
                                        className="bg-primary/5 hover:bg-primary/10 focus:bg-white dark:focus:bg-gray-800 transition-colors"
                                    />
                                    {/* onChange={(e) => setReceiverAddress(e.target.value)} */}
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
                                    {t('enterTransferInAmount')}
                                </label>
                                {/*placeholder={`${t('maxTransferOut')} ${getAssetAmount(asset)}`}*/}
                                <Input
                                    id="transfer-amount"
                                    type='number'
                                    placeholder={`${t('enterTransferInAmount')}`}
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

                    {/* 转入说明 */}
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.1, duration: 0.4}}
                        className="w-full"
                    >
                        <Card
                            className="w-full mb-4 shadow-md hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary vibrant-card hover-glow">
                            <CardContent className="p-4">
                                <h2 className="text-lg font-medium mb-2 flex items-center">
                  <span className="bg-primary/20 text-primary p-1 rounded-md mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle
                        cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </span>
                                    {t('depositNote')}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {t('howToDeposit')}{asset.name}{t('depositToYourAccount')}：
                                </p>
                                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 pl-1">
                                    <li>{t('useSupported')}{asset.type == 1 ? t('points') : t('rwa')}{t('scanWithWalletQR')}</li>
                                    <li>{t('copyTokenToWallet')}</li>
                                    <li>{t('depositTips')}</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* 二维码区域 */}
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2, duration: 0.4}}
                        className="w-full">
                        <Card className="w-full mb-4 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden bg-gradient-to-r from-primary/10 to-background vibrant-card hover-glow">
                            <CardContent className="p-4">
                                <h2 className="text-lg font-medium mb-4 flex items-center">
        <span className="bg-primary/20 text-primary p-1 rounded-md mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <rect x="7" y="7" width="3" height="3"/>
            <rect x="14" y="7" width="3" height="3"/>
            <rect x="7" y="14" width="3" height="3"/>
            <rect x="14" y="14" width="3" height="3"/>
          </svg>
        </span>
                                    {t('qrCode')}
                                    <span className="ml-2 text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
          {asset.type == 1 ? t('points') : t('rwa')}
        </span>
                                </h2>

                                {/* 二维码图片 */}
                                <div className="flex justify-center w-full">
                                    <div
                                        className="relative w-64 h-64 bg-white p-4 rounded-lg mb-2 flex items-center justify-center shadow-inner hover:shadow-md transition-shadow hover:scale-105 transition-transform duration-300"
                                    >
                                        <div
                                            className="absolute inset-0 m-4 border-2 border-dashed border-primary/30 rounded-lg pointer-events-none"></div>
                                        <div className="text-5xl absolute opacity-20">{asset.icon}</div>
                                        <div className="z-10">
                                            <QRCodeCanvas
                                                value={tokenAddress}
                                                size={160}
                                                level="H"
                                                className="rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                                    {t('scanToDeposit')}{asset.name}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* TOKEN地址 */}
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3, duration: 0.4}}
                        className="w-full"
                    >
                        <Card
                            className="w-full mb-4 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-background to-primary/10 vibrant-card hover-glow">
                            <CardContent className="p-4">
                                <h2 className="text-lg font-medium mb-2 flex items-center">
                  <span className="bg-primary/20 text-primary p-1 rounded-md mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect
                        width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                  </span>
                                    {t('tokenAddress')}
                                </h2>
                                <div
                                    className="relative text-sm font-mono bg-primary/5 dark:bg-gray-800 p-3 rounded-md break-all whitespace-pre-wrap cursor-pointer hover:bg-primary/10 dark:hover:bg-gray-700 transition-colors hover:scale-[1.01] transition-transform duration-300"
                                >
                                    {tokenAddress}
                                    {copied && (
                                        <span className="absolute right-2 top-2 text-green-500">
                      <CheckCircle2 className="h-4 w-4"/>
                    </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1 text-center"
                                   onClick={handleCopyAddress}>
                                    {t('clickToCopy')}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* 重要提示 */}
                    <motion.div
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.4, duration: 0.4}}
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
                                            <li>{t('confirmAssetType')}<span
                                                className="font-medium text-amber-600 dark:text-amber-400">
                                                {asset.type == 1 ? t('points') : t('rwa')}
                                            </span>类型的资产
                                            </li>
                                            <li>{t('wrongAssetLoss')}</li>
                                            <li>{t('testBeforeBigTransfer')}</li>
                                            <li>{t('waitNetworkConfirm')}</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* 按钮区域 */}
                    <motion.div
                        className="grid grid-cols-3 gap-4 w-full"
                        initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.5, duration: 0.4}}
                    >
                        <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2 h-12 hover:bg-primary/10 dark:hover:bg-gray-800 transition-colors hover-scale"
                            onClick={handleShare}
                        >
                            <Share2 className="h-4 w-4"/>
                            {t('share')}
                        </Button>
                        <Button
                            variant="default"
                            className="flex items-center justify-center gap-2 h-12 bg-primary hover:bg-primary/90 transition-colors hover-scale"
                            onClick={handleConfirm}
                            disabled={isSubmitting || !tokenAddress || !transferAmount || parseFloat(transferAmount) <= 0}
                        >
                            {isSubmitting ? t('processing') : t('depositAction')}
                        </Button>
                        <Button
                            variant="default"
                            className={`flex items-center justify-center gap-2 h-12 ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/90'} transition-colors hover-scale`}
                            onClick={handleCopyAddress}
                        >
                            {copied ? <CheckCircle2 className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}
                            {copied ? t('copied') : t('copy')}
                        </Button>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    )
}