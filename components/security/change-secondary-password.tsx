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
import {changeUserTwoPassWordUpd} from "@/lib/api";


export function ChangeSecondaryPassword() {
    const {toast} = useToast()
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {t} = useLanguage()
    const formSchema = z.object({
        currentPassword: z.string().min(1, t('enterCurrentPassword')),
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
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",

        },
    })

    // 提交表单
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await changeUserTwoPassWordUpd(
            form.getValues("currentPassword"),
            form.getValues("newPassword"),
            form.getValues("confirmPassword")
        )
        if (result.code == 0) {
            toast({
                title: t('passwordUpdateSuccess'),
                description: t('secondPasswordUpdateSuccess'),
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
                    name="currentPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{t('currentSecondPassword')}</FormLabel>
                            <div className="relative">
                                <FormControl>
                                    <Input
                                        type={showCurrentPassword ? "text" : "password"}
                                        placeholder={t('enterCurrentSecondPassword')}
                                        {...field}
                                    />
                                </FormControl>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
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
                    {t('confirmUpdate')}
                </Button>
            </form>
        </Form>
    )
}