"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

import { Eye, EyeOff } from "lucide-react"
import { setLevel2Password } from "@/lib/api"
import {useLanguage} from "@/lib/i18n/language-context";

interface SetSecondaryPasswordProps {
  onSuccess: () => void
}


export function SetSecondaryPassword({ onSuccess }: SetSecondaryPasswordProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {toast} = useToast()

  const {t} = useLanguage()

  const formSchema = z.object({
    password: z.string()
        .min(6, t('passwordTooShort'))
        .max(20, t('passwordTooLong'))
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/, t('passwordComplexity')),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('passwordMismatch'),
    path: ["confirmPassword"],
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  // 提交表单
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await setLevel2Password({
      pwdOne:values.password,
      pwdTwo: values.confirmPassword,
    })
    if (res.code == 0) {
      toast({
        title: t('setupSuccess'),
        description: t('secondPasswordSetupSuccess'),
        duration: 1500
      })
      onSuccess()
    } else {
      toast({
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('setSecondaryPassword')}</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder={t('pleaseSetSecondPassword')}
                    {...field} 
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('confirmSecondPassword')}</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder={t('reenterSecondPassword')}
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
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          {t('confirmSetup')}
        </Button>
      </form>
    </Form>
  )
}