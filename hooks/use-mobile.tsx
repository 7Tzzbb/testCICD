import * as React from "react"

// 移动设备断点（像素）
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // 默认设置为 false，避免服务器端和客户端初始状态不匹配
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
    // 检测是否为移动设备
    const checkIfMobile = () => {
      // 使用媒体查询检测屏幕宽度
      const isMobileView = window.innerWidth < MOBILE_BREAKPOINT
      
      // 检测移动设备的用户代理
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
      
      // 如果是移动设备视图或移动设备，则设置为 true
      setIsMobile(isMobileView || isMobileDevice)
    }
    
    // 初始检测
    checkIfMobile()
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkIfMobile)
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])
  
  // 如果还没有挂载，返回初始状态
  if (!hasMounted) return false
  
  return isMobile
}
