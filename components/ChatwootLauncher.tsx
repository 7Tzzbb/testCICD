'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {useLanguage} from "@/lib/i18n/language-context"

export default function ChatwootLauncher() {
    const { t } = useLanguage()
    const router = useRouter()

    const toBack = () => {
        router.back()
    }

    useEffect(() => {

        // 设置 Chatwoot 全局配置（隐藏默认按钮）
        window.chatwootSettings = {
            hideMessageBubble: true,
            position: 'right',
            locale: 'zh_Hans',
        }
        const BASE_URL = 'http://13.251.81.128:3000'
        // 加载 SDK
        const script = document.createElement('script')
        script.src = `${BASE_URL}/packs/js/sdk.js`
        script.defer = true
        script.async = true
        script.onload = () => {
            if (window.chatwootSDK) {
                window.chatwootSDK.run({
                    websiteToken: 'yL2WGLHJeVBDDjLCgn6aGgpy',
                    baseUrl: BASE_URL,
                })
            }
        }
        document.body.appendChild(script)

        // 创建按钮
        const button = document.createElement('div')
        button.id = 'custom-chatwoot-launcher'

        // 计算初始 left 和 top，让按钮靠右下，距离边距20px
        const buttonSize = 40
        const margin = 20
        const initialLeft = window.innerWidth - buttonSize - margin
        const initialTop = window.innerHeight - buttonSize - margin

        Object.assign(button.style, {
            position: 'fixed',
            left: `${initialLeft}px`,
            top: `${initialTop}px`,
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            backgroundColor: '#1f93ff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: '9999',
            touchAction: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'><path d='M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z'/><path d='M7 9h10v2H7z'/><path d='M7 12h7v2H7z'/></svg>")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            userSelect: 'none',
            pointerEvents: 'auto',
        })

        document.body.appendChild(button)

        // 拖动逻辑
        let isDragging = false
        let hasMoved = false
        let startX = 0,
            startY = 0,
            offsetX = 0,
            offsetY = 0

        const onMouseDown = (e: MouseEvent) => {
            isDragging = true
            hasMoved = false
            startX = e.clientX
            startY = e.clientY
            const rect = button.getBoundingClientRect()
            offsetX = e.clientX - rect.left
            offsetY = e.clientY - rect.top
            e.stopPropagation()
        }

        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging) return
            const dx = e.clientX - startX
            const dy = e.clientY - startY
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                hasMoved = true
                let newLeft = e.clientX - offsetX
                let newTop = e.clientY - offsetY

                // 限制按钮不要拖出视口
                newLeft = Math.min(Math.max(0, newLeft), window.innerWidth - buttonSize)
                newTop = Math.min(Math.max(0, newTop), window.innerHeight - buttonSize)

                button.style.left = `${newLeft}px`
                button.style.top = `${newTop}px`
            }
        }

        const onMouseUp = (e: MouseEvent) => {
            if (!hasMoved && e.target === button && window.$chatwoot) {
                window.$chatwoot.toggle('open')
            }
            isDragging = false
        }

        // 触摸事件支持
        const onTouchStart = (e: TouchEvent) => {
            e.preventDefault() // ✅ 阻止页面滚动行为
            const touch = e.touches[0]
            isDragging = true
            hasMoved = false
            startX = touch.clientX
            startY = touch.clientY
            const rect = button.getBoundingClientRect()
            offsetX = touch.clientX - rect.left
            offsetY = touch.clientY - rect.top
        }

        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault() // ✅ 阻止页面跟随手指滑动
            if (!isDragging) return
            const touch = e.touches[0]
            const dx = touch.clientX - startX
            const dy = touch.clientY - startY
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                hasMoved = true
                let newLeft = touch.clientX - offsetX
                let newTop = touch.clientY - offsetY
                newLeft = Math.min(Math.max(0, newLeft), window.innerWidth - buttonSize)
                newTop = Math.min(Math.max(0, newTop), window.innerHeight - buttonSize)
                button.style.left = `${newLeft}px`
                button.style.top = `${newTop}px`
            }
        }

        const onTouchEnd = (e: TouchEvent) => {
            if (!hasMoved && e.changedTouches.length > 0) {
                const touch = e.changedTouches[0]
                const element = document.elementFromPoint(touch.clientX, touch.clientY)
                if (element === button && window.$chatwoot) {
                    window.$chatwoot.toggle('open')
                }
            }
            isDragging = false
        }

        // 事件绑定
        button.addEventListener('mousedown', onMouseDown)
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
        button.addEventListener('touchstart', onTouchStart)
        document.addEventListener('touchmove', onTouchMove)
        document.addEventListener('touchend', onTouchEnd)

        // 清理
        return () => {
            button.remove()
            script.remove()
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
            document.removeEventListener('touchmove', onTouchMove)
            document.removeEventListener('touchend', onTouchEnd)
        }
    }, [])

    return (
        <>
            <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                <div className="container flex items-center h-14 px-4">
                    <Button variant="ghost" size="icon" onClick={toBack}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="font-bold text-lg ml-2">{t('onlineService')}</h1>
                </div>
            </header>
        </>
    )
}
