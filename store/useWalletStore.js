import { create } from 'zustand';

const useWalletStore = create((set) => ({
  address: null,
  chainId: null,
  signature: null,
  userData: null,
  isExpire: 0,
  setAddress: (address) => set({ address }),
  setChainId: (chainId) => set({ chainId }),
  setSignature: (signature) => set({ signature }),
  setUserData: (userData) => set({userData}),
  setExpireStatus: (isExpire) => set({isExpire}),
  reset: () => set({
    address: null,
    chainId: null,
    signature: null,
    userData: null
  }),
}));


export default useWalletStore;
