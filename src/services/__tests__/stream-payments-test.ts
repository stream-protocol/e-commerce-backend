import { PaymentProvider } from 'medusa-payment-streampay';
import { StreamPaymentsTest } from './stream-payments.test';
import { SolanaWeb3 } from 'solana-web3.js';

class StreamPaymentsProvider extends PaymentProvider {
  static identifier = 'streampay';
  static label = 'Stream Payments';
  static version = '1.0.0';

  constructor(mountPath, app, config) {
    super(mountPath, app, config);

    // Define the current network (Devnet, Mainnet, or Testnet)
    const currentNetwork = 'Devnet'; // Change this to 'Devnet' or 'Testnet' as needed

    // Initialize Stream Payment Gateway instance with config
    this.streamPaymentsTest = new StreamPaymentsTest({
      // Add your Stream Payment Gateway configuration here
      daemonProviderUrl: process.env.STREAMPAY_DAEMON_PROVIDER_URL,
      daemonProviderUser: process.env.STREAMPAY_DAEMON_PROVIDER_USER,
      daemonProviderPassword: process.env.STREAMPAY_DAEMON_PROVIDER_PASSWORD,
      merchantPaymentAddress: process.env.STREAMPAY_MERCHANT_PAYMENT_ADDRESS,
      transactionFee: 0.00035, // Set your desired Solana transaction fee
      merchantFee: 0.10, // Set your desired merchant customized fee
      network: currentNetwork, // Specify the current network here
    });

    // Initialize Solana Web3.js test connection
    this.solanaConnection = new SolanaWeb3.Connection('https://api.dev.solana.com'); // Replace with your Solana network URL
  }

  // Implement authorization logic for Stream Payment Gateway
  async authorize({ order, paymentMethod, metadata }) {
    try {
      // Perform authorization logic here
      // Example: Check if the payment method is valid, and if the order total matches the payment amount

      // Return an object with authorization status and any additional data
      return {
        authorized: true, // Set to true if authorization is successful
        message: 'Payment authorized successfully',
        // You can include additional data as needed
      };
    } catch (error) {
      // Handle authorization errors
      console.error('Authorization error:', error);
      return {
        authorized: false, // Set to false if authorization fails
        message: 'Payment authorization failed',
        // You can include error details in the message
      };
    }
  }

  // Implement capture logic for Stream Payments
  async capture({ payment }) {
    try {
      // Perform capture logic here
      // Example: Capture the payment by making a Solana blockchain transaction

      // Return an object with capture status and any additional data
      return {
        captured: true, // Set to true if capture is successful
        message: 'Payment captured successfully',
        // You can include additional data as needed
      };
    } catch (error) {
      // Handle capture errors
      console.error('Capture error:', error);
      return {
        captured: false, // Set to false if capture fails
        message: 'Payment capture failed',
        // You can include error details in the message
      };
    }
  }

  // Implement refund logic for Stream Payments app
  async refund({ payment, amount }) {
    try {
      // Perform refund logic here
      // Example: Refund a portion or the full amount of the payment

      // Return an object with refund status and any additional data
      return {
        refunded: true, // Set to true if refund is successful
        message: 'Payment refunded successfully',
        // You can include additional data as needed
      };
    } catch (error) {
      // Handle refund errors
      console.error('Refund error:', error);
      return {
        refunded: false, // Set to false if refund fails
        message: 'Payment refund failed',
        // You can include error details in the message
      };
    }
  }
}

export default StreamPaymentsProvider;
