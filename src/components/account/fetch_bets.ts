import * as anchor from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { OraclemindProgram } from "@/types/oraclemind_program";
import { ClusterUrl } from "gill";

const PROGRAM_ID = new PublicKey("");
export async function fetchBettorAccounts() {
    // Replace this with your actual cluster URL, e.g., "https://api.devnet.solana.com"
    const clusterUrl: ClusterUrl = "https://api.devnet.solana.com";
    const connection = new Connection(clusterUrl);

    const provider = new anchor.AnchorProvider(connection, null, { commitment: "confirmed"});

    const program = new anchor.Program(OraclemindProgram);
}