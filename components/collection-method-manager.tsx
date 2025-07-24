"use client"

import {useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose} from "@/components/ui/dialog"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Plus, Trash2, Edit, Upload} from "lucide-react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {useToast} from "@/hooks/use-toast"
import {getPaymentMethodList, PaymentMethodDelete, PaymentMethodAdd, PaymentMethodUpdate, uploadFile} from "@/lib/api"
import {API_BASE_URL} from "@/lib/config"
import {useLanguage} from "@/lib/i18n/language-context";
// 定义收款方式类型
type PaymentMethodType = "BANK_CARD" | "E_WALLET" | "CRYPTO"

// 银行卡类型
type BankCardType = "UNION_PAY" | "VISA" | "MASTERCARD" | "JCB" | "AE"

// 电子钱包类型
type EWalletType = "WECHAT" | "ALIPAY" | "PAYPAL" | "APPLE_PAY" | "GOOGLE_PAY" | "SAMSUNG_PAY" | "STRIPE"

// 加密货币类型
type CryptoType = "USDT" | "USDC"

// 加密货币网络
type CryptoNetwork = "ETH" | "BSC" | "TRON" | "SOL" | "POL"

// 银行卡详情
interface BankCardDetails {
    payType: BankCardType
    cardNumber: string
    accountName: string
    bankName: string
    swiftCode?: string
    abaIbanCic?: string
}

// 电子钱包详情
interface EWalletDetails {
    payType: EWalletType
    account: string
    qrCodeUrl?: string
}

// 加密货币详情
interface CryptoDetails {
    payType: CryptoType
    network: CryptoNetwork
    address: string
}


