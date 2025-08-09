import React from "react";
import {
  PublicKey,
  SystemProgram
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress
} from "@solana/spl-token";
import { AnchorError, BN, Program } from "@coral-xyz/anchor";
import { Toaster } from "./sonner";
import { toast } from "sonner";

// Utility functions
function hexStringToNumber(hexStr: string): number {
  return Number.parseInt(hexStr, 16);
}
function formatUnixTimestamp(hexTimestamp: string): string {
  const timestamp = hexStringToNumber(hexTimestamp);
  const date = new Date(timestamp * 1000);
  return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
}

interface MarketCardProps {
  market: any;
  publicKey: PublicKey | null,
  program: Program | undefined,
  isWalletConnected: boolean
}
const MarketCard: React.FC<MarketCardProps> = ({ market, publicKey, program, isWalletConnected }) => {
  const {
    title,
    yesAmount,
    noAmount,
    yesCount,
    noCount,
    isResolved,
    result,
    endTime,
    mint
  } = market.account;
  // console.log(publicKey, program);
  const marketAccount: PublicKey = market.publicKey;
  // console.log(marketAccount);

  const yesAmountNum = hexStringToNumber(yesAmount);
  const noCountNum = hexStringToNumber(noCount);
  const endTimeStr = formatUnixTimestamp(endTime);
  const placeBet = async (onSide: boolean, amount: number) => {
    if(!isWalletConnected) throw new Error("Wallet not connected")
    if (!publicKey) throw new Error("Wallet not connected");
    // if (!publicKey) {
      // toast("wallet not connected");
      // Toaster();
    // }
    if (!program) throw new Error("Program not initialized");

    // --- FETCH market account data to get mint ---

    // --- Derive bettor PDA ---

    // --- Get bettor ATA ---
    const bettorAta = await getAssociatedTokenAddress(
      mint,            // mint address
      publicKey,       // owner
    );

    // --- Derive vault PDA ---
    const vault = await getAssociatedTokenAddress(
      mint,
      marketAccount,
      true
    );

    // --- Send transaction ---
    try {
      const txSig = await program.methods
        .placeBet(onSide, new BN(amount)) // amount must be BN for u64
        .accounts({
          signer: publicKey,
          marketAccount: marketAccount,
          bettorAta: bettorAta,
          vault: vault,
          mint: mint,

        })
        .rpc();
      console.log("✅ Bet transaction signature:", txSig);
    } catch (error) {
      if (error instanceof AnchorError) {
        console.error("Anchor Error Code:", error.error.errorCode.code);
        console.error("Anchor Error Name:", error.error.origin);
        console.error("Anchor Error Message:", error.error.errorMessage);
      } else {
        console.error(error);
      }
    }

  };

  const handleClaim = async() => {
    if(!isWalletConnected) throw new Error("Wallet not connected")
    if (!publicKey) throw new Error("Wallet not connected");
    if (!program) throw new Error("Program not initialized");
    const bettorAta = await getAssociatedTokenAddress(
      mint,            // mint address
      publicKey,       // owner
    );

    // --- Derive vault PDA ---
    const vault = await getAssociatedTokenAddress(
      mint,
      marketAccount,
      true
    );

    const [bettorAccount] = PublicKey.findProgramAddressSync(
      [Buffer.from("bettor"), marketAccount.toBuffer(), publicKey.toBuffer()],
      program.programId
    );

    const tx = await program?.methods
                                .claimWinnings()
                                .accounts({
                                  signer: publicKey,
                                  marketAccount: marketAccount,
                                  bettor: bettorAccount,
                                  bettorAta,
                                  vault: vault
                                })
                                .rpc()
    console.log("Claimed tx", tx);
  }

  return (
    <div
      className={`
        relative rounded-2xl border border-[#3a3144]/60 p-7
        max-w-lg w-full mb-8 backdrop-blur-md 
        bg-gradient-to-br from-[#211a22]/60 via-[#241c29]/70 to-[#291421]/70
        transition shadow-xl
        hover:scale-[1.025] hover:border-gray-800 hover:shadow-purple-900/50
        hover:bg-[#32203d]/80 duration-200 group
      `}
      style={{
        boxShadow: "0 8px 32px 0 rgba(40,20,70, 0.40)",
      }}
    >
      {/* Title */}
      <div className="flex items-center justify-center mb-3">
        <h2 className="text-2xl font-semibold tracking-wide text-white leading-tight select-none group-hover:text-purple-200 transition">
          {title}
        </h2>
      </div>

      {/* Bet volumes */}
      <div className="flex gap-5 my-5">
        <div
          className={`
            flex-1 rounded-xl bg-white/10 px-5 py-2 flex flex-col items-center
            border border-teal-500/10 group-hover:bg-teal-800/20 transition select-none
          `}
        >
          <h3 className="font-bold text-teal-200 text-xs tracking-wider uppercase mb-1">
            Yes
          </h3>
          <div className="text-lg font-bold text-white drop-shadow-sm">
            Vol: {yesAmountNum}
          </div>
        </div>

        <div
          className={`
            flex-1 rounded-xl bg-white/10 px-5 py-2 flex flex-col items-center
            border border-red-500/10 group-hover:bg-red-900/20 transition select-none
          `}
        >
          <h3 className="font-bold text-red-200 text-xs tracking-wider uppercase mb-1">
            No
          </h3>
          <div className="text-lg font-bold text-white drop-shadow-sm">
            Vol: {noCountNum}
          </div>
        </div>
      </div>

      {/* Status/Result */}
      <div className="flex justify-between items-center mt-2">
        <div>
          <span className="font-semibold mr-2 text-gray-400">Status:</span>
          <span
            className={`
              inline-block px-2 py-1 rounded-lg font-mono text-xs
              ${isResolved ? "bg-green-700/80 text-green-100" : "bg-amber-900/70 text-amber-200"} 
              tracking-wide transition
            `}
          >
            {isResolved ? "Resolved" : "Open"}
          </span>
        </div>
        {isResolved ? (
          <div>
            <span className="font-semibold mr-2 text-gray-400">Result:</span>
            <span
              className={`inline-block px-2 py-1 rounded-lg font-mono text-xs
                ${result ? "bg-teal-800/80 text-teal-200" : "bg-pink-900/90 text-red-100"} 
                transition
              `}
            >
              {result ? "Yes Won" : "No Won"}
            </span>
          </div>
        ) : (
          <div>
            <span className="font-semibold mr-2 text-gray-400">Ends:</span>
            <span className="text-xs text-purple-200 font-mono">
              {endTimeStr}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-6 mt-6">
        {!isResolved ? (
          <>
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-semibold transition cursor-pointer"
              onClick={async () => {
                if (!isWalletConnected) return toast("Wallet not connected");
                const input = window.prompt("Enter the amount you want to bet on YES:", "1");
                const amount = Number(input);
                if (!input || isNaN(amount) || amount <= 0) {
                  toast("Please enter a valid positive number.");
                  return;
                }
                await placeBet(true, amount);
              }}
            >
              Bet Yes
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold transition cursor-pointer"
              onClick={async () => {
                if (!isWalletConnected) return toast("Wallet not connected");
                const input = window.prompt("Enter the amount you want to bet on NO:", "1");
                const amount = Number(input);
                if (!input || isNaN(amount) || amount <= 0) {
                  toast("Please enter a valid positive number.");
                  return;
                }
                await placeBet(false, amount);
              }}
            >
              Bet No
            </button>
          </>
        ) : (
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-lg font-semibold transition"
            onClick={handleClaim}
          >
            Claim Winnings
          </button>
        )}
      </div>

      {/* Glow Effect */}
      <span className="pointer-events-none absolute -inset-0.5 rounded-2xl border-2 border-gray-800 opacity-0 group-hover:opacity-60 transition-all duration-200 blur-sm"></span>
    </div>
  );
};

export default MarketCard;
