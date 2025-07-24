import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

let authToken: string | null = null
let userInfo: any | null = null

export function setAuthToken(token: string) {
  authToken = token
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token)
  }
}
export function getAuthToken() {
  if (typeof window !== 'undefined' && !authToken) {
    authToken = localStorage.getItem('authToken')
  }
  return authToken
}

export function clearAuthToken() {
  authToken = null
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setUserInfo(userInfo: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userLoginInfo', JSON.stringify(userInfo));
  }
}

export function getUserInfo() {
  if (typeof window !== 'undefined' && !userInfo) {
    userInfo = localStorage.getItem('userLoginInfo')
  }
  return userInfo
}

export function clearUserInfo() {
  userInfo = null
}

/**
 * 防抖函数
 * @param fn 需要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay: number = 1000): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timer: NodeJS.Timeout | null;
  let pendingPromise: Promise<ReturnType<T>> | null;
  
  return function(...args: Parameters<T>): Promise<ReturnType<T>> {
    if (pendingPromise) {
      return pendingPromise;
    }
    
    pendingPromise = new Promise<ReturnType<T>>((resolve, reject) => {
      if (timer) {
        clearTimeout(timer);
      }
      
      timer = setTimeout(async () => {
        try {
          const result = await fn(...args);
          resolve(result);
          pendingPromise = null;
        } catch (error) {
          reject(error);
          pendingPromise = null;
        }
      }, delay);
    });
    
    return pendingPromise;
  };
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    // Fallback for older browsers or non-secure contexts
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in Microsoft Edge.
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
      document.body.removeChild(textarea);
      return false;
    }
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Async: Could not copy text: ', err);
    return false;
  }
}

// 24小时
export function getTodayRangeFormatted() {
  const now = new Date()

  const pad = (n: number) => n.toString().padStart(2, '0')

  const format = (date: Date) =>
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`

  const start = new Date(now)
  start.setHours(0, 0, 0, 0)

  const end = new Date(now)
  end.setHours(23, 59, 59, 999)

  return {
    startDate: format(start),
    endDate: format(end),
  }
}
// 7天
export function getLast7DaysRange() {
  const pad = (n: number) => n.toString().padStart(2, '0')
  const format = (date: Date) =>
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`

  const now = new Date()

  const start = new Date(now)
  start.setDate(start.getDate() - 6)
  start.setHours(0, 0, 0, 0)

  const end = new Date(now)
  end.setHours(23, 59, 59, 999)

  return {
    startDate: format(start),
    endDate: format(end),
  }
}

// 30天
export function getLast30DaysRange() {
  const pad = (n: number) => n.toString().padStart(2, '0')
  const format = (date: Date) =>
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`

  const now = new Date()

  // 起始时间：30天前的 00:00:00
  const start = new Date(now)
  start.setDate(start.getDate() - 29) // 包含今天一共30天
  start.setHours(0, 0, 0, 0)

  // 结束时间：今天的 23:59:59
  const end = new Date(now)
  end.setHours(23, 59, 59, 999)

  return {
    startDate: format(start),
    endDate: format(end),
  }
}
