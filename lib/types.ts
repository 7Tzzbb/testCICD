// Mining machine types
export interface MiningMachine {
  id: string
  capacity: number | string
  maxQuantity: string
  maxPerPerson: number | string
  period: number
  periodIncrement: number
  output: number
  profit: string
  color: string
  price: number
  haveNum: number
  userTreeGrade: number
  grade?: number // Reference to the grade this machine belongs to
}

// API response for mining machine list
export interface ApiMiningMachine {
  id: number
  name: string
  price: number
  maxQuantity?: number
  maxPerPerson?: number
  period?: number
  periodIncrement?: number
  output?: number
  profit?: string
  color?: string
  gradeId?: number
  // Add any other fields that might be in the API response
  status?: number
  createTime?: string
  updateTime?: string
  exchangeNum: number
  grade:string
  totalOutput: number
  drawNumber:number
}

// Mining machine grade types
export interface MiningMachineGrade {
  id: number
  name: string
  description?: string
  minCapacity?: number
  maxCapacity?: number
  color?: string
  icon?: string
  status?: number
  createTime?: string
  updateTime?: string
  machines?: MiningMachine[] // Machines belonging to this grade
}

export interface UserMiningMachine {
  id: number
  type: string
  period: number
  output: number
  progress: number
  produced: number
  remainingDays: number
  color: string
  purchaseDate: string
  expiryDate: string
  gradeId?: number
}

export interface RedemptionRecord {
  id: number
  userId: string
  machineId: string
  machineType: string
  quantity: number
  date: string
  status: "completed" | "processing" | "failed"
  price: number
  color: string
  gradeId?: number
}

// User types
export interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  status: number
  createTime: string
  updateTime: string
  mobile: string
  token: string
  openId: string
  unionId: string
  avatar: string
  balance: number
  gongDe: number
  ownedMachines: UserMiningMachine[]
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  code: number,
  timestamp: string,
  data?: T
  error?: string
  message?: string
}

export interface RedemptionResponse {
  success: boolean
  transaction: {
    id: string
    amount: number
    date: string
  }
  machine: {
    id: string
    type: string
    quantity: number
    expiryDate: string
  }
  newBalance: number
}

// Add an interface for the API response structure
export interface ApiListResponse<T> {
  code: number
  message: string
  data: T[]
  success: boolean
}
