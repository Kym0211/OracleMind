"use client";
import React, { useCallback, useState } from "react";
import { BackgroundLines } from "../components/ui/landing-page";
import { useWallet } from "@solana/wallet-adapter-react";
import { signIn } from "next-auth/react";
import bs58 from "bs58";

export default function BackgroundLinesDemo() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

    const handleSignIn = async () => {
        setError("")
        setLoading(true)
        try {
          // 1. Connect wallet
          // Phantom injects window.solana
          const provider = (window as any).solana
          if (!provider?.isPhantom) throw new Error("Phantom wallet not found")
          await provider.connect()
          const { publicKey } = provider

          // 2. Prepare and sign message
          const message = `Sign in at ${new Date().toISOString()}`
          const encodedMessage = new TextEncoder().encode(message)
          const signed = await provider.signMessage(encodedMessage, "utf8")
          const signature = bs58.encode(signed.signature)

          // 3. Call NextAuth credentials signIn
          const input = JSON.stringify({
            address: publicKey.toString(),
            signature,
            message
          });
          // const output = JS
          const result = await signIn("credentials", {
            redirect: true,
            callbackUrl: "/protected", // Update this route
            input,
            // output
          })

        } catch (err: any) {
          setError(err.message || "Wallet error")
        } finally {
          setLoading(false)
        }
      }

  return (
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <h2 className="text-transparent text-center bg-clip-text bg-no-repeat bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)] font-bold tracking-tight text-4xl">
          OracleMind
        </h2>
        <blockquote className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center italic">
          On-chain wisdom, enhanced by AI.
        </blockquote>
        <div className="mt-8 flex flex-col items-center gap-4">
            <button
              className="px-5 py-2 bg-violet-600 text-white rounded shadow font-bold hover:bg-violet-700"
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? "Connecting..." : "Connect with wallet"}
            </button>
          
        </div>
      </BackgroundLines>
  );
}