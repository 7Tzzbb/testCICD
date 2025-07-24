"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"

interface MarketItem {
  name: string
  price: string
  change: string
  isUp: boolean
  type?: "crypto" | "points" | "rwa"
}

export function MarketTicker() {
  const [marketData] = useState<MarketItem[]>([
    { name: "BTC", price: "¥198,532", change: "+2.3%", isUp: true, type: "crypto" },
    { name: "ETH", price: "¥10,234", change: "+1.5%", isUp: true, type: "crypto" },
    { name: "航空积分", price: "¥0.05/分", change: "+3.2%", isUp: true, type: "points" },
    { name: "商场积分", price: "¥0.03/分", change: "+1.5%", isUp: true, type: "points" },
    { name: "酒店积分", price: "¥0.04/分", change: "-0.5%", isUp: false, type: "points" },
    { name: "银行积分", price: "¥0.02/分", change: "+0.7%", isUp: true, type: "points" },
    { name: "黄金份额", price: "¥398/g", change: "+0.8%", isUp: true, type: "rwa" },
    { name: "USDT", price: "¥7.21", change: "-0.1%", isUp: false, type: "crypto" },
  ])

  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ticker = tickerRef.current
    if (!ticker) return

    const animation = ticker.animate([{ transform: "translateX(0%)" }, { transform: `translateX(-${100 / 2}%)` }], {
      duration: 30000,
      iterations: Number.POSITIVE_INFINITY,
    })

    return () => {
      animation.cancel()
    }
  }, [])

  const getTypeColor = (type?: "crypto" | "points" | "rwa") => {
    switch (type) {
      case "crypto":
        return "text-[hsl(var(--secondary))]"
      case "points":
        return "text-[hsl(var(--primary))]"
      case "rwa":
        return "text-[hsl(var(--accent))]"
      default:
        return ""
    }
  }

  return (
    <motion.div
      className="relative w-full overflow-hidden bg-gradient-to-r from-[hsl(var(--pastel-green))] via-[hsl(var(--pastel-blue))] to-[hsl(var(--pastel-purple))] dark:bg-gray-800 rounded-lg border border-primary/20 dark:border-gray-700 p-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    >
      <motion.div
        className="flex items-center absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[hsl(var(--pastel-green))] to-transparent z-10 px-2"
        animate={{
          x: [0, 5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <TrendingUp className="h-4 w-4 text-primary mr-1" />
        <span className="text-sm font-medium">行情</span>
      </motion.div>
      <div className="flex items-center absolute right-0 top-0 bottom-0 bg-gradient-to-l from-[hsl(var(--pastel-purple))] to-transparent z-10 w-8"></div>
      <div ref={tickerRef} className="flex whitespace-nowrap pl-20">
        {[...marketData, ...marketData].map((item, index) => (
          <motion.div key={index} className="flex items-center mx-4" whileHover={{ scale: 1.05, y: -2 }}>
            <span className={`font-medium text-sm mr-2 ${getTypeColor(item.type)}`}>{item.name}</span>
            <span className="text-sm mr-2">{item.price}</span>
            <motion.span
              className={`text-xs flex items-center ${item.isUp ? "text-green-500" : "text-red-500"}`}
              animate={{
                y: [0, -2, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                delay: (index * 0.1) % 1,
              }}
            >
              {item.isUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {item.change}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
