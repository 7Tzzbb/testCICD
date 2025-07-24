"use client"

import {useState, useCallback, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {getNoticeDetail, getPlatformAnnouncements} from '@/lib/api';
import {ChevronLeft} from 'lucide-react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {useLanguage} from '@/lib/i18n/language-context';
import {useRouter, useSearchParams} from "next/navigation"
import {useToast} from "@/hooks/use-toast"
import DOMPurify from 'dompurify'

export default function NoticeListPage() {
    const [announcements, setAnnouncements] = useState([]);
    const {t} = useLanguage()
    const router = useRouter()
    const {toast} = useToast()
    const searchParams = useSearchParams()
    const id = searchParams.get('id');
    useEffect(() => {
        fetchMoreData(id);
    }, []);

    const fetchMoreData = async () => {
        const languages = localStorage.getItem('language') ?? 'zh'
        console.log(languages, 'languages')
        const res = await getNoticeDetail(id)
        if (res.code == 0) {
            setAnnouncements(res.data)
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
                    <h1 className="font-bold text-xl text-gray-900 dark:text-white">{t('announcementCenter')}</h1>
                </div>
            </header>

            <div className="p-4 mb-2 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">{announcements.name}</h2>
                <div
                    className="prose prose-sm text-gray-600 dark:text-gray-300 mt-2 max-w-none"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(announcements.content),
                    }}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">{announcements.createdAt}</p>
            </div>
        </div>
    );
}