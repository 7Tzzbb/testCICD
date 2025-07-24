'use client'

import ChatwootLauncher from '@/components/ChatwootLauncher' // ✅ 不是默认导出

export function ClientOnlyWrapper() {
    return <ChatwootLauncher />
}
