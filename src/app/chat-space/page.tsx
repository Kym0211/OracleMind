"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import { useWallet } from "@solana/wallet-adapter-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Utility to shorten public key
function shortenPubkey(pk: string) {
  return pk.slice(0, 4) + "..." + pk.slice(-4);
}

// Utility to format timestamp
function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatSpace() {
  const { publicKey } = useWallet();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchMessages();
    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("inserted_at", { ascending: true });
    if (!error && data) setMessages(data);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) {
      alert("Connect your wallet to chat.");
      return;
    }
    if (newMessage.trim() === "") return;

    await supabase.from("messages").insert([
      {
        user_pubkey: publicKey.toBase58(),
        message: newMessage.trim(),
      },
    ]);
    setNewMessage("");
    fetchMessages();
  };

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-[#1f1525] via-[#170b1f] to-[#200b19]">
      {/* Heading */}
      <header className="p-4 flex justify-center border-b border-gray-700 bg-black/30">
        <h1 className="text-white text-2xl font-bold">💬 Group Chat</h1>
      </header>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg max-w-xs break-words ${
                msg.user_pubkey === publicKey?.toBase58()
                  ? "bg-purple-600 text-white ml-auto"
                  : "bg-gray-800 text-white"
              }`}
            >
              <div className="flex justify-between items-center text-xs opacity-70 mb-1">
                <span className="font-mono">
                  {shortenPubkey(msg.user_pubkey)}
                </span>
                {msg.inserted_at && (
                  <span>{formatTime(msg.inserted_at)}</span>
                )}
              </div>
              <span>{msg.message}</span>
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <form
          onSubmit={sendMessage}
          className="flex border-t border-gray-700 bg-black/30"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={
              publicKey ? "Type your message..." : "Connect wallet to chat"
            }
            className="flex-1 px-3 py-2 text-white bg-transparent outline-none"
            disabled={!publicKey}
            autoComplete="off"
          />
          <button
            type="submit"
            className={`px-4 text-white transition ${
              publicKey
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
            disabled={!publicKey}
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
