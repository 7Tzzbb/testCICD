"use client"

import {useEffect, useState} from "react"
import {useSearchParams, useRouter} from "next/navigation"
import {useLanguage} from "@/lib/i18n/language-context"
import {Button} from "@/components/ui/button"
import {arbitrationAdd, getOrdersDetailInfo} from "@/lib/api"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {useToast} from "@/hooks/use-toast"
import {ShoppingCart} from "lucide-react"

export function ArbitrateContent() {
    const router = useRouter()
    const {toast} = useToast()
    const {t} = useLanguage()
    const searchParams = useSearchParams()
    const id = searchParams.get('id');
    const [orderDatas, setOrderDatas] = useState([])
    useEffect(() => {
        getOrdersInfos(id)
    }, [])
    const [buyAmount, setBuyAmount] = useState("")

    const calculateTotalPayment = () => {
        if (!buyAmount || !orderDatas?.price) return 0
        return parseFloat(orderDatas.price) * parseFloat(buyAmount)
    }
    const getOrdersInfos = async (id: string) => {
        const res = await getOrdersDetailInfo(id)
        if (res.code == 0) {
            setOrderDatas(res.data)
        } else {
            toast({
                description: t(res.message),
                duration: 1500
            })
        }
    }

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (/^\d*\.?\d*$/.test(value) || value === "") {
            setBuyAmount(value)
        }
    }

    const add = async () => {
        const res = await arbitrationAdd({
            orderId: orderDatas.orderId,
            assetsId: orderDatas.assetsId,
            price: orderDatas.price,
            amount: buyAmount,
            total: orderDatas.total,
            type: orderDatas.type == 1 ? 2 : 1
        })
        if (res.code == 0) {
            toast({
                description: orderDatas.type == "1" ? t('sellSuccess') : t('buySuccess'),
                duration: 1500
            })
            if (orderDatas.type == 2) {
                router.push(`/points-market/order/info?id=${res.data.id}`)
            } else {
                router.back()
            }

        } else {
            toast({
                description: t(res.message),
                duration: 1500
            })
        }
    }

    if (!orderDatas) {
        return <div className="p-4 text-muted-foreground"> {t('dataMissing')}</div>
    }
    return (
        <main className="flex-1 container px-4 py-4 space-y-4">
            <Card className="shadow-lg rounded-lg">
                <CardHeader className="rounded-t-lg">
                    <CardTitle>{t('orderInfo')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">{t('orderNumber')}: {orderDatas.orderId}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground"> {t('createdTime')}</p>
                            <p>{orderDatas.createdAt}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">{t('unitPrice')}</p>
                            <p className="font-medium">￥{orderDatas.price}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">{t('amount')}</p>
                            <p>{orderDatas.amount}</p>
                        </div>
                        <div className="">
                            <p className="text-sm text-muted-foreground">{t('totalAmount')}</p>
                            <p className="text-lg font-bold text-primary">{orderDatas.total}</p>
                        </div>
                        <div className="col-span-2">
                            <h2 className="text-lg font-medium mb-4 flex items-center">
                                <span className="bg-primary/20 text-primary p-1 rounded-md mr-2">
                                  <ShoppingCart className="h-4 w-4"/>
                                </span>
                                {orderDatas.type == 1 ? t('sell') : t('buy')}
                            </h2>

                            <div className="mb-4">
                                <label htmlFor="buy-amount" className="block text-sm font-medium mb-1">
                                    {orderDatas.type == 1 ? t('sell') : t('buy')}{t('amount')}
                                </label>
                                <input
                                    id="buy-amount"
                                    type="number"
                                    placeholder={t('minimumAmount') + orderDatas?.minimumAmount || 0}
                                    value={buyAmount}
                                    onChange={handleAmountChange}
                                    className="bg-primary/5 hover:bg-primary/10 focus:bg-white dark:focus:bg-gray-800
                  transition-colors flex h-12 w-full rounded-lg border border-input px-4 py-2 text-base
                  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2 focus:border-primary"
                                />
                            </div>

                            <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-input">
                                <div className="text-sm text-gray-600 dark:text-gray-400">{t('totalAmounts')}</div>
                                <div className="text-xl font-bold">
                                    ¥{calculateTotalPayment().toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-2 pt-2">
                <Button className="w-full py-3 text-lg" onClick={add}>{t('confirm')}</Button>
                <Button variant="outline" className="w-full py-3 text-lg" onClick={() => router.back()}>
                    {t('back')}
                </Button>
            </div>
        </main>
    )
}