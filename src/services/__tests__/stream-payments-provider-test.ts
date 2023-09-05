import { PaymentProviderTest } from 'medusa-payment-streampay';
import { StreamPaymentsTest } from './stream-payments-provider-test';
import { SolanaWeb3 } from 'solana-web3.js';

class StreamPaymentsProviderTest extends PaymentProviderTest {
  static identifier = 'streampay';
  static label = 'Stream Payments';
  static version = '1.0.0';

  constructor(mountPath, app, config) {
    super(mountPath, app, config);

    // Define the current network (Mainnet, Testnet, or Devnet)
    const currentNetwork = 'Devnet'; // Change this to 'Testnet' or 'Mainnet' as needed

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

    // Initialize Solana Web3.js connection
    this.solanaConnection = new SolanaWeb3.Connection('https://api.devnet.solana.com'); // Replace with your Devnet Solana network URL
  }

  // Implement authorize method for Stream Payment Gateway
  async authorize({ order, paymentMethod, metadata }) {
    // Your authorization logic here
  }

  // Implement capture method for Stream Payments
  async capture({ payment }) {
    // Your capture logic here
  }

  // Implement refund method for Stream Payments app
  async refund({ payment, amount }) {
    // Your refund logic here
  }
}

export default StreamPaymentsProviderTest;
