// models/solana-web3.ts

// Define a TypeScript interface for a Solana transaction
export interface SolanaTransaction {
    senderPublicKey: string; // Public key of the sender
    recipientPublicKey: string; // Public key of the recipient
    amount: number; // Amount of SOL to send
    signature: string; // Transaction signature
  }
  
  // Define a TypeScript interface for a Solana account
  export interface SolanaAccount {
    publicKey: string; // Public key of the account
    balance: number; // SOL balance
  }
  
  // Define other Solana-related models or types as needed
  