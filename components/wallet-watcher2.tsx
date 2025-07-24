"use client";

import { useEffect, useRef } from "react";
import { ethers } from "ethers";
import { getAuthToken, setAuthToken } from "@/lib/utils";
import { register } from "@/lib/api";
import useWalletStore from "@/store/useWalletStore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n/language-context";

const walletCacheKey = "walletTokenMap";

// 获取缓存中的钱包信息
function getWalletCache(): Record<string, { token: string; userData: any }> {
    try {
        return JSON.parse(localStorage.getItem(walletCacheKey) || "{}");
    } catch {
        return {};
    }
}

// 设置缓存中的钱包信息
function setWalletCache(address: string, token: string, userData: any) {
    const cache = getWalletCache();
    cache[address] = { token, userData };
    localStorage.setItem(walletCacheKey, JSON.stringify(cache));
}

// 获取指定地址的缓存钱包信息
function getWalletTokenInfo(address: string) {
    const cache = getWalletCache();
    return cache[address];
}

export function WalletWatcher() {
    const { toast } = useToast();
    const {
        setAddress,
        setChainId,
        setSignature,
        setUserData,
        reset,
        isExpire,
        setExpireStatus
    } = useWalletStore();

    const currentAddressRef = useRef<string | null>(null);
    const isConnectingRef = useRef(false); // 防止重复连接
    const isAddressChangedRef = useRef(false); // 防止重复处理账户切换
    const router = useRouter();
    const { t } = useLanguage();

    // 监听 isExpire 状态变化
    useEffect(() => {
        const address = localStorage.getItem("walletPublicKey");
        if (isExpire === 1 && address) {
            router.push("/profile");
            // 重新触发注册
            void reRegister(address);
        }
    }, [isExpire]);

    // 注册
    const reRegister = async (address: string) => {
        try {
            const ethereum = window.ethereum;
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            const timestamp = Date.now();
            const message = `Welcome to DAPP!\n\nPlease sign this message to authenticate.\n\nWallet: ${address}\nNetwork: TokenPocket\nTimestamp: ${timestamp}`;
            const signature = await signer.signMessage(message);

            setSignature(signature);

            const res = await register({
                userAddr: address,
                message,
                signature,
            });

            if (res.code == 0) {
                const token = "Bearer " + res.data.accessToken;
                setAuthToken(token);
                setUserData(res.data);
                localStorage.setItem("token", token);
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                localStorage.setItem("userId", res.data.userId);
                localStorage.setItem('isExpire', '0');

                setWalletCache(address, token, res.data);
                // 恢复状态
                setExpireStatus(0);
            }
        } catch (err) {
            console.error("重新注册失败：", err);
        }
    };

    useEffect(() => {
        const ethereum = window.ethereum;
        if (!ethereum) {
            console.warn("未检测到钱包扩展");
            return;
        }

        const connectAndSign = async () => {
            if (isConnectingRef.current) return; // 防止重复连接
            isConnectingRef.current = true; // 设置连接中状态

            try {
                const provider = new ethers.providers.Web3Provider(ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                const chainId = await provider.send("eth_chainId", []);

                if (address !== currentAddressRef.current && !isAddressChangedRef.current) {
                    console.log("检测到新地址:", address);

                    router.push("/profile");
                    reset();
                    setAddress(address);
                    setChainId(chainId);
                    currentAddressRef.current = address;
                    localStorage.setItem("walletPublicKey", address);

                    const cached = getWalletTokenInfo(address);
                    if (cached?.token && cached.userData) {
                        setAuthToken(cached.token);
                        setUserData(cached.userData);
                        localStorage.setItem("token", cached.token);
                        localStorage.setItem("userInfo", JSON.stringify(cached.userData));
                        return;
                    }

                    const timestamp = Date.now();
                    const message = `Welcome to DAPP!\n\nPlease sign this message to authenticate.\n\nWallet: ${address}\nNetwork: TokenPocket\nTimestamp: ${timestamp}`;
                    const signature = await signer.signMessage(message);
                    setSignature(signature);

                    const res = await register({
                        userAddr: address,
                        message,
                        signature,
                    });

                    if (res.code == 0) {
                        const token = "Bearer " + res.data.accessToken;
                        setAuthToken(token);
                        setUserData(res.data);
                        localStorage.setItem("token", token);
                        localStorage.setItem("userInfo", JSON.stringify(res.data));
                        localStorage.setItem("userId", res.data.userId);
                        setWalletCache(address, token, res.data);
                        setExpireStatus(0);
                        localStorage.setItem('isExpire', '0');
                    } else {
                        toast({
                            description: t(res.message),
                            duration: 1500,
                        });
                    }

                    // 设置已处理状态，防止再次触发
                    isAddressChangedRef.current = true;
                }
            } catch (err) {
                console.error("连接钱包失败:", err);
            } finally {
                isConnectingRef.current = false; // 连接完成后重置状态
                // 重置地址切换状态
                isAddressChangedRef.current = false;
            }
        };

        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
                reset();
                return;
            }

            // 防止重复触发两次认证请求
            if (isConnectingRef.current || isAddressChangedRef.current) return;

            connectAndSign(); // 仅在账户变化时调用一次
        };

        const handleChainChanged = (chainId: string) => {
            setChainId(chainId);
        };

        // 绑定事件，但只在加载时一次性绑定
        if (ethereum.removeListener) {
            ethereum.removeListener("accountsChanged", handleAccountsChanged);
            ethereum.removeListener("chainChanged", handleChainChanged);
        }

        ethereum.on("accountsChanged", handleAccountsChanged);
        ethereum.on("chainChanged", handleChainChanged);

        // 初始连接
        connectAndSign(); // 只在组件加载时调用一次

        return () => {
            ethereum.removeListener("accountsChanged", handleAccountsChanged);
            ethereum.removeListener("chainChanged", handleChainChanged);
        };
    }, []); // 初次加载时运行一次

    return null;
}
