"use client"

import type React from "react"

export function SimpleTransition({children}: { children: React.ReactNode }) {
    return (
        <div className="pb-16"> {/* 为底部导航留出空间 */}
            {children}
        </div>
    )
}