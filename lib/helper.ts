// helper.ts
export const handleApiError = (error: any, toast: (opts: any) => void, t: (key: string) => string) => {
    if (error?.response?.data) {
        toast({
            title: t("tip"),
            description: t(error.response.data.message || "服务器错误"),
            duration: 2000,
        })
        return Promise.resolve(error.response)
    } else {
        toast({
            title: t("tip"),
            description: t("网络错误，请稍后重试"),
            duration: 2000,
        })
        return Promise.reject({
            code: -1,
            message: "网络错误，请稍后重试",
        })
    }
}
