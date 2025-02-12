
import axios from "axios";
import type { Wallet } from "@/types/wallet";

const API_BASE_URL = "your-api-endpoint"; // Replace with your MongoDB API endpoint

export const api = {
  async getWallets(): Promise<Wallet[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/wallets`);
      // Ensure we're dealing with an array
      const wallets = Array.isArray(response.data) ? response.data : [];
      return wallets;
    } catch (error) {
      console.error("Error fetching wallets:", error);
      return [];
    }
  },

  async getWalletDetails(address: string): Promise<Wallet | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/wallets/${address}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching wallet details:", error);
      return null;
    }
  },
};
