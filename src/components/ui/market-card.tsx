import React from "react";

interface Market {
  publicKey: string;
  account: {
    creator: string;
    title: string;
    yesAmount: string; // hex string?
    noAmount: string;
    yesCount: string;
    noCount: string;
    isResolved: boolean;
    result: boolean | null; // true = yes wins, false = no wins, null = unresolved
    vault: string;
    endTime: string; // hex string
    mint: string;
    bump: number;
    aiInsight: string | null;
  };
}

interface MarketCardProps {
  market: Market;
}


function hexStringToNumber(hexStr: string): number {
  // Convert hex string like '0a' or '6a533821' to number
  return Number.parseInt(hexStr, 16);
}

function formatUnixTimestamp(hexTimestamp: string): string {
  const timestamp = hexStringToNumber(hexTimestamp);
  // Assume endTime is in seconds, convert to ms
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

const MarketCard: React.FC<MarketCardProps> = (market: any) => {
    console.log("market: ", market);
    const {
        title,
        creator,
        yesAmount,
        noAmount,
        yesCount,
        noCount,
        isResolved,
        result,
        endTime,
    } = market.market.account;

    // Convert hex amounts/counts to number
    const yesAmountNum = hexStringToNumber(yesAmount);
    const noAmountNum = hexStringToNumber(noAmount);
    const yesCountNum = hexStringToNumber(yesCount);
    const noCountNum = hexStringToNumber(noCount);

    const endTimeStr = formatUnixTimestamp(endTime);

    return (
            <div className="bg-gradient-to-br from-[#1f1525] via-[#170b1f] to-[#200b19] rounded-xl border border-gray-700 p-6 shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
            
                <p className="text-sm text-gray-400 mb-4">Created by: <code>{creator.toBase58()}</code></p>

                <div className="grid grid-cols-2 gap-4 text-white">
                    <div>
                    <h3 className="font-semibold">Yes</h3>
                    <p>Amount: {yesAmountNum}</p>
                    <p>Count: {yesCountNum}</p>
                    </div>
                    <div>
                    <h3 className="font-semibold">No</h3>
                    <p>Amount: {noAmountNum}</p>
                    <p>Count: {noCountNum}</p>
                    </div>
                </div>

                <div className="mt-4">
                    <p>
                    Status:{" "}
                    <span className={`font-semibold ${isResolved ? "text-green-400" : "text-yellow-400"}`}>
                        {isResolved ? "Resolved" : "Open"}
                    </span>
                    </p>
                    {isResolved && (
                    <p>
                        Result:{" "}
                        <span className={`font-semibold ${result ? "text-green-500" : "text-red-500"}`}>
                        {result ? "Yes won" : "No won"}
                        </span>
                    </p>
                    )}
                    <p className="text-gray-400 text-sm mt-2">Ends at: {endTimeStr}</p>
                </div> 
            </div> 
        );  
    };

export default MarketCard;
