// 定义所有支持的语言
export type Language = "zh" | "en" | "ar" | "ja" | "ko"

// 定义翻译键的类型
// 在 Translations 接口中添加
export interface Translations {
    // 通用
    appName: string
    cancel: string
    confirm: string
    save: string
    edit: string
    delete: string
    loading: string
    success: string
    error: string
    // 仲裁相关
    arbitrationOrderId: string
    arbitratorId: string
    respondent: string
    arbitrationDetails: string
    // 导航
    home: string
    market: string
    wallet: string
    orders: string
    assets: string
    profile: string

    profilePage: string
    accountSecurity: string
    paymentMethods: string
    contactMethods: string
    aboutUs: string
    logout: string
    editProfile: string
    verifyNow: string
    availableBalance: string
    frozenAssets: string
    viewWallet: string
    creditScore: string
    activityScore: string

    // 首页
    search: string
    recommend: string
    points: string
    rwa: string
    hot: string
    platformAnnouncement: string
    noPlatformAnnouncement: string
    hotActivities: string
    noHotActivities: string
    hotTransactions: string
    viewAll: string
    newUser: string
    limited: string
    system: string
    activity: string

    // 钱包
    walletCenter: string
    totalAssets: string
    deposit: string
    withdraw: string
    transfer: string
    walletAddress: string
    cryptoCurrency: string
    fiat: string
    paymentMethod: string
    addCrypto: string
    addFiat: string
    addPayment: string

    // 会员等级
    memberLevels: string
    memberLevelSettings: string
    createMemberLevel: string
    editMemberLevel: string
    memberLevelDetails: string
    basicInfo: string
    levelBenefits: string
    previewEffect: string
    levelName: string
    pointsRequired: string
    levelColor: string
    levelIcon: string
    activeStatus: string
    enabled: string
    disabled: string
    pointsMultiplier: string
    discountRate: string
    times: string
    percent: string

    // 会员权益
    pointsAcceleration: string
    exclusiveDiscount: string
    birthdayGift: string
    dedicatedService: string
    freeShipping: string
    priorityPurchase: string
    addCustomBenefit: string


    // 提示信息
    levelOrderTip: string
    memberAutoUpgradeTip: string
    disableLevelTip: string
    deleteLevelTip: string
    previewTip: string

    // 商户中心
    merchantCenter: string
    merchantId: string
    pointsIssued: string
    memberCount: string
    managePoints: string
    dataCenter: string
    manage: string
    activities: string
    data: string

    // 订单相关
    publishOrder: string
    orderType: string
    buyOrder: string
    sellOrder: string
    pointsType: string
    pointsQuantity: string
    unitPrice: string
    totalAmount: string
    orderDescription: string
    negotiable: string
    expiration: string
    publishNewOrder: string
    orderDetail: string
    immediatelyBuy: string
    immediatelySell: string
    makeOffer: string
    contactSeller: string
    contactBuyer: string
    transactionNotes: string
    orderStatus: string
    active: string
    completed: string
    cancelled: string

    // 错误提示

    'common.success': string
    'common.fail': string
    'error.login_failed': string
    'error.unauthorized': string
    'error.token_expired': string
    'error.invalid_token': string
    'error.account_locked': string
    'error.user_not_found': string
    'error.user_exists': string
    'error.invalid_password': string
    'error.invalid_email': string
    'error.param_missing': string
    'error.validation_failed': string
    'error.method_not_allowed': string
    'error.order_not_found': string
    'error.order_already_paid': string
    'error.order_expired': string
    'error.payment_failed': string
    'error.insufficient_balance': string
    'error.payment_method_invalid': string
    'error.too_frequent': string
    'error.operation_limited': string
    'error.system_error': string
    'error.database_error': string
    'error.service_unavailable': string
    'error.miner.not_found': string
    'error.miner.insufficient_power': string
    'error.miner.upgrade_locked': string
    'error.token.symbol_exists': string
    'error.token.invalid_supply': string
    'error.token.creation_failed': string
    'error.node.already_applied': string
    'error.node.not_eligible': string
    'error.node.capacity_full': string
    'error.wallet.not_bound': string
    'error.wallet.invalid_address': string
    'error.wallet.network_mismatch': string
    'error.task.not_found': string
    'error.task.already_completed': string
    'error.task.not_unlocked': string
    'error.recharge.failed': string
    'error.recharge.min_amount': string
    'error.recharge.pending': string
    'error.withdrawal.failed': string
    'error.withdrawal.exceeds_limit': string
    'error.withdrawal.insufficient_balance': string
    'error.buy_order.invalid_price': string
    'error.buy_order.quota_exceeded': string
    'error.sell_order.insufficient_token': string
    'error.sell_order.invalid_quantity': string
    'error.invite.invalid_code': string
    'error.invite.already_bound': string
    'error.level.upgrade_denied': string
    'error.level.not_configured': string
    'error.rebate.not_eligible': string
    'error.rebate.calculation_error': string
    'error.rebate.distribution_failed': string
    'error.upload.file_too_large': string
    'error.upload.unsupported_format': string
    'error.upload.failed': string
    'error.kyc.pending': string
    'error.kyc.rejected': string
    'error.kyc.required': string
    'error.captcha.invalid': string
    'error.captcha.expired': string
    'error.captcha.required': string
    'error.risk.blacklisted': string
    'error.risk.region_blocked': string
    'error.risk.device_change': string
    'error.security.password_leaked': string
    'error.security.ip_blocked': string
    'error.security.twofa_failed': string
    'error.chain.gas_insufficient': string
    'error.chain.network_error': string
    'error.chain.tx_failed': string
    'error.chain.nonce_conflict': string
    'error.notify.email_failed': string
    'error.notify.sms_failed': string
    'error.notify.rate_limited': string
    //
    notSet: string
    copied: string
    walletCopied: string
    userIdCopied: string
    rwaMarket: string
    noMore: string           // 已经到底啦！
    buying: string
    selling: string
    pendingPayment: string
    pendingRelease: string
    noOrders: string
    noArbitrationOrders: string

    allOrders: string
    arbitrationOrders: string
    arbitrationRecords: string
    arbitrationCount: string
    totalCompletedOrders: string
    sellOrderCount: string
    buyOrderCount: string
    totalOrders: string
    myOrders: string
    confirmRelease: string               // 确认放行
    confirmReleaseOrderQuestion: string  // 确认放行订单？
    goToPay: string                      // 去付款

    confirmReleasePrompt: string              // 您确定要放行此订单吗？此操作不可撤销。
    confirmCancel: string                     // 确认取消
    confirmCancelPrompt: string               // 您确定要取消此订单吗？此操作不可撤销。
    cancelOrder: string                       // 取消订单
    contactInfo: string                       // 联系方式
    orderNumber: string                       // 订单号
    time: string                              // 时间
    confirmCancelOrderQuestion: string // 确认取消订单？
    minBuy: string         // 最低买入
    minSell: string
    amount: string         // 数量
    price: string          // 价格
    total: string          // 总额
    placeBuyOrder: string     // 挂买
    placeSellOrder: string    // 挂卖

    buy: string
    sell: string
    back: string
    details: string

    totalAmounts: string
    orderInfo: string
    createdTime: string
    enterQuantity: string

    dataMissing: string

    sellSuccess: string
    buySuccess: string

    copiedToClipboard: string
    paymentConfirmedWaitSeller: string
    bankCard: string

    phoneNumber: string
    email: string
    socialMedia: string
    pleaseEnterAppealContent: string
    appealSubmitted: string
    submitFailedRetry: string
    orderNotExist: string
    pleaseIn: string
    completePayment: string

    payment: string
    paymentConfirmed: string

    applyArbitration: string
    describeProblemWithEvidence: string
    appealContent: string
    describeProblemInDetail: string
    submitting: string
    submitAppeal: string
    tip: string
    viewMorePoints: string
    viewMoreRWA: string
    processing: string
    postBuyRequest: string
    importantNotice: string


    enterPrice: string
    buyRequest: string
    minAskPrice: string
    maxAskPrice: string
    highestMarketBuyPrice: string
    pleaseEnterBuyPrice: string
    buyQuantity: string
    feeRate: string
    actualReceivedAmount: string
    totalAmountPayable: string

    minTransactionAmount: string
    minAmountLimitTip: string
    supportedPayment: string


    buyWillCharge: string
    feeSuffix: string

    enableEscrowTip: string
    escrowExplanation: string
    remark: string
    buyOrderTip: string
    tradeSuccessTip: string
    ensurePaymentAvailable: string
    pleaseEnterRemark: string
    allowPartialMatch: string
    buyAssets: string
    purchasePostSuccess: string             // 发布求购成功
    purchasePosted: string                  // 已成功发布求购
    pleaseSelectPaymentMethod: string      // 请选择至少一种支付方式
    specifyBuyerPaymentMethod: string      // 您需要指定买家可以使用的支付方式
    enterValidMinQuantity: string           // 请输入有效的最小成交数量
    minQuantityAtLeast100: string            // 最小成交数量必须大于等于100
    minQuantityAtLeast: string            // 最小成交数量必须大于等于100
    enterValidBuyQuantity: string           // 请输入有效的买入数量
    buyQuantityGreaterThan0: string          // 买入数量必须大于0
    enterValidBuyPrice: string               // 请输入有效的买入价格
    buyPriceGreaterThan0: string             // 买入价格必须大于0
    pointsMarket: string        // 积分市场
    pointsName: string          // 积分名称
    change24h: string           // 24h涨跌
    transaction: string         // 成交

    assetPointsPlatform: string                   // 数字积分与积分交易平台
    oneStopAssetPointsPlatformDesc: string       // 一站式数字积分与积分交易平台，支持积分交易、RWA积分管理、钱包功能

    buyAsset: string                    // 求购积分
    sellAsset: string                   // 出售积分
    assetChangeRecord: string           // 积分变动记录
    all: string                         // 全部
    depositWithdraw: string             // 转入/转出
    buySell: string                     // 买入/卖出
    tradeValue: string                  // 交易值
    increaseRate24h: string                   // 24小时涨幅
    frozenAmount: string                // 冻结数量
    valuation: string                   // 估值
    assetAmount: string                 // 积分数量
    assetDetail: string                 // 积分详情

    withdrawAsset: string         // 转出积分
    depositAsset: string          // 转入积分
    changeRecord: string               // 变动记录
    noUSDTChangeRecord: string         // 暂无USDT变动记录

    depositAction: string              // 转入（简写形式）
    withdrawAction: string             // 转出（简写形式）


    enterValidSellPrice: string
    sellPriceGreaterThan0: string
    enterValidSellQuantity: string
    sellQuantityGreaterThanOrEqual1: string
    sellQuantityGreaterThanOrEqual: string
    enterValidMinSellQuantity: string
    minSellQuantityGreaterThanOrEqual1: string
    sellPostSuccess: string
    sellPosted: string

    sellAssetSection: string
    availableSellQuantity: string
    enterUnitPrice: string
    pleaseEnterSellPrice: string
    sellQuantity: string
    minSellQuantity: string
    actualDeductQuantity: string
    totalReceivableAmount: string
    minTransactionQuantity: string
    postSell: string
    sellNoticeBuyerMayAccept: string    // 挂卖单后，买家可以选择接受您的报价
    sellNoticeFundsReceivedAndAsset: string  // 交易成功后，您将收到相应的金额并扣除积分
    sellNoticeServiceFee: string   // 卖出将收取


    refreshSuccess: string                 // 刷新成功
    copySuccess: string                    // 复制成功
    myReceivingAddress: string             // 我的收款地址
    receivingAddress: string               // 收款地址
    pleaseEnterReceivingAddress: string   // 请输入收款地址
    withdrawMinAmount: string              // 转出数量最低1USDT
    withdrawSuccess: string                // 转出成功
    withdrawn: string                      // 已成功转出
    totalAssetValue: string                // 积分总值
    realTimeValuation: string              // 实时估值
    currency: string                       // 货币
    custodyWalletBalance: string           // 托管钱包余额
    assetList: string                      // 积分列表
    onlyTransferBscAssets: string          // 仅向该地址转入BSC/BEP20相关积分
    receivingQRCode: string                // 收款二维码
    share: string                         // 分享
    copy: string                          // 复制
    withdrawBalance: string                // 转出余额
    useBscNetwork: string                  // 请使用BSC网络
    withdrawAmount: string                 // 转出数量
    serviceFee: string                     // 手续费
    withdrawing: string                    // 转出中...
    confirmWithdraw: string                // 确认转出

    securitySettings: string                  // 安全设置
    bindSecurityEmail: string                 // 绑定安全邮箱
    setSecondaryPassword: string              // 设置二级密码
    changeSecondaryPassword: string           // 修改二级密码
    resetSecondaryPassword: string            // 重置二级密码
    bindSecurityEmailSuccess: string          // 您已成功绑定安全邮箱
    setSecondaryPasswordSuccess: string       // 您已设置二级密码

    orderCount: string
    averagePayment: string
    arbitrationRate: string
    minutes: string
    circulation: string
    totalSupply: string
    issuer: string
    pointsDetail: string
    fetchAssetDetailFailed: string
    marketSellLabel: string               // 出售
    marketSellOrderLabel: string          // 出售单
    marketBuyOrderLabel: string           // 求购单
    marketOrders: string           // 市场订单
    supportUSDT: string            // 支持USDT
    incomplete: string        // 未完成
    cancelOrders: string       // 撤销

    myWallet: string                // 我的钱包
    multiChainAssetMgmt: string     // 多链积分管理
    bitcoin: string                 // 比特币

    confirmPayOrderTitle: string         // 确认付款该订单？
    confirmPayOrderContent: string       // 您确定要付款此订单吗？此操作不可撤销。


    enterCardNumber: string
    enterAccountHolder: string
    enterBankName: string
    enterAccountNumber: string
    enterWalletAddress: string

    updateSuccess: string
    addSuccess: string
    deleteSuccess: string

    bankUnionPay: string
    bankWeChat: string
    bankAlipay: string
    eWallet: string

    confirmDeletePaymentMethod: string
    irreversibleDeletePaymentMethod: string
    noPaymentMethod: string

    addPaymentMethod: string
    editPaymentMethod: string

    selectCardType: string
    cardType: string

    accountHolder: string
    bankName: string

    swiftCodeOptional: string
    enterSwiftCode: string

    ibanOptional: string
    enterIban: string

    walletType: string
    selectWalletType: string

    account: string
    enterAccount: string

    currencyType: string
    selectCurrencyType: string

    mainnet: string
    selectMainnet: string

    add: string
    cardNumber: string // 卡号
    addedPaymentMethods: string // 已添加的收款方式

    saveContactFailed: string
    saveErrorRetryLater: string
    contactDeleted: string
    contactDeletedSuccess: string
    confirmDeleteContact: string
    irreversibleDeleteContact: string
    noContactInfo: string
    addContactInfo: string
    editContactInfo: string
    phoneNumbers: string
    enterPhoneNumber: string
    emailAddress: string
    enterEmailAddress: string
    socialType: string
    selectSocialType: string
    saving: string

    phoneMinLength: string
    phoneMaxLength: string
    invalidEmail: string
    accountMinLength: string
    accountMaxLength: string

    connectWallet: string
    connectWalletDescription: string
    connecting: string

    pointCategoryDesc: string
    airlinePoints: string
    mallPoints: string
    hotelPoints: string
    bankPoints: string
    rwaCategoryDesc: string
    goldShares: string
    artworks: string
    realEstateShares: string
    jewelryDiamonds: string

    codeMinLength: string
    codeMaxLength: string
    codeSent: string
    codeSentToEmail: string
    codeFailed: string
    bindSuccess: string
    secureEmailBindSuccess: string
    bindFailed: string
    verifyCode: string
    enterCode: string
    sending: string
    getCode: string
    retryInSeconds: string
    bindSecureEmail: string

    clickToUploadImage: string
    uploadImageTip: string
    uploadScreenshotProof: string
    clickToUploadQrCode: string
    imageFormatTip: string
    paymentQrCode: string
    uploadPaymentCode: string

    countryJapan: string
    countryKorea: string
    countrySG: string
    countryAU: string
    countryUK: string
    countryUSCA: string
    countryCN: string

    selectCountryCode: string
    countryCode: string

    // 错误提示（扩展部分）
    "error.password_is_inconsistent_twice": string
    "error.asset_was_not_found": string
    "error.order_type_is_incorrect": string
    "error.number_of_assets_is_insufficient": string
    "error.pending_buy_order_has_reached_its_maximum_value": string
    "error.minimum_volume_cannot_be_empty": string
    "error.order_does_not_exist": string
    "error.order_does_not_exist_or_has_a_status_that_cannot_be_cancelled": string
    "error.cancellations_are_not_possible": string
    "error.assets_cannot_be_unfrozen": string
    "error.unsupported_order_statuses": string
    "error.order_status_cannot_be_empty": string
    "error.this_cannot_be_done_sell_orders": string
    "error.the_minimum_volume_was_not_reached": string
    "error.this_cannot_be_done_buy_orders": string
    "error.quantity_is_invalid": string
    "error.quantity_exceeds_the_remaining_available_volume": string
    "error.contract_does_not_exist": string
    "error.order_status_is_not_payable": string
    "error.order_status_is_not_release": string
    "error.payout_method_does_not_exist": string
    cancelSuccess: string         // 已成功取消
    orderCanceled: string         // 订单已取消
    orderReleased: string         // 订单已放行
    releaseSuccess: string        // 已成功放行
    "error.pending_sell_order_has_reached_its_maximum_value": string

    priceAndVolumeTrend: string
    priceCNY: string
    volume: string
    priceGeneral: string
    currentPrice: string
    volume24h: string
    turnover: string
    lowestAsk: string

    enterCurrentPassword: string
    passwordTooShort: string
    passwordTooLong: string
    passwordComplexity: string
    passwordMismatch: string
    passwordUpdateSuccess: string
    secondPasswordUpdateSuccess: string
    currentSecondPassword: string
    enterCurrentSecondPassword: string
    setNewSecondPassword: string
    newSecondPassword: string
    confirmNewSecondPassword: string
    reenterNewSecondPassword: string
    confirmUpdate: string

    resetSuccess: string
    secondPasswordResetSuccess: string
    enterSecurityEmail: string
    resetPassword: string
    securityEmail: string

    setupSuccess: string
    secondPasswordSetupSuccess: string
    pleaseSetSecondPassword: string
    confirmSecondPassword: string
    reenterSecondPassword: string
    confirmSetup: string

    transferInBalance: string
    paymentCompleted: string
    orderLimitDescription: string
    inviteFriends: string
    myGifts: string
    helpCenter: string
    currentUSDTBalance: string
    allRecords: string
    recentTransactions: string
    allAssets: string
    address: string
    pleaseUseAnyPaymentMethod: string
    "error.upload_failed": string
    accountBalance: string
    transactionHistory: string
    minimumAmount: string
    verified: string
    searchPointsPlaceholder: string
    searchRWAPlaceholder: string
    announcementCenter: string
    "error.user_not_exist": string
    "error.user_address_does_not_match": string
    "error.timestamp_is_invalid": string

    "error.invalid_or_expired_nonce": string

    "error.signature_mismatch": string
    "error.signature_verification": string
    "error.user_is_not_bound_freeze_group": string
    "error.minimum_amount_cannot_exceed_total_amount": string
    "filterReset": string
    "filter": string
    "electronicPayment": string
    "initiator": string
    "arbitrationStatus": string
    "arbitrationEvidence": string
    "error.least_deal_amount_not_reached": string

    "error.not_supported_currency": string
    "error.failed_to_get_the_exchange_rate": string
    "error.there_is_no_exchange_rate_for_this_currency": string
    "error.currency_required": string
    "wechatPay": string
    "wechatId": string
    "qqId": string
    "error.invalid_type": string
    copieds: string
    tokenCopied: string
    depositNote: string
    depositToYourAccount: string
    copyTokenToWallet: string
    depositTips: string
    qrCode: string
    scanToDeposit: string
    tokenAddress: string
    clickToCopy: string
    confirmAssetType: string
    wrongAssetLoss: string
    testBeforeBigTransfer: string
    waitNetworkConfirm: string
    howToDeposit: string
    useSupportedWallet: string
    useSupported: string
    scanWithWalletQR: string
    enterValidAmount: string
    amountGreaterThanZero: string
    available: string
    balance: string
    hour: string
    day: string
    "error.transfer_exceeds_balance": string
    enterReceiverAddress: string
    receiverAddressRequired: string
    transferOutDetail: string
    receiverPlatformAddress: string
    pleaseEnterReceiverPlatformAddress: string
    enterTransferOutAmount: string
    maxTransferOut: string
    transferNote: string
    confirmAddressWarning: string
    irreversibleWarning: string
    transferFeeNote: string
    copyFailed: string
    transferInDetail: string
    errorInvalidTransactionType: string
    enterTransferInAmount: string
    "error.invalid_transaction_type": string
    transferInAmount: string
    transferSuccess1: string // 已成功转入
    transferSuccess2: string // 转入成功
    to: string               // 到
    "error.auto_revocation_time_not_configured": string
    no_more_announcements: string
    welcomeToHelpCenter: string
    helpCenterDescription: string
    "error.arbitration_record_already_exists": string
    aiAssistant: string
    noData: string
    "error.the_interface_returns_an_error": string
    "error.binding_failed": string
    'announcement.system': string              // 系统公告
    'announcement.event': string               // 活动公告
    'announcement.feature_update': string      // 功能更新
    'announcement.new_user_gift': string       // 新人礼包
    'announcement.marketing': string           // 营销推广类公告
    airdropEvent: string                  // 空投活动
    inviteFriendsToRegister: string       // 邀请好友注册
    newUserRegistrationReward: string     // 新用户注册奖励
    newUserGift: string                   // 新人礼包（与之前保持一致）
    "error.security_invalid_password": string
    "error.bind_was_not_found": string,
    "error.user_email_not_exists": string
    "error.security_invalid_code": string
    theArbitratorIsNotPure: string; // 新的错误提示
    "error.notice_was_not_found": string
    "error.activity_was_not_found": string
    "error.helpCenter_was_not_found": string
    noDatas: string
    minimumPurchaseQuantity: string
    onlineService: string
    contactUpdated: string
    updateSuccess1: string
    contactAdded: string
    addSuccess1: string
    pushPointsInfo: string
    pushInfo: string
    getOrPushInfo: string
    "error.no_pending_into_record_found": string
    "common.transfer_in": string
    "common.transfer_out": string
    "error.the_call_succeeds_but_no_data_is_available": string
    'success.sync': string
    syncPointsConfirm: string
    "error.price_exceeds_ceiling": string
    "error.price_below_floor": string
    pleaseSelectContactMethod: string
    specifyBuyerContactMethod: string
}

