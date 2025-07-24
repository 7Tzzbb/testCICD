"use client"

import {useState} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {useToast} from "@/hooks/use-toast"
import {sendSmsCode, verifySmsCode} from "@/lib/api"
import {useLanguage} from "@/lib/i18n/language-context";

interface BindEmailProps {
    onSuccess: () => void
}

export function BindEmail({onSuccess}: BindEmailProps) {
    const [isSendingCode, setIsSendingCode] = useState(false)
    const [countdown, setCountdown] = useState(0)
    const {toast} = useToast()

    const {t} = useLanguage()

    const formSchema = z.object({
        email: z.string().email(t('invalidEmail')),
        verificationCode: z.string().min(4, t('codeMinLength')).max(6, t('codeMaxLength')),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            verificationCode: "",
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
            flag: true
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
        const res = await verifySmsCode({
            email: values.email,
            code: values.verificationCode,
        })
        if (res.code == 0) {
            toast({
                title: t('bindSuccess'),
                description: t('secureEmailBindSuccess'),
                duration: 1500
            })
            onSuccess()
        } else {
            toast({
                title: t('bindFailed'),
                description: t(res.message),
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
                            <FormLabel>{t('emailAddress')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('enterEmailAddress')} {...field} />
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
                                    className="whitespace-nowrap h-12"
                                >
                                    {isSendingCode ? t('sending') : countdown > 0 ? `${countdown}${t('retryInSeconds')}` : t('getCode')}
                                </Button>
                            </div>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    {t('bindSecureEmail')}
                </Button>
            </form>
        </Form>
    )
}