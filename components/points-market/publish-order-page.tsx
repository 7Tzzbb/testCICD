"use client"

import type React from "react"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {Checkbox} from "@/components/ui/checkbox"
import {cn} from "@/lib/utils"
import {useRouter} from "next/navigation"
import {useToast} from "@/hooks/use-toast"
import {useLanguage} from "@/lib/i18n/language-context"

const formSchema = z.object({
    orderType: z.enum(["buy", "sell"]),
    pointsType: z.string().min(2, {
        message: "Points type must be at least 2 characters.",
    }),
    quantity: z.number().min(1, {
        message: "Quantity must be at least 1.",
    }),
    price: z.number().min(0.01, {
        message: "Price must be at least 0.01.",
    }),
    description: z.string().optional(),
    negotiable: z.boolean().default(false),
    expiration: z.string(),
})

export default function PublishOrderPage() {
    const router = useRouter()
    const {toast} = useToast()
    const {t} = useLanguage()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            orderType: "buy",
            pointsType: "",
            quantity: 1,
            price: 0.01,
            description: "",
            negotiable: false,
            expiration: "1 day",
        },
    })

    const isSubmitting = form.formState.isSubmitting

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 font-mono text-white">
          <code className="break-words">{JSON.stringify(values, null, 2)}</code>
        </pre>
            ),
            duration: 1500
        })
    }

    const handleSubmit = form.handleSubmit(onSubmit)

    return (
        <div>
            <div className="flex items-center">
                <Button variant="ghost" onClick={() => router.back()}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                </Button>
                <h1 className="font-bold text-lg ml-2">{t("publishOrder")}</h1>
            </div>
            <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle>{t("publishNewOrder")}</CardTitle>
                    <CardDescription>填写以下信息发布您的积分交易订单</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="orderType"
                                render={({field}) => (
                                    <FormItem className="space-y-0.5">
                                        <FormLabel>{t("orderType")}</FormLabel>
                                        <div className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    id="buy"
                                                    checked={field.value === "buy"}
                                                    onCheckedChange={(checked) => field.onChange(checked ? "buy" : "sell")}
                                                />
                                            </FormControl>
                                            <Label htmlFor="buy" className="cursor-pointer">
                                                {t("buyOrder")}
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    id="sell"
                                                    checked={field.value === "sell"}
                                                    onCheckedChange={(checked) => field.onChange(checked ? "sell" : "buy")}
                                                />
                                            </FormControl>
                                            <Label htmlFor="sell" className="cursor-pointer">
                                                {t("sellOrder")}
                                            </Label>
                                        </div>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pointsType"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="points-type">{t("pointsType")}</FormLabel>
                                        <FormControl>
                                            <Input id="points-type" placeholder="例如：移动积分" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="quantity">{t("pointsQuantity")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="quantity"
                                                type="number"
                                                placeholder="例如：100"
                                                {...field}
                                                onChange={(e) => {
                                                    const value = Number.parseInt(e.target.value)
                                                    field.onChange(isNaN(value) ? 0 : value)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="price">{t("unitPrice")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="price"
                                                type="number"
                                                placeholder="例如：0.01"
                                                {...field}
                                                onChange={(e) => {
                                                    const value = Number.parseFloat(e.target.value)
                                                    field.onChange(isNaN(value) ? 0 : value)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center justify-between">
                                <span>{t("totalAmount")}</span>
                                <span>{form.watch("quantity") * form.watch("price")} </span>
                            </div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="description">{t("orderDescription")} (选填)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                id="description"
                                                placeholder="例如：积分有效期至2023年12月31日"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="negotiable"
                                render={({field}) => (
                                    <FormItem
                                        className="flex flex-row items-center justify-between rounded-md border px-3 py-2">
                                        <div className="space-y-0.5">
                                            <FormLabel htmlFor="negotiable">{t("negotiable")}</FormLabel>
                                            <FormDescription>允许买家与您协商价格</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="expiration"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel htmlFor="expiration">{t("expiration")}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="选择有效期"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1 day">1 天</SelectItem>
                                                <SelectItem value="3 days">3 天</SelectItem>
                                                <SelectItem value="7 days">7 天</SelectItem>
                                                <SelectItem value="14 days">14 天</SelectItem>
                                                <SelectItem value="30 days">30 天</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => router.back()}>
                                    {t("cancel")}
                                </Button>
                                <Button onClick={handleSubmit} disabled={isSubmitting}>
                                    {isSubmitting ? "发布中..." : t("publishOrder")}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
const FormDescription = ({className, ...props}: React.HTMLAttributes<HTMLParagraphElement>) => {
    return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}
const Label = ({className, ...props}: React.HTMLAttributes<HTMLLabelElement>) => {
    return (
        <label
            className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                className,
            )}
            {...props}
        />
    )
}
