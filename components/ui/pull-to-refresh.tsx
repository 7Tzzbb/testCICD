"use client"

import * as React from "react"
import { motion, useAnimation, PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  className?: string
  pullDistance?: number
  loadingText?: string
}

export function PullToRefresh({
  onRefresh,
  children,
  className,
  pullDistance = 80,
  loadingText = "刷新中...",
}: PullToRefreshProps) {
  const controls = useAnimation()
  const [refreshing, setRefreshing] = React.useState(false)
  const [enabled, setEnabled] = React.useState(true)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const startY = React.useRef(0)

  const handleDragStart = (_: any, info: PanInfo) => {
    // 只有当滚动到顶部时才启用下拉刷新
    if (containerRef.current && containerRef.current.scrollTop <= 0) {
      startY.current = info.point.y
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }

  const handleDrag = (_: any, info: PanInfo) => {
    if (!enabled) return
    
    const distance = Math.max(0, info.point.y - startY.current)
    const pullRatio = Math.min(distance / pullDistance, 1)
    
    controls.set({
      y: distance * 0.5, // 添加阻尼效果
      opacity: pullRatio,
    })
  }

  const handleDragEnd = async (_: any, info: PanInfo) => {
    if (!enabled) return
    
    const distance = Math.max(0, info.point.y - startY.current)
    
    if (distance >= pullDistance && !refreshing) {
      setRefreshing(true)
      
      // 显示加载动画
      await controls.start({
        y: 40,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 30 }
      })
      
      // 执行刷新操作
      try {
        await onRefresh()
      } catch (error) {
        console.error("Refresh failed:", error)
      }
      
      // 完成后重置
      setRefreshing(false)
      await controls.start({
        y: 0,
        opacity: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 }
      })
    } else {
      // 如果没有达到刷新阈值，回弹
      controls.start({
        y: 0,
        opacity: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 }
      })
    }
  }

  return (
    <div className={cn("relative overflow-hidden", className)} ref={containerRef}>
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        className="min-h-full"
      >
        <motion.div
          animate={controls}
          initial={{ y: 0, opacity: 0 }}
          className="absolute top-0 left-0 right-0 flex justify-center py-2 pointer-events-none"
        >
          <div className="flex items-center gap-2 text-primary">
            <Loader2 className={cn("h-5 w-5", refreshing && "animate-spin")} />
            <span className="text-sm font-medium">{loadingText}</span>
          </div>
        </motion.div>
        {children}
      </motion.div>
    </div>
  )
}