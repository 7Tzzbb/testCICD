"use client"

import type React from "react"
import { motion } from "framer-motion"
import { BottomNavigation } from "./bottom-navigation"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const showBottomNav = mounted && !['/login'].includes(pathname)
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.3 }}
      // className="pb-16" // 为底部导航留出空间
    >
      {children}
      {showBottomNav && <BottomNavigation />}
    </motion.div>
  )
}
