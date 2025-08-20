import axios, {AxiosInstance} from "axios";
import {ApiResponse} from "./types";
import {getAuthToken} from "./utils";
import useWalletStore from "@/store/useWalletStore";

// const API_BASE_URL = 'http://47.130.145.91:8081/api';
// const API_BASE_URL = 'http://18.140.71.200:8080/api';
// const API_BASE_URL = 'http://192.168.1.17:8080/api';
import {API_BASE_URL} from './config'
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {'Content-Type': 'application/json'},
    timeout: 15000,
});


apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = token;
    }
    return config;
});

apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.data) {
            const { code } = error.response.data;
            if (code === "10001") {
                localStorage.setItem("isExpire", "1");
                localStorage.removeItem("token");
                localStorage.removeItem("userInfo");

                const walletCacheKey = "walletTokenMap";
                const address = localStorage.getItem("walletPublicKey");
                if (address) {
                    const cache = JSON.parse(localStorage.getItem(walletCacheKey) || "{}");
                    delete cache[address];
                    localStorage.setItem(walletCacheKey, JSON.stringify(cache));
                }

                useWalletStore.getState().setExpireStatus(1);
            }
            return Promise.resolve(error.response);
        } else {
            return Promise.reject({ code: -1, message: "网络错误，请稍后重试" });
        }
    }
);


export const login = async (params: {
    userAddr: string;
    message: string;
    signature: string
}): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.post<ApiResponse<any>>('/auth/login', params);
    return data;
};
// 获得积分
export const assetStatementRecordAddOut = async (params: {
    assetId: string;
    uaddr: string;
    transactionValue: string
}): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.post<ApiResponse<any>>('/asset_statement_record/add_out', params);
    return data;
};
// 推送积分
export const assetStatementRecordAddInto = async (params: {
    assetId: string
}): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.post<ApiResponse<any>>('/asset_statement_record/add_into', params);
    return data;
};

export const register = async (params: {
    userAddr: string;
    message: string;
    signature: string
}): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.post<ApiResponse<any>>('/auth/register', params);
    return data;
};
// 汇率
export const exchangeRate = async (currency: any): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.post<ApiResponse<any>>(`/rates/exchange-rates?currency=${currency}`);
    return data;
};

export const getProfile = async (): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.get<ApiResponse<any>>('/user/info');
    return data;
};
// 转入转出
export const assetStatementRecordAdd = async (params: {
    isPrimary: boolean;
    type: string;
    value: string
}): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.post<ApiResponse<any>>('/asset_statement_record/add', params);
    return data;
};
// 走势图
export const priceTrend = async (assetsId: string, range: string): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.get<ApiResponse<any>>(`/assets/price-trend?assetsId=${assetsId}&range=${range}`);
    return data;
};
// 修改二级
export const changeUserTwoPassWordUpd = async (pwdOld: string, pwdOne: string, pwdTwo: string): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.post<ApiResponse<any>>(`/user/upd?pwdOld=${pwdOld}&pwdOne=${pwdOne}&pwdTwo=${pwdTwo}`);
    return data;
};
// 重置二级
export const changePassWordReset = async (email: string, code: string, pwdOne: string, pwdTwo: string): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.post<ApiResponse<any>>(`/user/reset?email=${email}&code=${code}&pwdOne=${pwdOne}&pwdTwo=${pwdTwo}`);
    return data;
};
export const getContactMethodList = async (): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.get<ApiResponse<any>>('/contact-method/list');
    return data;
};

export const contactMthodAdd = async (params: {
    isPrimary: boolean;
    type: string;
    value: string
}): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.post<ApiResponse<any>>('/contact-method/add', params);
    return data;
};

export const contactMthodUpdate = async (params: {
    isPrimary: boolean;
    type: string;
    value: string
}, id: string): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.put<ApiResponse<any>>(`/contact-method/${id}`, params);
    return data;
};

export const contactMthodDelete = async (id: string): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.delete<ApiResponse<any>>(`/contact-method/${id}`);
    return data;
};

