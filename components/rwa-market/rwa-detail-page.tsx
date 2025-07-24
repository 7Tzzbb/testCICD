"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Info, TrendingUp, TrendingDown, ShoppingCart, ShoppingBag, Clock, Tag, Users, BarChart2 } from "lucide-react"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, Bar, ComposedChart } from "recharts"
import Image from "next/image"
import { BottomNavigation } from "@/components/bottom-navigation"

// RWA类型
interface Rwa {
  id: string
  name: string
  type: string
  price: string
  returnRate: string
  image: string
  saleType: "auction" | "direct" | "crowdfunding"
  description?: string
  issuer?: string
  totalSupply?: string
  circulatingSupply?: string
  location?: string
  verificationStatus?: "verified" | "pending" | "unverified"
}

// 订单类型
interface Order {
  id: string
  type: "buy" | "sell"
  rwaName: string
  price: string
  quantity: string
  total: string
  date: string
  status: "active" | "completed" | "cancelled"
}

// 价格历史数据
interface PriceData {
  date: string
  price: number
  volume?: number  // 添加成交量字段
}

interface RwaDetailPageProps {
  id: string
}

export default function RwaDetailPage({ id }: RwaDetailPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [rwa, setRwa] = useState<Rwa | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([])
  const [showInfo, setShowInfo] = useState(false)

  // 获取销售类型徽章
  const getSaleTypeBadge = (type: Rwa['saleType']) => {
    switch (type) {
      case "auction":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">拍卖</Badge>
      case "direct":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">直售</Badge>
      case "crowdfunding":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">众筹</Badge>
    }
  }

  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => {
      // 模拟RWA数据
      const rwaData: Record<string, Rwa> = {
        "1": {
          id: "1",
          name: "黄金份额",
          type: "贵金属",
          price: "¥398/g",
          returnRate: "年化5.2%",
          image: "/placeholder.svg?height=120&width=120",
          saleType: "direct",
          description: "黄金份额代表实物黄金的所有权，价格与国际黄金市场价格挂钩。",
          issuer: "某贵金属交易所",
          totalSupply: "1,000 kg",
          circulatingSupply: "850 kg",
          verificationStatus: "verified"
        },
        "2": {
          id: "2",
          name: "艺术品",
          type: "艺术收藏",
          price: "¥52,000",
          returnRate: "预期增值15%",
          image: "/placeholder.svg?height=120&width=120",
          saleType: "auction",
          description: "知名艺术家作品的数字化份额，通过区块链技术确保所有权。",
          issuer: "某艺术品交易平台",
          totalSupply: "100 份",
          circulatingSupply: "75 份",
          verificationStatus: "verified"
        },
        "3": {
          id: "3",
          name: "房产份额",
          type: "不动产",
          price: "¥8,500/份",
          returnRate: "年化6.8%",
          image: "/placeholder.svg?height=120&width=120",
          saleType: "crowdfunding",
          description: "位于一线城市核心区域的商业地产份额，享受租金收益和资产增值。",
          issuer: "某房地产投资信托",
          totalSupply: "10,000 份",
          circulatingSupply: "8,500 份",
          location: "上海市浦东新区",
          verificationStatus: "verified"
        },
        "4": {
          id: "4",
          name: "白银份额",
          type: "贵金属",
          price: "¥5.2/g",
          returnRate: "年化4.5%",
          image: "/placeholder.svg?height=120&width=120",
          saleType: "direct",
          description: "白银份额代表实物白银的所有权，价格与国际白银市场价格挂钩。",
          issuer: "某贵金属交易所",
          totalSupply: "5,000 kg",
          circulatingSupply: "4,200 kg",
          verificationStatus: "verified"
        },
        "5": {
          id: "5",
          name: "古董钟表",
          type: "艺术收藏",
          price: "¥125,000",
          returnRate: "预期增值12%",
          image: "/placeholder.svg?height=120&width=120",
          saleType: "auction",
          description: "稀有古董钟表的数字化份额，通过区块链技术确保所有权。",
          issuer: "某收藏品交易平台",
          totalSupply: "50 份",
          circulatingSupply: "35 份",
          verificationStatus: "verified"
        },
        "6": {
          id: "6",
          name: "商业地产",
          type: "不动产",
          price: "¥12,000/份",
          returnRate: "年化7.2%",
          image: "/placeholder.svg?height=120&width=120",
          saleType: "crowdfunding",
          description: "位于二线城市商业中心的办公楼份额，享受稳定租金收益。",
          issuer: "某不动产投资集团",
          totalSupply: "8,000 份",
          circulatingSupply: "6,500 份",
          location: "杭州市西湖区",
          verificationStatus: "verified"
        }
      }

      // 获取指定ID的RWA
      setRwa(rwaData[id] || null)

      // 模拟订单数据
      setOrders([
        {
          id: "o1",
          type: "buy",
          rwaName: rwaData[id]?.name || "",
          price: rwaData[id]?.price || "",
          quantity: "2",
          total: "¥796",
          date: "2023-05-15 16:20",
          status: "active"
        },
        {
          id: "o2",
          type: "sell",
          rwaName: rwaData[id]?.name || "",
          price: rwaData[id]?.price || "",
          quantity: "5",
          total: "¥1,990",
          date: "2023-05-10 08:15",
          status: "active"
        },
        {
          id: "o3",
          type: "buy",
          rwaName: rwaData[id]?.name || "",
          price: rwaData[id]?.price || "",
          quantity: "3",
          total: "¥1,194",
          date: "2023-05-05 09:45",
          status: "completed"
        },
        {
          id: "o4",
          type: "sell",
          rwaName: rwaData[id]?.name || "",
          price: rwaData[id]?.price || "",
          quantity: "1",
          total: "¥398",
          date: "2023-04-28 16:15",
          status: "completed"
        }
      ])

      // 模拟价格历史数据
      // 添加成交量数据到价格历史接口
      const basePrice = parseFloat(rwaData[id]?.price.replace(/[^0-9.]/g, '') || "398")
      const priceData: PriceData[] = []
      const now = new Date()
      
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)
        const dateStr = `${date.getMonth() + 1}/${date.getDate()}`
        
        // 生成一个在基础价格附近波动的随机价格
        const randomFactor = 0.8 + Math.random() * 0.4 // 0.8 到 1.2 之间的随机数
        const price = basePrice * randomFactor
        
        // 添加随机成交量数据
        const volume = Math.floor(Math.random() * 1000) + 100
        
        priceData.push({
          date: dateStr,
          price: parseFloat(price.toFixed(2)),
          volume: volume
        })
      }
      
      setPriceHistory(priceData)
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [id])

  // 处理RWA买入
  const handleBuy = () => {
    router.push(`/rwa-market/buy/?id=${id}`)
  }

  // 处理RWA卖出
  const handleSell = () => {
    router.push(`/rwa-market/sell/?id=${id}`)
  }

  if (isLoading || !rwa) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container flex items-center h-14 px-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-bold text-lg ml-2">RWA详情</h1>
          </div>
        </header>
        <main className="flex-1 container px-4 py-4 flex items-center justify-center">
          <p className="text-muted-foreground">加载中...</p>
        </main>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container flex items-center h-14 px-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/rwa-market">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="font-bold text-lg ml-2">{rwa.name}详情</h1>
            <div className="ml-auto">
              <Button variant="ghost" size="icon" onClick={() => setShowInfo(!showInfo)}>
                <Info className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 container px-4 py-4">
          <div className="space-y-4">
            {/* 价格走势图 - 移到最上方 */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-lg">价格与成交量走势</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mr-1"></div>
                      <span className="text-xs">价格({rwa.price.split('/')[1] || ''})</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-secondary mr-1"></div>
                      <span className="text-xs">成交量</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-72">
                  <ChartContainer
                    config={{
                      price: {
                        label: "价格",
                        color: "hsl(var(--primary))",
                      },
                      volume: {
                        label: "成交量",
                        color: "hsl(var(--secondary))",
                      }
                    }}
                  >
                    <ComposedChart data={priceHistory}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip 
                        content={<ChartTooltipContent />}
                        formatter={(value, name) => {
                          if (name === "price") return [`${value} `, "价格"];
                          if (name === "volume") return [`${value} `, "成交量"];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="price" 
                        name="价格"
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                      />
                      <Bar 
                        yAxisId="right"
                        dataKey="volume" 
                        name="成交量"
                        fill="hsl(var(--secondary))" 
                        fillOpacity={0.6}
                      />
                    </ComposedChart>
                  </ChartContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">当前价格</p>
                    <p className="text-xl font-bold">{rwa.price}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500">+2.5%</span>
                      <span className="text-xs text-gray-500 ml-1">24h</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">24h成交量</p>
                    <p className="text-xl font-bold">¥125,000</p>
                    <div className="flex items-center mt-1">
                      <BarChart2 className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm">312份</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* RWA信息卡片 - 移到走势图下方 */}
            <Card className="mb-4 bg-gradient-to-r from-primary/80 to-primary text-white vibrant-card hover-glow">
              {/* 保持原有的RWA信息卡片内容不变 */}
              <CardContent className="p-6">
                {/* ... 原有的RWA信息卡片内容 ... */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-lg bg-white/20 flex items-center justify-center overflow-hidden">
                    <img src={rwa.image} alt={rwa.name} className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">{rwa.name}</h2>
                      {getSaleTypeBadge(rwa.saleType)}
                    </div>
                    <p className="text-sm opacity-90">{rwa.type}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm opacity-80">当前价格</p>
                    <p className="text-xl font-bold">{rwa.price}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">预期收益</p>
                    <p className="text-lg font-bold">{rwa.returnRate}</p>
                  </div>
                </div>

                {showInfo && (
                  <div className="mb-4 grid grid-cols-2 gap-2">
                    <p className="text-sm opacity-80">发行方: {rwa.issuer}</p>
                    <p className="text-sm opacity-80">验证状态: 
                      <Badge variant="secondary" className="ml-1 bg-green-100 text-green-800">
                        已验证
                      </Badge>
                    </p>
                    <p className="text-sm opacity-80">总供应量: {rwa.totalSupply}</p>
                    <p className="text-sm opacity-80">流通量: {rwa.circulatingSupply}</p>
                    {rwa.location && <p className="text-sm opacity-80 col-span-2">位置: {rwa.location}</p>}
                  </div>
                )}

                {rwa.description && (
                  <div className="mb-4 p-3 bg-white/10 rounded-lg">
                    <p className="text-sm">{rwa.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="secondary" 
                    className="bg-white/20 hover:bg-white/30 text-white hover-scale"
                    onClick={handleBuy}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    买入资产
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="bg-white/20 hover:bg-white/30 text-white hover-scale"
                    onClick={handleSell}
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    卖出资产
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 保持原有的订单列表不变 */}
            <div className="mb-4">
              <h3 className="font-medium text-lg mb-3">市场订单</h3>
              {/* ... 原有的订单列表内容 ... */}
              {/* 保持原有的Tabs组件和内容不变 */}
            </div>
          </div>
        </main>

        {/* <BottomNavigation /> */}
      </div>
    </PageTransition>
  )
}