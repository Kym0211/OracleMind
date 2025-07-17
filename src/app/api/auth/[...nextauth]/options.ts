import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bs58 from 'bs58';
import {PublicKey} from '@solana/web3.js';
import {verifySignIn} from '@solana/wallet-standard-util'
import * as ed25519 from '@noble/ed25519'

// ed25519.etc.sha512Sync = sha512;
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                output: { label: "SignOut", type: "text" },
                input: { label: "SignIn", type: "text" }
            },
            async authorize(credentials) {
                try {
                    console.log("Auth started: ", credentials);
                    // Assume frontend passes { address, signature, message }
                    const input = credentials?.input ? JSON.parse(credentials.input) : {};
                    const output = credentials?.output ? JSON.parse(credentials.output) : {};
                    const { address, signature, message } = input;

                    const publicKey = new PublicKey(address).toBytes();
                    const messageBytes = new TextEncoder().encode(message);
                    const signatureBytes = bs58.decode(signature);
                    const msgBytes = new TextEncoder().encode(message);
                    

                    const isVerified = verifySignIn(input, output);
                    if (!isVerified) return null;

                    // 2. Optionally: Parse/validate the nonce here

                    // 3. Return user object
                    return { id: address, name: address };
                } catch (e) {
                    console.error(e);
                    return null;
                }
            }

        })
    ],

    pages: {
        signIn: "/"
    },

    secret: process.env.NEXTAUTH_SECRET
}