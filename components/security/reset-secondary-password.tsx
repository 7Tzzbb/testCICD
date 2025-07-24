"use client"

import {useState} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useToast} from "@/hooks/use-toast"

import {Eye, EyeOff} from "lucide-react"
import {useLanguage} from "@/lib/i18n/language-context";
import {changePassWordReset, sendSmsCode} from "@/lib/api";


export function ResetSecondaryPassword() {
    const [isSendingCode, setIsSendingCode] = useState(false)
    const [countdown, setCountdown] = useState(0)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {toast} = useToast()
    const {t} = useLanguage()

    const formSchema = z.object({
        email: z.string().email(t('invalidEmail')),
        verificationCode: z.string().min(4, t('codeMinLength')).max(6, t('codeMaxLength')),
        newPassword: z.string()
            .min(6, t('passwordTooShort'))
            .max(20, t('passwordTooLong'))
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/, t('passwordComplexity')),
        confirmPassword: z.string(),
    }).refine((data) => data.newPassword === data.confirmPassword, {
        message: t('passwordMismatch'),
        path: ["confirmPassword"],
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            verificationCode: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    // 发送验证码
    const sendVerificationCode = async () => {
        const email = form.getValues("email")
        if (!email || !email.includes("@")) {
            toast({
                title: t('invalidEmail'),
                variant: "destructive",
                duration: 1500
            })
            return
        }

        setIsSendingCode(true)

        // 模拟发送验证码
        setTimeout(() => {
            setIsSendingCode(false)
            setCountdown(60)

            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            sendEmailCode()
        }, 1500)
    }
    // 获取邮箱验证码
    const sendEmailCode = async () => {
        const res = await sendSmsCode({
            email: form.getValues("email"),
            flag: false
        })
        if (res.code == 0) {
            toast({
                title: t('codeSent'),
                description: `${t('codeSentToEmail')} ${form.getValues("email")}`,
                duration: 1500
            })
        } else {
            toast({
                title: t('codeFailed'),
                description: t(res.message),
                duration: 1500
            })
        }
    }

    // 提交表单
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values, '提交表单')
        const result = await changePassWordReset(
            form.getValues("email"),
            form.getValues("verificationCode"),
            form.getValues("newPassword"),
            form.getValues("confirmPassword"),
        )
        if (result.code == 0) {
            toast({
                title: t('resetSuccess'),
                description: t('secondPasswordResetSuccess'),
                duration: 1500
            })
            form.reset()
        } else {
            toast({
                title: t('tip'),
                description: t(result.message),
                duration: 1500
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('securityEmail')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('enterSecurityEmail')} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="verificationCode"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('verifyCode')}</FormLabel>
                            <div className="flex gap-2">
                                <FormControl>
                                    <Input placeholder={t('enterCode')} {...field} />
                                </FormControl>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={sendVerificationCode}
                                    disabled={isSendingCode || countdown > 0}
                                    className="whitespace-nowrap"
                                >
                                    {isSendingCode ? t('sending') : countdown > 0 ? `${countdown}${t('retryInSeconds')}` : t('getCode')}
                                </Button>
                            </div>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('newSecondPassword')}</FormLabel>
                            <div className="relative">
                                <FormControl>
                                    <Input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder={t('setNewSecondPassword')}
                                        {...field}
                                    />
                                </FormControl>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                </Button>
                            </div>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('confirmNewSecondPassword')}</FormLabel>
                            <div className="relative">
                                <FormControl>
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder={t('reenterNewSecondPassword')}
                                        {...field}
                                    />
                                </FormControl>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                </Button>
                            </div>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    {t('resetPassword')}
                </Button>
            </form>
        </Form>
    )
}