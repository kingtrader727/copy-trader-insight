
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WalletCard } from "@/components/WalletCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";
import type { Wallet, WalletFilters } from "@/types/wallet";

const DEFAULT_FILTERS: WalletFilters = {
  minBalance: 15,
  minTransactions: 100,
  maxTransactions: 1000,
};

export const WalletList = () => {
  const [filters, setFilters] = useState<WalletFilters>(DEFAULT_FILTERS);

  const { data, isLoading, error } = useQuery({
    queryKey: ["wallets"],
    queryFn: api.getWallets,
  });

  // Ensure data is an array
  const wallets = Array.isArray(data) ? data : [];

  const filteredWallets = wallets.filter(
    (wallet) =>
      wallet.balance >= filters.minBalance &&
      wallet.transactionCount >= filters.minTransactions &&
      wallet.transactionCount <= filters.maxTransactions
  );

  const handleWalletClick = (address: string) => {
    console.log("Selected wallet:", address);
    // Implement wallet detail view navigation here
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="text-danger">Error loading wallets. Please try again.</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="text-muted-foreground">Loading wallets...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slideUp">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="minBalance">Minimum Balance (SOL)</Label>
          <Input
            id="minBalance"
            type="number"
            value={filters.minBalance}
            onChange={(e) =>
              setFilters({ ...filters, minBalance: Number(e.target.value) })
            }
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="minTx">Minimum Transactions</Label>
          <Input
            id="minTx"
            type="number"
            value={filters.minTransactions}
            onChange={(e) =>
              setFilters({ ...filters, minTransactions: Number(e.target.value) })
            }
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxTx">Maximum Transactions</Label>
          <Input
            id="maxTx"
            type="number"
            value={filters.maxTransactions}
            onChange={(e) =>
              setFilters({ ...filters, maxTransactions: Number(e.target.value) })
            }
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWallets.map((wallet) => (
          <WalletCard
            key={wallet.address}
            wallet={wallet}
            onClick={handleWalletClick}
          />
        ))}
      </div>

      {filteredWallets.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No wallets found matching the current filters.
        </div>
      )}
    </div>
  );
};
