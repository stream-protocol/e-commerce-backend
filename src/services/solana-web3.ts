import { Connection, PublicKey, Transaction, TransactionSignature, SystemProgram } from '@solana/web3.js';

class SolanaWeb3Service {
  private connection: Connection;

  constructor(solanaRpcUrl: string) {
    this.connection = new Connection(solanaRpcUrl, 'confirmed');
  }

  async sendTransaction(senderPrivateKey: string, recipientPublicKey: string, amount: number): Promise<TransactionSignature> {
    // Parse sender and recipient keys
    const senderAccount = new Account(Buffer.from(senderPrivateKey, 'base64'));
    const recipientKey = new PublicKey(recipientPublicKey);

    // Get the sender's account balance
    const senderBalance = await this.connection.getBalance(senderAccount.publicKey);

    // Check if the sender has enough balance for the transaction
    if (senderBalance < amount) {
      throw new Error('Insufficient balance to send the transaction.');
    }

    // Create a new transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderAccount.publicKey,
        toPubkey: recipientKey,
        lamports: amount,
      })
    );

    // Sign the transaction with the sender's private key
    transaction.sign(senderAccount);

    // Send the transaction to the Solana network
    const signature = await this.connection.sendTransaction(transaction, [senderAccount]);

    return signature;
  }
}

export default SolanaWeb3Service;
