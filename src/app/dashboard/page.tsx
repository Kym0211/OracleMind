"use client";
import React, { useEffect, useState, useMemo } from "react";
import { FlipWords } from "@/components/ui/flibwords";
import { signOut } from "next-auth/react";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { AnchorProvider, Idl, Program, setProvider } from "@coral-xyz/anchor";
import idl from "@/types/oraclemind_program.json"
import { clusterApiUrl, Connection } from "@solana/web3.js";
import MarketCard from "@/components/ui/market-card";
import { Address } from "gill";
import {
  PublicKey,
  SystemProgram
} from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress
} from "@solana/spl-token";

export default function Dashboard() {
  const words = ["OracleMind", "Predict and Win"];
  const { publicKey, connected, signTransaction, signAllTransactions } = useWallet();
  const WalletMultiButtonDynamic = dynamic(
    async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  
  const connection = useMemo(() => new Connection(clusterApiUrl("devnet")), []);
  const walletAdapter = useWallet();

  const provider = useMemo(
    () =>
      walletAdapter
        ? new AnchorProvider(connection, walletAdapter, {})
        : undefined,
    [connection, walletAdapter]
  );

  if (provider) {
    setProvider(provider);
  }

  const program = useMemo(
    () => (provider ? new Program(idl as Idl, provider) : undefined),
    [provider]
  );

  const [markets, setMarkets] = useState<any[]>([]);  // state for fetched markets
  const [testmarkets, settestMarkets] = useState<any[]>([]);  // state for fetched markets

  useEffect(() => {
    const fetchMarkets = async () => {
      console.log("clicked");
      if (program) {
        try {
          const fetchedMarkets = await program?.account?.market.all();
          console.log(fetchedMarkets);
          settestMarkets([fetchedMarkets[0], fetchedMarkets[0]])
          setMarkets(fetchedMarkets);  // update React state here

        } catch (e) {
          console.error("Failed to fetch markets:", e);
        }
      }
    };
    fetchMarkets();
  }, [program]);


  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#1f1525] via-[#170b1f] to-[#200b19]">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-20 border-b border-gray-700 bg-transparent ">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <FlipWords words={words} className="text-white text-2xl font-bold" />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => ()}
            className="text-white bg-transparent px-4 py-2 rounded-md font-semibold transition"
          >
            Chat Space
          </button>
          <button
            onClick={() => signOut()}
            className="text-white bg-transparent px-4 py-2 rounded-md font-semibold transition"
          >
            Sign out
          </button>

          <WalletMultiButtonDynamic className="ml-2 walletButtonOverride" />
        </div>
      </nav>

      {/* Dashboard content */}
      <section className="p-6 pt-24">

        {/* Render a MarketCard for each market */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {markets.map((market, index) => (
            <MarketCard 
              key={ index} 
              market={market} 
              publicKey = {publicKey}
              program = {program}
              isWalletConnected = {connected}
              />
          ))}
        </div>

      </section>
    </main>
  );
}
