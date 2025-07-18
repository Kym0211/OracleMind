import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bs58 from 'bs58';
import {PublicKey} from '@solana/web3.js';
import nacl from 'tweetnacl';

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
                    const input = credentials?.input ? JSON.parse(credentials.input) : {};
                    const output = credentials?.output ? JSON.parse(credentials.output) : {};
                    const { address, signature, message } = input;

                    const publicKey = new PublicKey(address).toBytes();
                    const messageBytes = new TextEncoder().encode(message);
                    const signatureBytes = bs58.decode(signature);
                    const isVerified = nacl
                        .sign
                        .detached
                        .verify(
                            messageBytes,
                            signatureBytes,
                            publicKey
                        )

                    
                    if (!isVerified) return null;

                    
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