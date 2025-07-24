"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Info, TrendingUp, TrendingDown, ShoppingCart, ShoppingBag, BarChart2, List, Filter, Phone, Mail, CreditCard, Smartphone } from "lucide-react"
import Link from "next/link"
import { SimpleTransition } from "@/components/simple-transition"
import { useRouter } from 'next/navigation'

interface PointDetailProps {
    id: string;
}

export default function PointDetail({ id }: PointDetailProps) {
    const router = useRouter()

    return (
        <SimpleTransition>
            <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
                <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <div className="container flex items-center h-14 px-4">
                        <Button variant="ghost" size="icon" asChild onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h1 className="font-bold text-lg ml-2">详情</h1>
                    </div>
                </header>

                <main className="flex-1 container px-4 py-4">
                    {/* 积分信息卡片 */}
                    <Card className="mb-4 overflow-hidden">
                        <CardContent className="p-0">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-white">
                                <h2 className="text-xl font-bold">测22试</h2>
                                <p className="text-sm opacity-90">发行方: 测试</p>
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">10</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">总供应量</p>
                                        <p className="font-medium">20</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">流通量</p>
                                        <p className="font-medium">30</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </SimpleTransition>
    )
}