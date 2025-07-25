// "use client"
//
// import type React from "react"
//
// import {Home, BarChart3, ShoppingCart, User, PieChart, Bot} from "lucide-react"
// import {usePathname} from "next/navigation"
// import {cn} from "@/lib/utils"
// import {useLanguage} from "@/lib/i18n/language-context"
// import {motion} from "framer-motion"
// import {useRouter} from "next/navigation"
// import {useToast} from "@/hooks/use-toast";
//
// interface NavItem {
//     icon: React.ReactNode
//     labelKey: string
//     href: string
//     color: string
// }
// interface BottomNavigationProps {
//     onErrors?: () => void // 可选函数
// }
// //
// export function BottomNavigation({ onErrors }: BottomNavigationProps) {
//     const pathname = usePathname()
//     const {t} = useLanguage()
//     const {toast} = useToast()
//     const router = useRouter();
//     // 跳转
//     const toPages = (href: string) => {
//         console.log('toPages called, href:', href)
//
//         const token = localStorage.getItem('token')
//         const isExpire = localStorage.getItem('isExpire')
//
//         console.log('token:', token, 'isExpire:', isExpire)
//
//         if (token && isExpire === "0") {
//             router.push(href)
//         } else {
//             console.log('执行前 onErrors:', onErrors)
//             if (onErrors) {
//                 onErrors()
//             }
//             console.log('执行完 onErrors')
//             toast({
//                 description: t('error.token_expired'),
//                 variant: "destructive",
//                 duration: 1500
//             })
//         }
//     }
//
//     const navItems: NavItem[] = [
//         {
//             icon: <Home className="h-5 w-5"/>,
//             labelKey: "home",
//             href: "/",
//             color: "text-[hsl(var(--primary))]",
//         },
//         // {
//         //     icon: <BarChart3 className="h-5 w-5"/>,
//         //     labelKey: "market",
//         //     // href: "/market",
//         //     href: "/market/",
//         //     color: "text-[hsl(var(--secondary))]",
//         // },
//
//         {
//             icon: <PieChart className="h-5 w-5"/>,
//             labelKey: "assets",
//             // href: "/assets",
//             href: "/assets/",
//             color: "text-emerald-500",
//         },
//         {
//             icon: <ShoppingCart className="h-5 w-5"/>,
//             labelKey: "orders",
//             // href: "/points-market/my-orders",
//             href: "/points-market/my-orders/",
//             color: "text-amber-500",
//         },
//         {
//             icon: <Bot className="h-5 w-5"/>,
//             labelKey: "aiAssistant",
//             // href: "/market",
//             href: "/chat/",
//             color: "text-[hsl(var(--secondary))]",
//         },
//         {
//             icon: <User className="h-5 w-5"/>,
//             labelKey: "profile",
//             // href: "/profile",
//             href: "/profile/",
//             color: "text-cyan-500",
//         },
//     ]
//
//     const cleanPath = pathname.split("?")[0]
//     const showBottomNav = [
//         "/market/",
//         "/chat/",
//         "/points-market/my-orders/",
//         "/assets/",
//         "/profile/",
//         "/",
//     ].includes(cleanPath)
//
//     if (!showBottomNav) {
//         return null
//     }
//
//     return (
//         <motion.div
//             className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md dark:bg-gray-800/90 border-t border-gray-200 dark:border-gray-700 shadow-lg"
//             initial={{y: 100}}
//             animate={{y: 0}}
//             transition={{delay: 0.2, type: "spring", stiffness: 300, damping: 30}}
//         >
//             <div className="flex items-center justify-around h-16">
//                 {navItems.map((item) => {
//                     const isActive = pathname === item.href
//                     return (
//                         <div
//                             key={item.href}
//                             onClick={() => toPages(item.href)}
//                             className={cn(
//                                 "flex flex-col items-center justify-center w-full h-full transition-all duration-200",
//                                 isActive ? item.color : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
//                             )}
//                         >
//                             <motion.div
//                                 whileHover={{scale: 1.2}}
//                                 whileTap={{scale: 0.9}}
//                                 className="relative"
//                             >
//                                 {item.icon}
//                                 {isActive && (
//                                     <motion.span
//                                         layoutId="activeNavIndicator"
//                                         className={cn(
//                                             "absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full",
//                                             item.color.replace("text-", "bg-"),
//                                         )}
//                                         initial={{opacity: 0}}
//                                         animate={{opacity: 1}}
//                                         exit={{opacity: 0}}
//                                     />
//                                 )}
//                             </motion.div>
//                             <span className="text-xs mt-1">{t(item.labelKey)}</span>
//                         </div>
//                     )
//                 })}
//             </div>
//         </motion.div>
//     )
// }
"use client"

import type React from "react"

import {Home, BarChart3, ShoppingCart, User, PieChart, Bot} from "lucide-react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {cn} from "@/lib/utils"
import {useLanguage} from "@/lib/i18n/language-context"
import {motion} from "framer-motion"

interface NavItem {
    icon: React.ReactNode
    labelKey: string
    href: string
    color: string
}

export function BottomNavigation() {
    const pathname = usePathname()
    const {t} = useLanguage()

    const navItems: NavItem[] = [
        {
            icon: <Home className="h-5 w-5"/>,
            labelKey: "home",
            href: "/",
            color: "text-[hsl(var(--primary))]",
        },
        // {
        //     icon: <BarChart3 className="h-5 w-5"/>,
        //     labelKey: "market",
        //     // href: "/market",
        //     href: "/market/",
        //     color: "text-[hsl(var(--secondary))]",
        // },

        {
            icon: <PieChart className="h-5 w-5"/>,
            labelKey: "points",
            // href: "/assets",
            href: "/assets/",
            color: "text-emerald-500",
        },
        {
            icon: <ShoppingCart className="h-5 w-5"/>,
            labelKey: "orders",
            // href: "/points-market/my-orders",
            href: "/points-market/my-orders/",
            color: "text-amber-500",
        },
        // {
        //     icon: <Bot className="h-5 w-5"/>,
        //     labelKey: "onlineService",
        //     // href: "/market",
        //     href: "/chat/",
        //     color: "text-[hsl(var(--secondary))]",
        // },
        {
            icon: <User className="h-5 w-5"/>,
            labelKey: "profile",
            // href: "/profile",
            href: "/profile/",
            color: "text-cyan-500",
        },
    ]

    const cleanPath = pathname.split("?")[0]
    const showBottomNav = [
        "/market/",
        // "/chat/",
        "/points-market/my-orders/",
        "/assets/",
        "/profile/",
        "/",
    ].includes(cleanPath)

    if (!showBottomNav) {
        return null
    }

    return (
        <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md dark:bg-gray-800/90 border-t border-gray-200 dark:border-gray-700 shadow-lg"
            initial={{y: 100}}
            animate={{y: 0}}
            transition={{delay: 0.2, type: "spring", stiffness: 300, damping: 30}}
        >
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full transition-all duration-200",
                                isActive ? item.color : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300",
                            )}
                        >
                            <motion.div
                                whileHover={{scale: 1.2}}
                                whileTap={{scale: 0.9}}
                                className="relative"
                            >
                                {item.icon}
                                {isActive && (
                                    <motion.span
                                        layoutId="activeNavIndicator"
                                        className={cn(
                                            "absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full",
                                            item.color.replace("text-", "bg-"),
                                        )}
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                    />
                                )}
                            </motion.div>
                            <span className="text-xs mt-1">{t(item.labelKey)}</span>
                        </Link>
                    )
                })}
            </div>
        </motion.div>
    )
}
