import {tr} from 'date-fns/locale/tr'

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    output: 'export',             // ✅ 这是重点！
    trailingSlash: true,         // ✅ 如果你不想要结尾 `/`
    images: {
        unoptimized: true,
    },
    // 添加以下配置以解决 hydration 错误
    reactStrictMode: false,

    // 编译输出目录
    distDir: '.next',

    // 启用 source map（生产环境调试）
    productionBrowserSourceMaps: false
}

export default nextConfig