export function CollectionMethodManager() {
    // 收款方式列表状态
    const [paymentMethods, setPaymentMethods] = useState([])
    const {toast} = useToast()

    // 当前编辑的收款方式ID
    const [editingId, setEditingId] = useState<string | null>(null)
    const {t} = useLanguage()
    // 对话框开关状态
    const [dialogOpen, setDialogOpen] = useState(false)

    // 当前选择的收款方式类型
    const [methodType, setMethodType] = useState<PaymentMethodType>("BANK_CARD")
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
// 表单验证模式
    const bankCardSchema = z.object({
        type: z.string(),
        payType: z.string(),
        cardNumber: z.string().min(1, t('enterCardNumber')),
        accountName: z.string().min(1, t('enterAccountHolder')),
        bankName: z.string().min(1, t('enterBankName')),
        swiftCode: z.string().optional(),
        abaIbanCic: z.string().optional(),
    })

    const eWalletSchema = z.object({
        type: z.string(),
        payType: z.string(),
        account: z.string().min(1, t('enterAccount')),
        qrCodeUrl: z.string().optional(),
    })

    const cryptoSchema = z.object({
        type: z.string(),
        payType: z.string(),
        network: z.string(),
        address: z.string().min(1, t('enterWalletAddress')),
    })
    // 银行卡表单
    const bankCardForm = useForm<z.infer<typeof bankCardSchema>>({
        resolver: zodResolver(bankCardSchema),
        defaultValues: {
            type: "BANK_CARD",
            payType: "UNION_PAY",
            cardNumber: "",
            accountName: "",
            bankName: "",
            swiftCode: "",
            abaIbanCic: "",
        },
    })

    // 电子钱包表单
    const eWalletForm = useForm<z.infer<typeof eWalletSchema>>({
        resolver: zodResolver(eWalletSchema),
        defaultValues: {
            type: "E_WALLET",
            payType: "WECHAT",
            account: "",
            qrCodeUrl: "",
        },
    })

    // 加密货币表单
    const cryptoForm = useForm<z.infer<typeof cryptoSchema>>({
        resolver: zodResolver(cryptoSchema),
        defaultValues: {
            type: "CRYPTO",
            payType: "USDT",
            network: "ETH",
            address: "",
        },
    })
    // 初始化
    useEffect(() => {
        getCollectionMethodList()
    }, [])

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
    // 重置所有表单
    const resetForms = () => {
        bankCardForm.reset()
        eWalletForm.reset()
        cryptoForm.reset()
        setEditingId(null)
    }

    // 打开添加对话框
    const openAddDialog = () => {
        resetForms()
        setDialogOpen(true)
    }

    // 打开编辑对话框
    const openEditDialog = (method: any) => {
        setEditingId(method.id)
        setMethodType(method.type)
        // 根据类型填充表单
        if (method.type === "BANK_CARD") {
            const details = JSON.parse(method.details) as BankCardDetails
            console.log(details, 'details', bankCardForm)
            bankCardForm.reset(details)
        } else if (method.type === "E_WALLET") {
            const details = JSON.parse(method.details) as EWalletDetails
            eWalletForm.reset(details)
        } else if (method.type === "CRYPTO") {
            const details = JSON.parse(method.details) as CryptoDetails
            cryptoForm.reset(details)
        }

        setDialogOpen(true)
    }

    // 保存收款方式
    const savePaymentMethod = async () => {
        let details: any = {};
        let formIsValid = false;
        console.log(bankCardForm, 'bankCardForm')
        if (methodType === "BANK_CARD") {
            formIsValid = await bankCardForm.trigger(['cardNumber', 'accountName', 'bankName']); // 触发验证
            if (formIsValid) {
                details = bankCardForm.getValues(); // 如果验证通过，获取表单值
            }
        } else if (methodType === "E_WALLET") {
            formIsValid = await eWalletForm.trigger(['account', 'qrCodeUrl']);
            if (formIsValid) {
                details = eWalletForm.getValues();
            }
        } else if (methodType === "CRYPTO") {
            formIsValid = await cryptoForm.trigger(['address']);
            if (formIsValid) {
                details = cryptoForm.getValues();
            }
        }

        if (!formIsValid) {
            console.log('表单验证未通过，停止保存操作。');
            return;
        }
        details.type = methodType
        // 创建新的收款方式对象
        const newMethod = {
            id: editingId || `method-${Date.now()}`,
            type: methodType,
            name: getMethodName(methodType, details),
            details,
        }

        // 更新或添加收款方式
        if (editingId) {
            console.log('调用 updatePaymentMethod，传入参数:', newMethod);
            PaymentMethodUpdate(newMethod, newMethod.id).then(r => {
                if (r.code == 0) {
                    getCollectionMethodList()
                    toast({
                        description: t('updateSuccess'),
                        duration: 1500,
                    })
                    setDialogOpen(false);
                    resetForms();
                } else {
                    toast({
                        description: t(r.message),
                        variant: "destructive",
                        duration: 1500
                    })
                }
            }).catch(error => {
                console.error('更新收款方式失败:', error);
                // 这里可以添加错误提示
            });
        } else {
            const r = await PaymentMethodAdd({
                name: newMethod.name,
                type: newMethod.type,
                details: newMethod.details,
            })
            if (r.code == 0) {
                getCollectionMethodList()
                setDialogOpen(false);
                resetForms();
                toast({
                    description: t('addSuccess'),
                    duration: 1500
                })
            } else {
                toast({
                    description: t(r.message),
                    variant: "destructive",
                    duration: 1500
                })
            }
        }
    }
    const confirmDeletePaymentMethod = async (id: string) => {
        const r = await PaymentMethodDelete(id)
        if (r.code == 0) {
            getCollectionMethodList()
            toast({
                description: t('deleteSuccess'),
                duration: 1500
            })
        } else {
            toast({
                description: t(r.message),
                variant: "destructive",
                duration: 1500
            })
        }
    }

    // 获取收款方式名称
    const getMethodName = (type: PaymentMethodType, details: any): string => {
        if (type === "BANK_CARD") {
            const cardTypes: Record<BankCardType, string> = {
                UNION_PAY: t('bankUnionPay'),
                VISA: "Visa",
                MASTERCARD: "Mastercard",
                JCB: "JCB",
                AE: "American Express",
            }
            return `${cardTypes[details.payType as BankCardType]} - ${details.cardNumber.slice(-4)}`
        } else if (type === "E_WALLET") {
            const walletTypes: Record<EWalletType, string> = {
                WECHAT: t('bankWeChat'),
                ALIPAY: t('bankAlipay'),
                PAYPAL: "PayPal",
                APPLE_PAY: "Apple Pay",
                GOOGLE_PAY: "Google Pay",
                SAMSUNG_PAY: "Samsung Pay",
                STRIPE: "Stripe",
            }
            return `${walletTypes[details.payType as EWalletType]} - ${details.account}`
        } else {
            return `${details.payType} (${details.network}) - ${details.address.slice(0, 6)}...${details.address.slice(-4)}`
        }
    }
    // 文件上传处理
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const res = await uploadFile(file)
            if (res.code == 0 && res.data?.url) {
                eWalletForm.setValue("qrCodeUrl", res.data.url)
                // uploadedUrls.push(res.data.url)
            } else {
                toast({
                    description: t(res.message),
                    duration: 1500,
                })
            }
        }
    }

    return (
        <div className="space-y-4">
            <Accordion type="single" collapsible defaultValue="payment-methods" className="w-full">
                <AccordionItem value="payment-methods">
                    <AccordionTrigger className="text-base font-medium">
                        {t('addedPaymentMethods')} ({paymentMethods.length})
                    </AccordionTrigger>
                    <AccordionContent>
                        {paymentMethods.length > 0 ? (
                            <div className="space-y-1">
                                {paymentMethods.map((method) => (
                                    <div key={method.id}
                                         className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md touch-manipulation">
                                        <div>
                                            <p className="font-medium">{method.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {method.type === "BANK_CARD" ? t('bankCard') :
                                                    method.type === "CRYPTO" ? t('cryptoCurrency') : t('eWallet')}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button variant="outline" size="sm" onClick={() => openEditDialog(method)}>
                                                <Edit className="h-4 w-4 mr-1"/>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm">
                                                        <Trash2 className="h-4 w-4 mr-1"/>
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>{t('confirmDeletePaymentMethod')}</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            {t('irreversibleDeletePaymentMethod')}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => confirmDeletePaymentMethod(method.id)}>
                                                            {t('delete')}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-2">{t('noPaymentMethod')}</p>
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Button className="w-full h-12 touch-manipulation" onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2"/>
                {t('addPaymentMethod')}
            </Button>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-md">
                    <DialogHeader>
                        <DialogTitle>{editingId ? t('editPaymentMethod') : t('addPaymentMethod')}</DialogTitle>
                    </DialogHeader>

                    <Tabs value={methodType} onValueChange={(v) => setMethodType(v as PaymentMethodType)}>
                        <TabsList className="grid grid-cols-3">
                            <TabsTrigger value="BANK_CARD">{t('bankCard')}</TabsTrigger>
                            <TabsTrigger value="E_WALLET">{t('eWallet')}</TabsTrigger>
                            <TabsTrigger value="CRYPTO">{t('cryptoCurrency')}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="BANK_CARD" className="space-y-4 mt-2">
                            <Form {...bankCardForm}>
                                <FormField
                                    control={bankCardForm.control}
                                    name="payType"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('cardType')}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 rounded-md touch-manipulation">
                                                        <SelectValue placeholder={t('selectCardType')}/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-md">
                                                    <SelectItem value="UNION_PAY">{t('bankUnionPay')}</SelectItem>
                                                    <SelectItem value="VISA">Visa</SelectItem>
                                                    <SelectItem value="MASTERCARD">Mastercard</SelectItem>
                                                    <SelectItem value="JCB">JCB</SelectItem>
                                                    <SelectItem value="AE">American Express</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={bankCardForm.control}
                                    name="cardNumber"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('cardNumber')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('enterCardNumber')}
                                                       className="h-12 rounded-md touch-manipulation" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={bankCardForm.control}
                                    name="accountName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('accountHolder')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('enterAccountHolder')}
                                                       className="h-12 rounded-md touch-manipulation" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={bankCardForm.control}
                                    name="bankName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('bankName')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('enterBankName')}
                                                       className="h-12 rounded-md touch-manipulation" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={bankCardForm.control}
                                    name="swiftCode"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('swiftCodeOptional')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('enterSwiftCode')}
                                                       className="h-12 rounded-md touch-manipulation" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={bankCardForm.control}
                                    name="abaIbanCic"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('ibanOptional')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('enterIban')}
                                                       className="h-12 rounded-md touch-manipulation" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </Form>
                        </TabsContent>

                        <TabsContent value="E_WALLET" className="space-y-4 mt-2">
                            <Form {...eWalletForm}>
                                <FormField
                                    control={eWalletForm.control}
                                    name="payType"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('walletType')}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 rounded-md touch-manipulation">
                                                        <SelectValue placeholder={t('selectWalletType')}/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-md">
                                                    <SelectItem value="WECHAT">{t('bankWeChat')}</SelectItem>
                                                    <SelectItem value="ALIPAY">{t('bankAlipay')}</SelectItem>
                                                    <SelectItem value="PAYPAL">PayPal</SelectItem>
                                                    <SelectItem value="APPLE_PAY">Apple Pay</SelectItem>
                                                    <SelectItem value="GOOGLE_PAY">Google Pay</SelectItem>
                                                    <SelectItem value="SAMSUNG_PAY">Samsung Pay</SelectItem>
                                                    <SelectItem value="STRIPE">Stripe</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={eWalletForm.control}
                                    name="account"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('account')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('enterAccount')}
                                                       className="h-12 rounded-md touch-manipulation" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={eWalletForm.control}
                                    name="qrCodeUrl"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('uploadPaymentCode')}</FormLabel>
                                            <div className="mt-2">
                                                {field.value ? (
                                                    <div className="relative w-full">
                                                        <img src={field.value} alt={t('paymentQrCode')}
                                                             onClick={() => setPreviewUrl(field.value)}
                                                             className="w-full h-40 object-cover rounded-lg border"/>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                                                            onClick={() => eWalletForm.setValue("qrCodeUrl", "")}
                                                        >
                                                            <Trash2 className="h-4 w-4"/>
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors min-h-[120px] touch-manipulation"
                                                        onClick={() => document.getElementById('qrcode-upload')?.click()}
                                                    >
                                                        <Plus className="h-10 w-10 text-gray-400 mb-2"/>
                                                        <p className="text-center text-gray-500">{t('clickToUploadQrCode')}</p>
                                                        <p className="text-center text-gray-400 text-sm mt-1">{t('imageFormatTip')}</p>
                                                    </div>
                                                )}
                                                <input
                                                    id="qrcode-upload"
                                                    type="file"
                                                    accept="image/jpeg,image/png"
                                                    className="hidden"
                                                    onChange={handleFileUpload}
                                                />
                                            </div>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </Form>
                        </TabsContent>

                        <TabsContent value="CRYPTO" className="space-y-4 mt-2">
                            <Form {...cryptoForm}>
                                <FormField
                                    control={cryptoForm.control}
                                    name="payType"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('currencyType')}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 rounded-md touch-manipulation">
                                                        <SelectValue placeholder={t('selectCurrencyType')}/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-md">
                                                    <SelectItem value="USDT">USDT</SelectItem>
                                                    <SelectItem value="USDC">USDC</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={cryptoForm.control}
                                    name="network"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('mainnet')}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 rounded-md touch-manipulation">
                                                        <SelectValue placeholder={t('selectMainnet')}/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-md">
                                                    <SelectItem value="ETH">ETH</SelectItem>
                                                    <SelectItem value="BSC">BSC</SelectItem>
                                                    <SelectItem value="TRON">TRON</SelectItem>
                                                    <SelectItem value="SOL">SOL</SelectItem>
                                                    <SelectItem value="POL">POL</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={cryptoForm.control}
                                    name="address"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('walletAddress')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('enterWalletAddress')}
                                                       className="h-12 rounded-md touch-manipulation" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </Form>
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-end space-x-2 mt-2">
                        <DialogClose asChild>
                            <Button variant="outline" className="flex-1 h-12 rounded-md touch-manipulation">
                                {t('cancel')}
                            </Button>
                        </DialogClose>
                        <Button onClick={savePaymentMethod} className="flex-1 h-12 rounded-md touch-manipulation">
                            {editingId ? t('save') : t('add')}</Button>
                    </div>
                </DialogContent>
            </Dialog>
            {/*预览*/}
            <Dialog open={!!previewUrl} onOpenChange={() => setPreviewUrl(null)}>
                <DialogContent className="max-w-md p-0">
                    {previewUrl && (
                        <img
                            onClick={() => setPreviewUrl(null)}
                            src={previewUrl}
                            alt="preview"
                            className="w-full h-auto rounded"
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}