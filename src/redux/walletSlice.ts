// redux/walletSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  address: string | null;
  network: string | null;
  isConnected: boolean;
}

const initialState: WalletState = {
  address: null,
  network: null,
  isConnected: false,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    connectWallet: (
      state,
      action: PayloadAction<{ address: string; network: string }>
    ) => {
      console.log(action.payload.address);
      state.address = action.payload.address;
      state.network = action.payload.network;
      state.isConnected = true;
    },
    disconnectWallet: (state) => {
      state.address = null;
      state.network = null;
      state.isConnected = false;
    },
  },
});

export const { connectWallet, disconnectWallet } = walletSlice.actions;
export default walletSlice.reducer;