// 中文翻译
export const zhTranslations: Translations = {
    pleaseSelectContactMethod: "请选择联系方式",
    specifyBuyerContactMethod: "请指定买家的联系方式",
    "error.price_exceeds_ceiling": "单价大于最高限价",
    "error.price_below_floor": "单价小于最低限价",
    syncPointsConfirm: "确定要同步积分信息吗？",

    "success.sync": "同步成功",

    "error.the_call_succeeds_but_no_data_is_available": "请先到发行平台绑定",

    "common.transfer_in": "转入",
    "common.transfer_out": "转出",
    "error.no_pending_into_record_found": "没有要转入的资产",

    getOrPushInfo: "同步信息/推送信息",
    pushInfo: "推送信息",
    pushPointsInfo: "推送积分信息",
    onlineService: "在线客服",
    contactUpdated: "联系方式已更新",
    updateSuccess1: "已成功更新",
    contactAdded: "联系方式已添加",
    addSuccess1: "已成功添加",
    "error.helpCenter_was_not_found": "未找到帮助",
    noDatas: "暂无",
    minimumPurchaseQuantity: "最低买入数量",
    "error.security_invalid_password": "原密码输入不正确",
    "error.bind_was_not_found": "未找到的绑定",
    "error.user_email_not_exists": "电子邮件未绑定",
    "error.security_invalid_code": "验证码不正确",
    theArbitratorIsNotPure: "被仲裁人不存在", // 新的错误提示
    "error.notice_was_not_found": "未找到通知",
    "error.activity_was_not_found": "未找到活动",
    airdropEvent: "空投活动",
    inviteFriendsToRegister: "邀请好友注册",
    newUserRegistrationReward: "新用户注册奖励",
    newUserGift: "新人礼包",
    "error.the_interface_returns_an_error": "接口返回错误",
    "error.binding_failed": "绑定失败",
    "announcement.system": "系统公告",
    "announcement.event": "活动公告",
    "announcement.feature_update": "功能更新",
    "announcement.new_user_gift": "新人礼包",
    "announcement.marketing": "营销推广公告",
    "error.arbitration_record_already_exists": "该仲裁记录已存在",
    aiAssistant: "AI助手",
    noData: "暂无数据",

    no_more_announcements: "没有更多公告了",
    welcomeToHelpCenter: "欢迎来到帮助中心",
    helpCenterDescription: "在这里你可以找到常见问题的解答和使用指南",
    'error.auto_revocation_time_not_configured': "积分未配置自动撤销时间",
    "error.invalid_transaction_type": "交易类型无效",
    "transferInAmount": "转入数量",
    transferSuccess1: "已成功转入",
    transferSuccess2: "转入成功",
    to: "到",
    transferInDetail: "转入详情",
    errorInvalidTransactionType: "交易类型无效",
    enterTransferInAmount: "请输入转入数量",
    copyFailed: "复制失败",
    "error.transfer_exceeds_balance": "转出数量不能大于该积分余额",
    hour: "小时",
    day: "天",
    enterReceiverAddress: "请输入接收平台地址",
    receiverAddressRequired: "接收平台地址不能为空",
    enterValidAmount: "请输入有效的转出数量",
    amountGreaterThanZero: "转出数量必须大于0",
    transferOutDetail: "转出详情",
    receiverPlatformAddress: "接收平台的地址",
    pleaseEnterReceiverPlatformAddress: "请输入接收平台的地址",
    available: "可用",
    enterTransferOutAmount: "请输入转出数量",
    balance: "余额",
    maxTransferOut: "最大可转出",
    transferNote: "转出后积分将发送到您指定的接收平台地址",
    confirmAddressWarning: "请仔细核对接收地址，错误地址可能导致积分永久丢失",
    irreversibleWarning: "转出操作不可撤销，请确认金额无误",
    transferFeeNote: "转出将收取",
    scanWithWalletQR: "的钱包扫描下方二维码",
    scanToDeposit: "扫描上方二维码转入",
    tokenAddress: "TOKEN地址",
    clickToCopy: "点击地址可复制",
    confirmAssetType: "请确认您发送的是",
    wrongAssetLoss: "转错积分类型可能导致积分永久丢失",
    testBeforeBigTransfer: "小额测试后再进行大额转账",
    waitNetworkConfirm: "转账完成后请等待网络确认，可能需要几分钟到几小时不等",
    copieds: "地址已复制",
    tokenCopied: "TOKEN地址已复制到剪贴板",
    depositNote: "转入说明",
    depositToYourAccount: "转入到您的账户",
    howToDeposit: "您可以通过以下方式转入",
    useSupported: "使用支持",

    useSupportedWallet: "使用支持",
    copyTokenToWallet: "或复制TOKEN地址，在您的钱包中粘贴作为转账目标地址",
    depositTips: "转账完成后，积分将在网络确认后显示在您的账户中",
    qrCode: "二维码",
    "wechatPay": "微信支付",
    "wechatId": "微信号",
    "qqId": "QQ号",
    "error.currency_required": "请输入转换的货币",
    "error.invalid_type": "类型无效",

    "error.not_supported_currency": "不支持的币种",
    "error.failed_to_get_the_exchange_rate": "获取汇率失败",
    "error.there_is_no_exchange_rate_for_this_currency": "没有该货币的汇率",
    "arbitrationEvidence": "仲裁证据",
    "error.least_deal_amount_not_reached": "未达到最小买卖数量",
    "error.user_is_not_bound_freeze_group": "该用户未绑定有效的冻结组",
    "error.minimum_amount_cannot_exceed_total_amount": "拆分金额不能大于订单金额",

    "error.invalid_or_expired_nonce": "无效或过期的 nonce",
    "error.signature_mismatch": "签名不匹配",
    "error.signature_verification": "签名验证失败",

    "error.user_address_does_not_match": "用户地址不匹配",
    "error.timestamp_is_invalid": "无效时间戳",
    "filterReset": '重置筛选',
    "filter": '筛选',
    "electronicPayment": "电子支付",
    "initiator": "申请仲裁人",
    "arbitrationStatus": "仲裁状态",
    announcementCenter: "公告中心",
    "error.user_not_exist": "用户不存在",
    verified: "已认证",
    searchRWAPlaceholder: "搜索RWA积分...",

    "error.upload_failed": "上传失败",
    address: "地址",
    pleaseUseAnyPaymentMethod: "请使用以下任一方式付款",
    accountBalance: "账户余额",
    transactionHistory: "交易历史",
    minimumAmount: "最低数量",
    searchPointsPlaceholder: "搜索积分...",

    recentTransactions: "最近交易",
    allAssets: "全部积分",

    allRecords: "全部记录",

    currentUSDTBalance: "当前USDT余额",

    inviteFriends: "邀请好友",
    myGifts: "我的礼品",
    helpCenter: "帮助中心",

    orderLimitDescription: "普通订单同时最多买卖各3单，托管订单可以挂10单",
    transferInBalance: "转入余额",
    paymentCompleted: "已经完成付款",

    setupSuccess: "设置成功",
    secondPasswordSetupSuccess: "二级密码设置成功",
    pleaseSetSecondPassword: "请设置二级密码",
    confirmSecondPassword: "确认二级密码",
    reenterSecondPassword: "请再次输入二级密码",
    confirmSetup: "确认设置",

    securityEmail: "安全邮箱",
    resetSuccess: "重置成功",
    secondPasswordResetSuccess: "二级密码已成功重置",
    enterSecurityEmail: "请输入绑定的安全邮箱",
    resetPassword: "重置密码",

    enterCurrentPassword: "请输入当前密码",
    passwordTooShort: "密码不能少于6位",
    passwordTooLong: "密码不能超过20位",
    passwordComplexity: "密码必须包含大小写字母和数字",
    passwordMismatch: "两次输入的密码不一致",
    passwordUpdateSuccess: "修改成功",
    secondPasswordUpdateSuccess: "二级密码已成功修改",
    currentSecondPassword: "当前二级密码",
    enterCurrentSecondPassword: "请输入当前二级密码",
    setNewSecondPassword: "请设置新二级密码",
    newSecondPassword: "新二级密码",
    confirmNewSecondPassword: "确认新二级密码",
    reenterNewSecondPassword: "请再次输入新二级密码",
    confirmUpdate: "确认修改",
    lowestAsk: "当前市场最低卖出价",

    priceAndVolumeTrend: "价格与成交量走势",
    priceCNY: "价格(元)",
    volume: "成交量",
    priceGeneral: "价格",
    currentPrice: "当前价格",
    volume24h: "24h成交量",
    turnover: "交易额",

    "error.pending_sell_order_has_reached_its_maximum_value": "挂卖订单已达最大值",

    cancelSuccess: "已成功取消",
    orderCanceled: "订单已取消",
    orderReleased: "订单已放行",
    releaseSuccess: "已成功放行",
    "error.asset_was_not_found": "未找到该积分",
    "error.order_type_is_incorrect": "订单类型错误",
    "error.number_of_assets_is_insufficient": "积分数量不足",
    "error.pending_buy_order_has_reached_its_maximum_value": "挂买订单已达最大值",
    "error.minimum_volume_cannot_be_empty": "最小成交量不能为空",
    "error.order_does_not_exist": "订单不存在",
    "error.order_does_not_exist_or_has_a_status_that_cannot_be_cancelled": "订单不存在或状态不可取消",
    "error.cancellations_are_not_possible": "订单存在未完成的成交单，无法取消",
    "error.assets_cannot_be_unfrozen": "积分账户不存在，无法解冻积分",
    "error.unsupported_order_statuses": "不支持的订单状态",
    "error.order_status_cannot_be_empty": "订单状态不能为空",
    "error.this_cannot_be_done_sell_orders": "不能自己买自己发布的挂卖单",
    "error.the_minimum_volume_was_not_reached": "未达到最小成交量",
    "error.this_cannot_be_done_buy_orders": "不能自己出售自己发布的求购单",
    "error.quantity_is_invalid": "数量无效",
    "error.quantity_exceeds_the_remaining_available_volume": "数量超出剩余可成交量",
    "error.contract_does_not_exist": "成交单不存在",
    "error.order_status_is_not_payable": "该订单状态不可支付",
    "error.order_status_is_not_release": "该订单状态不可放行",
    "error.payout_method_does_not_exist": "收款方式不存在",
    "error.password_is_inconsistent_twice": "两次密码不一致",
    selectCountryCode: "选择国家/地区代码",
    countryCode: "国家/地区代码",

    countryJapan: "(日本)",
    countryKorea: "(韩国)",
    countrySG: "(新加坡)",
    countryAU: "(澳大利亚)",
    countryUK: "(英国)",
    countryUSCA: "(美国/加拿大)",
    countryCN: "(中国)",

    uploadPaymentCode: "上传收款码",
    clickToUploadQrCode: "点击上传收款码",
    imageFormatTip: "支持 JPG、PNG 格式",
    paymentQrCode: "收款码",
    clickToUploadImage: "点击上传图片",
    uploadImageTip: "支持 JPG、PNG 格式，最多上传3张图片",
    uploadScreenshotProof: "上传截图证据",
    codeMinLength: "验证码不能少于4位",
    codeMaxLength: "验证码不能超过6位",
    codeSent: "验证码已发送",
    codeSentToEmail: "验证码已发送到邮箱",
    codeFailed: "验证码获取失败",
    bindSuccess: "绑定成功",
    secureEmailBindSuccess: "安全邮箱绑定成功",
    bindFailed: "绑定失败",
    verifyCode: "验证码",
    enterCode: "请输入验证码",
    sending: "发送中...",
    getCode: "获取验证码",
    retryInSeconds: "秒后重试",
    bindSecureEmail: "绑定安全邮箱",
    pointCategoryDesc: "交易各类积分，包括航空、商场、酒店等",
    airlinePoints: "航空积分",
    mallPoints: "商场积分",
    hotelPoints: "酒店积分",
    bankPoints: "银行积分",
    rwaCategoryDesc: "投资实物积分，包括黄金、艺术品、房产等",
    goldShares: "黄金份额",
    artworks: "艺术品",
    realEstateShares: "房产份额",
    jewelryDiamonds: "珠宝钻石",

    connectWallet: "连接钱包",
    connectWalletDescription: "连接您的钱包以访问去中心化应用",
    connecting: "连接中...",

    phoneMinLength: "电话号码不能少于5位",
    phoneMaxLength: "电话号码不能超过15位",
    invalidEmail: "请输入有效的邮箱地址",
    accountMinLength: "账号不能少于2个字符",
    accountMaxLength: "账号不能超过50个字符",

    saveContactFailed: "保存联系方式失败",
    saveErrorRetryLater: "保存时发生错误，请稍后再试。",
    contactDeleted: "联系方式已删除",
    contactDeletedSuccess: "联系方式已成功删除",
    confirmDeleteContact: "确定要删除此联系方式吗？",
    irreversibleDeleteContact: "此操作不可撤销。这将永久删除您的联系方式。",
    noContactInfo: "暂无联系方式",
    addContactInfo: "添加联系方式",
    editContactInfo: "编辑联系方式",
    phoneNumbers: "电话号码",
    enterPhoneNumber: "请输入电话号码",
    emailAddress: "邮箱地址",
    enterEmailAddress: "请输入邮箱地址",
    socialType: "社交媒体类型",
    selectSocialType: "选择社交媒体类型",
    saving: "保存中...",
    addedPaymentMethods: "已添加的收款方式",
    cardNumber: "卡号",
    enterCardNumber: "请输入卡号",
    enterAccountHolder: "请输入户名",
    enterBankName: "请输入开户行",
    enterAccountNumber: "请输入账号",
    enterWalletAddress: "请输入钱包地址",

    updateSuccess: "更新成功",
    addSuccess: "添加成功",
    deleteSuccess: "删除成功",

    bankUnionPay: "银联",
    bankWeChat: "微信",
    bankAlipay: "支付宝",
    eWallet: "电子钱包",

    confirmDeletePaymentMethod: "确定要删除此收款方式吗？",
    irreversibleDeletePaymentMethod: "此操作不可撤销。这将永久删除您的收款方式。",
    noPaymentMethod: "暂无收款方式",

    addPaymentMethod: "添加收款方式",
    editPaymentMethod: "编辑收款方式",

    selectCardType: "选择卡类型",
    cardType: "卡类型",

    accountHolder: "户名",
    bankName: "开户行",

    swiftCodeOptional: "SWIFT代码 (可选)",
    enterSwiftCode: "请输入SWIFT代码",

    ibanOptional: "ABA/IBAN/CIC (可选)",
    enterIban: "请输入ABA/IBAN/CIC",

    walletType: "钱包类型",
    selectWalletType: "选择钱包类型",

    account: "账号",
    enterAccount: "请输入账号",

    currencyType: "货币类型",
    selectCurrencyType: "选择货币类型",

    mainnet: "主网",
    selectMainnet: "选择主网",

    add: "添加",

    myWallet: "我的钱包",
    multiChainAssetMgmt: "多链积分管理",
    bitcoin: "比特币",
    confirmPayOrderTitle: "确认付款该订单？",
    confirmPayOrderContent: "我已经完成转账操作",
    incomplete: "未完成",
    cancelOrders: "撤销",
    marketSellLabel: "出售",
    marketSellOrderLabel: "出售单",
    marketBuyOrderLabel: "求购单",
    marketOrders: "市场订单",
    supportUSDT: "支持USDT",
    orderCount: "成交单数",
    averagePayment: "平均付款",
    arbitrationRate: "仲裁率",
    minutes: "分钟",
    circulation: "流通量",
    totalSupply: "总供应量",
    issuer: "发行方",
    pointsDetail: "积分详情",
    fetchAssetDetailFailed: "获取积分详情失败",

    securitySettings: "安全设置",
    bindSecurityEmail: "绑定安全邮箱",
    setSecondaryPassword: "设置二级密码",
    changeSecondaryPassword: "修改二级密码",
    resetSecondaryPassword: "重置二级密码",
    bindSecurityEmailSuccess: "您已成功绑定安全邮箱",
    setSecondaryPasswordSuccess: "您已设置二级密码",

    refreshSuccess: "刷新成功",
    copySuccess: "复制成功",
    myReceivingAddress: "我的收款地址",
    receivingAddress: "收款地址",
    pleaseEnterReceivingAddress: "请输入收款地址",
    withdrawMinAmount: "转出数量最低1USDT",
    withdrawSuccess: "转出成功",
    withdrawn: "已成功转出",
    totalAssetValue: "积分总值",
    realTimeValuation: "实时估值",
    currency: "货币",
    custodyWalletBalance: "托管钱包余额",
    assetList: "积分列表",
    onlyTransferBscAssets: "仅向该地址转入BSC/BEP20相关积分",
    receivingQRCode: "收款二维码",
    share: "分享",
    copy: "复制",
    withdrawBalance: "转出余额",
    useBscNetwork: "请使用BSC网络",
    withdrawAmount: "转出数量",
    serviceFee: "手续费",
    withdrawing: "转出中...",
    confirmWithdraw: "确认转出",

    "postSell": "发布出售",
    sellNoticeBuyerMayAccept: "挂卖单后，买家可以选择接受您的报价",
    sellNoticeFundsReceivedAndAsset: "交易成功后，您将收到相应的金额并扣除积分",
    sellNoticeServiceFee: "卖出将收取",
    "sellAssetSection": "卖出积分",
    "availableSellQuantity": "可卖数量",
    "enterUnitPrice": "输入单价",
    "pleaseEnterSellPrice": "请输入卖出价格",
    "sellQuantity": "卖出数量",
    "minSellQuantity": "最低卖出数量",
    "actualDeductQuantity": "实际扣减数量",
    "totalReceivableAmount": "应收总金额",
    "minTransactionQuantity": "最低成交数量",

    enterValidSellPrice: "请输入有效的卖出价格",
    sellPriceGreaterThan0: "卖出价格必须大于0",
    enterValidSellQuantity: "请输入有效的卖出数量",
    sellQuantityGreaterThanOrEqual1: "卖出数量必须大于等于1",
    sellQuantityGreaterThanOrEqual: "卖出数量必须大于等于",
    enterValidMinSellQuantity: "请输入有效的最小成交数量",
    minSellQuantityGreaterThanOrEqual1: "最小成交数量必须大于等于1",
    sellPostSuccess: "发布出售成功",
    sellPosted: "已成功发布出售",

    depositAction: "同步信息",
    withdrawAction: "同步信息",

    changeRecord: "变动记录",
    noUSDTChangeRecord: "暂无USDT变动记录",
    withdrawAsset: "同步积分信息",
    depositAsset: "同步积分信息",

    buyAsset: "求购积分",
    sellAsset: "出售积分",
    assetChangeRecord: "积分变动记录",
    all: "全部",
    depositWithdraw: "获取信息/同步信息",
    buySell: "买入/卖出",
    tradeValue: "交易值",
    increaseRate24h: "24小时涨幅",
    frozenAmount: "冻结数量",
    valuation: "估值",
    assetAmount: "积分数量",
    assetDetail: "积分详情",

    enableEscrowTip: "开启USDT托管付款，增加买入成功率",
    escrowExplanation: "开启后，您的订单被匹配时，卖方的积分将自动到账并USDT支付给卖家，无需手动确认方便快捷。",
    remark: "备注",
    buyOrderTip: "挂买单后，卖家可以选择接受您的报价",
    tradeSuccessTip: "交易成功后，您将支付相应的金额并收到积分",
    ensurePaymentAvailable: "请确保您选择的支付方式可用",
    buyWillCharge: "买入将收取",
    feeSuffix: "的手续费",
    allowPartialMatch: "允许拆分成交",
    buyAssets: "买入积分",
    purchasePostSuccess: "发布求购成功",
    purchasePosted: "已成功发布求购",
    pleaseSelectPaymentMethod: "请选择至少一种支付方式",
    specifyBuyerPaymentMethod: "您需要指定买家可以使用的支付方式",
    enterValidMinQuantity: "请输入有效的最小成交数量",
    minQuantityAtLeast100: "最小成交数量必须大于等于100",
    minQuantityAtLeast: "最小成交数量必须大于等于",
    enterValidBuyQuantity: "请输入有效的买入数量",
    buyQuantityGreaterThan0: "买入数量必须大于0",
    enterValidBuyPrice: "请输入有效的买入价格",
    buyPriceGreaterThan0: "买入价格必须大于0",
    pleaseEnterRemark: "请输入备注",
    pointsMarket: "积分市场",
    pointsName: "积分名称",
    change24h: "24h涨跌",
    transaction: "成交",
    assetPointsPlatform: "数字积分与积分交易平台",
    oneStopAssetPointsPlatformDesc: "一站式数字积分与积分交易平台，支持积分交易、RWA积分管理、钱包功能",
    minTransactionAmount: "最小成交数量",
    minAmountLimitTip: "最低成交数量100",
    supportedPayment: "支持的付款方式",

    enterPrice: "输入价格",
    buyRequest: "求购",
    minAskPrice: "最低挂单价",
    maxAskPrice: "最高挂单价",
    highestMarketBuyPrice: "当前市场最高求购价",
    pleaseEnterBuyPrice: "请输入买入价格",
    buyQuantity: "买入数量",
    feeRate: "手续费率",
    actualReceivedAmount: "实际收到数量",
    totalAmountPayable: "应支付总金额",

    processing: "处理中...",
    postBuyRequest: "发布求购",
    importantNotice: "重要提示",

    viewMorePoints: "查看更多积分",
    viewMoreRWA: "查看更多RWA",

    tip: "提示",
    applyArbitration: "申请仲裁",
    describeProblemWithEvidence: "请详细描述您遇到的问题，并上传相关截图证据",
    appealContent: "申诉内容",
    describeProblemInDetail: "请详细描述您遇到的问题，包括具体情况、时间、金额等信息...",
    submitting: "提交中...",
    submitAppeal: "提交申诉",

    payment: "付款",
    paymentConfirmed: "已确认付款",

    pleaseIn: "请在",
    completePayment: "内完成付款",

    orderNotExist: "订单不存在或已被删除",
    phoneNumber: "手机号",
    email: "邮箱",
    socialMedia: "社交媒体",
    pleaseEnterAppealContent: "请填写申诉内容",
    appealSubmitted: "申诉已提交，平台将在24小时内处理",
    submitFailedRetry: "提交失败，请重试",

    copiedToClipboard: "已复制到剪贴板",
    paymentConfirmedWaitSeller: "已确认付款，请等待卖家确认",
    bankCard: "银行卡",

    sellSuccess: "卖出成功",
    buySuccess: "买入成功",

    buy: "买入",
    sell: "卖出",
    back: "返回",
    details: "详情",

    totalAmounts: "应支付总金额",
    orderInfo: "订单信息",
    createdTime: "创建时间",
    enterQuantity: "请输入数量",

    dataMissing: "订单数据缺失",
    placeBuyOrder: "挂买",
    placeSellOrder: "挂卖",

    minBuy: "最低买入",
    minSell: "最低卖出",

    amount: "数量",
    price: "价格",
    total: "总额",

    confirmReleasePrompt: "确认放行后，对应的积分将转移到购买者账户中",
    confirmCancel: "确认取消",
    confirmCancelPrompt: "您确定要取消此订单吗？此操作不可撤销。",
    cancelOrder: "取消订单",
    contactInfo: "联系方式",
    orderNumber: "订单号",
    time: "时间",
    confirmCancelOrderQuestion: "确认取消订单？",

    confirmRelease: "确认放行",
    confirmReleaseOrderQuestion: "确认放行订单？",
    goToPay: "去付款",

    notSet: '未设置',
    copied: "已复制",
    walletCopied: "钱包地址已复制到剪贴板",
    userIdCopied: "用户ID已复制到剪贴板",
    rwaMarket: "RWA积分市场",
    noMore: "已经到底啦！",
    buying: "求购中",
    selling: "出售中",
    pendingPayment: "待付款",
    pendingRelease: "待放行",
    noOrders: "暂无订单",
    noArbitrationOrders: "暂无仲裁订单",
    allOrders: "返回所有订单",
    arbitrationOrders: "仲裁订单",
    arbitrationRecords: "仲裁记录",
    arbitrationCount: "仲裁数",
    totalCompletedOrders: "总成交单数",
    sellOrderCount: "出售订单数",
    buyOrderCount: "求购订单数",
    totalOrders: "订单总数",
    myOrders: "我的订单",

    // 通用
    appName: "数字积分平台",
    cancel: "取消",
    confirm: "确认",
    save: "保存",
    edit: "编辑",
    delete: "删除",
    loading: "加载中...",
    success: "成功",
    error: "错误",
    arbitrationOrderId: "仲裁订单号",
    arbitratorId: "仲裁人ID",
    respondent: "被仲裁人",
    arbitrationDetails: "仲裁详情内容",
    // 导航
    home: "首页",
    market: "市场",
    wallet: "钱包",
    orders: "订单",
    assets: "积分",
    profile: "我的",

    // 个人中心
    profilePage: "个人中心",
    accountSecurity: "账户安全",
    paymentMethods: "收款方式管理",
    contactMethods: "联系方式管理",
    aboutUs: "关于我们",
    logout: "退出登录",
    editProfile: "编辑资料",
    verifyNow: "立即认证",
    availableBalance: "可用余额",
    frozenAssets: "冻结积分",
    viewWallet: "查看钱包",
    creditScore: "信用值",
    activityScore: "活跃值",

    // 首页
    search: "搜索积分、积分或商户...",
    recommend: "推荐",
    points: "积分",
    rwa: "RWA",
    hot: "热门",
    platformAnnouncement: "平台公告",
    noPlatformAnnouncement: "暂无平台公告",
    hotActivities: "热门活动",
    noHotActivities: "暂无热门活动",
    hotTransactions: "热门交易",
    viewAll: "查看全部",
    newUser: "新用户",
    limited: "限时",
    system: "系统",
    activity: "活动",

    // 钱包
    walletCenter: "钱包中心",
    totalAssets: "总积分",
    deposit: "充值",
    withdraw: "提现",
    transfer: "转账",
    walletAddress: "钱包地址",
    cryptoCurrency: "数字货币",
    fiat: "法币",
    paymentMethod: "支付方式",
    addCrypto: "添加数字货币",
    addFiat: "添加法币",
    addPayment: "添加支付方式",

    // 会员等级
    memberLevels: "会员等级",
    memberLevelSettings: "会员等级设置",
    createMemberLevel: "创建会员等级",
    editMemberLevel: "编辑会员等级",
    memberLevelDetails: "会员等级详情",
    basicInfo: "基本信息",
    levelBenefits: "等级权益",
    previewEffect: "预览效果",
    levelName: "等级名称",
    pointsRequired: "所需积分",
    levelColor: "等级颜色",
    levelIcon: "等级图标",
    activeStatus: "启用状态",
    enabled: "已启用",
    disabled: "已停用",
    pointsMultiplier: "积分倍率",
    discountRate: "折扣力度",
    times: "倍",
    percent: "%",

    // 会员权益
    pointsAcceleration: "积分加速",
    exclusiveDiscount: "专属折扣",
    birthdayGift: "生日礼包",
    dedicatedService: "专属客服",
    freeShipping: "免邮特权",
    priorityPurchase: "优先购买权",
    addCustomBenefit: "添加自定义权益",

    // 提示信息
    levelOrderTip: "拖动可调整等级顺序",
    memberAutoUpgradeTip: "开启后，用户积分达到对应等级要求将自动升级",
    disableLevelTip: "禁用后，用户将无法升级到该等级，已是该等级的用户不受影响。",
    deleteLevelTip: "删除后，该等级下的所有用户将自动降级到下一等级。",
    previewTip: "以下为该等级用户可见的权益展示效果",

    // 商户中心
    merchantCenter: "商户中心",
    merchantId: "商户ID",
    pointsIssued: "积分发行量",
    memberCount: "会员数量",
    managePoints: "管理积分",
    dataCenter: "数据中心",
    manage: "管理",
    activities: "活动",
    data: "数据",

    // 订单相关
    publishOrder: "发布订单",
    orderType: "订单类型",
    buyOrder: "我要买入",
    sellOrder: "我要卖出",
    pointsType: "积分类型",
    pointsQuantity: "积分数量",
    unitPrice: "单价",
    totalAmount: "总金额",
    orderDescription: "订单描述",
    negotiable: "价格可议",
    expiration: "有效期",
    publishNewOrder: "发布新订单",
    orderDetail: "订单详情",
    immediatelyBuy: "立即购买",
    immediatelySell: "立即出售",
    makeOffer: "我要议价",
    contactSeller: "联系卖家",
    contactBuyer: "联系买家",
    transactionNotes: "交易须知",
    orderStatus: "订单状态",
    active: "交易中",
    completed: "已完成",
    cancelled: "已取消",
    // 错误提示
    'common.success': "操作成功",
    'common.fail': "操作失败",
    'error.login_failed': "登录失败，请检查账号或密码",
    'error.unauthorized': "未登录，请先登录",
    'error.token_expired': "登录已过期，请重新登录",
    'error.invalid_token': "令牌无效，请重新登录",
    'error.account_locked': "账号已被锁定，请联系管理员",
    'error.user_not_found': "用户不存在",
    'error.user_exists': "用户已存在",
    'error.invalid_password': "密码不正确",
    'error.invalid_email': "邮箱格式不正确",
    'error.param_missing': "请求参数缺失",
    'error.validation_failed': "参数校验失败",
    'error.method_not_allowed': "请求方法不被允许",
    'error.order_not_found': "订单不存在",
    'error.order_already_paid': "订单已支付",
    'error.order_expired': "订单已过期",
    'error.payment_failed': "支付失败，请稍后再试",
    'error.insufficient_balance': "余额不足，请充值",
    'error.payment_method_invalid': "支付方式无效",
    'error.too_frequent': "请求太频繁，请稍后再试",
    'error.operation_limited': "当前操作被限制",
    'error.system_error': "系统异常，请稍后重试",
    'error.database_error': "数据库操作异常",
    'error.service_unavailable': "服务暂不可用",
    'error.miner.not_found': "矿机不存在",
    'error.miner.insufficient_power': "矿机算力不足，无法执行操作",
    'error.miner.upgrade_locked': "矿机当前不可升级",
    'error.token.symbol_exists': "代币符号已存在",
    'error.token.invalid_supply': "代币发行量不合法",
    'error.token.creation_failed': "代币创建失败，请稍后重试",
    'error.node.already_applied': "您已申请节点，无需重复提交",
    'error.node.not_eligible': "当前条件不满足节点申请要求",
    'error.node.capacity_full': "当前节点容量已满，请稍后重试",
    'error.wallet.not_bound': "请先绑定钱包地址",
    'error.wallet.invalid_address': "钱包地址格式不正确",
    'error.wallet.network_mismatch': "当前钱包网络与系统不匹配",
    'error.task.not_found': "任务未找到或已被删除",
    'error.task.already_completed': "该任务已完成，无法重复操作",
    'error.task.not_unlocked': "请先完成前置任务",
    'error.recharge.failed': "充值失败，请检查网络或稍后重试",
    'error.recharge.min_amount': "充值金额低于最低限额",
    'error.recharge.pending': "充值正在处理中，请稍后查看状态",
    'error.withdrawal.failed': "提现失败，请重试",
    'error.withdrawal.exceeds_limit': "提现金额超出限制",
    'error.withdrawal.insufficient_balance': "账户余额不足",
    'error.buy_order.invalid_price': "买单价格不合法",
    'error.buy_order.quota_exceeded': "买单金额超过限制",
    'error.sell_order.insufficient_token': "可售代币不足",
    'error.sell_order.invalid_quantity': "卖单数量不正确",
    'error.invite.invalid_code': "邀请码无效或已过期",
    'error.invite.already_bound': "您已绑定邀请码，无法更改",
    'error.level.upgrade_denied': "当前条件不满足升级要求",
    'error.level.not_configured': "当前等级配置不存在",
    'error.rebate.not_eligible': "您暂不符合分润资格",
    'error.rebate.calculation_error': "系统计算分润时发生错误",
    'error.rebate.distribution_failed': "分润发放失败，请联系管理员",
    'error.upload.file_too_large': "文件大小超出限制",
    'error.upload.unsupported_format': "文件格式不支持",
    'error.upload.failed': "文件上传失败",
    'error.kyc.pending': "实名认证审核中",
    'error.kyc.rejected': "实名认证未通过，请检查资料",
    'error.kyc.required': "请先完成实名认证",
    'error.captcha.invalid': "验证码不正确",
    'error.captcha.expired': "验证码已过期",
    'error.captcha.required': "请填写验证码",
    'error.risk.blacklisted': "账号存在风险行为，已被限制",
    'error.risk.region_blocked': "您所在地区暂不支持该服务",
    'error.risk.device_change': "检测到异常设备登录，请验证身份",
    'error.security.password_leaked': "检测到密码泄露风险，请修改密码",
    'error.security.ip_blocked': "您的 IP 被暂时封禁",
    'error.security.twofa_failed': "双重验证失败",
    'error.chain.gas_insufficient': "钱包 Gas 费不足",
    'error.chain.network_error': "区块链网络异常，请稍后重试",
    'error.chain.tx_failed': "链上交易广播失败",
    'error.chain.nonce_conflict': "交易顺序冲突，请重试",
    'error.notify.email_failed': "邮件发送失败，请稍后再试",
    'error.notify.sms_failed': "短信发送失败",
    'error.notify.rate_limited': "发送过于频繁，请稍后再试",
}

