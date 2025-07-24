"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// 淡入淡出动画组件
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  ...props
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  [key: string]: any
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 从下方滑入动画组件
export const SlideUp = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  ...props
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  [key: string]: any
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 从左侧滑入动画组件
export const SlideInLeft = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  ...props
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  [key: string]: any
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 从右侧滑入动画组件
export const SlideInRight = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  ...props
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  [key: string]: any
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 缩放动画组件
export const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  ...props
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  [key: string]: any
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 交错动画容器
export const StaggerContainer = ({
  children,
  staggerDelay = 0.1,
  className = "",
  ...props
}: {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
  [key: string]: any
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 交错子元素
export const StaggerItem = ({
  children,
  duration = 0.5,
  className = "",
  ...props
}: {
  children: React.ReactNode
  duration?: number
  className?: string
  [key: string]: any
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 脉冲动画组件
export const Pulse = ({
  children,
  duration = 2,
  className = "",
  ...props
}: {
  children: React.ReactNode
  duration?: number
  className?: string
  [key: string]: any
}) => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// 使用Intersection Observer的滚动显示钩子
export function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return { ref, isVisible }
}

// 滚动显示组件
export const ScrollReveal = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