export const contactMthodDetail = async (id: string): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.get<ApiResponse<any>>(`/contact-method/${id}`);
    return data;
};

export const sendSmsCode = async (params: { email: string, flag: boolean }): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.post<ApiResponse<any>>('/user/send', null, {
        params: {
            email: params.email,
            flag: params.flag
        }
    });
    return data;
};

export const verifySmsCode = async (params: { email: string; code: string }): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.post<ApiResponse<any>>('/user/verify', null, {
        params: {
            email: params.email,
            code: params.code
        }
    });
    return data;
};

export const setLevel2Password = async (params: { pwdOne: string; pwdTwo: string }): Promise<ApiResponse<any>> => {
    const {data} = await apiClient.post<ApiResponse<any>>('/user/passwordTwo', null, {
        params: {
            pwdOne: params.pwdOne,
            pwdTwo: params.pwdTwo
        }
    });
    return data;
};

export const getActivityList = async (page: number, size: number, languages: string): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/activity/list', {params: {page, size, languages}});
    return data;
};
// 帮助中心
export const getHelpCenterList = async (page: number, size: number, languages: string): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/help_center/pageList', {params: {page, size, languages}});
    return data;
};
export const getPlatformAnnouncements = async (
    page: number,
    size: number,
    languages: string
): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>(`/notice/list?page=${page}&size=${size}&languages=${languages}`);
    return data;
};

export const getPaymentMethodList = async (): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/payment-method/list');
    return data;
};

export const getPaymentMethodListType = async (type: string): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>(`/payment-method/list/${type}`);
    return data;
};

export const getPaymentMethodListDetail = async (id: string): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>(`/payment-method/${id}`);
    return data;
};

export const PaymentMethodAdd = async (params: { type: number; name: string; details: string }): Promise<any[]> => {
    const {data} = await apiClient.post<any[]>('/payment-method/add', params);
    return data;
};

export const PaymentMethodUpdate = async (params: {
    type: number;
    name: string;
    details: string
}, id: string): Promise<any[]> => {
    const {data} = await apiClient.put<any[]>(`/payment-method/upd/${id}`, params);
    return data;
};

export const PaymentMethodDelete = async (id: string): Promise<any[]> => {
    const {data} = await apiClient.delete<any[]>(`/payment-method/del/${id}`);
    return data;
};

export const getAssetsList = async (): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/rwa_assets/list');
    return data;
};

export const getAssetsPageList = async (page: number, size: number, type?: any, keywords?: any): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/assets/pageList', {params: {page, size, type, keywords}});
    return data;
};
// 用户付款验证
export const authVerification = async (userAddr: number): Promise<any[]> => {
    const {data} = await apiClient.post<any[]>(`/auth/verification?userAddr=${userAddr}`);
    return data;
};
export const getAssetsDetail = async (id: string): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>(`/assets/detail/${id}`);
    return data;
};

// 最近交易
export const getRecentTransaction = async (page: number, size: number, type?: any): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/orders_transaction/recentTransaction',
        {params: {page, size, type}});
    return data;
};

export const getOrderPageList = async (page: number, size: number, type: string, assetsId?: string): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/order/pageList', {params: {page, size, type, assetsId}});
    return data;
};

export const getOrderMarketPageList = async (page: number, size: number, type: string | undefined, assetsId: any): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/order/marketPageList', {params: {page, size, type, assetsId}});
    return data;
};

export const orderAdd = async (params: {
    assetsId: number;
    type: number;
    price: number;
    amount: number;
    isSplit: number;
    minimumAmount: number;
    total: number;
    contactMethods: string;
    paymentMethods: string;
    autoManaged: number;
    remark: string;
}): Promise<any[]> => {
    const {data} = await apiClient.post<any[]>('/order/add', params);
    return data;
};

export const getOrderTransactionPageList = async (page: number, size: number, type: string): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/order/pageList', {params: {page, size, type}});
    return data;
};

export const getArbitrationRecordPageList = async (page: number, size: number): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/arbitration_record/pageList', {params: {page, size}});
    return data;
};