// 英文翻译
export const enTranslations: Translations = {
    pleaseSelectContactMethod: "Please select a contact method",
    specifyBuyerContactMethod: "Please specify the buyer's contact method",
    "error.price_exceeds_ceiling": "The unit price exceeds the maximum limit",
    "error.price_below_floor": "The unit price is below the minimum limit",
    syncPointsConfirm: "Are you sure you want to sync points information?",

    "success.sync": "Synchronization successful",

    "error.the_call_succeeds_but_no_data_is_available": "Please bind to the issuance platform first",

    "common.transfer_in": "Transfer In",
    "common.transfer_out": "Transfer Out",
    "error.no_pending_into_record_found": "No assets to transfer in",
    getOrPushInfo: "Get/Push Information",
    pushInfo: "Push Information",
    pushPointsInfo: "Push Points Information",
    "error.helpCenter_was_not_found": "Help center not found",
    noDatas: "None",
    minimumPurchaseQuantity: "Minimum Purchase Quantity",
    onlineService: "Online Service",
    contactUpdated: "Contact information updated",
    updateSuccess1: "Successfully updated",
    contactAdded: "Contact information added",
    addSuccess1: "Successfully added",
    "error.security_invalid_password": "The original password is incorrect",
    "error.bind_was_not_found": "Binding was not found",
    "error.user_email_not_exists": "Email is not bound",
    "error.security_invalid_code": "Verification code is incorrect",
    theArbitratorIsNotPure: "The arbitrated person does not exist", // 新的错误提示
    "error.notice_was_not_found": "Notice not found",
    "error.activity_was_not_found": "Activity not found",
    airdropEvent: "Airdrop Event",
    inviteFriendsToRegister: "Invite Friends to Register",
    newUserRegistrationReward: "New User Registration Reward",
    newUserGift: "New User Gift",
    "error.the_interface_returns_an_error": "The interface returns an error",
    "error.binding_failed": "Binding failed",
    "error.arbitration_record_already_exists": "The arbitration record already exists",
    aiAssistant: "AI Assistant",
    noData: "No data",
    "announcement.system": "System Announcement",
    "announcement.event": "Event Announcement",
    "announcement.feature_update": "Feature Update",
    "announcement.new_user_gift": "New User Gift",
    "announcement.marketing": "Marketing Announcement",
    no_more_announcements: "No more announcements",
    welcomeToHelpCenter: "Welcome to the Help Center",
    helpCenterDescription: "Find answers to common questions and user guides here",
    "error.auto_revocation_time_not_configured": "Points has no auto-revocation time configured",
    "error.invalid_transaction_type": "Invalid transaction type",
    "transferInAmount": "Transfer-in Amount",
    transferSuccess1: "Successfully transferred in",
    transferSuccess2: "Transfer successful",
    to: "to",
    transferInDetail: "Transfer-in Details",
    errorInvalidTransactionType: "Invalid transaction type",
    enterTransferInAmount: "Please enter the transfer-in amount",
    "error.transfer_exceeds_balance": "Transfer amount cannot exceed the points balance",
    copyFailed: "Copy failed",

    hour: "Hour",
    day: "Day",
    enterReceiverAddress: "Enter receiving platform address",
    receiverAddressRequired: "Receiver address cannot be empty",
    enterValidAmount: "Please enter a valid transfer amount",
    amountGreaterThanZero: "Amount must be greater than 0",
    transferOutDetail: "Transfer Out Details",
    receiverPlatformAddress: "Receiver Platform Address",
    pleaseEnterReceiverPlatformAddress: "Please enter the receiver platform address",
    available: "Available",
    enterTransferOutAmount: "Enter transfer amount",
    balance: "Balance",
    maxTransferOut: "Max Transfer Out",
    transferNote: "Transferred assets will be sent to the specified address",
    confirmAddressWarning: "Please double-check the address to avoid asset loss",
    irreversibleWarning: "Transfer is irreversible. Please confirm the amount",
    transferFeeNote: "A fee will be charged for the transfer",
    scanWithWalletQR: "Scan QR with supported wallet",
    useSupported: "Use supported",
    scanToDeposit: "Scan the QR code above to deposit",
    tokenAddress: "TOKEN Address",
    clickToCopy: "Click to copy address",
    confirmAssetType: "Please confirm the points type you are sending",
    wrongAssetLoss: "Sending the wrong points may cause permanent loss",
    testBeforeBigTransfer: "Try a small test transfer before sending large amounts",
    waitNetworkConfirm: "After transfer, wait for network confirmation (may take minutes to hours)",
    copieds: "Copied",
    tokenCopied: "TOKEN copied",
    depositNote: "Note",
    depositToYourAccount: "To your account",
    howToDeposit: "You can deposit by:",
    useSupportedWallet: "Use a supported",
    copyTokenToWallet: "Copy address to send",
    depositTips: "Assets arrive after confirmation",
    qrCode: "QR Code",
    "error.invalid_type": "Invalid type",

    "error.currency_required": "Please enter the currency to convert",
    "wechatPay": "WeChat Pay",
    "wechatId": "WeChat ID",
    "qqId": "QQ ID",

    "arbitrationEvidence": "Arbitration Evidence",
    "error.least_deal_amount_not_reached": "Minimum trade amount not reached",
    "error.not_supported_currency": "Unsupported currency",
    "error.failed_to_get_the_exchange_rate": "Failed to get the exchange rate",
    "error.there_is_no_exchange_rate_for_this_currency": "No exchange rate for this currency",
    "initiator": "Initiator",
    "arbitrationStatus": "Arbitration Status",
    "error.minimum_amount_cannot_exceed_total_amount": "Split amount cannot exceed the total order amount",
    "error.user_is_not_bound_freeze_group": "The user is not bound to a valid freeze group",
    "error.invalid_or_expired_nonce": "Invalid or expired nonce",
    "error.signature_mismatch": "Signature mismatch",
    "error.signature_verification": "Signature verification failed",
    "error.user_not_exist": "User does not exist",
    "error.user_address_does_not_match": "User address does not match",
    "error.timestamp_is_invalid": "Invalid timestamp",
    "error.upload_failed": "Upload failed",
    "error.pending_sell_order_has_reached_its_maximum_value": "Pending sell orders have reached the limit",
    "error.asset_was_not_found": "Points not found",
    "error.order_type_is_incorrect": "Incorrect order type",
    "error.number_of_assets_is_insufficient": "Insufficient asset quantity",
    "error.pending_buy_order_has_reached_its_maximum_value": "Pending buy order has reached its maximum value",
    "error.minimum_volume_cannot_be_empty": "Minimum transaction volume cannot be empty",
    "error.order_does_not_exist": "Order does not exist",
    "error.order_does_not_exist_or_has_a_status_that_cannot_be_cancelled": "Order does not exist or cannot be cancelled in its current status",
    "error.cancellations_are_not_possible": "Cancellation is not possible due to incomplete transactions",
    "error.assets_cannot_be_unfrozen": "Points account does not exist, cannot unfreeze",
    "error.unsupported_order_statuses": "Unsupported order status",
    "error.order_status_cannot_be_empty": "Order status cannot be empty",
    "error.this_cannot_be_done_sell_orders": "You cannot buy your own sell order",
    "error.the_minimum_volume_was_not_reached": "Minimum transaction volume was not reached",
    "error.this_cannot_be_done_buy_orders": "You cannot sell to your own buy order",
    "error.quantity_is_invalid": "Invalid quantity",
    "error.quantity_exceeds_the_remaining_available_volume": "Quantity exceeds the remaining available volume",
    "error.contract_does_not_exist": "Transaction does not exist",
    "error.order_status_is_not_payable": "This order status cannot be paid",
    "error.order_status_is_not_release": "This order status cannot be released",
    "error.payout_method_does_not_exist": "Payout method does not exist",
    "error.password_is_inconsistent_twice": "The passwords entered do not match",
    // 错误提示
    "common.success": "Operation successful",
    "common.fail": "Operation failed",
    "error.login_failed": "Login failed, please check your username or password",
    "error.unauthorized": "Not logged in, please log in first",
    "error.token_expired": "Login expired, please log in again",
    "error.invalid_token": "Invalid token, please log in again",
    "error.account_locked": "Account locked, please contact the administrator",
    "error.user_not_found": "User not found",
    "error.user_exists": "User already exists",
    "error.invalid_password": "Incorrect password",
    "error.invalid_email": "Invalid email format",
    "error.param_missing": "Missing request parameter",
    "error.validation_failed": "Parameter validation failed",
    "error.method_not_allowed": "Request method not allowed",
    "error.order_not_found": "Order not found",
    "error.order_already_paid": "Order already paid",
    "error.order_expired": "Order expired",
    "error.payment_failed": "Payment failed, please try again later",
    "error.insufficient_balance": "Insufficient balance, please recharge",
    "error.payment_method_invalid": "Invalid payment method",
    "error.too_frequent": "Too many requests, please try again later",
    "error.operation_limited": "Current operation is restricted",
    "error.system_error": "System error, please try again later",
    "error.database_error": "Database operation error",
    "error.service_unavailable": "Service temporarily unavailable",
    "error.miner.not_found": "Miner not found",
    "error.miner.insufficient_power": "Insufficient miner power, operation cannot be performed",
    "error.miner.upgrade_locked": "Miner upgrade currently locked",
    "error.token.symbol_exists": "Token symbol already exists",
    "error.token.invalid_supply": "Invalid token supply",
    "error.token.creation_failed": "Token creation failed, please try again later",
    "error.node.already_applied": "You have already applied for a node, no need to submit again",
    "error.node.not_eligible": "Current conditions do not meet node application requirements",
    "error.node.capacity_full": "Node capacity is full, please try again later",
    "error.wallet.not_bound": "Please bind your wallet address first",
    "error.wallet.invalid_address": "Invalid wallet address format",
    "error.wallet.network_mismatch": "Current wallet network does not match the system",
    "error.task.not_found": "Task not found or has been deleted",
    "error.task.already_completed": "Task already completed, cannot repeat operation",
    "error.task.not_unlocked": "Please complete prerequisite tasks first",
    "error.recharge.failed": "Recharge failed, please check network or try again later",
    "error.recharge.min_amount": "Recharge amount below minimum limit",
    "error.recharge.pending": "Recharge is processing, please check status later",
    "error.withdrawal.failed": "Withdrawal failed, please try again",
    "error.withdrawal.exceeds_limit": "Withdrawal amount exceeds limit",
    "error.withdrawal.insufficient_balance": "Insufficient account balance",
    "error.buy_order.invalid_price": "Invalid buy order price",
    "error.buy_order.quota_exceeded": "Buy order amount exceeds limit",
    "error.sell_order.insufficient_token": "Insufficient tokens for sale",
    "error.sell_order.invalid_quantity": "Invalid sell order quantity",
    "error.invite.invalid_code": "Invalid or expired invitation code",
    "error.invite.already_bound": "Invitation code already bound, cannot change",
    "error.level.upgrade_denied": "Current conditions do not meet upgrade requirements",
    "error.level.not_configured": "Current level configuration does not exist",
    "error.rebate.not_eligible": "You are not eligible for rebate",
    "error.rebate.calculation_error": "Error occurred during rebate calculation",
    "error.rebate.distribution_failed": "Rebate distribution failed, please contact administrator",
    "error.upload.file_too_large": "File size exceeds limit",
    "error.upload.unsupported_format": "Unsupported file format",
    "error.upload.failed": "File upload failed",
    "error.kyc.pending": "Identity verification pending",
    "error.kyc.rejected": "Identity verification failed, please check your information",
    "error.kyc.required": "Please complete identity verification first",
    "error.captcha.invalid": "Invalid captcha",
    "error.captcha.expired": "Captcha expired",
    "error.captcha.required": "Please enter captcha",
    "error.risk.blacklisted": "Account has risky behavior and is restricted",
    "error.risk.region_blocked": "Service not available in your region",
    "error.risk.device_change": "Abnormal device login detected, please verify identity",
    "error.security.password_leaked": "Password leak detected, please change your password",
    "error.security.ip_blocked": "Your IP is temporarily blocked",
    "error.security.twofa_failed": "Two-factor authentication failed",
    "error.chain.gas_insufficient": "Insufficient wallet gas fee",
    "error.chain.network_error": "Blockchain network error, please try again later",
    "error.chain.tx_failed": "Blockchain transaction broadcast failed",
    "error.chain.nonce_conflict": "Transaction order conflict, please retry",
    "error.notify.email_failed": "Email sending failed, please try again later",
    "error.notify.sms_failed": "SMS sending failed",
    "error.notify.rate_limited": "Sending too frequently, please try again later",
    "filterReset": 'Reset filter',
    "filter": 'Filter',
    "electronicPayment": "Electronic Payment",
    "announcementCenter": "Announcements",
    "verified": "Verified",
    "searchPointsPlaceholder": "Search...",
    "searchRWAPlaceholder": "Search points...",
    "minimumAmount": "Min Amount",
    "transactionHistory": "History",
    "accountBalance": "Balance",
    "address": "Address",
    "pleaseUseAnyPaymentMethod": "Use any payment method",
    "allAssets": "All Points",
    "allRecords": "All Records",
    "recentTransactions": "Recent Transactions",
    "currentUSDTBalance": "USDT Balance",
    "inviteFriends": "Invite Friends",
    "myGifts": "My Gifts",
    "orderLimitDescription": "Up to 3 orders, 10 for escrow",
    "paymentCompleted": "Payment done",
    "transferInBalance": "Deposit",
    "setupSuccess": "Setup success",
    "secondPasswordSetupSuccess": "Secondary password set",
    "pleaseSetSecondPassword": "Set second password",
    "confirmSecondPassword": "Confirm second password",
    "reenterSecondPassword": "Re-enter second password",
    "confirmSetup": "Confirm setup",
    "securityEmail": "Security Email",
    "resetSuccess": "Reset success",
    "secondPasswordResetSuccess": "Password reset",
    "enterSecurityEmail": "Enter email",
    "resetPassword": "Reset Password",
    "enterCurrentPassword": "Enter current password",
    "passwordTooShort": "Password too short",
    "passwordTooLong": "Password too long",
    "passwordComplexity": "Password must include uppercase, lowercase, numbers",
    "passwordMismatch": "Passwords don't match",
    "passwordUpdateSuccess": "Password updated",
    "secondPasswordUpdateSuccess": "Password updated",
    "currentSecondPassword": "Current password",
    "enterCurrentSecondPassword": "Enter current password",
    "setNewSecondPassword": "Set new password",
    "newSecondPassword": "New password",
    "confirmNewSecondPassword": "Confirm new password",
    "reenterNewSecondPassword": "Re-enter new password",
    "confirmUpdate": "Confirm update",
    "lowestAsk": "Lowest Ask",
    "priceAndVolumeTrend": "Price & Volume",
    "priceCNY": "Price (CNY)",
    "volume": "Volume",
    "priceGeneral": "Price",
    "currentPrice": "Current Price",
    "volume24h": "24h Volume",
    "turnover": "Turnover",
    "cancelSuccess": "Cancel successful",
    "orderCanceled": "Order canceled",
    "orderReleased": "Order released",
    "releaseSuccess": "Release successful",
    "selectCountryCode": "Select Code",
    "countryCode": "Country Code",
    "countryJapan": "(Japan)",
    "countryKorea": "(Korea)",
    "countrySG": "(Singapore)",
    "countryAU": "(Australia)",
    "countryUK": "(UK)",
    "countryUSCA": "(USA/Canada)",
    "countryCN": "(China)",

    "uploadPaymentCode": "Upload Code",
    "clickToUploadQrCode": "Upload QR Code",
    "imageFormatTip": "Supports JPG/PNG",
    "paymentQrCode": "Payment QR",
    "clickToUploadImage": "Upload Image",
    "uploadImageTip": "Supports JPG/PNG, up to 3 images",
    "uploadScreenshotProof": "Upload Proof",
    "codeMinLength": "Code must be 4 digits",
    "codeMaxLength": "Code must be 6 digits",
    "codeSent": "Code sent",
    "codeSentToEmail": "Sent to email",
    "codeFailed": "Code failed",
    "bindSuccess": "Binding success",
    "secureEmailBindSuccess": "Email bound",
    "bindFailed": "Binding failed",
    "verifyCode": "Verify Code",
    "enterCode": "Enter code",
    "sending": "Sending...",
    "getCode": "Get Code",
    "retryInSeconds": "Retry in seconds",
    "bindSecureEmail": "Bind Email",
    "pointCategoryDesc": "Trade points (airline, mall, hotel)",
    "airlinePoints": "Airline Points",
    "mallPoints": "Mall Points",
    "hotelPoints": "Hotel Points",
    "bankPoints": "Bank Points",
    "rwaCategoryDesc": "Invest in assets (gold, art, real estate)",
    "goldShares": "Gold Shares",
    "artworks": "Artworks",
    "realEstateShares": "Real Estate Shares",
    "jewelryDiamonds": "Jewelry & Diamonds",
    "connectWallet": "Connect Wallet",
    "connectWalletDescription": "Connect wallet",
    "connecting": "Connecting...",
    "phoneMinLength": "Phone min length 5",
    "phoneMaxLength": "Phone max length 15",
    "invalidEmail": "Enter valid email",
    "accountMinLength": "Account min length 2",
    "accountMaxLength": "Account max length 50",
    "saveContactFailed": "Failed to save",
    "saveErrorRetryLater": "Error, try later",
    "contactDeleted": "Contact deleted",
    "contactDeletedSuccess": "Deleted successfully",
    "confirmDeleteContact": "Delete contact?",
    "irreversibleDeleteContact": "Cannot undo",
    "noContactInfo": "No contact info",
    "addContactInfo": "Add Contact",
    "editContactInfo": "Edit Contact",
    "phoneNumbers": "Phone Number",
    "enterPhoneNumber": "Enter phone",
    "emailAddress": "Email Address",
    "enterEmailAddress": "Enter email",
    "socialType": "Social Media Type",
    "selectSocialType": "Select Social Type",
    "saving": "Saving...",
    "addedPaymentMethods": "Added Methods",
    "cardNumber": "Card Number",
    "enterCardNumber": "Enter card number",
    "enterAccountHolder": "Enter holder",
    "enterBankName": "Enter bank name",
    "enterAccountNumber": "Enter account number",
    "enterWalletAddress": "Enter wallet",
    "updateSuccess": "Updated successfully",
    "addSuccess": "Added successfully",
    "deleteSuccess": "Deleted successfully",
    "bankUnionPay": "UnionPay",
    "bankWeChat": "WeChat",
    "bankAlipay": "Alipay",
    "eWallet": "E-Wallet",
    "confirmDeletePaymentMethod": "Delete method?",
    "irreversibleDeletePaymentMethod": "Permanent action",
    "noPaymentMethod": "No method",
    "addPaymentMethod": "Add Method",
    "editPaymentMethod": "Edit Method",
    "selectCardType": "Select Card Type",
    "cardType": "Card Type",
    "accountHolder": "Holder",
    "bankName": "Bank Name",
    "swiftCodeOptional": "SWIFT (Optional)",
    "enterSwiftCode": "Enter SWIFT Code",
    "ibanOptional": "IBAN (Optional)",
    "enterIban": "Enter IBAN",
    "walletType": "Wallet Type",
    "selectWalletType": "Select Wallet Type",
    "account": "Account",
    "enterAccount": "Enter Account",
    "currencyType": "Currency Type",
    "selectCurrencyType": "Select Currency",
    "mainnet": "Mainnet",
    "selectMainnet": "Select Mainnet",
    "add": "Add",
    "confirmPayOrderTitle": "Confirm payment?",
    "confirmPayOrderContent": "Transfer complete",
    "myWallet": "My Wallet",
    "multiChainAssetMgmt": "Multi-chain Assets",
    "bitcoin": "Bitcoin",
    "incomplete": "Incomplete",
    "cancelOrders": "Cancel Orders",
    "marketOrders": "Market Orders",
    "supportUSDT": "Supports USDT",
    "marketSellLabel": "Sell",
    "marketSellOrderLabel": "Sell Order",
    "marketBuyOrderLabel": "Buy Order",
    "orderCount": "Order Count",
    "averagePayment": "Avg. Payment",
    "arbitrationRate": "Arb Rate",
    "minutes": "Minutes",
    "circulation": "Circulation",
    "totalSupply": "Total Supply",
    "issuer": "Issuer",
    "pointsDetail": "Points Detail",
    "fetchAssetDetailFailed": "Failed to fetch asset",
    "securitySettings": "Security Settings",
    bindSecurityEmail: "Bind",
    setSecondaryPassword: "Set 2nd",
    changeSecondaryPassword: "Change 2nd",
    resetSecondaryPassword: "Reset 2nd",
    "bindSecurityEmailSuccess": "Email bound",
    "setSecondaryPasswordSuccess": "Password set",
    "refreshSuccess": "Refresh success",


    "copySuccess": "Copied",
    "myReceivingAddress": "My Address",
    "receivingAddress": "Address",
    "pleaseEnterReceivingAddress": "Enter address",
    "withdrawMinAmount": "Min withdrawal: 1 USDT",
    "withdrawSuccess": "Withdrawal success",
    "withdrawn": "Withdrawn",
    "totalAssetValue": "Total Value",
    "realTimeValuation": "Real-time Value",
    "currency": "Currency",
    "custodyWalletBalance": "Wallet Balance",
    "assetList": "Points",
    "onlyTransferBscAssets": "BSC points only",
    "receivingQRCode": "QR Code",
    "share": "Share",
    "copy": "Copy",
    "withdrawBalance": "Withdraw",
    "useBscNetwork": "Use BSC Network",
    "withdrawAmount": "Withdrawal Amount",
    "serviceFee": "Service Fee",
    "withdrawing": "Withdrawing...",
    "confirmWithdraw": "Confirm withdrawal",
    "postSell": "Post Sell",
    "sellNoticeBuyerMayAccept": "Buyer may accept",
    "sellNoticeFundsReceivedAndAsset": "Funds received, asset deducted",
    "sellNoticeServiceFee": "Service fee applied",
    "sellAssetSection": "Sell Points",
    "availableSellQuantity": "Available to Sell",
    "enterUnitPrice": "Enter Price",
    "pleaseEnterSellPrice": "Enter price",
    "sellQuantity": "Sell Quantity",
    "minSellQuantity": "Min Quantity",
    "actualDeductQuantity": "Deducted Quantity",
    "totalReceivableAmount": "Total Receivable",
    "minTransactionQuantity": "Min Quantity",
    "enterValidSellPrice": "Enter valid price",
    "sellPriceGreaterThan0": "Price > 0",
    "enterValidSellQuantity": "Enter valid quantity",
    "sellQuantityGreaterThanOrEqual1": "Quantity >= 1",
    "sellQuantityGreaterThanOrEqual": "Quantity >= ",
    "enterValidMinSellQuantity": "Enter valid min quantity",
    "minSellQuantityGreaterThanOrEqual1": "Min quantity >= 1",
    "sellPostSuccess": "Sell posted",
    "sellPosted": "Sell posted",
    depositAction: "Fetch Information",
    withdrawAction: "Sync Information",
    "changeRecord": "Change",
    "noUSDTChangeRecord": "No USDT record",
    withdrawAsset: "Get Points",
    depositAsset: "Sync Points",
    "buyAsset": "Buy Points",
    "sellAsset": "Sell Points",
    "assetChangeRecord": "Points Change",
    "all": "All",
    depositWithdraw: "Fetch Information / Sync Information",
    "buySell": "Buy/Sell",
    "tradeValue": "Trade Value",
    "increaseRate24h": "24h Change",
    "frozenAmount": "Frozen Amount",
    "valuation": "Valuation",
    "assetAmount": "Amount",
    "assetDetail": "Detail",
    "enableEscrowTip": "Enable escrow",
    "escrowExplanation": "Seller's points received automatically",
    "remark": "Remark",
    "buyOrderTip": "Seller can accept",
    "tradeSuccessTip": "Pay and receive points after trade",
    "ensurePaymentAvailable": "Ensure payment availability",
    "buyWillCharge": "Buying will incur",
    "feeSuffix": "fees",
    "pleaseEnterRemark": "Enter remark",
    "allowPartialMatch": "Allow partial match",
    "buyAssets": "Buy Points",
    "purchasePostSuccess": "Purchase posted",
    "purchasePosted": "Purchase posted",
    "pleaseSelectPaymentMethod": "Select payment method",
    "specifyBuyerPaymentMethod": "Specify buyer payment method",
    "enterValidMinQuantity": "Enter valid min quantity",
    "minQuantityAtLeast100": "Min quantity >= 100",
    "minQuantityAtLeast": "Min quantity >= ",
    "enterValidBuyQuantity": "Enter valid buy quantity",
    "buyQuantityGreaterThan0": "Quantity > 0",
    "enterValidBuyPrice": "Enter valid price",
    "buyPriceGreaterThan0": "Price > 0",
    "minTransactionAmount": "Min Amount",
    "minAmountLimitTip": "Min amount: 100",
    "supportedPayment": "Supported Payments",
    "pointsMarket": "Points Market",
    "pointsName": "Points",
    "change24h": "24h Change",
    "transaction": "Transaction",
    "enterPrice": "Enter Price",
    "buyRequest": "Buy Request",
    "minAskPrice": "Min Ask Price",
    "maxAskPrice": "Max Ask Price",
    "highestMarketBuyPrice": "Highest Buy Price",
    "pleaseEnterBuyPrice": "Enter buy price",
    "buyQuantity": "Buy Quantity",
    "feeRate": "Fee Rate",
    "actualReceivedAmount": "Received Amount",
    "totalAmountPayable": "Amount Payable",
    "assetPointsPlatform": "Points Platform",
    "oneStopAssetPointsPlatformDesc": "One-stop trading platform",
    "processing": "Processing...",
    "postBuyRequest": "Post Buy",
    "importantNotice": "Important Notice",
    "viewMorePoints": "View More Points",
    "viewMoreRWA": "View More RWA",
    "tip": "Notice",
    "applyArbitration": "Apply for Arbitration",
    "describeProblemWithEvidence": "Describe issue with evidence",
    "appealContent": "Appeal Content",
    "describeProblemInDetail": "Describe issue in detail",
    "submitting": "Submitting...",
    "submitAppeal": "Submit Appeal",


    "payment": "Payment",
    "paymentConfirmed": "Payment Confirmed",
    "pleaseIn": "Complete payment in",
    "completePayment": "Complete Payment",
    "orderNotExist": "Order not found",
    "phoneNumber": "Phone",
    "email": "Email",
    "socialMedia": "Social Media",
    "pleaseEnterAppealContent": "Enter appeal",
    "appealSubmitted": "Appeal submitted",
    "submitFailedRetry": "Submission failed, retry",
    "copiedToClipboard": "Copied",
    "paymentConfirmedWaitSeller": "Payment confirmed, waiting for seller",
    "bankCard": "Bank Card",
    "sellSuccess": "Sell success",
    "buySuccess": "Buy success",
    "buy": "Buy",
    "sell": "Sell",
    "back": "Back",
    "details": "Details",
    "totalAmounts": "Total",
    "orderInfo": "Order Info",
    "createdTime": "Created",
    "enterQuantity": "Enter Quantity",
    "dataMissing": "Data missing",
    "placeBuyOrder": "Place Buy",
    "placeSellOrder": "Place Sell",
    "minBuy": "Min Buy",
    "minSell": "Min Sell",
    "amount": "Amount",
    "price": "Price",
    "total": "Total",
    "confirmReleasePrompt": "Release assets to buyer?",
    "confirmCancel": "Confirm cancel",
    "confirmCancelPrompt": "Cancel order? This cannot be undone.",
    "cancelOrder": "Cancel Order",
    "contactInfo": "Contact",
    "orderNumber": "Order Number",
    "time": "Time",
    "confirmCancelOrderQuestion": "Confirm cancel order?",
    "confirmRelease": "Confirm Release",
    "confirmReleaseOrderQuestion": "Confirm release order?",
    "goToPay": "Go to Pay",

    "notSet": "Unset",
    "copied": "Copied",
    "walletCopied": "Wallet copied",
    "userIdCopied": "User ID copied",
    "rwaMarket": "RWA Market",
    "noMore": "No more",
    "buying": "Buy",
    "selling": "Sell",
    "pendingPayment": "Pay",
    "pendingRelease": "Release",
    "noOrders": "No orders",
    "noArbitrationOrders": "No arbitration",
    "allOrders": "All orders",
    "arbitrationOrders": "Arbitrations",
    "arbitrationRecords": "Records",
    "arbitrationCount": "Arb. count",
    "totalCompletedOrders": "Completed",
    "sellOrderCount": "Sell count",
    "buyOrderCount": "Buy count",
    "totalOrders": "Total",
    "myOrders": "Mine",

    // 通用
    "appName": "Points Platform",
    "cancel": "Cancel",
    "confirm": "Confirm",
    "save": "Save",
    "edit": "Edit",
    "delete": "Delete",
    "loading": "Loading...",
    "success": "Success",
    "error": "Error",

    "arbitrationOrderId": "Order ID",
    "arbitratorId": "Arbitrator ID",
    "respondent": "Respondent",
    "arbitrationDetails": "Details",
    "home": "Home",
    "market": "Market",
    "wallet": "Wallet",
    "orders": "Orders",
    "assets": "Points",
    "profile": "Profile",

    "profilePage": "Profile Page",
    "accountSecurity": "Security",
    "paymentMethods": "Payments",
    "contactMethods": "Contacts",
    "helpCenter": "Help Center",
    "aboutUs": "About Us",
    "logout": "Logout",
    "editProfile": "Edit Profile",
    "verifyNow": "Verify",
    "availableBalance": "Balance",
    "frozenAssets": "Frozen Points",
    "viewWallet": "View Wallet",
    "creditScore": "Credit Score",
    "activityScore": "Activity",

    "search": "Search...",
    "recommend": "Recommended",
    "points": "Points",
    "rwa": "RWA",
    "hot": "Hot",
    "platformAnnouncement": "Announcement",
    "noPlatformAnnouncement": "No announcements",
    "hotActivities": "Hot Activities",
    "noHotActivities": "No activities",
    "hotTransactions": "Hot Transactions",
    "viewAll": "View All",
    "newUser": "New User",
    "limited": "Limited",
    "system": "System",
    "activity": "Activity",

    // 钱包
    "walletCenter": "Wallet",
    "totalAssets": "Total Points",
    "deposit": "Deposit",
    "withdraw": "Withdraw",
    "transfer": "Transfer",
    "walletAddress": "Address",
    "cryptoCurrency": "Cryptocurrency",
    "fiat": "Fiat",
    "paymentMethod": "Payment Method",
    "addCrypto": "Add Crypto",
    "addFiat": "Add Fiat",
    "addPayment": "Add Payment",

    "memberLevels": "Membership Levels",
    "memberLevelSettings": "Level Settings",
    "createMemberLevel": "Create Level",
    "editMemberLevel": "Edit Level",
    "memberLevelDetails": "Level Details",
    "basicInfo": "Basic Info",
    "levelBenefits": "Benefits",
    "previewEffect": "Preview",
    "levelName": "Level Name",
    "pointsRequired": "Points Required",
    "levelColor": "Level Color",
    "levelIcon": "Level Icon",
    "activeStatus": "Status",
    "enabled": "Enabled",
    "disabled": "Disabled",
    "pointsMultiplier": "Points Multiplier",
    "discountRate": "Discount Rate",
    "times": "Times",
    percent: "%",

    // 会员权益
    "pointsAcceleration": "Points Acceleration",
    "exclusiveDiscount": "Exclusive Discount",
    "birthdayGift": "Birthday Gift",
    "dedicatedService": "Service",
    "freeShipping": "Free Shipping",
    "priorityPurchase": "Priority Purchase",
    "addCustomBenefit": "Add Benefit",

    "levelOrderTip": "Drag to adjust order",
    "memberAutoUpgradeTip": "Enable auto-upgrade when points meet level requirements",
    "disableLevelTip": "Users won't upgrade to this level after disabling",
    "deleteLevelTip": "Users will downgrade to the next level after deletion",
    "previewTip": "Benefit display for users of this level",

    "merchantCenter": "Merchant Center",
    "merchantId": "Merchant ID",
    "pointsIssued": "Points Issued",
    "memberCount": "Members",
    "managePoints": "Manage Points",
    "dataCenter": "Data Center",
    "manage": "Manage",
    "activities": "Activities",
    "data": "Data",

    "publishOrder": "Publish Order",
    "orderType": "Order Type",
    "buyOrder": "I Want to Buy",
    "sellOrder": "I Want to Sell",
    "pointsType": "Points Type",
    "pointsQuantity": "Quantity",
    "unitPrice": "Unit Price",
    "totalAmount": "Total",
    "orderDescription": "Description",
    "negotiable": "Negotiable",
    "expiration": "Expiration",
    "publishNewOrder": "New Order",
    "orderDetail": "Order Details",
    "immediatelyBuy": "Buy Now",
    "immediatelySell": "Sell Now",
    "makeOffer": "Make Offer",
    "contactSeller": "Contact Seller",
    "contactBuyer": "Contact Buyer",
    "transactionNotes": "Notes",
    "orderStatus": "Status",
    "active": "Active",
    "completed": "Done",
    "cancelled": "Cancelled"

}

