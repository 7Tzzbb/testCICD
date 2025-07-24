"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConnectWallet } from "./connect-wallet"
import { TokenBalance } from "./token-balance"
import { TransactionHistory } from "./transaction-history"
import { SendTransaction } from "./send-transaction"
import {useLanguage} from "@/lib/i18n/language-context";

export default function MobileDapp() {
  const [account, setAccount] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [balance, setBalance] = useState<string>("0")
  const [isConnecting, setIsConnecting] = useState(false)
  // 检查是否有以太坊提供者
  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(provider)

        // 检查是否已经授权
        const accounts = await provider.listAccounts()
        if (accounts.length > 0) {
          const account = accounts[0].address
          setAccount(account)
          const balance = await provider.getBalance(account)
          setBalance(ethers.formatEther(balance))
        }
      } else {
        console.log("请安装MetaMask!")
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const connectWallet = async () => {
    try {
      setIsConnecting(true)
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(provider)

        // 请求用户连接
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        if (accounts.length > 0) {
          const account = accounts[0]
          setAccount(account)
          const balance = await provider.getBalance(account)
          setBalance(ethers.formatEther(balance))
        }
      } else {
        alert("请安装MetaMask!")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">移动DAPP</CardTitle>
          <CardDescription className="text-center">连接您的钱包，查看余额并发送交易</CardDescription>
        </CardHeader>
        <CardContent>
          {!account ? (
            <ConnectWallet connectWallet={connectWallet} isConnecting={isConnecting} />
          ) : (
            <Tabs defaultValue="balance" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="balance">余额</TabsTrigger>
                <TabsTrigger value="send">发送</TabsTrigger>
                <TabsTrigger value="history">历史</TabsTrigger>
              </TabsList>
              <TabsContent value="balance">
                <TokenBalance account={account} balance={balance} />
              </TabsContent>
              <TabsContent value="send">
                <SendTransaction provider={provider} account={account} />
              </TabsContent>
              <TabsContent value="history">
                <TransactionHistory account={account} provider={provider} />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
        <CardFooter className="flex justify-center text-xs text-muted-foreground">
          {account ? `已连接: ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : "未连接钱包"}
        </CardFooter>
      </Card>
    </div>
  )
}
