
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WalletCard } from "@/components/WalletCard";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import type { Wallet, WalletFilters } from "@/types/wallet";

const DEFAULT_FILTERS: WalletFilters = {
  minBalance: 15,
  minTransactions: 100,
  maxTransactions: 1000,
};

export const WalletList = () => {
  const [filters, setFilters] = useState<WalletFilters>(DEFAULT_FILTERS);

  const { data: wallets = [], isLoading } = useQuery({
    queryKey: ["wallets"],
    queryFn: api.getWallets,
  });

  const filteredWallets = wallets.filter(
    (wallet) =>
      wallet.balance >= filters.minBalance &&
      wallet.transactionCount >= filters.minTransactions &&
      wallet.transactionCount <= filters.maxTransactions
  );

  const handleWalletClick = (address: string) => {
    console.log("Selected wallet:", address);
    // Implement wallet detail view navigation
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="text-muted-foreground">Loading wallets...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-slideUp">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="number"
          placeholder="Min Balance (SOL)"
          value={filters.minBalance}
          onChange={(e) =>
            setFilters({ ...filters, minBalance: Number(e.target.value) })
          }
          className="w-full"
        />
        <Input
          type="number"
          placeholder="Min Transactions"
          value={filters.minTransactions}
          onChange={(e) =>
            setFilters({ ...filters, minTransactions: Number(e.target.value) })
          }
          className="w-full"
        />
        <Input
          type="number"
          placeholder="Max Transactions"
          value={filters.maxTransactions}
          onChange={(e) =>
            setFilters({ ...filters, maxTransactions: Number(e.target.value) })
          }
          className="w-full"
        />
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
