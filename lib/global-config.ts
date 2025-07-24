// "use client"

type ConfigType = {
  [key: string]: any
}

// Browser-compatible platform detection
const PlatformDetection = {
  // Check if code is running in a browser environment
  isBrowser: typeof window !== 'undefined',
  
  // Get the current platform
  get OS() {
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      
      if (/(iphone|ipad|ipod|ios)/i.test(userAgent)) return 'ios';
      if (/android/i.test(userAgent)) return 'android';
      if (/mac/i.test(userAgent)) return 'macos';
      if (/win/i.test(userAgent)) return 'windows';
      if (/linux/i.test(userAgent)) return 'linux';
      
      return 'unknown';
    }
    
    // For server-side rendering
    return null;
  }
}

class GlobalConfig {
  private static instance: GlobalConfig
  private config: ConfigType = {}
  
  private constructor() {
    this.initEnvironment()
  }

  public static getInstance(): GlobalConfig {
    if (!GlobalConfig.instance) {
      GlobalConfig.instance = new GlobalConfig()
    }
    return GlobalConfig.instance
  }

  private initEnvironment() {
    // 判断运行环境
    const isBrowser = PlatformDetection.isBrowser
    const platform = isBrowser ? (PlatformDetection.OS || 'browser') : 'server'
    
    this.config = {
      isBrowser,
      isApp: !isBrowser && platform !== 'server',
      platform,
      // 其他默认配置
      apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || '',
      storagePrefix: 'dapp_'
    }
  }

  public get(key: string): any {
    return this.config[key]
  }

  public set(key: string, value: any): void {
    this.config[key] = value
  }

  public getAll(): ConfigType {
    return { ...this.config }
  }

  public clear(): void {
    this.config = {}
    this.initEnvironment()
  }
}

export const globalConfig = GlobalConfig.getInstance()