// 阿拉伯语翻译
export const arTranslations: Translations = {
    pleaseSelectContactMethod: "يرجى اختيار طريقة الاتصال",
    specifyBuyerContactMethod: "يرجى تحديد وسيلة الاتصال الخاصة بالمشتري",
    "error.price_exceeds_ceiling": "يتجاوز سعر الوحدة الحد الأقصى",
    "error.price_below_floor": "سعر الوحدة أقل من الحد الأدنى",
    syncPointsConfirm: "هل أنت متأكد من أنك تريد مزامنة معلومات النقاط؟",

    "success.sync": "تمت المزامنة بنجاح",

    "error.the_call_succeeds_but_no_data_is_available": "يرجى الارتباط أولاً بمنصة الإصدار",

    "common.transfer_in": "التحويل إلى الداخل",
    "common.transfer_out": "التحويل إلى الخارج",
    "error.no_pending_into_record_found": "لا توجد أصول للتحويل إلى الداخل",
    getOrPushInfo: "الحصول على/إرسال المعلومات",
    pushInfo: "إرسال المعلومات",
    pushPointsInfo: "إرسال معلومات النقاط",
    "error.helpCenter_was_not_found": "لم يتم العثور على مركز المساعدة",
    noDatas: "لا يوجد",
    "minimumPurchaseQuantity": "الحد الأدنى لكمية الشراء",
    onlineService: "الدعم عبر الإنترنت",
    contactUpdated: "تم تحديث معلومات الاتصال",
    updateSuccess1: "تم التحديث بنجاح",
    contactAdded: "تمت إضافة معلومات الاتصال",
    addSuccess1: "تمت الإضافة بنجاح",
    "error.security_invalid_code": "رمز التحقق غير صحيح",
    theArbitratorIsNotPure: "الشخص المتنازع عليه غير موجود", // 新的错误提示
    "error.notice_was_not_found": "لم يتم العثور على الإشعار",
    "error.activity_was_not_found": "لم يتم العثور على النشاط",
    "error.user_email_not_exists": "لم يتم ربط البريد الإلكتروني",
    "error.security_invalid_password": "كلمة المرور الأصلية غير صحيحة",
    "error.bind_was_not_found": "لم يتم العثور على الربط",
    airdropEvent: "حدث توزيع العملات المجانية",
    inviteFriendsToRegister: "ادعُ الأصدقاء للتسجيل",
    newUserRegistrationReward: "مكافأة تسجيل المستخدم الجديد",
    newUserGift: "هدية المستخدم الجديد",
    "error.the_interface_returns_an_error": "واجهة البرمجة تُرجع خطأً",
    "error.binding_failed": "فشل الربط",
    "error.arbitration_record_already_exists": "سجل التحكيم موجود بالفعل",
    aiAssistant: "مساعد الذكاء الاصطناعي",
    noData: "لا توجد بيانات",
    "announcement.system": "إعلان النظام",
    "announcement.event": "إعلان الحدث",
    "announcement.feature_update": "تحديث الميزة",
    "announcement.new_user_gift": "هدية المستخدم الجديد",
    "announcement.marketing": "إعلان ترويجي",
    welcomeToHelpCenter: "مرحبًا بك في مركز المساعدة",
    helpCenterDescription: "ابحث عن إجابات للأسئلة الشائعة وأدلة الاستخدام هنا",
    no_more_announcements: "لا توجد إعلانات أخرى",
    "error.auto_revocation_time_not_configured": "لم يتم تكوين وقت الإلغاء التلقائي للنقاط",
    "error.invalid_transaction_type": "نوع المعاملة غير صالح",
    "transferInAmount": "كمية الإيداع",
    transferSuccess1: "تم التحويل بنجاح",
    transferSuccess2: "تمت عملية التحويل بنجاح",
    to: "إلى",
    transferInDetail: "تفاصيل الإيداع",
    errorInvalidTransactionType: "نوع المعاملة غير صالح",
    enterTransferInAmount: "يرجى إدخال كمية الإيداع",
    copyFailed: "فشل النسخ",

    "error.transfer_exceeds_balance": "لا يمكن أن تتجاوز الكمية المحولة رصيد النقاط",
    hour: "ساعة",
    day: "يوم",
    enterReceiverAddress: "أدخل عنوان منصة الاستلام",
    receiverAddressRequired: "عنوان الاستلام لا يمكن أن يكون فارغًا",
    enterValidAmount: "يرجى إدخال كمية صالحة",
    amountGreaterThanZero: "يجب أن تكون الكمية أكبر من 0",
    transferOutDetail: "تفاصيل التحويل",
    receiverPlatformAddress: "عنوان منصة الاستلام",
    pleaseEnterReceiverPlatformAddress: "يرجى إدخال عنوان منصة الاستلام",
    available: "متاح",
    enterTransferOutAmount: "أدخل كمية التحويل",
    balance: "الرصيد",
    maxTransferOut: "أقصى تحويل",
    transferNote: "سيتم إرسال الأصول إلى العنوان المحدد",
    confirmAddressWarning: "يرجى التحقق بعناية من العنوان، العنوان الخاطئ قد يؤدي إلى فقدان دائم",
    irreversibleWarning: "التحويل لا يمكن التراجع عنه، يرجى التأكيد",
    transferFeeNote: "سيتم خصم رسوم التحويل",
    scanWithWalletQR: "امسح رمز QR باستخدام المحفظة المدعومة",
    useSupported: "استخدم المدعوم",
    scanToDeposit: "امسح رمز الاستجابة أعلاه للإيداع",
    tokenAddress: "عنوان الرمز",
    clickToCopy: "انقر لنسخ العنوان",
    confirmAssetType: "يرجى تأكيد نوع النقاط المرسلة",
    wrongAssetLoss: "قد يؤدي إرسال نوع خاطئ من النقاط إلى فقدان دائم",
    testBeforeBigTransfer: "ابدأ بتحويل صغير قبل تحويل كبير",
    waitNetworkConfirm: "بعد التحويل، انتظر تأكيد الشبكة (من دقائق إلى ساعات)",
    copieds: "تم النسخ",
    tokenCopied: "تم نسخ الرمز",
    depositNote: "ملاحظة",
    depositToYourAccount: "إلى حسابك",
    howToDeposit: "يمكنك الإيداع من خلال:",
    useSupportedWallet: "استخدم محفظة مدعومة",
    copyTokenToWallet: "انسخ العنوان للتحويل",
    depositTips: "يصل بعد التأكيد",
    qrCode: "رمز QR",
    "error.invalid_type": "نوع غير صالح",

    "error.currency_required": "يرجى إدخال العملة للتحويل",
    "wechatPay": "وي تشات باي",
    "wechatId": "معرّف WeChat",
    "qqId": "معرّف QQ",

    "arbitrationEvidence": "أدلة التحكيم",
    "error.least_deal_amount_not_reached": "لم يتم الوصول إلى الحد الأدنى للتداول",
    "error.not_supported_currency": "العملة غير مدعومة",
    "error.failed_to_get_the_exchange_rate": "فشل في الحصول على سعر الصرف",
    "error.there_is_no_exchange_rate_for_this_currency": "لا يوجد سعر صرف لهذه العملة",
    "arbitrationStatus": "حالة التحكيم",
    "initiator": "مقدم التحكيم",
    "error.user_is_not_bound_freeze_group": "المستخدم غير مرتبط بمجموعة التجميد",
    "error.invalid_or_expired_nonce": "رمز nonce غير صالح أو منتهي الصلاحية",
    "error.signature_mismatch": "توقيع غير متطابق",
    "error.signature_verification": "فشل في التحقق من التوقيع",
    "error.user_address_does_not_match": "عنوان المستخدم غير مطابق",
    "error.timestamp_is_invalid": "الطابع الزمني غير صالح",
    "error.user_not_exist": "المستخدم غير موجود",
    "error.minimum_amount_cannot_exceed_total_amount": "المبلغ المُقسط لا يمكن أن يتجاوز المبلغ الإجمالي للطلب",
    "error.upload_failed": "فشل في الرفع",
    // 错误提示
    "error.pending_sell_order_has_reached_its_maximum_value": "تم الوصول إلى الحد الأقصى لأوامر البيع المعلقة",
    "error.asset_was_not_found": "لم يتم العثور على النقاط",
    "error.order_type_is_incorrect": "نوع الطلب غير صحيح",
    "error.number_of_assets_is_insufficient": "كمية الأصول غير كافية",
    "error.pending_buy_order_has_reached_its_maximum_value": "بلغ أمر الشراء المعلق الحد الأقصى",
    "error.minimum_volume_cannot_be_empty": "لا يمكن أن يكون الحد الأدنى لحجم الصفقة فارغًا",
    "error.order_does_not_exist": "الطلب غير موجود",
    "error.order_does_not_exist_or_has_a_status_that_cannot_be_cancelled": "الطلب غير موجود أو لا يمكن إلغاؤه في حالته الحالية",
    "error.cancellations_are_not_possible": "لا يمكن الإلغاء بسبب وجود صفقات غير مكتملة",
    "error.assets_cannot_be_unfrozen": "حساب النقاط غير موجود، لا يمكن فك التجميد",
    "error.unsupported_order_statuses": "حالة الطلب غير مدعومة",
    "error.order_status_cannot_be_empty": "لا يمكن أن تكون حالة الطلب فارغة",
    "error.this_cannot_be_done_sell_orders": "لا يمكنك شراء أمر بيع قمت بنشره بنفسك",
    "error.the_minimum_volume_was_not_reached": "لم يتم الوصول إلى الحد الأدنى لحجم الصفقة",
    "error.this_cannot_be_done_buy_orders": "لا يمكنك بيع أمر شراء قمت بنشره بنفسك",
    "error.quantity_is_invalid": "الكمية غير صالحة",
    "error.quantity_exceeds_the_remaining_available_volume": "الكمية تتجاوز الحجم المتاح",
    "error.contract_does_not_exist": "الصفقة غير موجودة",
    "error.order_status_is_not_payable": "لا يمكن دفع هذا الطلب في حالته الحالية",
    "error.order_status_is_not_release": "لا يمكن تحرير هذا الطلب في حالته الحالية",
    "error.payout_method_does_not_exist": "طريقة الدفع غير موجودة",
    "error.password_is_inconsistent_twice": "كلمتا المرور غير متطابقتين",
    "common.success": "تمت العملية بنجاح",
    "common.fail": "فشلت العملية",
    "error.login_failed": "فشل تسجيل الدخول، يرجى التحقق من اسم المستخدم أو كلمة المرور",
    "error.unauthorized": "لم تقم بتسجيل الدخول، يرجى تسجيل الدخول أولاً",
    "error.token_expired": "انتهت صلاحية تسجيل الدخول، يرجى تسجيل الدخول مرة أخرى",
    "error.invalid_token": "رمز مميز غير صالح، يرجى تسجيل الدخول مرة أخرى",
    "error.account_locked": "تم قفل الحساب، يرجى الاتصال بالمسؤول",
    "error.user_not_found": "لم يتم العثور على المستخدم",
    "error.user_exists": "المستخدم موجود بالفعل",
    "error.invalid_password": "كلمة المرور غير صحيحة",
    "error.invalid_email": "تنسيق البريد الإلكتروني غير صحيح",
    "error.param_missing": "المعلمة المطلوبة مفقودة",
    "error.validation_failed": "فشل التحقق من المعلمات",
    "error.method_not_allowed": "طريقة الطلب غير مسموح بها",
    "error.order_not_found": "لم يتم العثور على الطلب",
    "error.order_already_paid": "تم دفع الطلب بالفعل",
    "error.order_expired": "انتهت صلاحية الطلب",
    "error.payment_failed": "فشل الدفع، يرجى المحاولة لاحقًا",
    "error.insufficient_balance": "الرصيد غير كافٍ، يرجى إعادة الشحن",
    "error.payment_method_invalid": "طريقة الدفع غير صالحة",
    "error.too_frequent": "الطلبات متكررة جدًا، يرجى المحاولة لاحقًا",
    "error.operation_limited": "العملية الحالية مقيدة",
    "error.system_error": "خطأ في النظام، يرجى المحاولة لاحقًا",
    "error.database_error": "خطأ في عمليات قاعدة البيانات",
    "error.service_unavailable": "الخدمة غير متوفرة مؤقتًا",
    "error.miner.not_found": "لم يتم العثور على المعدن",
    "error.miner.insufficient_power": "قوة المعدن غير كافية، لا يمكن إجراء العملية",
    "error.miner.upgrade_locked": "ترقية المعدن مغلقة حالياً",
    "error.token.symbol_exists": "رمز العملة موجود بالفعل",
    "error.token.invalid_supply": "إمدادات العملة غير صالحة",
    "error.token.creation_failed": "فشل إنشاء العملة، يرجى المحاولة لاحقًا",
    "error.node.already_applied": "لقد تقدمت بالفعل للحصول على العقدة، لا حاجة لتقديم طلب آخر",
    "error.node.not_eligible": "الشروط الحالية لا تفي بمتطلبات التقديم للعقدة",
    "error.node.capacity_full": "سعة العقدة ممتلئة، يرجى المحاولة لاحقًا",
    "error.wallet.not_bound": "يرجى ربط عنوان المحفظة أولاً",
    "error.wallet.invalid_address": "تنسيق عنوان المحفظة غير صحيح",
    "error.wallet.network_mismatch": "شبكة المحفظة الحالية لا تتطابق مع النظام",
    "error.task.not_found": "المهمة غير موجودة أو تم حذفها",
    "error.task.already_completed": "تم إتمام المهمة بالفعل، لا يمكن تكرار العملية",
    "error.task.not_unlocked": "يرجى إتمام المهام المبدئية أولاً",
    "error.recharge.failed": "فشل الشحن، يرجى التحقق من الشبكة أو المحاولة لاحقًا",
    "error.recharge.min_amount": "مقدار الشحن أقل من الحد الأدنى",
    "error.recharge.pending": "الشحن قيد المعالجة، يرجى التحقق من الحالة لاحقًا",
    "error.withdrawal.failed": "فشل السحب، يرجى المحاولة لاحقًا",
    "error.withdrawal.exceeds_limit": "مبلغ السحب يتجاوز الحد",
    "error.withdrawal.insufficient_balance": "الرصيد غير كافٍ للسحب",
    "error.buy_order.invalid_price": "سعر الطلب غير صالح",
    "error.buy_order.quota_exceeded": "مقدار الطلب يتجاوز الحد",
    "error.sell_order.insufficient_token": "عدد الرموز غير كافٍ للبيع",
    "error.sell_order.invalid_quantity": "الكمية غير صحيحة للبيع",
    "error.invite.invalid_code": "رمز الدعوة غير صالح أو منتهي الصلاحية",
    "error.invite.already_bound": "تم ربط رمز الدعوة بالفعل، لا يمكن تغييره",
    "error.level.upgrade_denied": "الشروط الحالية لا تفي بمتطلبات الترقية",
    "error.level.not_configured": "تكوين المستوى غير موجود حاليًا",
    "error.rebate.not_eligible": "أنت غير مؤهل للمكافأة",
    "error.rebate.calculation_error": "حدث خطأ أثناء حساب المكافأة",
    "error.rebate.distribution_failed": "فشل توزيع المكافأة، يرجى الاتصال بالمسؤول",
    "error.upload.file_too_large": "حجم الملف يتجاوز الحد المسموح به",
    "error.upload.unsupported_format": "تنسيق الملف غير مدعوم",
    "error.upload.failed": "فشل تحميل الملف",
    "error.kyc.pending": "التحقق من الهوية قيد الانتظار",
    "error.kyc.rejected": "تم رفض التحقق من الهوية، يرجى التحقق من المعلومات",
    "error.kyc.required": "يرجى إتمام التحقق من الهوية أولاً",
    "error.captcha.invalid": "رمز التحقق غير صحيح",
    "error.captcha.expired": "رمز التحقق منتهي الصلاحية",
    "error.captcha.required": "يرجى إدخال رمز التحقق",
    "error.risk.blacklisted": "تم حظر الحساب بسبب سلوك خطير",
    "error.risk.region_blocked": "الخدمة غير متوفرة في منطقتك",
    "error.risk.device_change": "تم اكتشاف تسجيل دخول من جهاز غير معتاد، يرجى التحقق من الهوية",
    "error.security.password_leaked": "تم اكتشاف تسريب كلمة المرور، يرجى تغييرها",
    "error.security.ip_blocked": "تم حظر عنوان IP الخاص بك مؤقتًا",
    "error.security.twofa_failed": "فشل التحقق المزدوج",
    "error.chain.gas_insufficient": "غاز المحفظة غير كافٍ",
    "error.chain.network_error": "خطأ في شبكة البلوكشين، يرجى المحاولة لاحقًا",
    "error.chain.tx_failed": "فشل بث المعاملة على الشبكة",
    "error.chain.nonce_conflict": "تعارض في ترتيب المعاملات، يرجى المحاولة لاحقًا",
    "error.notify.email_failed": "فشل إرسال البريد الإلكتروني، يرجى المحاولة لاحقًا",
    "error.notify.sms_failed": "فشل إرسال الرسائل النصية",
    "error.notify.rate_limited": "إرسال مفرط، يرجى المحاولة لاحقًا",
    "filterReset": "إعادة تعيين الفلتر",
    "filter": "فلتر",
    "electronicPayment": "الدفع الإلكتروني",
    "announcementCenter": "الإعلانات",
    "verified": "تم التحقق",
    "searchPointsPlaceholder": "ابحث عن النقاط...",
    "searchRWAPlaceholder": "ابحث عن النقاط...",
    "minimumAmount": "الحد الأدنى",
    "accountBalance": "الرصيد",
    "transactionHistory": "سجل المعاملات",
    "address": "العنوان",
    "pleaseUseAnyPaymentMethod": "استخدم أي طريقة دفع",
    "allRecords": "جميع السجلات",
    "recentTransactions": "المعاملات الأخيرة",
    "allAssets": "جميع النقاط",
    "currentUSDTBalance": "رصيد USDT",
    "inviteFriends": "دعوة الأصدقاء",
    "myGifts": "هداياي",
    "helpCenter": "مركز المساعدة",
    "orderLimitDescription": "3 أوامر شراء و3 بيع عادية، أو 10 أوامر مضمونة",
    "paymentCompleted": "تم الدفع",
    "transferInBalance": "إيداع",
    "setupSuccess": "تم الإعداد بنجاح",
    "secondPasswordSetupSuccess": "تم تعيين كلمة المرور الثانوية",
    "pleaseSetSecondPassword": "حدد كلمة مرور ثانوية",
    "confirmSecondPassword": "تأكيد كلمة المرور",
    "reenterSecondPassword": "إعادة إدخال كلمة المرور",
    "confirmSetup": "تأكيد الإعداد",
    "securityEmail": "البريد الإلكتروني الآمن",
    "resetSuccess": "تمت إعادة التعيين بنجاح",
    "secondPasswordResetSuccess": "تم إعادة تعيين كلمة المرور الثانوية",
    "enterSecurityEmail": "إدخال البريد الإلكتروني الآمن",
    "resetPassword": "إعادة تعيين كلمة المرور",
    "enterCurrentPassword": "إدخال كلمة المرور الحالية",
    "passwordTooShort": "كلمة المرور قصيرة جدًا",
    "passwordTooLong": "كلمة المرور طويلة جدًا",
    "passwordComplexity": "يجب أن تحتوي على أحرف وأرقام",
    "passwordMismatch": "كلمات المرور غير متطابقة",
    "passwordUpdateSuccess": "تم التعديل بنجاح",
    "secondPasswordUpdateSuccess": "تم تعديل كلمة المرور الثانوية",
    "currentSecondPassword": "كلمة المرور الثانوية الحالية",
    "enterCurrentSecondPassword": "إدخال كلمة المرور الثانوية الحالية",
    "setNewSecondPassword": "تعيين كلمة مرور ثانوية جديدة",
    "newSecondPassword": "كلمة المرور الثانوية الجديدة",
    "confirmNewSecondPassword": "تأكيد كلمة المرور الجديدة",
    "reenterNewSecondPassword": "إعادة إدخال كلمة المرور الجديدة",
    "confirmUpdate": "تأكيد التعديل",
    "lowestAsk": "أدنى عرض للبيع",

    "priceAndVolumeTrend": "اتجاه السعر والحجم",
    "priceCNY": "السعر (يوان)",
    "volume": "الحجم",
    "priceGeneral": "السعر",
    "currentPrice": "السعر الحالي",
    "volume24h": "حجم 24 ساعة",
    "turnover": "التداول",
    "cancelSuccess": "تم الإلغاء",
    "orderCanceled": "تم إلغاء الطلب",
    "orderReleased": "تم الإفراج عن الطلب",
    "releaseSuccess": "تم الإفراج بنجاح",
    "selectCountryCode": "اختر الرمز",
    "countryCode": "رمز الدولة",
    "countryJapan": "(اليابان)",
    "countryKorea": "(كوريا)",
    "countrySG": "(سنغافورة)",
    "countryAU": "(أستراليا)",
    "countryUK": "(المملكة المتحدة)",
    "countryUSCA": "(الولايات المتحدة)",
    "countryCN": "(الصين)",
    "uploadPaymentCode": "تحميل رمز الدفع",
    "clickToUploadQrCode": "انقر لتحميل رمز الدفع",
    "imageFormatTip": "يدعم JPG و PNG",
    "paymentQrCode": "رمز الدفع",
    "clickToUploadImage": "انقر لتحميل الصورة",
    "uploadImageTip": "يدعم JPG و PNG، بحد أقصى 3 صور",
    "uploadScreenshotProof": "تحميل لقطة شاشة",
    "codeMinLength": "الرمز يجب ألا يقل عن 4 أرقام",
    "codeMaxLength": "الرمز يجب ألا يتجاوز 6 أرقام",
    "codeSent": "تم إرسال الرمز",
    "codeSentToEmail": "تم إرسال الرمز للبريد الإلكتروني",
    "codeFailed": "فشل في الحصول على الرمز",
    "bindSuccess": "تم الربط بنجاح",
    "secureEmailBindSuccess": "تم ربط البريد الإلكتروني بنجاح",
    "bindFailed": "فشل الربط",
    "verifyCode": "رمز التحقق",
    "enterCode": "أدخل رمز التحقق",
    "sending": "جارٍ الإرسال...",
    "getCode": "احصل على الرمز",
    "retryInSeconds": "أعد المحاولة بعد ثوانٍ",
    "bindSecureEmail": "ربط البريد الإلكتروني الآمن",
    "pointCategoryDesc": "تداول نقاط مثل الطيران، المتاجر، الفنادق",
    "airlinePoints": "نقاط الطيران",
    "mallPoints": "نقاط المتجر",
    "hotelPoints": "نقاط الفندق",
    "bankPoints": "نقاط البنك",
    "rwaCategoryDesc": "استثمر في الأصول مثل الذهب، الفن، العقارات",
    "goldShares": "حصص الذهب",
    "artworks": "الأعمال الفنية",
    "realEstateShares": "حصص العقارات",
    "jewelryDiamonds": "المجوهرات والألماس",
    "connectWallet": "ربط المحفظة",
    "connectWalletDescription": "ربط محفظتك للوصول للتطبيق",
    "connecting": "جارٍ الاتصال...",
    "phoneMinLength": "رقم الهاتف يجب أن يحتوي على 5 أرقام على الأقل",
    "phoneMaxLength": "رقم الهاتف يجب ألا يتجاوز 15 رقمًا",
    "invalidEmail": "يرجى إدخال بريد إلكتروني صالح",
    "accountMinLength": "الحساب يجب أن يحتوي على حرفين على الأقل",
    "accountMaxLength": "الحساب يجب ألا يتجاوز 50 حرفًا",
    "saveContactFailed": "فشل حفظ الاتصال",
    "saveErrorRetryLater": "حدث خطأ أثناء الحفظ، يرجى المحاولة لاحقًا",
    "contactDeleted": "تم حذف الاتصال",
    "contactDeletedSuccess": "تم حذف الاتصال بنجاح",
    "confirmDeleteContact": "هل أنت متأكد من حذف هذا الاتصال؟",
    "irreversibleDeleteContact": "لا يمكن التراجع عن هذا، سيتم حذف الاتصال نهائيًا",
    "noContactInfo": "لا توجد معلومات اتصال",
    "addContactInfo": "إضافة معلومات الاتصال",
    "editContactInfo": "تعديل معلومات الاتصال",
    "phoneNumbers": "أرقام الهاتف",
    "enterPhoneNumber": "أدخل رقم الهاتف",
    "emailAddress": "عنوان البريد الإلكتروني",
    "enterEmailAddress": "أدخل البريد الإلكتروني",
    "socialType": "نوع الوسائط الاجتماعية",
    "selectSocialType": "اختر نوع الوسائط الاجتماعية",
    "saving": "جارٍ الحفظ...",
    "addedPaymentMethods": "طرق الدفع المضافة",
    "cardNumber": "رقم البطاقة",
    "enterCardNumber": "أدخل رقم البطاقة",
    "enterAccountHolder": "أدخل اسم صاحب الحساب",
    "enterBankName": "أدخل اسم البنك",
    "enterAccountNumber": "أدخل رقم الحساب",
    "enterWalletAddress": "أدخل عنوان المحفظة",
    "updateSuccess": "تم التحديث بنجاح",
    "addSuccess": "تمت الإضافة بنجاح",
    "deleteSuccess": "تم الحذف بنجاح",
    "bankUnionPay": "يونيون باي",
    "bankWeChat": "وي تشات",
    "bankAlipay": "علي باي",
    "eWallet": "محفظة إلكترونية",
    "confirmDeletePaymentMethod": "هل أنت متأكد من حذف طريقة الدفع؟",
    "irreversibleDeletePaymentMethod": "لا يمكن التراجع عن هذا، سيتم حذف طريقة الدفع نهائيًا",
    "noPaymentMethod": "لا توجد طريقة دفع",
    "addPaymentMethod": "إضافة طريقة دفع",
    "editPaymentMethod": "تعديل طريقة الدفع",
    "selectCardType": "اختر نوع البطاقة",
    "cardType": "نوع البطاقة",
    "accountHolder": "صاحب الحساب",
    "bankName": "اسم البنك",
    "swiftCodeOptional": "رمز SWIFT (اختياري)",
    "enterSwiftCode": "أدخل رمز SWIFT",
    "ibanOptional": "ABA/IBAN/CIC (اختياري)",
    "enterIban": "أدخل ABA/IBAN/CIC",
    "walletType": "نوع المحفظة",
    "selectWalletType": "اختر نوع المحفظة",
    "account": "الحساب",
    "enterAccount": "أدخل الحساب",
    "currencyType": "نوع العملة",
    "selectCurrencyType": "اختر العملة",
    "mainnet": "الشبكة الرئيسية",
    "selectMainnet": "اختر الشبكة الرئيسية",
    "add": "إضافة",
    "confirmPayOrderTitle": "تأكيد دفع الطلب؟",
    "confirmPayOrderContent": "لقد أكملت التحويل",
    "myWallet": "محفظتي",
    "multiChainAssetMgmt": "إدارة الأصول المتعددة",
    "bitcoin": "بيتكوين",
    "incomplete": "غير مكتمل",
    "cancelOrders": "إلغاء",
    "marketOrders": "طلبات السوق",
    "supportUSDT": "يدعم USDT",
    "marketSellLabel": "بيع",
    "marketSellOrderLabel": "أمر بيع",
    "marketBuyOrderLabel": "أمر شراء",
    "orderCount": "عدد الصفقات",
    "averagePayment": "متوسط الدفع",
    "arbitrationRate": "معدل",
    "minutes": "دقائق",
    "circulation": "الكمية المتداولة",
    "totalSupply": "إجمالي العرض",
    "issuer": "المُصدر",
    "pointsDetail": "تفاصيل النقاط",
    "fetchAssetDetailFailed": "فشل في الحصول على التفاصيل",
    "securitySettings": "إعدادات الأمان",
    bindSecurityEmail: "ربط",
    setSecondaryPassword: "تعيين",
    changeSecondaryPassword: "تغيير",
    resetSecondaryPassword: "إعادة",
    "bindSecurityEmailSuccess": "تم ربط البريد بنجاح",
    "setSecondaryPasswordSuccess": "تم تعيين كلمة المرور بنجاح",
    "refreshSuccess": "تم التحديث بنجاح",
    "copySuccess": "تم النسخ بنجاح",
    "myReceivingAddress": "عنوان الاستلام",
    "receivingAddress": "عنوان الاستلام",
    "pleaseEnterReceivingAddress": "أدخل عنوان الاستلام",
    "withdrawMinAmount": "الحد الأدنى للسحب 1 USDT",
    "withdrawSuccess": "تم السحب بنجاح",
    "withdrawn": "تم السحب بنجاح",
    "totalAssetValue": "إجمالي قيمة النقاط",
    "realTimeValuation": "التقييم اللحظي",
    "currency": "العملة",
    "custodyWalletBalance": "رصيد المحفظة الخاضعة للإشراف",
    "assetList": "النقاط",
    "onlyTransferBscAssets": "نقاط BSC فقط",
    "receivingQRCode": "رمز الاستلام",
    "share": "مشاركة",
    "copy": "نسخ",
    "withdrawBalance": "سحب",
    "useBscNetwork": "استخدم شبكة BSC",
    "withdrawAmount": "مبلغ السحب",
    "serviceFee": "رسوم الخدمة",
    "withdrawing": "جارٍ السحب...",
    "confirmWithdraw": "تأكيد السحب",
    "postSell": "نشر البيع",
    "sellNoticeBuyerMayAccept": "بعد النشر، يمكن للمشتري قبول عرضك",
    "sellNoticeFundsReceivedAndAsset": "بعد الصفقة، ستتلقى المبلغ ويتم خصم الأصول",
    "sellNoticeServiceFee": "رسوم خدمة على عملية البيع",
    "sellAssetSection": "بيع النقاط",
    "availableSellQuantity": "الكمية المتاحة للبيع",
    "enterUnitPrice": "أدخل سعر الوحدة",
    "pleaseEnterSellPrice": "أدخل سعر البيع",
    "sellQuantity": "كمية البيع",
    "minSellQuantity": "الحد الأدنى للبيع",
    "actualDeductQuantity": "الكمية المخصومة فعليًا",
    "totalReceivableAmount": "إجمالي المبلغ المستحق",
    "minTransactionQuantity": "الحد الأدنى للكمية",
    "enterValidSellPrice": "أدخل سعر بيع صالح",
    "sellPriceGreaterThan0": "سعر البيع يجب أن يكون أكبر من 0",
    "enterValidSellQuantity": "أدخل كمية بيع صالحة",
    "sellQuantityGreaterThanOrEqual1": "الكمية يجب أن تكون 1 أو أكثر",
    "sellQuantityGreaterThanOrEqual": "الكمية يجب أن تكون  أو أكثر",
    "enterValidMinSellQuantity": "أدخل حد أدنى صالح للبيع",
    "minSellQuantityGreaterThanOrEqual1": "الحد الأدنى للبيع يجب أن يكون 1 أو أكثر",
    "sellPostSuccess": "تم نشر العرض بنجاح",
    "sellPosted": "تم نشر العرض بنجاح",
    depositAction: "جلب المعلومات",
    withdrawAction: "مزامنة المعلومات",
    changeRecord: "تغيير",
    "noUSDTChangeRecord": "لا توجد سجلات تغييرات USDT",
    withdrawAsset: "الحصول على النقاط",
    depositAsset: "مزامنة النقاط",
    "buyAsset": "شراء النقاط",
    "sellAsset": "بيع النقاط",
    "assetChangeRecord": "تغيير النقاط",
    "all": "الكل",
    depositWithdraw: "جلب المعلومات / مزامنة المعلومات",
    "buySell": "شراء/بيع",
    "tradeValue": "قيمة التداول",
    "increaseRate24h": "نسبة التغير 24 ساعة",
    "frozenAmount": "الكمية المجمدة",
    "valuation": "التقييم",
    "assetAmount": "كمية الأصل",
    "assetDetail": "تفاصيل الأصل",
    "enableEscrowTip": "تمكين الدفع بالضمان لزيادة النجاح",
    "escrowExplanation": "عند التمكين، يتم استلام نقاط البائع ودفع USDT تلقائيًا",
    "remark": "ملاحظة",
    "buyOrderTip": "بعد تقديم الطلب، يمكن للبائع قبول عرضك",
    "tradeSuccessTip": "ادفع واستلم النقاط بعد التداول",
    "ensurePaymentAvailable": "تأكد من أن طريقة الدفع متاحة",
    "buyWillCharge": "سيتم فرض",
    "feeSuffix": "رسوم على الشراء",
    "pleaseEnterRemark": "أدخل الملاحظة",
    "allowPartialMatch": "السماح بالتجزئة",
    "buyAssets": "شراء النقاط",
    "purchasePostSuccess": "تم نشر طلب الشراء بنجاح",
    "purchasePosted": "تم نشر طلب الشراء",
    "pleaseSelectPaymentMethod": "اختر طريقة دفع واحدة على الأقل",
    "specifyBuyerPaymentMethod": "حدد طرق الدفع للمشتري",
    "enterValidMinQuantity": "أدخل كمية صفقة صالحة",
    "minQuantityAtLeast100": "الحد الأدنى 100",
    "minQuantityAtLeast": "الحد الأدنى ",
    "enterValidBuyQuantity": "أدخل كمية شراء صالحة",
    "buyQuantityGreaterThan0": "يجب أن تكون كمية الشراء أكبر من 0",
    "enterValidBuyPrice": "أدخل سعر شراء صالح",
    "buyPriceGreaterThan0": "يجب أن يكون السعر أكبر من 0",
    "minTransactionAmount": "أقل كمية للتداول",
    "minAmountLimitTip": "الحد الأدنى 100",
    "supportedPayment": "طرق الدفع المدعومة",
    "pointsMarket": "سوق النقاط",
    "pointsName": "اسم النقاط",
    "change24h": "تغير 24 ساعة",
    "transaction": "صفقة",
    "enterPrice": "أدخل السعر",
    "buyRequest": "طلب شراء",
    "minAskPrice": "أدنى سعر عرض",
    "maxAskPrice": "أعلى سعر عرض",
    "highestMarketBuyPrice": "أعلى سعر شراء في السوق",
    "pleaseEnterBuyPrice": "أدخل سعر الشراء",
    "buyQuantity": "كمية الشراء",
    "feeRate": "معدل الرسوم",
    "actualReceivedAmount": "الكمية المستلمة",
    "totalAmountPayable": "إجمالي المبلغ المستحق",
    "assetPointsPlatform": "منصة النقاط",
    "oneStopAssetPointsPlatformDesc": "منصة تداول شاملة",
    "processing": "جارٍ المعالجة...",
    "postBuyRequest": "نشر طلب شراء",
    "importantNotice": "تنبيه هام",
    "viewMorePoints": "عرض المزيد من النقاط",
    "viewMoreRWA": "عرض المزيد من RWA",
    "tip": "تنبيه",
    "applyArbitration": "تقديم طلب تحكيم",
    "describeProblemWithEvidence": "وصف المشكلة مع دليل الشاشة",
    "appealContent": "محتوى الاستئناف",
    "describeProblemInDetail": "وصف المشكلة بالتفصيل، بما في ذلك الوقت والمبلغ",
    "submitting": "جارٍ الإرسال...",
    "submitAppeal": "تقديم الاستئناف",
    "payment": "دفع",
    "paymentConfirmed": "تم تأكيد الدفع",
    "pleaseIn": "أكمل الدفع خلال",
    "completePayment": "إتمام الدفع",
    "orderNotExist": "الطلب غير موجود أو تم حذفه",
    "phoneNumber": "رقم الهاتف",
    "email": "البريد الإلكتروني",
    "socialMedia": "وسائل التواصل الاجتماعي",
    "pleaseEnterAppealContent": "أدخل محتوى الاستئناف",
    "appealSubmitted": "تم تقديم الاستئناف. سيتم معالجته خلال 24 ساعة.",
    "submitFailedRetry": "فشل الإرسال، يرجى المحاولة مجددًا.",
    "copiedToClipboard": "تم النسخ إلى الحافظة",
    "paymentConfirmedWaitSeller": "تم تأكيد الدفع. انتظر تأكيد البائع.",
    "bankCard": "بطاقة بنكية",
    "copied": "تم النسخ",
    "walletCopied": "تم نسخ المحفظة",
    "userIdCopied": "تم نسخ المعرف",
    "rwaMarket": "سوق RWA",
    "noMore": "لا مزيد",
    "buying": "شراء",
    "selling": "بيع",
    "pendingPayment": "الدفع",
    "pendingRelease": "الإفراج",
    "noOrders": "لا طلبات",
    "noArbitrationOrders": "لا تحكيم",
    "allOrders": "كل الطلبات",
    "arbitrationOrders": "التحكيم",
    "arbitrationRecords": "السجلات",
    "arbitrationCount": "عدد التحكيم",
    "totalCompletedOrders": "المنجزة",
    "sellOrderCount": "بيع",
    "buyOrderCount": "شراء",
    "totalOrders": "الإجمالي",
    "myOrders": "طلباتي",
    "sellSuccess": "تم البيع بنجاح",
    "buySuccess": "تم الشراء بنجاح",
    "buy": "شراء",
    "sell": "بيع",
    "back": "رجوع",
    "details": "تفاصيل",
    "totalAmounts": "المبلغ الإجمالي",
    "orderInfo": "معلومات الطلب",
    "createdTime": "وقت الإنشاء",
    "enterQuantity": "أدخل الكمية",
    "dataMissing": "بيانات مفقودة",
    "placeBuyOrder": "وضع أمر شراء",
    "placeSellOrder": "وضع أمر بيع",
    "minBuy": "الحد الأدنى للشراء",
    "minSell": "أدنى بيع",
    "amount": "الكمية",
    "price": "السعر",
    "total": "الإجمالي",
    "confirmReleasePrompt": "بعد التأكيد، سيتم تحويل الأصول للمشتري",
    "confirmCancel": "تأكيد الإلغاء",
    "confirmCancelPrompt": "هل تريد إلغاء هذا الطلب؟ لا يمكن التراجع.",
    "cancelOrder": "إلغاء الطلب",
    "contactInfo": "معلومات الاتصال",
    "orderNumber": "رقم الطلب",
    "time": "الوقت",
    "confirmCancelOrderQuestion": "هل تأكيد الإلغاء؟",
    "confirmRelease": "تأكيد الإفراج",
    "confirmReleaseOrderQuestion": "تأكيد الإفراج عن الطلب؟",
    "goToPay": "اذهب للدفع",
    "notSet": "غير محدد",
    "appName": "منصة النقاط",
    "cancel": "إلغاء",
    "confirm": "تأكيد",
    "save": "حفظ",
    "edit": "تعديل",
    "delete": "حذف",
    "loading": "جارٍ التحميل...",
    "success": "نجاح",
    "error": "خطأ",
    "arbitrationOrderId": "رقم طلب التحكيم",
    "arbitratorId": "معرّف المحكم",
    "respondent": "الطرف المحكوم عليه",
    "arbitrationDetails": "تفاصيل التحكيم",
    "home": "الرئيسية",
    "market": "السوق",
    "wallet": "المحفظة",
    "orders": "الطلبات",
    "assets": "النقاط",
    "profile": "الملف الشخصي",
    "profilePage": "الملف الشخصي",
    "accountSecurity": "أمان الحساب",
    "paymentMethods": "إدارة طرق الدفع",
    "contactMethods": "إدارة طرق الاتصال",
    "aboutUs": "عنا",
    "logout": "تسجيل الخروج",
    "editProfile": "تعديل الملف الشخصي",
    "verifyNow": "التحقق الآن",
    "availableBalance": "الرصيد المتاح",
    "frozenAssets": "النقاط المجمدة",
    "viewWallet": "عرض المحفظة",
    "creditScore": "النقاط الائتمانية",
    "activityScore": "نقاط النشاط",
    "search": "البحث عن النقاط أو الأصول...",
    "recommend": "موصى به",
    "points": "النقاط",
    "rwa": "الأصول الحقيقية",
    "hot": "شائع",
    "noPlatformAnnouncement": "لا توجد إعلانات",
    "hotTransactions": "المعاملات الساخنة",
    "noHotActivities": "لا أنشطة ساخنة",
    "platformAnnouncement": "إعلانات المنصة",
    "hotActivities": "الأنشطة الشائعة",
    "viewAll": "عرض الكل",
    "newUser": "مستخدم جديد",
    "limited": "محدود",
    "system": "النظام",
    "activity": "النشاط",
    "walletCenter": "مركز المحفظة",
    "totalAssets": "إجمالي النقاط",
    "deposit": "إيداع",
    "withdraw": "سحب",
    "transfer": "تحويل",
    "walletAddress": "عنوان المحفظة",
    "cryptoCurrency": "العملات المشفرة",
    "fiat": "العملات التقليدية",
    "paymentMethod": "طريقة الدفع",
    "addCrypto": "إضافة عملة مشفرة",
    "addFiat": "إضافة عملة تقليدية",
    "addPayment": "إضافة طريقة دفع",
    "memberLevels": "مستويات العضوية",
    "memberLevelSettings": "إعدادات المستوى",
    "createMemberLevel": "إنشاء مستوى عضوية",
    "editMemberLevel": "تعديل مستوى العضوية",
    "memberLevelDetails": "تفاصيل المستوى",
    "basicInfo": "المعلومات الأساسية",
    "levelBenefits": "مزايا المستوى",
    "previewEffect": "معاينة التأثير",
    "levelName": "اسم المستوى",
    "pointsRequired": "النقاط المطلوبة",
    "levelColor": "لون المستوى",
    "levelIcon": "أيقونة المستوى",
    "activeStatus": "حالة النشاط",
    "enabled": "مفعل",
    "disabled": "معطل",
    "pointsMultiplier": "مضاعف النقاط",
    "discountRate": "نسبة الخصم",
    "times": "مرات",
    "percent": "%",
    "pointsAcceleration": "تسريع النقاط",
    "exclusiveDiscount": "خصم حصري",
    "birthdayGift": "هدية عيد الميلاد",
    "dedicatedService": "خدمة مخصصة",
    "freeShipping": "شحن مجاني",
    "priorityPurchase": "أولوية الشراء",
    "addCustomBenefit": "إضافة ميزة مخصصة",
    "levelOrderTip": "اسحب لضبط ترتيب المستوى",
    "memberAutoUpgradeTip": "ترقية تلقائية بعد تلبية متطلبات المستوى",
    "disableLevelTip": "بعد التعطيل، لا يمكن الترقية إلى هذا المستوى",
    "deleteLevelTip": "بعد الحذف، سيتم تخفيض المستخدمين إلى المستوى التالي",
    "previewTip": "عرض تأثير المزايا المرئية لمستخدمي هذا المستوى",
    "merchantCenter": "مركز التاجر",
    "merchantId": "معرف التاجر",
    "pointsIssued": "النقاط المصدرة",
    "memberCount": "عدد الأعضاء",
    "managePoints": "إدارة النقاط",
    "dataCenter": "مركز البيانات",
    "manage": "إدارة",
    "activities": "الأنشطة",
    "data": "البيانات",
    "publishOrder": "نشر الطلب",
    "orderType": "نوع الطلب",
    "buyOrder": "أريد شراء",
    "sellOrder": "أريد بيع",
    "pointsType": "نوع النقاط",
    "pointsQuantity": "كمية النقاط",
    "unitPrice": "سعر الوحدة",
    "totalAmount": "المبلغ الإجمالي",
    "orderDescription": "وصف الطلب",
    "negotiable": "قابل للتفاوض",
    "expiration": "انتهاء الصلاحية",
    "publishNewOrder": "نشر طلب جديد",
    "orderDetail": "تفاصيل الطلب",
    "immediatelyBuy": "اشتري الآن",
    "immediatelySell": "بيع الآن",
    "makeOffer": "تقديم عرض",
    "contactSeller": "الاتصال بالبائع",
    "contactBuyer": "الاتصال بالمشتري",
    "transactionNotes": "ملاحظات المعاملة",
    "orderStatus": "حالة الطلب",
    "active": "نشط",
    "completed": "مكتمل",
    "cancelled": "ألغيت",
}

