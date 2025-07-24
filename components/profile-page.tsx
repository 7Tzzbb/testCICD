import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomNavigation } from "./bottom-navigation";
import { ChevronRight, Shield, CreditCard, Phone, Copy, Users, HelpCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { getProfile, UserProfile } from "@/lib/api";
import { getAuthToken, setAuthToken, copyToClipboard } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";
import useWalletStore from "@/store/useWalletStore";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { QRCodeCanvas } from 'qrcode.react';

export default function ProfilePage() {
    const [userProfile, setUserProfile] = useState<UserProfile>(null);
    const { t } = useLanguage();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const userData = useWalletStore((state) => state.userData); // get wallet store
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    // 监听 userData 和用户 profile，确保切换账户时能重新加载用户数据
    useEffect(() => {
        if (userData) {
            setUserProfile(userData)
        }
        let tokenAuth = getAuthToken();
        // 如果没有 token 或验证失败，重新发起签名登录
        if (tokenAuth) {
            getUserInfo()
        }
    }, [userData]); // 只依赖 userData
//
    const handleErrors = () => {
        console.log("父组件 onErrors 被调用")
    }

    // 获取用户信息
    const getUserInfo = async () => {
        setIsLoading(true);
        try {
            const result = await getProfile();
            if (result.code == 0) {
                localStorage.setItem('userId', result.data.userId);
                setUserProfile(result.data);
            } else {
                toast({
                    title: t('tip'),
                    description: t(result.message),
                    duration: 1500,
                });
            }
        } catch (error) {
            console.log(error, 'Error');
        } finally {
            setIsLoading(false);
        }
    };

    // 复制钱包地址
    const copyWalletAddress = async (user_addr: string) => {
        const success = await copyToClipboard(user_addr);
        if (success) {
            toast({
                title: t('copied'),
                description: t('walletCopied'),
                duration: 1500,
            });
        } else {
            toast({
                title: t('tip'),
                description: t('copyFailed'),
                duration: 1500,
            });
        }
    };

    // 复制用户ID
    const copyUserId = async (user_id: string) => {
        const success = await copyToClipboard(user_id);
        if (success) {
            toast({
                title: t('copied'),
                description: t('userIdCopied'),
                duration: 1500,
            });
        } else {
            toast({
                title: t('tip'),
                description: t('copyFailed'),
                duration: 1500,
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
            <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mobile-slide-up">
                <div className="container flex items-center justify-between h-14 px-4">
                    <h1 className="font-bold text-lg bg-gradient-to-r from-[#0097FF] to-[#8F4BFF] text-transparent bg-clip-text" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        {t('profilePage')}
                    </h1>
                </div>
            </header>

            <main className="flex-1 container px-4 py-4">
                <div className="space-y-4 mobile-fade-in">
                    {/* 用户信息卡片 */}
                    <Card className="mb-4 vibrant-gradient vibrant-card hover:shadow-xl transition-all bg-gradient-to-br from-primary/20 to-secondary/20 border-border duration-300">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16 border-primary/50 shadow-lg shadow-primary/20">
                                    <AvatarImage src={userProfile?.avatar || "/head.svg?height=64&width=64"} alt="AvatarImage" />
                                    <AvatarFallback>USER</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            <h2 className="inline-block max-w-[180px] text-xl font-bold bg-gradient-to-r from-[#13ba82] to-[#0da2e7] text-transparent bg-clip-text whitespace-nowrap overflow-hidden text-ellipsis leading-tight" style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }} title={userProfile?.userAddr}>
                                                {userProfile?.userAddr ? `${userProfile.userAddr.slice(0, 6)}...${userProfile.userAddr.slice(-4)}` : t('notSet')}
                                            </h2>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-1 hover:bg-primary/10 transition-colors duration-200" onClick={() => copyWalletAddress(userProfile?.userAddr || '')}>
                                                <Copy className="h-4 w-4 text-primary" />
                                            </Button>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 animate-pulse">
                                        {t('verified')}
                                    </Badge>
                                    <div className="flex items-center">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">ID: {userProfile?.userId || t('notSet')}</p>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 hover:bg-primary/10 transition-colors duration-200" onClick={() => copyUserId(userProfile?.userId || '')}>
                                            <Copy className="h-3 w-3 text-primary" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* 信用值和活跃值 */}
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-1">
                                            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                            </div>
                                            <span className="text-xs text-gray-600 dark:text-gray-400">{t('creditScore')}</span>
                                        </div>
                                        <span className="text-xs font-medium text-primary">{userProfile?.creditScore || 0}</span>
                                    </div>
                                    <Progress value={userProfile?.creditScore || 0} className="h-2 bg-primary/10" />
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-1">
                                            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                            </div>
                                            <span className="text-xs text-gray-600 dark:text-gray-400">{t('activityScore')}</span>
                                        </div>
                                        <span className="text-xs font-medium text-primary">{userProfile?.activityLevel || 0}</span>
                                    </div>
                                    <Progress value={userProfile?.activityLevel || 0} className="h-2 bg-primary/10" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 功能菜单 */}
                    <Card className="mb-4 hover:shadow-md transition-all duration-300">
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {/* 账户安全 */}
                                <Link href="/security" className="flex items-center justify-between p-4 hover:bg-primary/5 transition-colors duration-200">
                                    <div className="flex items-center gap-3">
                                        <Shield className="h-5 w-5 text-primary" />
                                        <span>{t('accountSecurity')}</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </Link>
                                {/* 收款方式 */}
                                <Link href="/collection-method" className="flex items-center justify-between p-4 hover:bg-primary/5 transition-colors duration-200">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-5 w-5 text-secondary" />
                                        <span>{t('paymentMethods')}</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </Link>
                                {/* 联系方式 */}
                                <Link href="/contact-method" className="flex items-center justify-between p-4 hover:bg-primary/5 transition-colors duration-200">
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-accent" />
                                        <span>{t('contactMethods')}</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </Link>
                                {/* 邀请好友 */}
                                <div className="flex items-center justify-between p-4 hover:bg-primary/5 transition-colors duration-200 cursor-pointer" onClick={() => setIsInviteModalOpen(true)}>
                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-primary" />
                                        <span>{t('inviteFriends')}</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </div>
                                {/* 公告 */}
                                <Link href="/notice-list" className="flex items-center justify-between p-4 hover:bg-secondary/5 transition-colors duration-200">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-secondary" />
                                        <span>{t('announcementCenter')}</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </Link>
                                {/* 帮助中心 */}
                                <Link href="/helpcenter-list" className="flex items-center justify-between p-4 hover:bg-primary/5 transition-colors duration-200">
                                    <div className="flex items-center gap-3">
                                        <HelpCircle className="h-5 w-5 text-accent" />
                                        <span>{t('helpCenter')}</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* 邀请好友对话框 */}
            <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
                <DialogContent className="sm:max-w-[425px] p-6">
                    <DialogTitle className="text-lg font-semibold text-center">
                        {t('inviteFriends')}
                    </DialogTitle>
                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow-md">
                            <QRCodeCanvas
                                value={window.location.href + userProfile?.userAddr}
                                size={256}
                                level="H"
                                className="rounded-md"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <BottomNavigation  />
        </div>
    );
}
