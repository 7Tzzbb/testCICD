"use client"

import {useState, useEffect} from "react"
import type {ethers} from "ethers"
import {Card, CardContent} from "@/components/ui/card"
import {History, ExternalLink} from "lucide-react"
import {Skeleton} from "@/components/ui/skeleton"
import {useLanguage} from "@/lib/i18n/language-context";

interface Transaction {
    hash: string
    from: string
    to: string
    value: string
    timestamp: number
}

interface TransactionHistoryProps {
    account: string
    provider: ethers.BrowserProvider | null
}

export function TransactionHistory({account, provider}: TransactionHistoryProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const {t} = useLanguage()
    useEffect(() => {
        // 在实际应用中，您需要使用区块链浏览器API或其他服务来获取交易历史
        // 这里我们只是模拟一些交易数据
        const mockTransactions = [
            {
                hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
                from: account,
                to: "0x1234567890123456789012345678901234567890",
                value: "0.1",
                timestamp: Date.now() - 3600000 * 2,
            },
            {
                hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
                from: "0x0987654321098765432109876543210987654321",
                to: account,
                value: "0.5",
                timestamp: Date.now() - 3600000 * 24,
            },
            {
                hash: "0x9876543210abcdef9876543210abcdef9876543210abcdef9876543210abcdef",
                from: account,
                to: "0x5432109876543210987654321098765432109876",
                value: "0.01",
                timestamp: Date.now() - 3600000 * 48,
            },
        ]

        setTimeout(() => {
            setTransactions(mockTransactions)
            setIsLoading(false)
        }, 1000)
    }, [account])

    const formatTime = (timestamp: number) => {
        return new Date(timestamp).toLocaleString()
    }

    const shortenAddress = (address: string) => {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    }

    return (
        <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center space-y-2">
                <div className="p-2 bg-primary/10 rounded-full">
                    <History className="w-8 h-8 text-primary"/>
                </div>
                <h3 className="text-xl font-semibold">{t('transactionHistory')}</h3>
            </div>

            {isLoading ? (
                <div className="space-y-3">
                    <Skeleton className="h-20 w-full"/>
                    <Skeleton className="h-20 w-full"/>
                    <Skeleton className="h-20 w-full"/>
                </div>
            ) : transactions.length > 0 ? (
                <div className="space-y-3">
                    {transactions.map((tx) => (
                        <Card key={tx.hash} className="overflow-hidden">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${tx.from === account ? "text-red-500" : "text-green-500"}`}>
                    {tx.from === account ? "发送" : "接收"}
                  </span>
                                    <span className="text-xs text-muted-foreground">{formatTime(tx.timestamp)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold">{tx.value} ETH</span>
                                    <a
                                        href={`https://etherscan.io/tx/${tx.hash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary flex items-center text-xs"
                                    >
                                        查看 <ExternalLink className="ml-1 h-3 w-3"/>
                                    </a>
                                </div>
                                <div className="mt-2 text-xs text-muted-foreground">
                                    {tx.from === account ? (
                                        <span>发送至: {shortenAddress(tx.to)}</span>
                                    ) : (
                                        <span>来自: {shortenAddress(tx.from)}</span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-muted-foreground">没有找到交易记录</div>
            )}
        </div>
    )
}
