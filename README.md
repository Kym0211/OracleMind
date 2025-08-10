# OracleMind - Decentralized Prdiction Market with Group Chat
**[Live Demo](https://oracle-mind.vercel.app)**

OracleMind is a **full-stack decentralized prediction market** dApp built on the Solana blockchain using the Anchor framework for on-chain smart contract logic.
It enables users to connect their Solana wallets, participate in trustless betting markets, and interact socially in real time through a **global group chat** powered by **Supabase Realtime.**

This project combines **Web3 on-chain logic** with **Web2 real-time communication**, showcasing an example of a hybrid dApp architecture.

## Overview

OracleMind allows users to:
- View **on-chain markets** created via an Anchor Solana program.

- **Bet YES or NO** on market outcomes by staking **SPL tokens** in a decentralized, transparent manner.

- **Claim winnings** automatically distributed based on market resolution.

- **Chat in real time** with other participants using wallet-based identities.

## Features

### Blockchain Features
- Wallet Connection
- Market Display
- Betting
- Claim Winnings
- Automatic Token Account Handling

### Social Features
- Supabase Realtime Chat
- Wallet Address Identity

## Tech Stack
### Frontend
- Next.js
- React
- Tailwind 
- Solana libraries

### Smart Contract
- Anchor
- Spl Tokens

### Backend
- Supabase

## Setup & Installation
1. Clone the repository
```
git clone https://github.com/your-username/oraclemind.git
cd oraclemind
```
2. Install dependencies
```
yarn install
```
3. Create local .env 
```
NEXTAUTH_SECRET="
GOOGLE_ID=
GOOGLE_SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
4. Run the App
```
yarn dev
```

## Future Improvements
- UI improvement
- User profile 
- Market stats
- Multi-token-support

## License
MIT License © 2025 Kavyam
