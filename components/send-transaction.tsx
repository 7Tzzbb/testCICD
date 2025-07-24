"use client"

import type React from "react"

import {useState} from "react"
import {ethers} from "ethers"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Send, AlertCircle, CheckCircle2} from "lucide-react"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"

interface SendTransactionProps {
    provider: ethers.BrowserProvider | null
    account: string
}

export function SendTransaction({provider, account}: SendTransactionProps) {
    const [recipient, setRecipient] = useState("")
    const [amount, setAmount] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleSendTransaction = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!provider) return

        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            // 验证地址
            if (!ethers.isAddress(recipient)) {
                throw new Error("无效的接收地址")
            }

            // 验证金额
            if (isNaN(Number.parseFloat(amount)) || Number.parseFloat(amount) <= 0) {
                throw new Error("无效的金额")
            }

            const signer = await provider.getSigner()
            const tx = await signer.sendTransaction({
                to: recipient,
                value: ethers.parseEther(amount),
            })

            setSuccess(`交易已提交! 交易哈希: ${tx.hash}`)
            setRecipient("")
            setAmount("")
        } catch (err: any) {
            setError(err.message || "交易失败")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center space-y-2">
                <div className="p-2 bg-primary/10 rounded-full">
                    <Send className="w-8 h-8 text-primary"/>
                </div>
                <h3 className="text-xl font-semibold">发送交易</h3>
            </div>

            <form onSubmit={handleSendTransaction} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="recipient">接收地址</Label>
                    <Input
                        id="recipient"
                        placeholder="0x..."
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="amount">金额 (ETH)</Label>
                    <Input
                        id="amount"
                        type="number"
                        step="0.0001"
                        min="0"
                        placeholder="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "处理中..." : "发送"}
                </Button>
            </form>

            {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertTitle>错误</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="bg-green-50 text-green-800 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600"/>
                    <AlertTitle className="text-green-800">成功</AlertTitle>
                    <AlertDescription className="text-green-700">{success}</AlertDescription>
                </Alert>
            )}
        </div>
    )
}
