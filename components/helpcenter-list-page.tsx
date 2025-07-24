"use client"

import {useState, useCallback, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {getActivityList, getHelpCenterList} from '@/lib/api';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n/language-context';
import {useRouter, useSearchParams} from "next/navigation"
import {useToast} from "@/hooks/use-toast"
import DOMPurify from 'dompurify'

export default function HelpCenterListPage() {
    const [helpCenterList, setHelpCenterList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const {t} = useLanguage()
    const router = useRouter()
    const {toast} = useToast()
    const pageSize = 10;
    useEffect(() => {
        fetchMoreData(1);
    }, []);
    const fetchMoreData = async (customPage: number) => {
        const language = localStorage.getItem('language') ?? 'zh'
        const currentPage = customPage || page
        const res = await getHelpCenterList(currentPage, pageSize, language)
        if (res.code == 0) {
            const newData = res.data.content
            const totalPages = res.data.totalPages
            // 追加数据
            setHelpCenterList((prev) =>
                currentPage == 1 ? newData : [...prev, ...newData]
            )
            const nextPage = currentPage + 1
            setPage(nextPage)

            // 判断是否还有更多数据
            setHasMore(nextPage - 1 < totalPages)
        } else {
            toast({
                description: t(res.message),
                duration: 1500
            })
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950">
            <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center">
                <div className="container flex items-center px-4">
                    <Button variant="ghost" size="icon" className="mr-2" asChild onClick={() => router.back()}>
                        <ChevronLeft className="h-5 w-5"/>
                    </Button>
                    <h1 className="font-bold text-xl text-gray-900 dark:text-white">{t('helpCenter')}</h1>
                </div>
            </header>

            <InfiniteScroll
                dataLength={helpCenterList.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<div className="text-center py-4">{t('loading')}</div>}
                endMessage={<div className="text-center py-4">{t('noData')}</div>}>
                {helpCenterList.map((item,i) => (
                    <div key={i}
                         className="p-4 mb-2 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                        <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">{item.name}</h2>
                        <div
                            className="prose prose-sm text-gray-600 dark:text-gray-300 mt-2 max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(item.content),
                            }}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">{item.createdAt}</p>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}