export interface UserProfile {
    id: number;
    userId: number;
    userName: string;
    userAddr: string;
    systemAddr: string;
    email: string;
    phone: string;
    nickname: string;
    avatar: string;
    status: string;
    creditScore: number;
    activityLevel: number;
    lastLoginTime: string;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
}

// 去付款
export const payOrderTransaction = async (id: any): Promise<any[]> => {
    const {data} = await apiClient.put<any[]>(`/orders_transaction/upd/${id}`);
    return data;
};
// getNonce
export const authNonce = async (address: string): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>(`/auth/nonce?address=${address}`);
    return data;
};
// 用户付款
export const authVerify = async (params: {
    userAddr: string;
    signature: string;
    message: string;
}): Promise<any[]> => {
    const {data} = await apiClient.post<any[]>('/auth/verify', params);
    return data;
};
export const getOrderTransactionDetail = async (id: string): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>(`/orders_transaction/${id}`);
    return data;
};
export const getNoticeDetail = async (id: string): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>(`/notice/detail/${id}`);
    return data;
};
export const arbitrationAdd = async (params: {
    orderId: string;
    assetsId: string;
    price: string;
    amount: string;
    total: string;
    type: number;
}): Promise<any[]> => {
    const {data} = await apiClient.post<any[]>('/orders_transaction/add', params);
    return data;
};

export const getOrdersTransactionPageList = async (page: number, size: number, status?: number): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/orders_transaction/pageList', {params: {page, size, status}});
    return data;
};

export const getAssetStatementPageList = async (page: number, size: number, type?: string): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/asset_statement/pageList', {params: {page, size, type}});
    return data;
};

export const getAssetStatementDetail = async (id: any): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>(`/asset_statement/detail/${id}`);
    return data;
};

export const cancelOrderTransaction = async (id: string): Promise<any[]> => {
    const {data} = await apiClient.put<any[]>(`/orders_transaction/cancel/${id}`);
    return data;
};
export const cancelOrder = async (order: string): Promise<any[]> => {
    const {data} = await apiClient.put<any[]>(`/order/cancel/${order}`);
    return data;
};
export const updateOrderTransactionStatus = async (id: string): Promise<any[]> => {
    const {data} = await apiClient.put<any[]>(`/orders_transaction/updStatus/${id}`);
    return data;
};

// export const uploadFile = async (params: { base64: string }): Promise<any[]> => {
//   const { data } = await apiClient.post<any[]>('/file/upload', params);
//   return data;
// };
export const uploadFile = async (file: File): Promise<any[]> => {
    const formData = new FormData()
    formData.append("file", file)

    const {data} = await apiClient.post<any[]>("/file/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    if (data.code == 0 && data.data?.fileUrl) {
        data.data.url = API_BASE_URL + data.data.fileUrl
    }
    return data
}

export const arbitrationRecordAdd = async (params: {
    transactionsId: string;
    initiatorId: number;
    respondentId: number;
    arbitrationDetails: string;
    arbitrationImg: any;
}): Promise<any[]> => {
    const {data} = await apiClient.post<any[]>('/arbitration_record/add', params);
    return data;
};

export const getOrderCount = async (): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/order/count');
    return data;
};

export const getAssetStatementRecordPageList = async (page: number, size: number, type?: number, assetId?: any): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/asset_statement_record/pageList', {
        params: {
            page,
            size,
            type,
            assetId
        }
    });
    return data;
};

export const getOrdersTransactionPageRecord = async (page: number, size: number, type?: number, assetsId?: number): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/orders_transaction/pageRecord', {params: {page, size, type, assetsId}});
    return data;
};

export const assetStatementTotalAsset = async (): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/asset_statement/totalAsset');
    return data;
};
export const getUserUid = async (addr: any): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>(`/user/bind?addr=${addr}`);
    return data;
};

export const getHotTransaction = async (page: number, size: number): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>('/orders_transaction/hotTransaction', {params: {page, size}});
    return data;
};

export const getOrdersDetailInfo = async (id: string): Promise<any[]> => {
    const {data} = await apiClient.get<any[]>(`/order/detail/${id}`);
    return data;
};
