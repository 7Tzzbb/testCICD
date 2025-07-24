"use client"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ChevronLeft} from "lucide-react"
import Link from "next/link"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {BindEmail} from "@/components/security/bind-email"
import {SetSecondaryPassword} from "@/components/security/set-secondary-password"
import {ChangeSecondaryPassword} from "@/components/security/change-secondary-password"
import {ResetSecondaryPassword} from "@/components/security/reset-secondary-password"
import {useEffect, useState} from "react"
import {useLanguage} from "@/lib/i18n/language-context";
import {getProfile} from "@/lib/api";
import {useToast} from "@/hooks/use-toast"
import {getAuthToken} from "@/lib/utils";
import {WalletWatcher} from "@/components/wallet-watcher";

export default function SecurityPage() {
    // 可以考虑修改初始标签页
    const [activeTab, setActiveTab] = useState<string>("set-password") // 改为默认显示设置二级密码
    const {t} = useLanguage()
    const {toast} = useToast()
    const [userProfile, setUserProfile] = useState({})
    useEffect(() => {
        getUserInfo()
    }, [])
    // 获取个人信息
    const getUserInfo = async () => {
        const result = await getProfile()
        if (result.code == 0) {
            if (result.data.flag) {
                setActiveTab('change-password')
            }
            setUserProfile(result.data)
        } else {
            toast({
                title: t('tip'),
                description: t(result.message),
                duration: 1500
            })
        }
    }


    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
            <header
                className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="container flex items-center h-14 px-4">
                    <Button variant="ghost" size="icon" className="mr-2" asChild>
                        <Link href="/profile">
                            <ChevronLeft className="h-5 w-5"/>
                        </Link>
                    </Button>
                    <h1 className="font-bold text-lg">{t('accountSecurity')}</h1>
                </div>
            </header>

            <main className="flex-1 container px-4 py-4">
                <WalletWatcher/>
                <Card className="mb-4">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                            {t('securitySettings')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className={`grid w-full ${!userProfile.flag ? 'grid-cols-2' : 'grid-cols-3'}`}>
                                <TabsTrigger value="bind-email">
                                    {userProfile.email ? t('securityEmail') : t('bindSecurityEmail')}
                                </TabsTrigger>
                                {!userProfile.flag ? (
                                    <TabsTrigger value="set-password" disabled={userProfile.flag}>
                                        {t('setSecondaryPassword')}
                                    </TabsTrigger>
                                ) : (
                                    <>
                                        <TabsTrigger
                                            value="change-password">{t('changeSecondaryPassword')}</TabsTrigger>
                                        <TabsTrigger value="reset-password">{t('resetSecondaryPassword')}</TabsTrigger>
                                    </>
                                )}
                            </TabsList>

                            <TabsContent value="bind-email" className="mt-4">
                                {!userProfile.email ? (
                                    <BindEmail onSuccess={getUserInfo}/>
                                ) : (
                                    <div className="p-4 text-center bg-green-50 text-green-700 rounded-md">
                                        <p>{t('bindSecurityEmailSuccess')}</p>
                                        <p>{userProfile.email}</p>
                                    </div>
                                )}
                            </TabsContent>

                            {!userProfile.flag && (
                                <TabsContent value="set-password" className="mt-4">
                                    <SetSecondaryPassword onSuccess={getUserInfo}/>
                                </TabsContent>
                            )}

                            <TabsContent value="change-password" className="mt-4">
                                <ChangeSecondaryPassword/>
                            </TabsContent>

                            <TabsContent value="reset-password" className="mt-4">
                                <ResetSecondaryPassword/>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}