// 日语翻译
export const jaTranslations: Translations = {
    pleaseSelectContactMethod: "連絡方法を選択してください",
    specifyBuyerContactMethod: "購入者の連絡方法を指定してください",
    "error.price_exceeds_ceiling": "単価が上限価格を超えています",
    "error.price_below_floor": "単価が下限価格を下回っています",
    syncPointsConfirm: "ポイント情報を同期してもよろしいですか？",

    "success.sync": "同期に成功しました",

    "error.the_call_succeeds_but_no_data_is_available": "まず発行プラットフォームに連携してください",

    "common.transfer_in": "転入",
    "common.transfer_out": "転出",
    "error.no_pending_into_record_found": "転入する資産はありません",
    getOrPushInfo: "情報の取得／プッシュ",
    pushInfo: "情報をプッシュ",
    pushPointsInfo: "ポイント情報をプッシュ",
    noDatas: "なし",
    minimumPurchaseQuantity: "最低購入数量",
    onlineService: "オンラインカスタマーサービス",
    contactUpdated: "連絡先情報が更新されました",
    updateSuccess1: "正常に更新されました",
    contactAdded: "連絡先情報が追加されました",
    addSuccess1: "正常に追加されました",
    "error.helpCenter_was_not_found": "ヘルプセンターが見つかりません",
    "error.security_invalid_code": "認証コードが正しくありません",
    theArbitratorIsNotPure: "仲裁者が存在しません", // 新的错误提示
    "error.notice_was_not_found": "通知が見つかりません",
    "error.activity_was_not_found": "アクティビティが見つかりません",
    "error.user_email_not_exists": "メールアドレスが未登録です",

    "error.security_invalid_password": "元のパスワードが正しくありません",
    "error.bind_was_not_found": "バインディングが見つかりませんでした",

    airdropEvent: "エアドロップイベント",
    inviteFriendsToRegister: "友達を招待して登録",
    newUserRegistrationReward: "新規登録特典",
    newUserGift: "新規ユーザー特典",
    "error.the_interface_returns_an_error": "インターフェースからエラーが返されました",
    "error.binding_failed": "バインドに失敗しました",
    "error.arbitration_record_already_exists": "この仲裁記録はすでに存在します",
    aiAssistant: "AIアシスタント",
    noData: "データがありません",
    "announcement.system": "システムのお知らせ",
    "announcement.event": "イベントのお知らせ",
    "announcement.feature_update": "機能アップデート",
    "announcement.new_user_gift": "新規ユーザー特典",
    "announcement.marketing": "マーケティングのお知らせ",
    no_more_announcements: "これ以上のお知らせはありません",
    welcomeToHelpCenter: "ヘルプセンターへようこそ",
    helpCenterDescription: "よくある質問や使い方ガイドをご覧いただけます",
    "error.auto_revocation_time_not_configured": "ポイントに自動取消時間が設定されていません",
    "error.invalid_transaction_type": "取引タイプが無効です",
    "transferInAmount": "入金数量",
    transferSuccess1: "正常に入金されました",
    transferSuccess2: "入金成功",
    to: "へ",
    transferInDetail: "入金の詳細",
    errorInvalidTransactionType: "取引タイプが無効です",
    enterTransferInAmount: "入金額を入力してください",
    copyFailed: "コピーに失敗しました",

    "error.transfer_exceeds_balance": "出金額がポイント残高を超えることはできません",
    hour: "時間",
    day: "日",
    enterReceiverAddress: "受取プラットフォームのアドレスを入力してください",
    receiverAddressRequired: "受取アドレスは必須です",
    enterValidAmount: "有効な出金額を入力してください",
    amountGreaterThanZero: "出金額は0より大きくなければなりません",
    transferOutDetail: "出金詳細",
    receiverPlatformAddress: "受取プラットフォームのアドレス",
    pleaseEnterReceiverPlatformAddress: "受取プラットフォームのアドレスを入力してください",
    available: "利用可能",
    enterTransferOutAmount: "出金額を入力",
    balance: "残高",
    maxTransferOut: "最大出金可能額",
    transferNote: "ポイントは指定されたアドレスに送信されます",
    confirmAddressWarning: "アドレスを慎重に確認してください。間違ったアドレスはポイントの損失につながります",
    irreversibleWarning: "出金は元に戻せません。金額をご確認ください",
    transferFeeNote: "出金には手数料がかかります",
    scanWithWalletQR: "対応済みウォレットでQRをスキャン",
    useSupported: "対応済みを使用",
    scanToDeposit: "上のQRコードをスキャンして入金",
    tokenAddress: "TOKENアドレス",
    clickToCopy: "クリックでアドレスをコピー",
    confirmAssetType: "送信するポイントタイプをご確認ください",
    wrongAssetLoss: "ポイントタイプを誤ると永久に失われる可能性があります",
    testBeforeBigTransfer: "まず少額でテストしてから大額を送金してください",
    waitNetworkConfirm: "送金後はネットワーク確認をお待ちください（数分～数時間）",
    copieds: "コピー済み",
    tokenCopied: "TOKENコピー済み",
    depositNote: "説明",
    depositToYourAccount: "アカウントに送金",
    howToDeposit: "以下の方法で入金可能です",
    useSupportedWallet: "対応ウォレットを使用",
    copyTokenToWallet: "アドレスをコピー",
    depositTips: "確認後に反映",
    qrCode: "QRコード",
    "error.invalid_type": "無効なタイプ",
    "wechatId": "WeChat ID（ウィーチャットID）",
    "qqId": "QQ ID（キューキューID）",
    "wechatPay": "WeChat Pay（ウィーチャットペイ）",
    "error.currency_required": "変換する通貨を入力してください",
    "error.not_supported_currency": "サポートされていない通貨です",
    "error.failed_to_get_the_exchange_rate": "為替レートの取得に失敗しました",
    "error.there_is_no_exchange_rate_for_this_currency": "この通貨の為替レートはありません",
    "arbitrationEvidence": "仲裁証拠",
    "arbitrationStatus": "仲裁ステータス",
    "error.least_deal_amount_not_reached": "最小取引数量に達していません",
    "initiator": "申立人",
    "error.minimum_amount_cannot_exceed_total_amount": "分割金額は注文金額を超えてはいけません",
    "error.invalid_or_expired_nonce": "無効または期限切れの nonce です",
    "error.signature_mismatch": "署名が一致しません",
    "error.signature_verification": "署名の検証に失敗しました",
    "error.user_is_not_bound_freeze_group": "このユーザーは有効な凍結グループに紐づいていません",
    "error.user_not_exist": "ユーザーが存在しません",
    "error.user_address_does_not_match": "ユーザーアドレスが一致しません",
    "error.timestamp_is_invalid": "無効なタイムスタンプです",
    "error.upload_failed": "アップロードに失敗しました",
    "error.pending_sell_order_has_reached_its_maximum_value": "出品中の売却注文が上限に達しました",
    "error.asset_was_not_found": "ポイントが見つかりませんでした",
    "error.order_type_is_incorrect": "注文タイプが正しくありません",
    "error.number_of_assets_is_insufficient": "ポイント数が不足しています",
    "error.pending_buy_order_has_reached_its_maximum_value": "未処理の買い注文が最大値に達しました",
    "error.minimum_volume_cannot_be_empty": "最小取引量は空にできません",
    "error.order_does_not_exist": "注文が存在しません",
    "error.order_does_not_exist_or_has_a_status_that_cannot_be_cancelled": "注文が存在しないか、キャンセルできない状態です",
    "error.cancellations_are_not_possible": "未完了の取引があるためキャンセルできません",
    "error.assets_cannot_be_unfrozen": "ポイント口座が存在せず、解除できません",
    "error.unsupported_order_statuses": "未対応の注文ステータスです",
    "error.order_status_cannot_be_empty": "注文ステータスは空にできません",
    "error.this_cannot_be_done_sell_orders": "自分が出した売り注文は購入できません",
    "error.the_minimum_volume_was_not_reached": "最小取引数量に達していません",
    "error.this_cannot_be_done_buy_orders": "自分が出した買い注文には売却できません",
    "error.quantity_is_invalid": "数量が無効です",
    "error.quantity_exceeds_the_remaining_available_volume": "数量が残りの取引量を超えています",
    "error.contract_does_not_exist": "取引が存在しません",
    "error.order_status_is_not_payable": "この注文ステータスでは支払えません",
    "error.order_status_is_not_release": "この注文ステータスでは放行できません",
    "error.payout_method_does_not_exist": "支払方法が存在しません",
    "error.password_is_inconsistent_twice": "パスワードが一致しません",
// 错误提示
    "common.success": "操作が成功しました",
    "common.fail": "操作に失敗しました",
    "error.login_failed": "ログインに失敗しました。アカウントまたはパスワードを確認してください",
    "error.unauthorized": "ログインしていません。先にログインしてください",
    "error.token_expired": "ログインの有効期限が切れました。再度ログインしてください",
    "error.invalid_token": "無効なトークンです。再度ログインしてください",
    "error.account_locked": "アカウントがロックされました。管理者に連絡してください",
    "error.user_not_found": "ユーザーが見つかりません",
    "error.user_exists": "ユーザーはすでに存在します",
    "error.invalid_password": "パスワードが正しくありません",
    "error.invalid_email": "メールアドレスの形式が正しくありません",
    "error.param_missing": "リクエストパラメータが欠けています",
    "error.validation_failed": "パラメータの検証に失敗しました",
    "error.method_not_allowed": "リクエスト方法は許可されていません",
    "error.order_not_found": "注文が見つかりません",
    "error.order_already_paid": "注文はすでに支払われました",
    "error.order_expired": "注文の有効期限が切れました",
    "error.payment_failed": "支払いに失敗しました。後で再試行してください",
    "error.insufficient_balance": "残高が不足しています。チャージしてください",
    "error.payment_method_invalid": "支払い方法が無効です",
    "error.too_frequent": "リクエストが多すぎます。後で再試行してください",
    "error.operation_limited": "現在、この操作は制限されています",
    "error.system_error": "システムエラーが発生しました。後で再試行してください",
    "error.database_error": "データベース操作エラー",
    "error.service_unavailable": "サービスは現在利用できません",
    "error.miner.not_found": "マイニングマシンが見つかりません",
    "error.miner.insufficient_power": "マイニングマシンの計算能力が不足しており、操作を実行できません",
    "error.miner.upgrade_locked": "マイニングマシンは現在アップグレードできません",
    "error.token.symbol_exists": "トークンシンボルはすでに存在します",
    "error.token.invalid_supply": "トークン供給量が無効です",
    "error.token.creation_failed": "トークンの作成に失敗しました。後で再試行してください",
    "error.node.already_applied": "すでにノードを申請しています。再度申請する必要はありません",
    "error.node.not_eligible": "現在の条件ではノード申請の要件を満たしていません",
    "error.node.capacity_full": "ノードの容量は満杯です。後で再試行してください",
    "error.wallet.not_bound": "まずウォレットアドレスをバインドしてください",
    "error.wallet.invalid_address": "ウォレットアドレスの形式が正しくありません",
    "error.wallet.network_mismatch": "現在のウォレットネットワークはシステムと一致していません",
    "error.task.not_found": "タスクが見つかりません、または削除されました",
    "error.task.already_completed": "このタスクはすでに完了しており、再度操作できません",
    "error.task.not_unlocked": "前提タスクを完了してください",
    "error.recharge.failed": "チャージに失敗しました。ネットワークを確認するか、後で再試行してください",
    "error.recharge.min_amount": "チャージ金額が最低額を下回っています",
    "error.recharge.pending": "チャージは処理中です。状態を後で確認してください",
    "error.withdrawal.failed": "引き出しに失敗しました。再試行してください",
    "error.withdrawal.exceeds_limit": "引き出し金額が制限を超えています",
    "error.withdrawal.insufficient_balance": "口座残高が不足しています",
    "error.buy_order.invalid_price": "買い注文の価格が無効です",
    "error.buy_order.quota_exceeded": "買い注文金額が制限を超えています",
    "error.sell_order.insufficient_token": "販売するトークンが不足しています",
    "error.sell_order.invalid_quantity": "販売注文数量が正しくありません",
    "error.invite.invalid_code": "招待コードが無効または期限切れです",
    "error.invite.already_bound": "すでに招待コードがバインドされています。変更できません",
    "error.level.upgrade_denied": "現在の条件ではアップグレード要件を満たしていません",
    "error.level.not_configured": "現在のレベル構成は存在しません",
    "error.rebate.not_eligible": "あなたは報酬を受け取る資格がありません",
    "error.rebate.calculation_error": "報酬計算中にエラーが発生しました",
    "error.rebate.distribution_failed": "報酬の配布に失敗しました。管理者に連絡してください",
    "error.upload.file_too_large": "ファイルサイズが制限を超えています",
    "error.upload.unsupported_format": "ファイル形式はサポートされていません",
    "error.upload.failed": "ファイルのアップロードに失敗しました",
    "error.kyc.pending": "本人確認の審査中です",
    "error.kyc.rejected": "本人確認に失敗しました。情報を確認してください",
    "error.kyc.required": "本人確認を完了してください",
    "error.captcha.invalid": "キャプチャコードが正しくありません",
    "error.captcha.expired": "キャプチャコードが期限切れです",
    "error.captcha.required": "キャプチャコードを入力してください",
    "error.risk.blacklisted": "アカウントにリスク行動があり、制限されています",
    "error.risk.region_blocked": "あなたの地域ではこのサービスは利用できません",
    "error.risk.device_change": "異常なデバイスでのログインが検出されました。本人確認を行ってください",
    "error.security.password_leaked": "パスワード漏洩のリスクが検出されました。パスワードを変更してください",
    "error.security.ip_blocked": "あなたのIPが一時的にブロックされました",
    "error.security.twofa_failed": "二段階認証に失敗しました",
    "error.chain.gas_insufficient": "ウォレットのガス料金が不足しています",
    "error.chain.network_error": "ブロックチェーンネットワークに異常があります。後で再試行してください",
    "error.chain.tx_failed": "チェーン上でのトランザクションの送信に失敗しました",
    "error.chain.nonce_conflict": "取引の順序に衝突があります。再試行してください",
    "error.notify.email_failed": "メールの送信に失敗しました。後で再試行してください",
    "error.notify.sms_failed": "SMSの送信に失敗しました",
    "error.notify.rate_limited": "送信が頻繁すぎます。後で再試行してください",
    "filterReset": "フィルターリセット",
    "filter": "フィルター",
    "electronicPayment": "電子決済",
    "announcementCenter": "お知らせセンター",
    "verified": "認証済み",
    "searchPointsPlaceholder": "ポイントを検索...",
    "searchRWAPlaceholder": "RWAポイントを検索...",
    "minimumAmount": "最小数量",
    "accountBalance": "アカウント残高",
    "address": "アドレス",
    "pleaseUseAnyPaymentMethod": "以下のいずれかの支払い方法をご利用ください",
    "transactionHistory": "取引履歴",
    "allAssets": "すべてのポイント",
    "allRecords": "すべての記録",
    "currentUSDTBalance": "現在のUSDT残高",
    "inviteFriends": "友達を招待する",
    "myGifts": "マイギフト",
    "recentTransactions": "最近の取引",
    "orderLimitDescription": "最大3件の買いと売り注文、エスクロー注文は最大10件",
    "transferInBalance": "入金",
    "paymentCompleted": "支払いが完了しました",
    "setupSuccess": "設定成功",
    "secondPasswordSetupSuccess": "セカンダリパスワード設定成功",
    "pleaseSetSecondPassword": "セカンダリパスワードを設定してください",
    "confirmSecondPassword": "セカンダリパスワード確認",
    "reenterSecondPassword": "セカンダリパスワードを再入力",
    "confirmSetup": "設定確認",
    "securityEmail": "セキュリティメールアドレス",
    "resetSuccess": "リセット成功",
    "secondPasswordResetSuccess": "セカンダリパスワードリセット成功",
    "enterSecurityEmail": "セキュリティメールアドレスを入力",
    "resetPassword": "パスワードリセット",
    "enterCurrentPassword": "現在のパスワードを入力",
    "passwordTooShort": "パスワードは6文字以上",
    "passwordTooLong": "パスワードは20文字以内",
    "passwordComplexity": "大文字・小文字・数字を含む必要あり",
    "passwordMismatch": "パスワードが一致しません",
    "passwordUpdateSuccess": "パスワード変更成功",
    "secondPasswordUpdateSuccess": "セカンダリパスワード変更成功",
    "currentSecondPassword": "現在のセカンダリパスワード",
    "enterCurrentSecondPassword": "現在のセカンダリパスワードを入力",
    "setNewSecondPassword": "新しいセカンダリパスワード設定",
    "newSecondPassword": "新しいセカンダリパスワード",
    "confirmNewSecondPassword": "新しいセカンダリパスワード確認",
    "reenterNewSecondPassword": "新しいセカンダリパスワード再入力",
    "confirmUpdate": "変更確認",
    "lowestAsk": "現在の最低売り注文価格",
    "priceAndVolumeTrend": "価格と取引量の推移",
    "priceCNY": "価格（元）",
    "volume": "取引量",
    "priceGeneral": "価格",
    "currentPrice": "現在の価格",
    "volume24h": "24時間取引量",
    "turnover": "取引額",
    "phoneNumbers": "電話番号",
    "cancelSuccess": "キャンセル成功",
    "orderCanceled": "注文キャンセル",
    "orderReleased": "注文リリース",
    "releaseSuccess": "リリース成功",
    "selectCountryCode": "国または地域コードを選択",
    "countryCode": "国・地域コード",
    "countryJapan": "（日本）",
    "countryKorea": "（韓国）",
    "countrySG": "（シンガポール）",
    "countryAU": "（オーストラリア）",
    "countryUK": "（イギリス）",
    "countryUSCA": "（アメリカ／カナダ）",
    "countryCN": "（中国）",
    "uploadPaymentCode": "支払いコードをアップロード",
    "clickToUploadQrCode": "QRコードをアップロード",
    "imageFormatTip": "JPG、PNG形式対応",
    "paymentQrCode": "支払いQRコード",
    "clickToUploadImage": "画像をアップロード",
    "uploadImageTip": "最大3枚のJPG、PNG画像アップロード可",
    "uploadScreenshotProof": "スクリーンショット証拠アップロード",
    "codeMinLength": "認証コードは4桁以上",
    "codeMaxLength": "認証コードは6桁以内",
    "codeSent": "認証コードを送信しました",
    "codeSentToEmail": "コードがメールに送信されました",
    "codeFailed": "コード取得に失敗",
    "bindSuccess": "連携成功",
    "secureEmailBindSuccess": "セキュリティメール連携成功",
    "bindFailed": "連携失敗",
    "verifyCode": "認証コード",
    "enterCode": "コードを入力",
    "sending": "送信中...",
    "getCode": "コード取得",
    "retryInSeconds": "秒後に再試行",
    "bindSecureEmail": "セキュリティメール連携",
    "pointCategoryDesc": "航空、商業施設、ホテル等のポイント取引",
    "airlinePoints": "航空ポイント",
    "mallPoints": "モールポイント",
    "hotelPoints": "ホテルポイント",
    "bankPoints": "銀行ポイント",
    "rwaCategoryDesc": "金、アート、不動産等の実物ポイント投資",
    "goldShares": "金のシェア",
    "artworks": "アート作品",
    "realEstateShares": "不動産シェア",
    "jewelryDiamonds": "宝石・ダイヤモンド",
    "connectWallet": "ウォレット接続",
    "connectWalletDescription": "ウォレット接続で分散型アプリにアクセス",
    "connecting": "接続中...",
    "phoneMinLength": "電話番号は5桁以上",
    "phoneMaxLength": "電話番号は15桁以内",
    "invalidEmail": "有効なメールアドレスを入力",
    "accountMinLength": "アカウントは2文字以上",
    "accountMaxLength": "アカウントは50文字以内",
    "saveContactFailed": "連絡先保存失敗",
    "saveErrorRetryLater": "保存中にエラーが発生しました。後で再試行してください。",
    "contactDeleted": "連絡先削除",
    "contactDeletedSuccess": "連絡先削除成功",
    "confirmDeleteContact": "連絡先削除してもよろしいですか？",
    "irreversibleDeleteContact": "この操作は元に戻せません。",
    "noContactInfo": "連絡先情報なし",
    "addContactInfo": "連絡先を追加",
    "editContactInfo": "連絡先編集",
    "enterPhoneNumber": "電話番号を入力",
    "emailAddress": "メールアドレス",
    "enterEmailAddress": "メールアドレスを入力",
    "socialType": "ソーシャルメディアの種類",
    "selectSocialType": "ソーシャルメディアの種類を選択",
    "saving": "保存中...",
    "addedPaymentMethods": "追加済み支払い方法",
    "cardNumber": "カード番号",
    "enterCardNumber": "カード番号を入力",
    "enterAccountHolder": "口座名義を入力",
    "enterBankName": "銀行名を入力",
    "enterAccountNumber": "口座番号を入力",
    "enterWalletAddress": "ウォレットアドレスを入力",
    "updateSuccess": "更新成功",
    "addSuccess": "追加成功",
    "deleteSuccess": "削除成功",
    "bankUnionPay": "ユニオンペイ",
    "bankWeChat": "WeChat",
    "bankAlipay": "Alipay",
    "eWallet": "電子ウォレット",
    "confirmDeletePaymentMethod": "支払い方法を削除しますか？",
    "irreversibleDeletePaymentMethod": "この操作は元に戻せません。",
    "noPaymentMethod": "支払い方法なし",
    "addPaymentMethod": "支払い方法を追加",
    "editPaymentMethod": "支払い方法を編集",
    "selectCardType": "カード種類を選択",
    "cardType": "カード種類",
    "accountHolder": "口座名義",
    "bankName": "銀行名",
    "swiftCodeOptional": "SWIFTコード（任意）",
    "enterSwiftCode": "SWIFTコードを入力",
    "ibanOptional": "ABA/IBAN/CIC（任意）",
    "enterIban": "ABA/IBAN/CICを入力",
    "walletType": "ウォレットタイプ",
    "selectWalletType": "ウォレットタイプを選択",
    "account": "アカウント",
    "enterAccount": "アカウントを入力",
    "currencyType": "通貨タイプ",
    "selectCurrencyType": "通貨タイプを選択",
    "mainnet": "メインネット",
    "selectMainnet": "メインネットを選択",
    "add": "追加",
    "confirmPayOrderTitle": "注文を支払いますか？",
    "confirmPayOrderContent": "送金操作が完了しました",
    "myWallet": "マイウォレット",
    "multiChainAssetMgmt": "マルチチェーンポイント管理",
    "bitcoin": "ビットコイン",
    "incomplete": "未完了",
    "cancelOrders": "キャンセル",
    "marketOrders": "マーケット注文",
    "supportUSDT": "USDT対応",
    "marketSellLabel": "販売",
    "marketSellOrderLabel": "販売注文",
    "marketBuyOrderLabel": "購入注文",
    "orderCount": "成立件数",
    "averagePayment": "平均支払い",
    "arbitrationRate": "仲裁率",
    "minutes": "分",
    "circulation": "流通量",
    "totalSupply": "総供給量",
    "issuer": "発行者",
    "pointsDetail": "ポイントの詳細",
    "fetchAssetDetailFailed": "ポイント詳細の取得に失敗しました",
    "securitySettings": "セキュリティ設定",
    bindSecurityEmail: "メール連携",
    setSecondaryPassword: "第2パス設定",
    changeSecondaryPassword: "第2パス変更",
    resetSecondaryPassword: "第2パス初期化",
    "bindSecurityEmailSuccess": "セキュリティメール連携成功",
    "setSecondaryPasswordSuccess": "二次パスワード設定成功",
    "refreshSuccess": "更新成功",
    "copySuccess": "コピー成功",
    "myReceivingAddress": "受取先アドレス",
    "receivingAddress": "受取先アドレス",
    "pleaseEnterReceivingAddress": "受取先アドレスを入力",
    "withdrawMinAmount": "最低出金額は1USDT",
    "withdrawSuccess": "出金成功",
    "withdrawn": "正常に出金されました",
    "totalAssetValue": "ポイント総額",
    "realTimeValuation": "リアルタイム評価",
    "currency": "通貨",
    "custodyWalletBalance": "カストディウォレット残高",
    "assetList": "ポイントリスト",
    "onlyTransferBscAssets": "BSC/BEP20ポイントのみ転送可",
    "receivingQRCode": "受取用QRコード",
    "share": "共有",
    "copy": "コピー",
    "withdrawBalance": "出金",
    "useBscNetwork": "BSCネットワークを使用",
    "withdrawAmount": "出金数量",
    "serviceFee": "手数料",
    "withdrawing": "出金中...",
    "confirmWithdraw": "出金確認",
    "postSell": "販売を投稿",
    "sellNoticeBuyerMayAccept": "売却投稿後、買い手がオファーを受け入れ可能",
    "sellNoticeFundsReceivedAndAsset": "取引後、金額受け取りポイント差し引かれます",
    "sellNoticeServiceFee": "売却には手数料がかかります",
    "sellAssetSection": "ポイントを売却",
    "availableSellQuantity": "売却可能数量",
    "enterUnitPrice": "単価を入力",
    "pleaseEnterSellPrice": "売却価格を入力",
    "sellQuantity": "売却数量",
    "minSellQuantity": "最小売却数量",
    "actualDeductQuantity": "実際に差し引かれる数量",
    "totalReceivableAmount": "受取総額",
    "minTransactionQuantity": "最小取引数量",
    "enterValidSellPrice": "有効な売却価格を入力",
    "sellPriceGreaterThan0": "売却価格は0より大きい",
    "enterValidSellQuantity": "有効な売却数量を入力",
    "sellQuantityGreaterThanOrEqual1": "売却数量は1以上",
    "sellQuantityGreaterThanOrEqual": "売却数量は以上",
    "enterValidMinSellQuantity": "有効な最小取引数量を入力",
    "minSellQuantityGreaterThanOrEqual1": "最小取引数量は1以上",
    "sellPostSuccess": "販売投稿成功",
    "sellPosted": "販売投稿成功",
    depositAction: "情報取得",
    withdrawAction: "情報同期",
    "changeRecord": "変更",
    "noUSDTChangeRecord": "USDT変動記録なし",
    withdrawAsset: "ポイント取得",
    depositAsset: "ポイント同期",

    "buyAsset": "ポイントの購入",
    "sellAsset": "ポイントの販売",
    "assetChangeRecord": "ポイント変動記録",
    "all": "すべて",
    depositWithdraw: "情報取得／情報同期",
    "buySell": "購入/販売",
    "tradeValue": "取引価値",
    "increaseRate24h": "24時間変動率",
    "frozenAmount": "凍結数量",
    "valuation": "評価額",
    "assetAmount": "ポイント数量",
    "assetDetail": "ポイント詳細",
    "enableEscrowTip": "USDTエスクロー支払いを有効にして購入成功率を上げる",
    "escrowExplanation": "有効にすると、注文がマッチした際に、売り手のポイントは自動的に送信され、USDTで支払われます。手動確認不要で便利です。",
    "remark": "備考",
    "buyOrderTip": "購入注文を出した後、売り手はあなたのオファーを受け入れることができます",
    "tradeSuccessTip": "取引が成功すると、対応する金額を支払い、ポイントを受け取ります",
    "ensurePaymentAvailable": "選択した支払い方法が使用可能であることを確認してください",
    "buyWillCharge": "購入には",
    "feeSuffix": "の手数料がかかります",
    "pleaseEnterRemark": "備考を入力してください",
    "allowPartialMatch": "部分約定を許可",
    "buyAssets": "ポイントを購入",
    "purchasePostSuccess": "購入申請が成功しました",
    "purchasePosted": "購入申請が正常に投稿されました",
    "pleaseSelectPaymentMethod": "少なくとも1つの支払い方法を選択してください",
    "specifyBuyerPaymentMethod": "購入者が使用できる支払い方法を指定する必要があります",
    "enterValidMinQuantity": "有効な最小取引数量を入力してください",
    "minQuantityAtLeast100": "最小取引数量は100以上でなければなりません",
    "minQuantityAtLeast": "最小取引数量は以上でなければなりません",
    "enterValidBuyQuantity": "有効な購入数量を入力してください",
    "buyQuantityGreaterThan0": "購入数量は0より大きくなければなりません",
    "enterValidBuyPrice": "有効な購入価格を入力してください",
    "buyPriceGreaterThan0": "購入価格は0より大きくなければなりません",
    "minTransactionAmount": "最小取引数量",
    "minAmountLimitTip": "最低取引数量は100です",
    "supportedPayment": "対応支払い方法",
    "pointsMarket": "ポイント市場",
    "pointsName": "ポイント名",
    "change24h": "24時間変動",
    "transaction": "取引",
    "enterPrice": "価格を入力",
    "buyRequest": "購入リクエスト",
    "minAskPrice": "最小売値",
    "maxAskPrice": "最大売値",
    "highestMarketBuyPrice": "現在の最高購入価格",
    "pleaseEnterBuyPrice": "購入価格を入力してください",
    "buyQuantity": "購入数量",
    "feeRate": "手数料率",
    "actualReceivedAmount": "実際の受取数量",
    "totalAmountPayable": "支払うべき総額",
    "assetPointsPlatform": "デジタルポイントとポイント取引プラットフォーム",
    "oneStopAssetPointsPlatformDesc": "ポイント取引、RWAポイント管理、ウォレット機能をサポートするワンストップのデジタルポイント・ポイント取引プラットフォーム",
    "processing": "処理中...",
    "postBuyRequest": "購入リクエストを投稿",
    "importantNotice": "重要なお知らせ",
    "viewMorePoints": "もっとポイントを見る",
    "viewMoreRWA": "もっとRWAを見る",
    "tip": "ヒント",
    "applyArbitration": "仲裁を申請する",
    "describeProblemWithEvidence": "発生した問題を詳細に説明し、関連するスクリーンショットを証拠としてアップロードしてください。",
    "appealContent": "申立て内容",
    "describeProblemInDetail": "問題の詳細（具体的な状況、時間、金額など）を記載してください...",
    "submitting": "送信中...",
    "submitAppeal": "申立てを送信する",
    "payment": "支払い",
    "paymentConfirmed": "支払いが確認されました",
    "pleaseIn": "",
    "completePayment": "分以内に支払いを完了してください",
    "orderNotExist": "注文が存在しないか、すでに削除されました",
    "phoneNumber": "携帯番号",
    "email": "メールアドレス",
    "socialMedia": "ソーシャルメディア",
    "pleaseEnterAppealContent": "申立て内容を入力してください",
    "appealSubmitted": "申立てが送信されました。プラットフォームは24時間以内に対応します。",
    "submitFailedRetry": "送信に失敗しました。もう一度お試しください。",
    "copiedToClipboard": "クリップボードにコピーしました",
    "paymentConfirmedWaitSeller": "支払いが確認されました。売り手の確認をお待ちください。",
    "bankCard": "銀行カード",
    "sellSuccess": "売却に成功しました",
    "buySuccess": "購入に成功しました",
    "buy": "購入",
    "sell": "売却",
    "back": "戻る",
    "details": "詳細",
    "totalAmounts": "支払総額",
    "orderInfo": "注文情報",
    "createdTime": "作成時間",
    "enterQuantity": "数量を入力してください",
    "dataMissing": "注文データが見つかりません",
    "placeBuyOrder": "買い注文を出す",
    "placeSellOrder": "売り注文を出す",
    "minBuy": "最小購入額",
    "minSell": "最小売却",
    "amount": "数量",
    "price": "価格",
    "total": "合計",
    "confirmReleasePrompt": "放行を確認すると、対応するポイントが購入者のアカウントに移動されます",
    "confirmCancel": "キャンセルを確認",
    "confirmCancelPrompt": "この注文をキャンセルしてもよろしいですか？この操作は取り消せません。",
    "cancelOrder": "注文をキャンセル",
    "contactInfo": "連絡先情報",
    "orderNumber": "注文番号",
    "time": "時間",
    "confirmCancelOrderQuestion": "注文をキャンセルしますか？",
    "confirmRelease": "放行を確認",
    "confirmReleaseOrderQuestion": "この注文を放行しますか？",
    "goToPay": "支払いへ進む",
    //  ---
    "notSet": "未設定",
    "copied": "コピー済み",
    "walletCopied": "ウォレットをコピー",
    "userIdCopied": "IDをコピー",
    "rwaMarket": "RWA市場",
    "noMore": "これ以上なし",
    "buying": "購入中",
    "selling": "販売中",
    "pendingPayment": "支払",
    "pendingRelease": "解除",
    "noOrders": "注文なし",
    "noArbitrationOrders": "仲裁なし",
    "allOrders": "すべて",
    "arbitrationOrders": "仲裁注文",
    "arbitrationRecords": "記録",
    "arbitrationCount": "件数",
    "totalCompletedOrders": "完了件数",
    "sellOrderCount": "販売数",
    "buyOrderCount": "購入数",
    "totalOrders": "総数",
    "myOrders": "マイ注文",

    "appName": "デジタルポイントプラットフォーム",
    "cancel": "キャンセル",
    "confirm": "確認",
    "save": "保存",
    "edit": "編集",
    "delete": "削除",
    "loading": "読み込み中...",
    "success": "成功",
    "error": "エラー",

    "arbitrationOrderId": "仲裁注文番号",
    "arbitratorId": "仲裁人ID",
    "respondent": "被仲裁者",
    "arbitrationDetails": "仲裁の詳細内容",

    // ナビゲーション
    "home": "ホーム",
    "market": "マーケット",
    "wallet": "ウォレット",
    "orders": "注文",
    "assets": "ポイント",
    "profile": "プロフィール",

    // 個人ページ
    "profilePage": "プロフィール",
    "accountSecurity": "アカウントセキュリティ",
    "paymentMethods": "支払い方法管理",
    "contactMethods": "連絡方法管理",
    "helpCenter": "ヘルプセンター",
    "aboutUs": "会社概要",
    "logout": "ログアウト",
    "editProfile": "プロフィール編集",
    "verifyNow": "今すぐ認証",
    "availableBalance": "利用可能残高",
    "frozenAssets": "凍結ポイント",
    "viewWallet": "ウォレットを見る",
    "creditScore": "信用スコア",
    "activityScore": "活動スコア",

    // ホームページ
    "search": "ポイント、ポイント、または商人を検索...",
    "recommend": "おすすめ",
    "points": "ポイント",
    "rwa": "実物ポイント",
    "hot": "人気",
    "noPlatformAnnouncement": "プラットフォームのお知らせはありません",
    "hotTransactions": "人気の取引",
    "noHotActivities": "人気のアクティビティはありません",
    "platformAnnouncement": "プラットフォームのお知らせ",
    "hotActivities": "人気のアクティビティ",
    "viewAll": "すべて表示",
    "newUser": "新規ユーザー",
    "limited": "限定",
    "system": "システム",
    "activity": "アクティビティ",

    // ウォレット
    "walletCenter": "ウォレットセンター",
    "totalAssets": "総ポイント",
    "deposit": "入金",
    "withdraw": "出金",
    "transfer": "転送",
    "walletAddress": "ウォレットアドレス",
    "cryptoCurrency": "暗号通貨",
    "fiat": "法定通貨",
    "paymentMethod": "支払い方法",
    "addCrypto": "暗号通貨を追加",
    "addFiat": "法定通貨を追加",
    "addPayment": "支払い方法を追加",

    // 会員レベル
    "memberLevels": "会員レベル",
    "memberLevelSettings": "会員レベル設定",
    "createMemberLevel": "会員レベルを作成",
    "editMemberLevel": "会員レベルを編集",
    "memberLevelDetails": "会員レベルの詳細",
    "basicInfo": "基本情報",
    "levelBenefits": "レベル特典",
    "previewEffect": "プレビュー効果",
    "levelName": "レベル名",
    "pointsRequired": "必要ポイント",
    "levelColor": "レベルカラー",
    "levelIcon": "レベルアイコン",
    "activeStatus": "アクティブステータス",
    "enabled": "有効",
    "disabled": "無効",
    "pointsMultiplier": "ポイント倍率",
    "discountRate": "割引率",
    "times": "倍",
    "percent": "%",

    // 会員特典
    "pointsAcceleration": "ポイント加速",
    "exclusiveDiscount": "専用割引",
    "birthdayGift": "誕生日ギフト",
    "dedicatedService": "専用サービス",
    "freeShipping": "送料無料",
    "priorityPurchase": "優先購入権",
    "addCustomBenefit": "カスタム特典を追加",

    // 提示信息
    "levelOrderTip": "ドラッグしてレベルの順序を調整します",
    "memberAutoUpgradeTip": "有効にすると、ユーザーはポイントが対応するレベルの要件を満たした場合に自動的にアップグレードされます",
    "disableLevelTip": "無効にすると、ユーザーはこのレベルにアップグレードできなくなります。すでにこのレベルのユーザーは影響を受けません。",
    "deleteLevelTip": "削除後、このレベル以下のすべてのユーザーは自動的に次のレベルにダウングレードされます。",
    "previewTip": "以下は、このレベルのユーザーに表示される特典の表示効果です",

    // 商人中心
    "merchantCenter": "マーチャントセンター",
    "merchantId": "マーチャントID",
    "pointsIssued": "発行済みポイント",
    "memberCount": "会員数",
    "managePoints": "ポイント管理",
    "dataCenter": "データセンター",
    "manage": "管理",
    "activities": "アクティビティ",
    "data": "データ",

    // 订单相关
    "publishOrder": "注文を公開",
    "orderType": "注文タイプ",
    "buyOrder": "購入希望",
    "sellOrder": "販売希望",
    "pointsType": "ポイントタイプ",
    "pointsQuantity": "ポイント数",
    "unitPrice": "単価",
    "totalAmount": "合計金額",
    "orderDescription": "注文概要",
    "negotiable": "価格交渉可",
    "expiration": "有効期限",
    "publishNewOrder": "新規注文を公開",
    "orderDetail": "注文詳細",
    "immediatelyBuy": "今すぐ購入",
    "immediatelySell": "今すぐ販売",
    "makeOffer": "価格交渉",
    "contactSeller": "販売者に連絡",
    "contactBuyer": "購入者に連絡",
    "transactionNotes": "取引に関する注意事項",
    "orderStatus": "注文ステータス",
    "active": "取引中",
    "completed": "完了",
    "cancelled": "キャンセル",

}

