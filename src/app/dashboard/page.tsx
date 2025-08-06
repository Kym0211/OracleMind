"use client";
import React from "react";
import { FlipWords } from "@/components/ui/flibwords";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { signOut } from "next-auth/react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Dashboard() {
  const words = ["OracleMind", "Predict and Win"];
  const { publicKey, connected } = useWallet();

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#1f1525] via-[#170b1f] to-[#200b19]">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-20 border-b border-gray-700 bg-transparent">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <FlipWords words={words} className="text-white text-2xl font-bold" />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => signOut()}
            className="text-white bg-transparent px-4 py-2 rounded-md font-semibold transition"
          >
            Sign out
          </button>

          <WalletMultiButton className="ml-2 walletButtonOverride" />
        </div>
      </nav>

      {/* Dashboard content goes here */}
      <section className="p-6 pt-24">
        {/* Your dashboard content */}
        <h1 className="text-white text-3xl font-semibold mb-4">Welcome to OracleMind Dashboard: {publicKey?.toBase58()}</h1>
        {/* Add more dashboard components */}
      </section>
    </main>
  );
}
