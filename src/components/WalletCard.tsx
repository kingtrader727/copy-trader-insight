
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Wallet as WalletIcon } from "lucide-react";
import type { Wallet } from "@/types/wallet";

interface WalletCardProps {
  wallet: Wallet;
  onClick: (address: string) => void;
}

export const WalletCard = ({ wallet, onClick }: WalletCardProps) => {
  const formatPnL = (value: number) => {
    const isPositive = value >= 0;
    return `${isPositive ? "+" : ""}${value.toFixed(2)}%`;
  };

  const formatWinRate = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <Card
      className="p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer animate-fadeIn bg-white/5 backdrop-blur-sm border border-white/10"
      onClick={() => onClick(wallet.address)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <WalletIcon className="w-5 h-5 text-purple-400" />
          <span className="font-medium text-sm text-gray-100">
            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
          </span>
        </div>
        <Badge variant="secondary" className="bg-purple-500/20 text-purple-200">
          {wallet.tokens.count} Tokens
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">7D Performance</p>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                {wallet.performance.sevenDay.pnl >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                )}
                <span
                  className={`font-semibold ${
                    wallet.performance.sevenDay.pnl >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {formatPnL(wallet.performance.sevenDay.pnl)}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Win Rate: </span>
                <span className="font-medium text-gray-200">
                  {formatWinRate(wallet.performance.sevenDay.winRate)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">30D Performance</p>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                {wallet.performance.thirtyDay.pnl >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                )}
                <span
                  className={`font-semibold ${
                    wallet.performance.thirtyDay.pnl >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {formatPnL(wallet.performance.thirtyDay.pnl)}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Win Rate: </span>
                <span className="font-medium text-gray-200">
                  {formatWinRate(wallet.performance.thirtyDay.winRate)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-sm pt-4 border-t border-white/10">
        <div>
          <span className="text-gray-400">Balance:</span>
          <span className="ml-2 font-medium text-gray-200">
            {wallet.balance.toFixed(2)} SOL
          </span>
        </div>
        <div>
          <span className="text-gray-400">Transactions:</span>
          <span className="ml-2 font-medium text-gray-200">
            {wallet.transactionCount}
          </span>
        </div>
      </div>
    </Card>
  );
};