// 韩语翻译
export const koTranslations: Translations = {
    pleaseSelectContactMethod: "연락 방식을 선택하세요",
    specifyBuyerContactMethod: "구매자의 연락 방식을 지정하세요",
    "error.price_exceeds_ceiling": "단가가 최고 한도를 초과했습니다",
    "error.price_below_floor": "단가가 최저 한도 미만입니다",
    syncPointsConfirm: "포인트 정보를 동기화하시겠습니까?",
    "success.sync": "동기화 성공",

    "error.the_call_succeeds_but_no_data_is_available": "먼저 발행 플랫폼에 연결하세요",

    "common.transfer_in": "전입",
    "common.transfer_out": "전출",
    "error.no_pending_into_record_found": "전입할 자산이 없습니다",
    getOrPushInfo: "정보 가져오기/푸시",
    pushPointsInfo: "포인트 정보 푸시",
    pushInfo: "정보 푸시",
    noDatas: "없음",
    "minimumPurchaseQuantity": "최소 구매 수량",
    onlineService: "온라인 고객센터",
    contactUpdated: "연락처 정보가 업데이트되었습니다",
    updateSuccess1: "성공적으로 업데이트되었습니다",
    contactAdded: "연락처 정보가 추가되었습니다",
    addSuccess1: "성공적으로 추가되었습니다",
    "error.helpCenter_was_not_found": "도움말 센터를 찾을 수 없습니다",
    "error.security_invalid_code": "인증 코드가 올바르지 않습니다",
    "error.user_email_not_exists": "이메일이 연결되어 있지 않습니다",
    "error.notice_was_not_found": "알림을 찾을 수 없습니다",
    "error.activity_was_not_found": "활동을 찾을 수 없습니다",
    theArbitratorIsNotPure: "중재인이 존재하지 않습니다", // 新的错误提示
    "error.bind_was_not_found": "바인딩을 찾을 수 없습니다",
    "error.security_invalid_password": "기존 비밀번호가 올바르지 않습니다",
    airdropEvent: "에어드롭 이벤트",
    inviteFriendsToRegister: "친구 초대 등록",
    newUserRegistrationReward: "신규 가입 보상",
    newUserGift: "신규 유저 선물",
    "error.the_interface_returns_an_error": "인터페이스 오류가 발생했습니다",
    "error.binding_failed": "바인딩 실패",
    "announcement.system": "시스템 공지",
    "announcement.event": "이벤트 공지",
    "announcement.feature_update": "기능 업데이트",
    "announcement.new_user_gift": "신규 유저 선물",
    "announcement.marketing": "마케팅 공지",
    noData: "데이터 없음",
    aiAssistant: "AI 도우미",
    "error.arbitration_record_already_exists": "해당 중재 기록이 이미 존재합니다",
    welcomeToHelpCenter: "도움말 센터에 오신 것을 환영합니다",
    helpCenterDescription: "자주 묻는 질문과 사용자 가이드를 여기에서 확인하세요",
    no_more_announcements: "더 이상 공지가 없습니다",
    'error.auto_revocation_time_not_configured': "자산에 자동 철회 시간이 설정되어 있지 않습니다",
    "error.invalid_transaction_type": "유효하지 않은 거래 유형",
    "transferInAmount": "입금 수량",
    transferSuccess1: "성공적으로 입금됨",
    transferSuccess2: "입금 성공",
    to: "까지",
    transferInDetail: "입금 상세",
    errorInvalidTransactionType: "유효하지 않은 거래 유형",
    enterTransferInAmount: "입금 수량을 입력하세요",
    copyFailed: "복사 실패",
    "error.transfer_exceeds_balance": "출금 수량은 포인트 잔액을 초과할 수 없습니다",
    hour: "시간",
    day: "일",
    enterReceiverAddress: "수신 플랫폼 주소를 입력하세요",
    receiverAddressRequired: "수신 주소는 필수입니다",
    enterValidAmount: "유효한 출금 금액을 입력하세요",
    amountGreaterThanZero: "출금 금액은 0보다 커야 합니다",
    transferOutDetail: "출금 상세",
    receiverPlatformAddress: "수신 플랫폼 주소",
    pleaseEnterReceiverPlatformAddress: "수신 플랫폼 주소를 입력하세요",
    available: "사용 가능",
    enterTransferOutAmount: "출금 금액 입력",
    balance: "잔액",
    maxTransferOut: "최대 출금 가능",
    transferNote: "지정한 주소로 자산이 전송됩니다",
    confirmAddressWarning: "주소를 꼭 확인하세요. 잘못된 주소는 포인트 손실로 이어질 수 있습니다",
    irreversibleWarning: "출금은 되돌릴 수 없습니다. 금액을 확인하세요",
    transferFeeNote: "출금 시 수수료가 부과됩니다",
    scanWithWalletQR: "지원 지갑으로 QR 스캔",
    useSupported: "지원 항목 사용",
    scanToDeposit: "상단 QR 코드를 스캔하여 입금",
    tokenAddress: "토큰 주소",
    clickToCopy: "주소 클릭 시 복사",
    confirmAssetType: "보내는 포인트 유형을 확인하세요",
    wrongAssetLoss: "잘못된 포인트 전송은 영구 손실될 수 있습니다",
    testBeforeBigTransfer: "소액 전송 후 대량 전송을 진행하세요",
    waitNetworkConfirm: "전송 후 네트워크 확인까지 몇 분~몇 시간이 소요될 수 있습니다",
    copieds: "복사됨",
    tokenCopied: "토큰 복사됨",
    depositNote: "안내",
    depositToYourAccount: "계좌로 입금",
    howToDeposit: "다음 방법으로 입금할 수 있어요",
    useSupportedWallet: "지원 지갑을 사용하세요",
    copyTokenToWallet: "주소 복사 전송",
    depositTips: "확인 후 도착",
    qrCode: "QR 코드",
    "error.invalid_type": "유효하지 않은 유형",
    "wechatId": "위챗 아이디",
    "qqId": "QQ 아이디",
    "wechatPay": "위챗페이",
    "error.currency_required": "변환할 통화를 입력하세요",
    "error.not_supported_currency": "지원되지 않는 통화입니다",
    "error.failed_to_get_the_exchange_rate": "환율을 가져오지 못했습니다",
    "error.there_is_no_exchange_rate_for_this_currency": "이 통화에 대한 환율이 없습니다",
    "arbitrationEvidence": "중재 증거",
    "arbitrationStatus": "중재 상태",
    "error.least_deal_amount_not_reached": "최소 거래 수량에 도달하지 않았습니다",
    "initiator": "중재 신청자",
    "error.minimum_amount_cannot_exceed_total_amount": "분할 금액은 주문 금액을 초과할 수 없습니다",
    "error.invalid_or_expired_nonce": "유효하지 않거나 만료된 nonce입니다",
    "error.signature_mismatch": "서명이 일치하지 않습니다",
    "error.signature_verification": "서명 검증에 실패했습니다",
    "error.user_is_not_bound_freeze_group": "해당 사용자는 유효한 동결 그룹에 연결되어 있지 않습니다",
    "error.user_address_does_not_match": "사용자 주소가 일치하지 않습니다",
    "error.timestamp_is_invalid": "유효하지 않은 타임스탬프입니다",
    "error.user_not_exist": "사용자가 존재하지 않습니다",
    "error.upload_failed": "업로드에 실패했습니다",
    "error.pending_sell_order_has_reached_its_maximum_value": "판매 주문이 최대 한도에 도달했습니다",
    "error.asset_was_not_found": "자산을 찾을 수 없습니다",
    "error.order_type_is_incorrect": "잘못된 주문 유형입니다",
    "error.number_of_assets_is_insufficient": "포인트 수량이 부족합니다",
    "error.pending_buy_order_has_reached_its_maximum_value": "보류 중인 구매 주문이 최대값에 도달했습니다",
    "error.minimum_volume_cannot_be_empty": "최소 거래 수량은 비워둘 수 없습니다",
    "error.order_does_not_exist": "주문이 존재하지 않습니다",
    "error.order_does_not_exist_or_has_a_status_that_cannot_be_cancelled": "주문이 없거나 취소할 수 없는 상태입니다",
    "error.cancellations_are_not_possible": "미완료된 거래가 있어 취소할 수 없습니다",
    "error.assets_cannot_be_unfrozen": "포인트 계정이 존재하지 않아 해제가 불가능합니다",
    "error.unsupported_order_statuses": "지원되지 않는 주문 상태입니다",
    "error.order_status_cannot_be_empty": "주문 상태는 비워둘 수 없습니다",
    "error.this_cannot_be_done_sell_orders": "본인이 등록한 판매 주문은 구매할 수 없습니다",
    "error.the_minimum_volume_was_not_reached": "최소 거래 수량에 도달하지 않았습니다",
    "error.this_cannot_be_done_buy_orders": "본인이 등록한 구매 주문은 판매할 수 없습니다",
    "error.quantity_is_invalid": "수량이 유효하지 않습니다",
    "error.quantity_exceeds_the_remaining_available_volume": "수량이 남은 거래 가능 수량을 초과했습니다",
    "error.contract_does_not_exist": "거래가 존재하지 않습니다",
    "error.order_status_is_not_payable": "이 주문 상태에서는 결제할 수 없습니다",
    "error.order_status_is_not_release": "이 주문 상태에서는 송금할 수 없습니다",
    "error.payout_method_does_not_exist": "결제 수단이 존재하지 않습니다",
    "error.password_is_inconsistent_twice": "비밀번호가 일치하지 않습니다",
    // 错误提示
    "common.success": "작업이 성공적으로 완료되었습니다",
    "common.fail": "작업이 실패했습니다",
    "error.login_failed": "로그인 실패, 계정이나 비밀번호를 확인하세요",
    "error.unauthorized": "로그인되지 않았습니다. 먼저 로그인하세요",
    "error.token_expired": "로그인 만료되었습니다. 다시 로그인하세요",
    "error.invalid_token": "잘못된 토큰입니다. 다시 로그인하세요",
    "error.account_locked": "계정이 잠겨있습니다. 관리자에게 문의하세요",
    "error.user_not_found": "사용자를 찾을 수 없습니다",
    "error.user_exists": "사용자가 이미 존재합니다",
    "error.invalid_password": "비밀번호가 올바르지 않습니다",
    "error.invalid_email": "이메일 형식이 올바르지 않습니다",
    "error.param_missing": "요청 파라미터가 누락되었습니다",
    "error.validation_failed": "파라미터 검증 실패",
    "error.method_not_allowed": "허용되지 않는 요청 방법입니다",
    "error.order_not_found": "주문을 찾을 수 없습니다",
    "error.order_already_paid": "주문이 이미 결제되었습니다",
    "error.order_expired": "주문이 만료되었습니다",
    "error.payment_failed": "결제 실패, 나중에 다시 시도하세요",
    "error.insufficient_balance": "잔액이 부족합니다. 충전하세요",
    "error.payment_method_invalid": "결제 방법이 유효하지 않습니다",
    "error.too_frequent": "요청이 너무 자주 이루어졌습니다. 나중에 다시 시도하세요",
    "error.operation_limited": "현재 작업은 제한되어 있습니다",
    "error.system_error": "시스템 오류가 발생했습니다. 나중에 다시 시도하세요",
    "error.database_error": "데이터베이스 작업 오류",
    "error.service_unavailable": "서비스를 사용할 수 없습니다",
    "error.miner.not_found": "광산 기계가 존재하지 않습니다",
    "error.miner.insufficient_power": "광산 기계의 계산 능력이 부족하여 작업을 수행할 수 없습니다",
    "error.miner.upgrade_locked": "현재 광산 기계는 업그레이드할 수 없습니다",
    "error.token.symbol_exists": "토큰 기호가 이미 존재합니다",
    "error.token.invalid_supply": "토큰 공급량이 유효하지 않습니다",
    "error.token.creation_failed": "토큰 생성 실패, 나중에 다시 시도하세요",
    "error.node.already_applied": "이미 노드를 신청했습니다. 다시 신청할 필요가 없습니다",
    "error.node.not_eligible": "현재 조건이 노드 신청 자격을 충족하지 않습니다",
    "error.node.capacity_full": "현재 노드 용량이 가득 찼습니다. 나중에 다시 시도하세요",
    "error.wallet.not_bound": "먼저 지갑 주소를 바인드하세요",
    "error.wallet.invalid_address": "지갑 주소 형식이 올바르지 않습니다",
    "error.wallet.network_mismatch": "현재 지갑 네트워크가 시스템과 일치하지 않습니다",
    "error.task.not_found": "작업을 찾을 수 없거나 삭제되었습니다",
    "error.task.already_completed": "이 작업은 이미 완료되었으며, 다시 작업할 수 없습니다",
    "error.task.not_unlocked": "먼저 이전 작업을 완료하세요",
    "error.recharge.failed": "충전 실패, 네트워크를 확인하거나 나중에 다시 시도하세요",
    "error.recharge.min_amount": "충전 금액이 최소 금액보다 낮습니다",
    "error.recharge.pending": "충전이 처리 중입니다. 상태를 나중에 확인하세요",
    "error.withdrawal.failed": "출금 실패, 다시 시도하세요",
    "error.withdrawal.exceeds_limit": "출금 금액이 제한을 초과했습니다",
    "error.withdrawal.insufficient_balance": "계좌 잔액이 부족합니다",
    "error.buy_order.invalid_price": "구매 주문 가격이 유효하지 않습니다",
    "error.buy_order.quota_exceeded": "구매 주문 금액이 제한을 초과했습니다",
    "error.sell_order.insufficient_token": "판매 가능한 토큰이 부족합니다",
    "error.sell_order.invalid_quantity": "판매 주문 수량이 잘못되었습니다",
    "error.invite.invalid_code": "초대 코드가 유효하지 않거나 만료되었습니다",
    "error.invite.already_bound": "이미 초대 코드가 바인드되어 있으며 변경할 수 없습니다",
    "error.level.upgrade_denied": "현재 조건이 업그레이드 요구 사항을 충족하지 않습니다",
    "error.level.not_configured": "현재 레벨 구성은 존재하지 않습니다",
    "error.rebate.not_eligible": "당신은 리베이트 자격이 없습니다",
    "error.rebate.calculation_error": "리베이트 계산 중 오류가 발생했습니다",
    "error.rebate.distribution_failed": "리베이트 분배 실패, 관리자에게 문의하세요",
    "error.upload.file_too_large": "파일 크기가 제한을 초과했습니다",
    "error.upload.unsupported_format": "파일 형식이 지원되지 않습니다",
    "error.upload.failed": "파일 업로드 실패",
    "error.kyc.pending": "신원 인증 중입니다",
    "error.kyc.rejected": "신원 인증에 실패했습니다. 정보를 확인하세요",
    "error.kyc.required": "신원 인증을 완료하세요",
    "error.captcha.invalid": "캡차 코드가 올바르지 않습니다",
    "error.captcha.expired": "캡차 코드가 만료되었습니다",
    "error.captcha.required": "캡차 코드를 입력하세요",
    "error.risk.blacklisted": "계정에 리스크 행동이 감지되어 제한되었습니다",
    "error.risk.region_blocked": "현재 지역에서 이 서비스는 지원되지 않습니다",
    "error.risk.device_change": "이상한 장치에서 로그인이 감지되었습니다. 본인 인증을 하세요",
    "error.security.password_leaked": "비밀번호 유출 위험이 감지되었습니다. 비밀번호를 변경하세요",
    "error.security.ip_blocked": "귀하의 IP가 일시적으로 차단되었습니다",
    "error.security.twofa_failed": "2단계 인증에 실패했습니다",
    "error.chain.gas_insufficient": "지갑 Gas 비용이 부족합니다",
    "error.chain.network_error": "블록체인 네트워크 오류, 나중에 다시 시도하세요",
    "error.chain.tx_failed": "체인 거래 전송 실패",
    "error.chain.nonce_conflict": "거래 순서 충돌이 발생했습니다. 다시 시도하세요",
    "error.notify.email_failed": "이메일 전송 실패, 나중에 다시 시도하세요",
    "error.notify.sms_failed": "SMS 전송 실패",
    "error.notify.rate_limited": "전송이 너무 빈번합니다. 나중에 다시 시도하세요",
    "filterReset": "필터 초기화",
    "filter": "필터",
    "electronicPayment": "전자 결제",
    "enterCurrentSecondPassword": "현재 이차 비밀번호를 입력하세요",
    "allRecords": "모든 기록",
    "minimumAmount": "최소 수량",
    "verified": "인증됨",
    "searchPointsPlaceholder": "포인트 검색...",
    "searchRWAPlaceholder": "RWA 포인트 검색...",
    "announcementCenter": "공지 센터",
    "address": "주소",
    "pleaseUseAnyPaymentMethod": "결제 수단을 사용해 주세요",
    "accountBalance": "계정 잔액",
    "recentTransactions": "최근 거래",
    "allAssets": "전체 포인트",
    "transactionHistory": "거래 내역",
    "currentUSDTBalance": "USDT 잔액",
    "inviteFriends": "친구 초대",
    "myGifts": "내 선물",
    "orderLimitDescription": "최대 3개 매수/매도 주문, 에스크로는 10개까지",
    "paymentCompleted": "결제 완료",
    "transferInBalance": "입금",
    "lowestAsk": "최저 매도 가격",
    "setupSuccess": "설정 완료",
    "secondPasswordSetupSuccess": "2차 비밀번호 설정 완료",
    "pleaseSetSecondPassword": "2차 비밀번호 설정",
    "confirmSecondPassword": "2차 비밀번호 확인",
    "reenterSecondPassword": "2차 비밀번호 재입력",
    "confirmSetup": "설정 확인",
    "securityEmail": "보안 이메일",
    "resetSuccess": "초기화 완료",
    "secondPasswordResetSuccess": "2차 비밀번호 초기화 완료",
    "enterSecurityEmail": "보안 이메일 입력",
    "resetPassword": "비밀번호 재설정",
    "enterCurrentPassword": "현재 비밀번호 입력",
    "passwordTooShort": "비밀번호는 6자 이상",
    "passwordTooLong": "비밀번호는 20자 이하",
    "passwordComplexity": "대소문자, 숫자 포함",
    "passwordMismatch": "비밀번호 불일치",
    "passwordUpdateSuccess": "비밀번호 수정 완료",
    "secondPasswordUpdateSuccess": "2차 비밀번호 수정 완료",
    "currentSecondPassword": "현재 2차 비밀번호",
    "setNewSecondPassword": "새 2차 비밀번호 설정",
    "newSecondPassword": "새 2차 비밀번호",
    "confirmNewSecondPassword": "새 2차 비밀번호 확인",
    "reenterNewSecondPassword": "새 2차 비밀번호 재입력",
    "confirmUpdate": "수정 확인",
    "priceAndVolumeTrend": "가격 및 거래량",
    "priceCNY": "가격(위안)",
    "volume": "거래량",
    "priceGeneral": "가격",
    "currentPrice": "현재 가격",
    "volume24h": "24시간 거래량",
    "turnover": "거래액",
    "cancelSuccess": "취소 완료",
    "orderCanceled": "주문 취소됨",
    "orderReleased": "주문 방출됨",
    "releaseSuccess": "방출 완료",
    "selectCountryCode": "국가 코드 선택",
    "countryCode": "국가 코드",
    "countryJapan": "(일본)",
    "countryKorea": "(한국)",
    "countrySG": "(싱가포르)",
    "countryAU": "(호주)",
    "countryUK": "(영국)",
    "countryUSCA": "(미국/캐나다)",
    "countryCN": "(중국)",
    "uploadPaymentCode": "결제 코드 업로드",
    "clickToUploadQrCode": "QR 코드 업로드",
    "imageFormatTip": "JPG, PNG 형식 지원",
    "paymentQrCode": "결제 QR 코드",
    "clickToUploadImage": "이미지 업로드 클릭",
    "uploadImageTip": "최대 3장 업로드 가능",
    "uploadScreenshotProof": "스크린샷 업로드",
    "codeMinLength": "인증 코드 4자리 이상",
    "codeMaxLength": "인증 코드 6자리 이하",
    "codeSent": "인증 코드 전송됨",
    "codeSentToEmail": "이메일로 인증 코드 전송됨",
    "codeFailed": "인증 코드 전송 실패",
    "bindSuccess": "연결 완료",
    "secureEmailBindSuccess": "보안 이메일 연결 완료",
    "bindFailed": "연결 실패",
    "verifyCode": "인증 코드",
    "enterCode": "인증 코드 입력",
    "sending": "전송 중...",
    "getCode": "인증 코드 받기",
    "retryInSeconds": "초 후 재시도",
    "bindSecureEmail": "보안 이메일 연결",
    "pointCategoryDesc": "항공, 쇼핑몰, 호텔 등 포인트 거래",
    "airlinePoints": "항공 포인트",
    "mallPoints": "쇼핑몰 포인트",
    "hotelPoints": "호텔 포인트",
    "bankPoints": "은행 포인트",
    "rwaCategoryDesc": "금, 예술품, 부동산 등 실물 포인트",
    "goldShares": "금 지분",
    "artworks": "예술품",
    "realEstateShares": "부동산 지분",
    "jewelryDiamonds": "보석 및 다이아몬드",
    "connectWallet": "지갑 연결",
    "connectWalletDescription": "지갑을 연결하여 탈중앙화 애플리케이션 접속",
    "connecting": "연결 중...",
    "phoneMinLength": "전화번호 5자리 이상",
    "phoneMaxLength": "전화번호 15자리 이하",
    "invalidEmail": "유효한 이메일 입력",
    "accountMinLength": "계정 최소 2자",
    "accountMaxLength": "계정 최대 50자",
    "saveContactFailed": "연락처 저장 실패",
    "saveErrorRetryLater": "저장 오류, 나중에 다시 시도",
    "contactDeleted": "연락처 삭제됨",
    "contactDeletedSuccess": "연락처 삭제 완료",
    "confirmDeleteContact": "이 연락처를 삭제하시겠습니까?",
    "irreversibleDeleteContact": "삭제된 연락처는 복구할 수 없습니다.",
    "noContactInfo": "연락처 정보 없음",
    "addContactInfo": "연락처 추가",
    "editContactInfo": "연락처 편집",
    "phoneNumbers": "전화번호",
    "enterPhoneNumber": "전화번호 입력",
    "emailAddress": "이메일 주소",
    "enterEmailAddress": "이메일 주소 입력",
    "socialType": "소셜 미디어 유형",
    "selectSocialType": "소셜 미디어 유형 선택",
    "saving": "저장 중...",
    "addedPaymentMethods": "추가된 결제 수단",
    "cardNumber": "카드 번호",
    "enterCardNumber": "카드 번호 입력",
    "enterAccountHolder": "예금주 입력",
    "enterBankName": "은행명 입력",
    "enterAccountNumber": "계좌 번호 입력",
    "enterWalletAddress": "지갑 주소 입력",
    "updateSuccess": "업데이트 성공",
    "addSuccess": "추가 성공",
    "deleteSuccess": "삭제 성공",

    "bankUnionPay": "유니온페이",
    "bankWeChat": "위챗",
    "bankAlipay": "알리페이",
    "eWallet": "전자 지갑",

    "confirmDeletePaymentMethod": "이 결제 수단을 삭제하시겠습니까?",
    "irreversibleDeletePaymentMethod": "이 작업은 되돌릴 수 없습니다.",
    "noPaymentMethod": "결제 수단이 없습니다",

    "addPaymentMethod": "결제 수단 추가",
    "editPaymentMethod": "결제 수단 편집",

    "selectCardType": "카드 유형 선택",
    "cardType": "카드 유형",

    "accountHolder": "예금주",
    "bankName": "은행명",

    "swiftCodeOptional": "SWIFT 코드 (선택)",
    "enterSwiftCode": "SWIFT 코드를 입력하세요",

    "ibanOptional": "ABA/IBAN/CIC (선택)",
    "enterIban": "ABA/IBAN/CIC를 입력하세요",

    "walletType": "지갑 유형",
    "selectWalletType": "지갑 유형 선택",

    "account": "계정",
    "enterAccount": "계정을 입력하세요",

    "currencyType": "통화 종류",
    "selectCurrencyType": "통화 종류 선택",

    "mainnet": "메인넷",
    "selectMainnet": "메인넷 선택",

    "add": "추가",
    "confirmPayOrderTitle": "이 주문을 결제하시겠습니까?",
    "confirmPayOrderContent": "송금 작업을 완료했습니다",
    "myWallet": "내 지갑",
    "multiChainAssetMgmt": "멀티체인 포인트 관리",
    "bitcoin": "비트코인",
    "incomplete": "미완료",
    "cancelOrders": "취소",
    "marketOrders": "마켓 주문",
    "supportUSDT": "USDT 지원",
    "marketSellLabel": "판매",
    "marketSellOrderLabel": "판매 주문",
    "marketBuyOrderLabel": "구매 주문",
    "orderCount": "체결 건수",
    "averagePayment": "평균 결제 금액",
    "arbitrationRate": "중재율",
    "minutes": "분",
    "circulation": "유통량",
    "totalSupply": "총 발행량",
    "issuer": "발행자",
    "pointsDetail": "포인트 상세",
    "fetchAssetDetailFailed": "포인트 정보를 가져오지 못했습니다",

    "securitySettings": "보안 설정",
    bindSecurityEmail: "이메일 연결",
    setSecondaryPassword: "2차 설정",
    changeSecondaryPassword: "2차 변경",
    resetSecondaryPassword: "2차 초기화",
    "bindSecurityEmailSuccess": "보안 이메일이 성공적으로 연결되었습니다",
    "setSecondaryPasswordSuccess": "2차 비밀번호가 설정되었습니다",

    "refreshSuccess": "새로 고침 성공",
    "copySuccess": "복사 성공",
    "myReceivingAddress": "내 수취 주소",
    "receivingAddress": "수취 주소",
    "pleaseEnterReceivingAddress": "수취 주소를 입력하세요",
    "withdrawMinAmount": "출금 최소 수량 1USDT",
    "withdrawSuccess": "출금 성공",
    "withdrawn": "출금 완료",
    "totalAssetValue": "포인트 총액",
    "realTimeValuation": "실시간 평가",
    "currency": "통화",
    "custodyWalletBalance": "관리 지갑 잔액",
    "assetList": "포인트 목록",
    "onlyTransferBscAssets": "BSC/BEP20 자산만 입금 가능",
    "receivingQRCode": "수취 QR 코드",
    "share": "공유",
    "copy": "복사",
    "withdrawBalance": "출금",
    "useBscNetwork": "BSC 네트워크 사용",
    "withdrawAmount": "출금 수량",
    "serviceFee": "수수료",
    "withdrawing": "출금 중...",
    "confirmWithdraw": "출금 확인",

    "postSell": "판매 등록",
    "sellNoticeBuyerMayAccept": "판매 후 구매자가 제안을 수락할 수 있습니다",
    "sellNoticeFundsReceivedAndAsset": "거래 성공 시 금액 수령 후 포인트 차감",
    "sellNoticeServiceFee": "판매에는 수수료가 부과됩니다",
    "sellAssetSection": "포인트 판매",
    "availableSellQuantity": "판매 가능 수량",
    "enterUnitPrice": "단가 입력",
    "pleaseEnterSellPrice": "판매 가격을 입력하세요",
    "sellQuantity": "판매 수량",
    "minSellQuantity": "최소 판매 수량",
    "actualDeductQuantity": "실제 차감 수량",
    "totalReceivableAmount": "총 수령 금액",
    "minTransactionQuantity": "최소 거래 수량",

    "enterValidSellPrice": "유효한 판매 가격을 입력하세요",
    "sellPriceGreaterThan0": "판매 가격은 0보다 커야 합니다",
    "enterValidSellQuantity": "유효한 판매 수량을 입력하세요",
    "sellQuantityGreaterThanOrEqual1": "판매 수량은 1 이상이어야 합니다",
    "sellQuantityGreaterThanOrEqual": "판매 수량은  이상이어야 합니다",
    "enterValidMinSellQuantity": "유효한 최소 거래 수량을 입력하세요",
    "minSellQuantityGreaterThanOrEqual1": "최소 거래 수량은 1 이상이어야 합니다",
    "sellPostSuccess": "판매 등록 성공",
    "sellPosted": "판매 등록 완료",

    depositAction: "정보 가져오기",
    withdrawAction: "정보 동기화",
    "changeRecord": "변경",
    "noUSDTChangeRecord": "USDT 변동 기록이 없습니다",
    withdrawAsset: "포인트 받기",
    depositAsset: "포인트 동기화",

    "buyAsset": "포인트 구매",
    "sellAsset": "포인트 판매",
    "assetChangeRecord": "포인트 변동 기록",
    "all": "전체",
    depositWithdraw: "정보 가져오기 / 정보 동기화",
    "buySell": "매수/매도",
    "tradeValue": "거래 가치",
    "increaseRate24h": "24시간 상승률",
    "frozenAmount": "동결 수량",
    "valuation": "평가액",
    "assetAmount": "포인트 수량",
    "assetDetail": "포인트 상세",

    "enableEscrowTip": "USDT 에스크로로 구매 성공률 높이기",
    "escrowExplanation": "주문 매칭 시 포인트 자동 지급, USDT 판매자에게 전달",
    "remark": "비고",
    "buyOrderTip": "구매 주문 후 판매자가 제안 수락",
    "tradeSuccessTip": "거래 성공 시 금액 지불 및 포인트 수령",
    "ensurePaymentAvailable": "결제 수단 사용 가능 확인",
    "buyWillCharge": "구매 시 수수료",
    "feeSuffix": "수수료 부과",
    "pleaseEnterRemark": "비고 입력",
    "allowPartialMatch": "부분 체결 허용",
    "buyAssets": "포인트 구매",
    "purchasePostSuccess": "구매 요청 등록 성공",
    "purchasePosted": "구매 요청 완료",
    "pleaseSelectPaymentMethod": "결제 수단 선택",
    "specifyBuyerPaymentMethod": "구매자 결제 수단 지정",
    "enterValidMinQuantity": "유효한 최소 거래 수량 입력",
    "minQuantityAtLeast100": "최소 거래 수량 100",
    "minQuantityAtLeast": "최소 거래 수량 ",
    "enterValidBuyQuantity": "유효한 구매 수량 입력",
    "buyQuantityGreaterThan0": "구매 수량 0 이상",
    "enterValidBuyPrice": "유효한 구매 가격 입력",
    "buyPriceGreaterThan0": "구매 가격 0 이상",
    "minTransactionAmount": "최소 거래 수량",
    "minAmountLimitTip": "최소 거래 수량 100",
    "supportedPayment": "지원 결제 수단",
    "pointsMarket": "포인트 마켓",
    "pointsName": "포인트 이름",
    "change24h": "24시간 변동",
    "transaction": "거래",
    "enterPrice": "가격 입력",
    "buyRequest": "구매 요청",
    "minAskPrice": "최저 판매가",
    "maxAskPrice": "최고 판매가",
    "highestMarketBuyPrice": "시장 최고 구매가",
    "pleaseEnterBuyPrice": "구매 가격 입력",
    "buyQuantity": "구매 수량",
    "feeRate": "수수료율",
    "actualReceivedAmount": "실제 수령 금액",
    "totalAmountPayable": "총 결제 금액",
    "assetPointsPlatform": "디지털 포인트 및 포인트 플랫폼",
    "oneStopAssetPointsPlatformDesc": "포인트 거래, RWA 포인트 관리 지원",
    "processing": "처리 중...",
    "postBuyRequest": "구매 요청 등록",
    "importantNotice": "중요 공지",

    "viewMorePoints": "더 많은 포인트 보기",
    "viewMoreRWA": "더 많은 RWA 보기",

    "tip": "알림",
    "applyArbitration": "중재 신청",
    "describeProblemWithEvidence": "문제 설명 및 증거 업로드",
    "appealContent": "신청 내용",
    "describeProblemInDetail": "문제 상황 및 구체적인 설명 작성",
    "submitting": "제출 중...",
    "submitAppeal": "신청 제출",

    "payment": "결제",
    "paymentConfirmed": "결제 확인",

    "pleaseIn": "",
    "completePayment": "분 이내 결제 완료",
    "orderNotExist": "주문 없음 또는 삭제됨",
    "phoneNumber": "전화번호",
    "email": "이메일",
    "socialMedia": "소셜 미디어",
    "pleaseEnterAppealContent": "신청 내용 입력",
    "appealSubmitted": "신청 제출 완료, 24시간 내 처리",
    "submitFailedRetry": "제출 실패, 다시 시도",

    "copiedToClipboard": "클립보드에 복사됨",
    "paymentConfirmedWaitSeller": "결제 확인됨, 판매자 확인 대기",
    "bankCard": "은행 카드",

    "sellSuccess": "판매 성공",
    "buySuccess": "구매 성공",

    "buy": "구매",
    "sell": "판매",
    "back": "뒤로",
    "details": "상세 정보",

    "totalAmounts": "총 결제 금액",
    "orderInfo": "주문 정보",
    "createdTime": "생성 시간",
    "enterQuantity": "수량 입력",

    "dataMissing": "주문 데이터 없음",
    "placeBuyOrder": "매수 주문 등록",
    "placeSellOrder": "매도 주문 등록",

    "minBuy": "최소 구매",
    "minSell": "최소 판매",
    "amount": "수량",
    "price": "가격",
    "total": "총액",

    "confirmReleasePrompt": "확인 후 자산은 구매자 계정으로 이동",
    "confirmCancel": "취소 확인",
    "confirmCancelPrompt": "주문 취소, 되돌릴 수 없음",
    "cancelOrder": "주문 취소",
    "contactInfo": "연락처",
    "orderNumber": "주문 번호",
    "time": "시간",
    "confirmCancelOrderQuestion": "주문 취소하시겠습니까?",

    "confirmRelease": "출금 확인",
    "confirmReleaseOrderQuestion": "이 주문을 출금하시겠습니까?",
    "goToPay": "결제하러 가기",

    "notSet": "미설정",
    "copied": "복사됨",
    "walletCopied": "지갑 복사됨",
    "userIdCopied": "ID 복사됨",
    "rwaMarket": "RWA 시장",
    "noMore": "더 이상 없음",
    "buying": "구매",
    "selling": "판매",
    "pendingPayment": "결제",
    "pendingRelease": "출금",
    "noOrders": "주문 없음",
    "noArbitrationOrders": "중재 없음",
    "allOrders": "전체",
    "arbitrationOrders": "중재 주문",
    "arbitrationRecords": "기록",
    "arbitrationCount": "건수",
    "totalCompletedOrders": "완료 수",
    "sellOrderCount": "판매 수",
    "buyOrderCount": "구매 수",
    "totalOrders": "전체 수",
    "myOrders": "내 주문",
    "appName": "디지털 포인트 플랫폼",
    "cancel": "취소",
    "confirm": "확인",
    "save": "저장",
    "edit": "편집",
    "delete": "삭제",
    "loading": "로딩 중...",
    "success": "성공",
    "error": "오류",

    "arbitrationOrderId": "중재 주문 번호",
    "arbitratorId": "중재자 ID",
    "respondent": "피중재인",
    "arbitrationDetails": "중재 세부 내용",

    "home": "홈",
    "market": "시장",
    "wallet": "지갑",
    "orders": "주문",
    "assets": "포인트",
    "profile": "프로필",

    "profilePage": "프로필",
    "accountSecurity": "계정 보안",
    "paymentMethods": "결제 수단 관리",
    "contactMethods": "연락처 관리",
    "helpCenter": "고객 센터",
    "aboutUs": "회사 소개",
    "logout": "로그아웃",
    "editProfile": "프로필 편집",
    "verifyNow": "지금 인증",
    "availableBalance": "사용 가능 잔액",
    "frozenAssets": "동결 포인트",
    "viewWallet": "지갑 보기",
    "creditScore": "신용 점수",
    "activityScore": "활동 점수",

    "search": "포인트, 포인트 또는 판매자 검색...",
    "recommend": "추천",
    "points": "포인트",
    "rwa": "실물 포인트",
    "hot": "인기",
    "noPlatformAnnouncement": "플랫폼 공지 없음",
    "hotTransactions": "인기 거래",
    "noHotActivities": "인기 활동 없음",
    "platformAnnouncement": "플랫폼 공지사항",
    "hotActivities": "인기 활동",
    "viewAll": "모두 보기",
    "newUser": "신규 사용자",
    "limited": "한정",
    "system": "시스템",
    "activity": "활동",

    "walletCenter": "지갑 센터",
    "totalAssets": "총 포인트(위안)",
    "deposit": "입금",
    "withdraw": "출금",
    "transfer": "전송",
    "walletAddress": "지갑 주소",
    "cryptoCurrency": "암호화폐",
    "fiat": "법정화폐",
    "paymentMethod": "결제 방법",
    "addCrypto": "암호화폐 추가",
    "addFiat": "법정화폐 추가",
    "addPayment": "결제 방법 추가",

    "memberLevels": "회원 등급",
    "memberLevelSettings": "회원 등급 설정",
    "createMemberLevel": "회원 등급 생성",
    "editMemberLevel": "회원 등급 편집",
    "memberLevelDetails": "회원 등급 상세",
    "basicInfo": "기본 정보",
    "levelBenefits": "등급 혜택",
    "previewEffect": "미리보기 효과",
    "levelName": "등급 이름",
    "pointsRequired": "필요 포인트",
    "levelColor": "등급 색상",
    "levelIcon": "등급 아이콘",
    "activeStatus": "활성 상태",
    "enabled": "활성화됨",
    "disabled": "비활성화됨",
    "pointsMultiplier": "포인트 배율",
    "discountRate": "할인율",
    "times": "배",
    "percent": "%",

    "pointsAcceleration": "포인트 가속",
    "exclusiveDiscount": "독점 할인",
    "birthdayGift": "생일 선물",
    "dedicatedService": "전담 서비스",
    "freeShipping": "무료 배송",
    "priorityPurchase": "우선 구매권",
    "addCustomBenefit": "맞춤 혜택 추가",

    "levelOrderTip": "레벨 순서를 드래그로 조정",
    "memberAutoUpgradeTip": "활성화 시 포인트가 충족되면 자동 업그레이드",
    "disableLevelTip": "비활성화 시 해당 레벨로 업그레이드 불가",
    "deleteLevelTip": "삭제 후 이 레벨의 모든 사용자는 자동으로 다운그레이드",
    "previewTip": "미리보기에서 레벨 사용자가 볼 수 있는 혜택",

    "merchantCenter": "판매자 센터",
    "merchantId": "판매자 ID",
    "pointsIssued": "발행된 포인트",
    "memberCount": "회원 수",
    "managePoints": "포인트 관리",
    "dataCenter": "데이터 센터",
    "manage": "관리",
    "activities": "활동",
    "data": "데이터",

    "publishOrder": "주문 게시",
    "orderType": "주문 유형",
    "buyOrder": "구매 희망",
    "sellOrder": "판매 희망",
    "pointsType": "포인트 유형",
    "pointsQuantity": "포인트 수량",
    "unitPrice": "단가",
    "totalAmount": "총 금액",
    "orderDescription": "주문 설명",
    "negotiable": "가격 협상 가능",
    "expiration": "유효 기간",
    "publishNewOrder": "새 주문 게시",
    "orderDetail": "주문 상세",
    "immediatelyBuy": "즉시 구매",
    "immediatelySell": "즉시 판매",
    "makeOffer": "가격 제안",
    "contactSeller": "판매자에게 연락",
    "contactBuyer": "구매자에게 연락",
    "transactionNotes": "거래 유의사항",
    "orderStatus": "주문 상태",
    "active": "거래 중",
    "completed": "완료",
    "cancelled": "취소됨"
}

// 获取所有翻译
export const translations = {
    zh: zhTranslations,
    en: enTranslations,
    ar: arTranslations,
    ja: jaTranslations,
    ko: koTranslations,
}
