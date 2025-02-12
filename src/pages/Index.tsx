
import { WalletList } from "@/components/WalletList";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Copy Trading Insights</h1>
          <p className="text-muted-foreground">
            Analyze and track high-performing Solana wallets for copy trading
            opportunities.
          </p>
        </div>
        <WalletList />
      </div>
    </div>
  );
};

export default Index;
