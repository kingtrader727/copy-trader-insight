
import { useState } from "react";
import { WalletList } from "@/components/WalletList";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);

  const toggleTracking = () => {
    setIsRunning(!isRunning);
    // Add your tracking logic here
  };

  return (
    <div className="min-h-screen">
      <div className="container py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 mb-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Copy Trading{" "}
              <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Analyze and track high-performing Solana wallets for copy trading
              opportunities. Real-time monitoring of profitable traders.
            </p>
            <Button 
              onClick={toggleTracking}
              size="lg"
              className={`mt-6 ${
                isRunning 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-green-500 hover:bg-green-600"
              } text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              {isRunning ? (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  Stop Tracking
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Start Tracking
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="glass-card rounded-xl p-6 shadow-2xl">
          <WalletList />
        </div>
      </div>
    </div>
  );
};

export default Index;
