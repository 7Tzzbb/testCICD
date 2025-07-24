import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose} from "@/components/ui/dialog"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {Edit, Trash2, Plus} from "lucide-react"
import {useToast} from "@/hooks/use-toast"
import {getContactMethodList, contactMthodDelete, contactMthodUpdate, contactMthodAdd} from "@/lib/api"
import {useState, useEffect} from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {useLanguage} from "@/lib/i18n/language-context";

// 联系方式类型
type ContactMethodType =
    "SOCIAL"
    | "EMAIL"
    | "MOBILE"
    | "WECHAT"
    | "QQ"
    | "TELEGRAM"
    | "DISCORD"
    | "FACEBOOK"
    | "TWITTER"
    | "LINKEDIN"

// 社交媒体类型
type SocialType = "WECHAT" | "QQ" | "TELEGRAM" | "DISCORD" | "FACEBOOK" | "TWITTER" | "LINKEDIN"

// 联系方式详情接口
interface ContactMethod {
    value: string
    id: string
    type: ContactMethodType
    updatedAt: string
    createdAt: string
    isPrimary: boolean
    isVerified: boolean
}

export function ContactMethodManager() {
    const {t} = useLanguage()

    // 联系方式列表状态
    const [contactMethods, setContactMethods] = useState<ContactMethod[]>([])
    const {toast} = useToast()

    // 对话框状态
    const [dialogOpen, setDialogOpen] = useState(false)
    const [methodType, setMethodType] = useState<ContactMethodType>("MOBILE")
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // 电话号码表单验证
    const mobileFormSchema = z.object({
        // countryCode: z.string().default("+86"),
        value: z.string().min(5, t('phoneMinLength')).max(15, t('phoneMaxLength')),
    })
    // 邮箱表单验证
    const emailFormSchema = z.object({
        value: z.string().email(t('invalidEmail')),
    })

// 社交媒体表单验证
    const socialFormSchema = z.object({
        socialType: z.string(),
        value: z.string().min(2, t('accountMinLength')).max(50, t('accountMaxLength')),
    })

    useEffect(() => {
        contactMethodList()
    }, [])
    // 表单状态
    const mobileForm = useForm<z.infer<typeof mobileFormSchema>>({
        resolver: zodResolver(mobileFormSchema),
        defaultValues: {
            countryCode: "+86",
            value: "",
        },
    })
    // 联系方式列表
    const contactMethodList = async () => {
        setIsLoading(true)
        const result = await getContactMethodList()
        if (result.code == 0) {
            setContactMethods(result.data)
            setIsLoading(false)
        } else {
            setIsLoading(false)
            toast({
                description: t(result.message),
                variant: "destructive",
                duration: 1500
            })
        }
    }
    const emailForm = useForm<z.infer<typeof emailFormSchema>>({
        resolver: zodResolver(emailFormSchema),
        defaultValues: {
            value: "",
        },
    })

    const socialForm = useForm<z.infer<typeof socialFormSchema>>({
        resolver: zodResolver(socialFormSchema),
        defaultValues: {
            socialType: "WECHAT",
            value: "",
        },
    })

    // 重置表单
    const resetForms = () => {
        mobileForm.reset()
        emailForm.reset()
        socialForm.reset()
        setEditingId(null)
    }

    // 打开添加对话框
    const openAddDialog = () => {
        setEditingId(null)
        setMethodType("MOBILE")
        resetForms()
        setDialogOpen(true)
    }


    // 打开编辑对话框
    const openEditDialog = (method: ContactMethod) => {
        resetForms()
        console.log(method, 'method')
        setEditingId(method.id)
        setMethodType(method.type)
        console.log(editingId, 'editingId')
        const socialTypes = [ // 社交媒体
            "SOCIAL",
            "WECHAT",
            "QQ",
            "TELEGRAM",
            "DISCORD",
            "FACEBOOK",
            "TWITTER",
            "LINKEDIN"
        ];
        // 根据类型填充表单
        if (method.type === "MOBILE") {
            setMethodType('MOBILE')
            // 将 string 类型的 value 先转为 unknown 再转为 MobileDetails 类型
            mobileForm.setValue("value", method.value)
            // mobileForm.reset(JSON.parse(method.value as string) as MobileDetails)
        } else if (method.type === "EMAIL") {
            setMethodType('EMAIL')
            emailForm.setValue("value", method.value)
            // emailForm.reset({ value: method.value as string } as EmailDetails)
        } else if (socialTypes.includes(method.type)) {
            setMethodType('SOCIAL')
            socialForm.setValue("value", method.value)
            socialForm.setValue("socialType", method.type)
            // socialForm.reset(JSON.parse(method.value as string) as SocialDetails)
        }
        setDialogOpen(true)
    }

    // 保存联系方式
    const saveContactMethod = async () => {
        let isValid = false
        let values: any = {}
        // 根据类型验证表单
        if (methodType === "MOBILE") {
            values = {
                value: mobileForm.getValues('countryCode') + mobileForm.getValues('value')
            }
            isValid = await mobileForm.trigger('value', values.value);
        } else if (methodType === "EMAIL") {
            values = emailForm.getValues()
            isValid = await emailForm.trigger('value', values.value);
        } else if (methodType === "SOCIAL") {
            values = socialForm.getValues()
            isValid = await socialForm.trigger('value', values.value);
        }
        if (!isValid) return;
        // 获取联系方式名称

        setIsLoading(true)
        try {
            if (editingId) {
                // 更新现有联系方式
                const result = await contactMthodUpdate({
                    isPrimary: false,
                    type: methodType == 'SOCIAL' ?
                        values.socialType
                        : methodType,
                    value: values.value
                }, editingId)
                if (result.code == 0) {
                    setIsLoading(false)
                    contactMethodList()
                    toast({
                        title: t('contactUpdated'),
                        description: t('updateSuccess1'),
                        duration: 1500
                    })
                } else {
                    setIsLoading(false)
                    toast({
                        description: t(result.message),
                        variant: "destructive",
                        duration: 1500
                    })
                }
            } else {
                // 添加新联系方式
                const result = await contactMthodAdd({
                    isPrimary: false,
                    type: methodType == 'SOCIAL' ? values.socialType : methodType,
                    value: values.value
                })
                if (result.code == 0) {
                    setIsLoading(false)
                    contactMethodList()
                    toast({
                        title: t('contactAdded'),
                        description: t('addSuccess1'),
                        duration: 1500
                    })
                } else {
                    toast({
                        description: t(result.message),
                        variant: "destructive",
                        duration: 1500
                    })
                }

            }
            setDialogOpen(false)
            resetForms()
        } catch (error) {
            setIsLoading(false)

            toast({
                title: t('saveContactFailed'),
                description: t('saveErrorRetryLater'),
                variant: "destructive",
                duration: 1500
            })
        } finally {
            setIsLoading(false)
        }
    }

    // 删除联系方式
    const deleteContactMethod = async (id: string) => {
        setIsLoading(true)
        const result = await contactMthodDelete(id)
        if (result.code == 0) {
            contactMethodList()
            setIsLoading(false)
            toast({
                title: t('contactDeleted'),
                description: t('contactDeletedSuccess'),
                duration: 1500
            })
        } else {
            setIsLoading(false)
            toast({
                description: t(result.message),
                variant: "destructive",
                duration: 1500
            })
        }
    }

    return (
        <div className="space-y-4">
            {/* 联系方式列表 */}
            {contactMethods.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                    {contactMethods.map((method) => (
                        <AccordionItem key={method.id} value={method.id}>
                            <AccordionTrigger className="hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-3 rounded-lg">
                                <div className="flex items-center gap-2 text-left">
                  <span className="font-medium">{method.type == 'MOBILE' ? t('phoneNumber')
                      : method.type == 'EMAIL' ? t('email')
                          : t('socialMedia')}-{method.value}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3">
                                <div className="flex justify-end space-x-2">
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
                                                <AlertDialogTitle>{t('confirmDeleteContact')}</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    {t('irreversibleDeleteContact')}
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteContactMethod(method.id)}>
                                                    {t('confirm')}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>{t('noContactInfo')}</p>
                </div>
            )}

            {/* 添加按钮 */}
            <Button onClick={openAddDialog} className="w-full">
                <Plus className="h-4 w-4 mr-2"/>
                {t('addContactInfo')}
            </Button>

            {/* 添加/编辑对话框 */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingId ? t('editContactInfo') : t('addContactInfo')}</DialogTitle>
                    </DialogHeader>

                    <Tabs value={methodType} onValueChange={(value) => {
                        setMethodType(value as ContactMethodType);
                        resetForms();
                    }} className="w-full">
                        <TabsList className="grid grid-cols-3 w-full">
                            <TabsTrigger value="MOBILE">{t('phoneNumbers')}</TabsTrigger>
                            <TabsTrigger value="EMAIL">{t('email')}</TabsTrigger>
                            <TabsTrigger value="SOCIAL">{t('socialMedia')}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="MOBILE" className="space-y-4 mt-4">
                            <Form {...mobileForm}>
                                <FormField
                                    control={mobileForm.control}
                                    name="countryCode"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('countryCode')}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 rounded-md touch-manipulation">
                                                        <SelectValue placeholder={t('selectCountryCode')}/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-md">
                                                    <SelectItem value="+86">+86 {t('countryCN')}</SelectItem>
                                                    <SelectItem value="+1">+1 {t('countryUSCA')}</SelectItem>
                                                    <SelectItem value="+44">+44 {t('countryUK')}</SelectItem>
                                                    <SelectItem value="+81">+81 {t('countryJapan')}</SelectItem>
                                                    <SelectItem value="+82">+82 {t('countryKorea')}</SelectItem>
                                                    <SelectItem value="+65">+65 {t('countrySG')}</SelectItem>
                                                    <SelectItem value="+61">+61 {t('countryAU')}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={mobileForm.control}
                                    name="value"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('phoneNumbers')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('enterPhoneNumber')}
                                                       className="h-12 rounded-md touch-manipulation" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </Form>
                        </TabsContent>

                        <TabsContent value="EMAIL" className="space-y-4 mt-4">
                            <Form {...emailForm}>
                                <FormField
                                    control={emailForm.control}
                                    name="value"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('emailAddress')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('enterEmailAddress')}
                                                       className="h-12 rounded-md touch-manipulation" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </Form>
                        </TabsContent>

                        <TabsContent value="SOCIAL" className="space-y-4 mt-4">
                            <Form {...socialForm}>
                                <FormField
                                    control={socialForm.control}
                                    name="socialType"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('socialType')}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}
                                                    disabled={isLoading}>
                                                <FormControl>
                                                    <SelectTrigger className="h-12 rounded-md touch-manipulation">
                                                        <SelectValue placeholder={t('selectSocialType')}/>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="rounded-md">
                                                    <SelectItem value="WECHAT">{t('bankWeChat')}</SelectItem>
                                                    <SelectItem value="QQ">QQ</SelectItem>
                                                    <SelectItem value="TELEGRAM">Telegram</SelectItem>
                                                    <SelectItem value="DISCORD">Discord</SelectItem>
                                                    <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                                                    <SelectItem value="FACEBOOK">Facebook</SelectItem>
                                                    <SelectItem value="TWITTER">Twitter</SelectItem>
                                                    <SelectItem value="LINKEDIN">LinkedIn</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={socialForm.control}
                                    name="value"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('account')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('enterAccount')}
                                                       className="h-12 rounded-md touch-manipulation" {...field}
                                                       disabled={isLoading}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </Form>
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-end space-x-2 mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="flex-1 h-12 rounded-md touch-manipulation"
                                    disabled={isLoading}>{t('cancel')}</Button>
                        </DialogClose>
                        <Button onClick={saveContactMethod} className="flex-1 h-12 rounded-md touch-manipulation"
                                disabled={isLoading}>{isLoading ? t('saving') : (editingId ? t('save') : t('add'))}</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}