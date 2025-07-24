"use client"

import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {TrendingUp, TrendingDown, Flame} from "lucide-react"
import Link from "next/link"
import {cn} from "@/lib/utils"
import {motion} from "framer-motion"
import {useLanguage} from "@/lib/i18n/language-context";

interface AssetCardProps {
    name: string
    type: number
    price: string
    change: string
    image: string
    hot?: boolean
    colorScheme?: "mint" | "sky" | "lavender" | "sunset" | "ocean"
}

export function AssetCard({name, type, price, change, image, hot = false, colorScheme}: AssetCardProps) {
    const isUp = change.startsWith("+")
    const {t} = useLanguage()
    // 根据资产名称动态分配颜色方案
    const getColorScheme = () => {
        if (colorScheme) return colorScheme

        if (name.includes("航空")) return "sky"
        if (name.includes("商场") || name.includes("电商")) return "mint"
        if (name.includes("酒店") || name.includes("餐饮")) return "sunset"
        if (name.includes("银行")) return "lavender"
        if (name.includes("黄金") || name.includes("珠宝")) return "sunset"
        if (name.includes("艺术") || name.includes("古董")) return "lavender"
        if (name.includes("房产") || name.includes("地产")) return "ocean"

        // 默认颜色方案
        return type == 1 ? "mint" : "ocean"
    }

    const scheme = getColorScheme()

    const getBadgeStyle = () => {
        switch (scheme) {
            case "mint":
                return "bg-[hsl(var(--pastel-green))] text-[hsl(var(--primary))]"
            case "sky":
                return "bg-[hsl(var(--pastel-blue))] text-[hsl(var(--secondary))]"
            case "lavender":
                return "bg-[hsl(var(--pastel-purple))] text-[hsl(var(--accent))]"
            case "sunset":
                return "bg-[hsl(var(--pastel-yellow))] text-amber-600"
            case "ocean":
                return "bg-[hsl(var(--pastel-blue))] text-cyan-600"
            default:
                return "bg-[hsl(var(--pastel-green))] text-[hsl(var(--primary))]"
        }
    }

    const getCardStyle = () => {
        switch (scheme) {
            case "mint":
                return "border-[hsl(var(--primary))]"
            case "sky":
                return "border-[hsl(var(--secondary))]"
            case "lavender":
                return "border-[hsl(var(--accent))]"
            case "sunset":
                return "border-amber-300"
            case "ocean":
                return "border-cyan-300"
            default:
                return "border-[hsl(var(--primary))]"
        }
    }

    return (
        <Link href={type == 1 ? "/points-market" : "/rwa-market"}>
            <motion.div
                whileHover={{
                    scale: 1.03,
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{scale: 0.97}}
                transition={{type: "spring", stiffness: 400, damping: 17}}
            >
                <Card className={cn("overflow-hidden transition-all duration-300 border-opacity-20", getCardStyle())}>
                    <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                            <div
                                className="relative h-8 w-8 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <img src={image || "/placeholder.svg"} alt={name}
                                     className="h-full w-full object-cover"/>
                                {hot && (
                                    <motion.div
                                        className="absolute top-0 right-0 bg-red-500 p-0.5 rounded-bl-md"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [1, 0.8, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatType: "loop",
                                        }}
                                    >
                                        <Flame className="h-3 w-3 text-white"/>
                                    </motion.div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-sm truncate">{name}</h3>
                                    <Badge variant="outline" className={cn("text-xs h-5 px-1.5", getBadgeStyle())}>
                                        {type == 1 ? t('points') : t('rwa')}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-sm font-semibold">{price}</span>
                                    <motion.span
                                        className={`text-xs flex items-center ${isUp ? "text-green-500" : "text-red-500"}`}
                                        animate={{
                                            y: [0, -2, 0],
                                            opacity: [0.8, 1, 0.8],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatType: "loop",
                                        }}
                                    >
                                        {isUp ? <TrendingUp className="h-3 w-3 mr-0.5"/> :
                                            <TrendingDown className="h-3 w-3 mr-0.5"/>}
                                        {change}
                                    </motion.span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    )
}
