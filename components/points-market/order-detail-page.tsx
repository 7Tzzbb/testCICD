"use client"

import {useState, useEffect} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {ArrowLeft, Clock, AlertCircle, CheckCircle, Copy, ShieldCheck, X, Upload} from "lucide-react"
import {useToast} from "@/hooks/use-toast"
import {SimpleTransition} from "@/components/simple-transition"
import {
    arbitrationRecordAdd,
    authNonce, authVerify,
    getContactMethodList,
    getOrderTransactionDetail,
    getPaymentMethodList,
    payOrderTransaction, uploadFile
} from "@/lib/api"
import {useRouter, useSearchParams} from "next/navigation"
import {useLanguage} from "@/lib/i18n/language-context";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {ethers} from "ethers";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {copyToClipboard} from "@/lib/utils";

// 订单数据类型
interface Order {
    id: string
    orderNumber: string
    type: "buy" | "sell"
    pointName: string
    price: string
    quantity: string
    total: string
    date: string
    status: "buying" | "selling" | "pending_payment" | "pending_release" | "completed" | "cancelled"
    paymentMethods: string[]
    contactMethods: string[]
    counterparty?: string
    paymentDeadline?: string
    counterpartyContact?: string
    counterpartyPhone?: string // 添加手机号字段
}

export default function OrderDetailPage() {
    const router = useRouter()
    const {toast} = useToast()
    const [isLoading, setIsLoading] = useState(true)
    const [order, setOrder] = useState<Order | null>(null)
    const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number }>({minutes: 15, seconds: 0})
    const [showContactInfo, setShowContactInfo] = useState(false)
    const [paymentConfirmed, setPaymentConfirmed] = useState(false)
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const {t} = useLanguage()
    // 申诉相关状态
    const [isArbitrationDialogOpen, setIsArbitrationDialogOpen] = useState(false)
    const [arbitrationContent, setArbitrationContent] = useState("")
    const [uploadedImages, setUploadedImages] = useState<File[]>([])
    const [isSubmittingArbitration, setIsSubmittingArbitration] = useState(false)
    // 模拟获取订单数据
    useEffect(() => {
        getOrderDetail(id)
        // getCollectionMethodList()
        // contactMethodList()
    }, [])

    // 支付方式
    const [paymentMethods, setPaymentMethods] = useState([])
    const getCollectionMethodList = async () => {
        const r = await getPaymentMethodList()
        if (r.code == 0) {
            r.data.forEach((v: any) => {
                v.details = JSON.parse(v.details)
            })
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
    // 获取订单详情
    const getOrderDetail = async (id: string) => {
        const res = await getOrderTransactionDetail(id)
        if (res.code == 0) {
            setIsLoading(false)
            if (res.data.paymentMethods && res.data.paymentMethods.length) {
                res.data.paymentMethods.forEach((v: any) => {
                    v.details = JSON.parse(v.details)
                })
            }
            setOrder(res.data)
        } else {
            setIsLoading(false)
            toast({
                description: t(res.message),
                variant: "destructive",
                duration: 1500
            })
        }
    }
    // 倒计时逻辑
    useEffect(() => {
        if (!order) return

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.minutes === 0 && prev.seconds === 0) {
                    clearInterval(interval)
                    return prev
                }

                if (prev.seconds === 0) {
                    return {minutes: prev.minutes - 1, seconds: 59}
                }

                return {minutes: prev.minutes, seconds: prev.seconds - 1}
            })
        }, 1000)
        console.log(timeLeft, 'timeLeft')
        return () => clearInterval(interval)
    }, [order])

    // 确认付款
    const confirmPayment = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        authNonce(address).then(async res => {
            if (res.code == 0) {
                // 使用钱包进行签名
                const signature = await signer.signMessage(res.data);
                // 验签
                authVerify({
                    userAddr: address,
                    signature,
                    message: res.data
                }).then(r => {
                    if (r.code == 0) {
                        payOrderTransaction(order.id).then(async result => {
                            if (result.code == 0) {
                                setPaymentConfirmed(true)
                                setShowContactInfo(true)
                                toast({
                                    description: t('paymentConfirmedWaitSeller'),
                                    duration: 1500
                                })
                                router.back()
                            } else {
                                toast({
                                    description: t(result.message),
                                    duration: 1500
                                })
                            }
                        })
                    } else {
                        toast({
                            description: t(r.message),
                            duration: 1500
                        })
                    }
                })
            } else {
                toast({
                    description: t(res.message),
                    duration: 1500
                })
            }
        })
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
    // 复制到剪贴板
    const copyToClipboards = async (text: string) => {
        const success = await copyToClipboard(text);
        if (success) {
            toast({
                description: t('copied'),
                duration: 1500
            });
        } else {
            toast({
                title: t('tip'),
                description: t('copyFailed'),
                duration: 1500
            });
        }
    }

    // 申请仲裁
    const requestArbitration = () => {
        setIsArbitrationDialogOpen(true)
    }

    // 处理图片上传
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target?.files
        if (!files) return

        const filesArray = Array.from(files)

        // 检查是否超过 3 张
        if (uploadedImages.length + filesArray.length > 3) {
            toast({
                description: "最多只能上传3张图片",
                duration: 1500,
            })
            return
        }

        try {
            const uploadedUrls: string[] = []

            for (const file of filesArray) {
                const res = await uploadFile(file)
                if (res.code == 0 && res.data?.url) {
                    uploadedUrls.push(res.data.url)
                } else {
                    toast({
                        description: t(res.message),
                        duration: 1500,
                    })
                }
            }

            setUploadedImages((prev) => [...prev, ...uploadedUrls])
            console.log(uploadedImages, 'images')
        } catch (error: any) {
            toast({
                description: error.message || "上传异常",
                duration: 1500,
            })
        }
    }
    // 删除图片
    const removeImage = (index: number) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index))
    }

    // 提交申诉
    const submitArbitration = async () => {
        if (!arbitrationContent.trim()) {
            toast({
                description: t('pleaseEnterAppealContent'),
                variant: "destructive",
                duration: 1500
            })
            return
        }

        setIsSubmittingArbitration(true)
        const res = await arbitrationRecordAdd({
            "transactionsId": order.transactionsId,
            "initiatorId": order.userIdBuy,
            "respondentId": order.userIdSell,
            "arbitrationDetails": arbitrationContent,
            "arbitrationImg": JSON.stringify(uploadedImages),
        })
        if (res.code == 0) {
            setIsArbitrationDialogOpen(false)
            setArbitrationContent("")
            setUploadedImages([])
            toast({
                description: t('appealSubmitted'),
                duration: 1500
            })
            router.back()
        } else {
            toast({
                description: t(res.message),
                variant: "destructive",
                duration: 1500
            })
        }
    }
    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <header
                    className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="container flex items-center h-14 px-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5"/>
                        </Button>
                        <h1 className="font-bold text-lg ml-2">{t('orderDetail')}</h1>
                    </div>
                </header>
                <main className="flex-1 container px-4 py-4 flex items-center justify-center">
                    <p className="text-muted-foreground">{t('loading')}</p>
                </main>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <header
                    className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="container flex items-center h-14 px-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5"/>
                        </Button>
                        <h1 className="font-bold text-lg ml-2">{t('orderDetail')}</h1>
                    </div>
                </header>
                <main className="flex-1 container px-4 py-4 flex items-center justify-center">
                    <p className="text-muted-foreground">{t('orderNotExist')}</p>
                </main>
            </div>
        )
    }

    return (
        <SimpleTransition>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <header
                    className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="container flex items-center h-14 px-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5"/>
                        </Button>
                        <h1 className="font-bold text-lg ml-2">{t('orderDetail')}</h1>
                    </div>
                </header>

                <main className="flex-1 container px-4 py-4 space-y-4">
                    {/* 订单状态 */}
                    <div className="bg-amber-500/10 text-amber-500 p-4 rounded-lg flex items-center gap-2">
                        <AlertCircle className="h-5 w-5"/>
                        <div>
                            <p className="font-medium">{t('pendingPayment')}</p>
                            <p className="text-sm">{t('pleaseIn')} {timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')} {t('completePayment')}</p>
                        </div>
                    </div>

                    {/* 订单信息 */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('orderInfo')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <div className="text-sm text-muted-foreground">{t('orderNumber')}: {order.orderId}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">{t('createdTime')}</p>
                                    <p>{order.createdAt}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{t('unitPrice')}</p>
                                    <p className="font-medium">{order.price}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{t('amount')}</p>
                                    <p>{order.amount}</p>
                                </div>
                                <div className="">
                                    <p className="text-sm text-muted-foreground">{t('totalAmount')}</p>
                                    <p className="text-lg font-bold text-primary">{order.total}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 支付方式 */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('paymentMethod')}</CardTitle>
                            <CardDescription>{t('pleaseUseAnyPaymentMethod')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            { order.paymentMethods && order.paymentMethods.length ? order.paymentMethods
                                .map(method => (
                                    <div key={method.id} className="border rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-medium">{method.name}</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-muted-foreground">{t('account')}</p>
                                                <div className="flex items-center gap-1">
                                                    <p>{method.type == 'E_WALLET' ?
                                                        method.details.account : method.type == 'CRYPTO' ?
                                                            method.details.address : method.details.cardNumber}</p>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6"
                                                            onClick={() => copyToClipboards(method.type == 'E_WALLET' ?
                                                                method.details.account : method.type == 'CRYPTO' ?
                                                                    method.details.address : method.details.cardNumber)}>
                                                        <Copy className="h-4 w-4"/>
                                                    </Button>
                                                </div>
                                            </div>
                                            {/* 显示开户行信息 */}
                                            {method.type == 'BANK_CARD' && (
                                                <div className="flex justify-between items-center">
                                                    <p className="text-sm text-muted-foreground">{t('bankName')}</p>
                                                    <p>{method.name}</p>
                                                </div>
                                            )}
                                            {method.type == 'CRYPTO' && (
                                                <div className="flex justify-between items-center">
                                                    <p className="text-sm text-muted-foreground">{t('address')}</p>
                                                    <p>{method.details.address}</p>
                                                </div>
                                            )}

                                            {/* 显示支付宝收款码 */}
                                            {method.details.qrCodeUrl && (
                                                <div className="mt-3">
                                                    <p className="text-sm text-muted-foreground mb-2">{t('paymentQrCode')}</p>
                                                    <div className="flex justify-center">
                                                        <img className="w-32 h-32" src={method.details.qrCodeUrl}
                                                             alt="二维码"/>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )) : ''
                            }
                        </CardContent>
                    </Card>

                    {/* 联系方式 */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('contactInfo')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {
                                order.contactMethods && order.contactMethods.length ? order.contactMethods.map((item) => (
                                    <div key={item.id}>
                                        <p>({formatcontactMethods(item.type)}){item.value}</p>
                                    </div>
                                )) : ''
                            }
                        </CardContent>
                    </Card>

                    {/* 操作按钮 */}
                    <div className="space-y-2 pt-4">
                        {!paymentConfirmed ? (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="w-full">
                                        <CheckCircle className="h-4 w-4 mr-2"/>
                                        {t('paymentCompleted')}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>{t('confirmPayOrderTitle')}</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            {t('confirmPayOrderContent')}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                        <AlertDialogAction onClick={confirmPayment}>
                                            {t('confirm')}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        ) : (
                            <Button className="w-full" variant="outline" disabled>
                                <CheckCircle className="h-4 w-4 mr-2"/>
                                {t('paymentConfirmed')}
                            </Button>
                        )}
                        {/* 申请仲裁对话框 */}
                        {/*{!timeLeft.minutes ? (*/}
                        {/*    <Dialog open={isArbitrationDialogOpen} onOpenChange={setIsArbitrationDialogOpen}>*/}
                        {/*        <DialogTrigger asChild>*/}
                        {/*            <Button variant="outline" className="flex-1 w-full" onClick={requestArbitration}>*/}
                        {/*                <ShieldCheck className="h-4 w-4 mr-2"/>*/}
                        {/*                {t('applyArbitration')}*/}
                        {/*            </Button>*/}
                        {/*        </DialogTrigger>*/}
                        {/*        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">*/}
                        {/*            <DialogHeader>*/}
                        {/*                <DialogTitle>{t('applyArbitration')}</DialogTitle>*/}
                        {/*                <DialogDescription>*/}
                        {/*                    {t('describeProblemWithEvidence')}*/}
                        {/*                </DialogDescription>*/}
                        {/*            </DialogHeader>*/}

                        {/*            <div className="space-y-4 py-4">*/}
                        {/*                /!* 申诉内容 *!/*/}
                        {/*                <div className="space-y-2">*/}
                        {/*                    <Label htmlFor="arbitration-content">{t('appealContent')} *</Label>*/}
                        {/*                    <Textarea*/}
                        {/*                        id="arbitration-content"*/}
                        {/*                        placeholder={t('describeProblemInDetail')}*/}
                        {/*                        value={arbitrationContent}*/}
                        {/*                        onChange={(e) => setArbitrationContent(e.target.value)}*/}
                        {/*                        className="min-h-[120px]"*/}
                        {/*                    />*/}
                        {/*                </div>*/}

                        {/*                /!* 上传截图 *!/*/}
                        {/*                <div className="space-y-2">*/}
                        {/*                    <Label>{t('uploadScreenshotProof')}</Label>*/}
                        {/*                    <div className="space-y-2">*/}
                        {/*                        /!* 已上传的图片预览 *!/*/}
                        {/*                        {uploadedImages.length > 0 && (*/}
                        {/*                            <div className="grid grid-cols-3 gap-2">*/}
                        {/*                                {uploadedImages.map((file, index) => (*/}
                        {/*                                    <div key={index} className="relative">*/}
                        {/*                                        <img*/}
                        {/*                                            src={file}*/}
                        {/*                                            alt={`Uploaded ${index}`}*/}
                        {/*                                            className="w-full h-20 object-cover rounded-lg border"*/}
                        {/*                                        />*/}
                        {/*                                        <Button*/}
                        {/*                                            variant="destructive"*/}
                        {/*                                            size="icon"*/}
                        {/*                                            className="absolute -top-2 -right-2 h-6 w-6"*/}
                        {/*                                            onClick={() => removeImage(index)}*/}
                        {/*                                        >*/}
                        {/*                                            <X className="h-3 w-3"/>*/}
                        {/*                                        </Button>*/}
                        {/*                                    </div>*/}
                        {/*                                ))}*/}
                        {/*                            </div>*/}
                        {/*                        )}*/}

                        {/*                        /!* 上传按钮 *!/*/}
                        {/*                        {uploadedImages.length < 9 && (*/}
                        {/*                            <div className="relative">*/}
                        {/*                                <input*/}
                        {/*                                    type="file"*/}
                        {/*                                    accept="image/*"*/}
                        {/*                                    multiple*/}
                        {/*                                    onChange={handleImageUpload}*/}
                        {/*                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"*/}
                        {/*                                />*/}
                        {/*                                <div*/}
                        {/*                                    className="w-full h-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">*/}
                        {/*                                    <Upload className="h-5 w-5 text-gray-400 mb-1"/>*/}
                        {/*                                    <span className="text-xs text-gray-500">*/}
                        {/*        {t('clickToUploadImage')} ({uploadedImages.length}/3)*/}
                        {/*      </span>*/}
                        {/*                                </div>*/}
                        {/*                            </div>*/}
                        {/*                        )}*/}
                        {/*                    </div>*/}
                        {/*                    <p className="text-xs text-muted-foreground">*/}
                        {/*                        {t('uploadImageTip')}*/}
                        {/*                    </p>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}

                        {/*            /!* 提交按钮 *!/*/}
                        {/*            <div className="flex gap-2">*/}
                        {/*                <Button*/}
                        {/*                    variant="outline"*/}
                        {/*                    className="flex-1"*/}
                        {/*                    onClick={() => setIsArbitrationDialogOpen(false)}*/}
                        {/*                    disabled={isSubmittingArbitration}*/}
                        {/*                >*/}
                        {/*                    {t('cancel')}*/}
                        {/*                </Button>*/}
                        {/*                <Button*/}
                        {/*                    className="flex-1"*/}
                        {/*                    onClick={submitArbitration}*/}
                        {/*                >*/}
                        {/*                    {t('submitAppeal')}*/}
                        {/*                </Button>*/}
                        {/*            </div>*/}
                        {/*        </DialogContent>*/}
                        {/*    </Dialog>*/}
                        {/*) : (*/}
                        {/*    <></>*/}
                        {/*)}*/}

                        <div className="flex gap-2">
                            <Button variant="outline" className="flex-1" onClick={() => router.back()}>
                                {t('back')}
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </SimpleTransition>
    )
}


