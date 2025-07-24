import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GiftPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">

      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mobile-slide-up">
        <div className="container flex items-center h-14 px-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="font-bold text-lg ml-2">我的礼品</h1>
        </div>
      </header>
      <main className="flex-1 container px-4 py-4">
        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <p>暂无礼品</p>
        </div>
      </main>
    </div>
  )
}