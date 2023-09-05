// StreamPaymentsProvider.ts. Import dependencies
const { PaymentProvider } = require('medusa-payment-streampay');
const StreamPayments = require('./stream-payments'); // Replace with the actual path
const SolanaWeb3 = require('solana-web3.js'); // Replace with the actual Solana Web3.js import

class StreamPaymentProvider extends PaymentProvider {
  static identifier = 'streampay';
  static label = 'Stream Payments';
  static version = '1.0.0';

  constructor(mountPath, app, config) {
    super(mountPath, app, config);

    // Define the current network (Devnet, Mainnet, or Testnet)
    const currentNetwork = 'Mainnet'; // Change this to 'Devnet' or 'Testnet' as needed

    // Initialize Stream Payment Gateway instance with config
    this.streamPayments = new StreamPayments({
      // Add your Stream Payment Gateway configuration here
      daemonProviderUrl: process.env.STREAMPAY_DAEMON_PROVIDER_URL,
      daemonProviderUser: process.env.STREAMPAY_DAEMON_PROVIDER_USER,
      daemonProviderPassword: process.env.STREAMPAY_DAEMON_PROVIDER_PASSWORD,
      merchantPaymentAddress: process.env.STREAMPAY_MERCHANT_PAYMENT_ADDRESS,
      transactionFee: 0.00035, // Set your desired Solana transaction fee
      merchantFee: 0.2, // Set your desired merchant customized fee
      network: currentNetwork, // Specify the current network here
    });

    // Initialize Solana Web3.js connection
    this.solanaConnection = new SolanaWeb3.Connection('https://api.mainnet-beta.solana.com'); // Replace with your Solana network URL
  }

  // Implement authorize method for Stream Payment Gateway
  async authorize({ order, paymentMethod, metadata }) {
    try {
      // Use Stream Payments to authorize the payment
      const authorizationResult = await this.streamPayments.authorizePayment({
        order,
        paymentMethod,
        metadata,
      });

      // Create and sign a Solana transaction here if needed
      const transaction = new SolanaWeb3.Transaction().add(
        SolanaWeb3.SystemProgram.transfer({
          fromPubkey: this.solanaConnection.wallet.publicKey,
          toPubkey: this.solanaConnection.wallet.publicKey, // Replace with the recipient's Solana address
          lamports: /* Amount in lamports */, // Replace with the actual amount
        })
      );

      // Sign and send the Solana transaction
      const transactionSignature = await SolanaWeb3.sendAndConfirmTransaction(
        this.solanaConnection,
        transaction,
        [this.solanaConnection.wallet]
      );

      // Return the authorization result
      return {
        success: authorizationResult.success,
        data: {
          transactionId: authorizationResult.transactionId,
          solanaTransactionId: transactionSignature,
        },
      };
    } catch (error) {
      console.error('Authorization failed:', error);
      throw new Error('Payment authorization failed.');
    }
  }

  // Implement capture method for Stream Payments
  async capture({ payment }) {
    // Use Stream Payments to capture the payment
    const captureResult = await this.streamPayments.capturePayment({
      payment,
    });

    // Return the capture result
    return {
      success: captureResult.success,
      data: {
        transactionId: captureResult.transactionId,
      },
    };
  }

  // Implement refund method for Stream Payments app
  async refund({ payment, amount }) {
    // Use Stream Payments to refund the payment
    const refundResult = await this.streamPayments.refundPayment({
      payment,
      amount,
    });

    // Return the refund result
    return {
      success: refundResult.success,
      data: {
        transactionId: refundResult.transactionId,
      },
    };
  }
}

module.exports = StreamPaymentProvider;