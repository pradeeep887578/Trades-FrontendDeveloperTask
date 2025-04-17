import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, disconnectWallet } from "../redux/walletSlice";
import { RootState } from "../redux/store";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import Globalbutton from "../Common/Globalbutton";
import { useNavigate } from "react-router-dom";
import CONTRACT_ABI from "../utils/counterContract";
const SEPOLIA_CHAIN_ID = 11155111n;

const Dashboard: React.FC = () => {
    const navigate=useNavigate()
  const dispatch = useDispatch();
  const { address, isConnected, network } = useSelector(
    (state: RootState) => state.wallet
  );

  const [count, setCount] = useState<number | null>(null);
  const [txLoading, setTxLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const getContractInstance = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  };


  const logoutHandle = ()=>{
    localStorage.removeItem("otp")
    localStorage.removeItem("userData")
    dispatch(disconnectWallet());
   setTimeout(() => {
     navigate('/')
   }, 1000);
  }

  const fetchCount = async () => {
    setFetching(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const { chainId } = await provider.getNetwork();
      if (chainId !== SEPOLIA_CHAIN_ID) {
        toast.error("Please connect to the Sepolia network.");
        dispatch(disconnectWallet());
        return;
      }
      const contract = await getContractInstance();
      const value = await contract.getCount();
      setCount(Number(value));
    } catch (err) {
      console.error("Error fetching count:", err);
      toast.error("Error fetching count.");
    } finally {
      setFetching(false);
    }
  };

  const handleIncrement = async () => {
    setTxLoading(true);
    try {
      const contract = await getContractInstance();
      const tx = await contract.increment();
      await tx.wait();
      await fetchCount();
      toast.success("Incremented!");
    } catch {
      toast.error("Increment failed.");
    } finally {
      setTxLoading(false);
    }
  };

  const handleDecrement = async () => {
    setTxLoading(true);
    try {
      const contract = await getContractInstance();
      const tx = await contract.decrement();
      await tx.wait();
      await fetchCount();
      toast.success("Decremented!");
    } catch {
      toast.error("Decrement failed.");
    } finally {
      setTxLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const net = await provider.getNetwork();
    dispatch(connectWallet({ address: accounts[0], network: net.name }));
  };

  const handleDisconnectWallet = () => {
    dispatch(disconnectWallet());
    setCount(null);
  };

  useEffect(() => {
    if (isConnected) fetchCount();
  }, [isConnected]);

  return (
    <Box sx={{ padding: "2rem" }}>
    <Box style={{display:"flex",justifyContent:"space-between"}}>
          <Typography variant="h3" gutterBottom>
        🏠 Dashboard
      </Typography>
      <Globalbutton onClick={logoutHandle}>
      Logout
      </Globalbutton>
    </Box>

      {isConnected ? (
        fetching ? (
          <Box sx={{ textAlign: "center", pt: 4 }}>
            <CircularProgress size={48} />
            <Typography sx={{ mt: 2 }}>Loading count...</Typography>
          </Box>
        ) : (
          <Paper sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h6">
              <strong>Wallet:</strong> {address}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Network:</strong> {network}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h5">🧮 Counter</Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Current Count:</strong> {count}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleIncrement}
                disabled={txLoading}
                sx={{ mr: 2 }}
              >
                {txLoading ? <CircularProgress size={20} /> : "Increment"}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDecrement}
                disabled={txLoading}
              >
                {txLoading ? <CircularProgress size={20} /> : "Decrement"}
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Button variant="outlined" color="error" onClick={handleDisconnectWallet}>
              Disconnect Wallet
            </Button>
          </Paper>
        )
      ) : (
        <Button variant="contained" onClick={handleConnectWallet}>
          Connect Wallet
        </Button>
      )}

      <ToastContainer position="top-right" />
    </Box>
  );
};

export default Dashboard;
