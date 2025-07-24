'use client'

import * as React from 'react'
import {
    ThemeProvider as NextThemesProvider,
    type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({children, ...props}: ThemeProviderProps) {
    const [mounted, setMounted] = React.useState(false)

    // 仅在客户端渲染后挂载
    React.useEffect(() => {
        setMounted(true)
    }, [])

    // 避免在服务端渲染时应用主题，防止水合错误
    if (!mounted) {
        return (
            <div style={{visibility: "hidden"}}>
                <NextThemesProvider {...props}>{children}</NextThemesProvider>
            </div>
        )
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
