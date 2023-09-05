# StreamPayment - Medusa Payment Gateway

![StreamPayments Banner](https://i.imgur.com/mZzqOss.png)

## Introduction

**StreamPayment** is a Web3 payment provider designed for integration with e-commerce platforms. It leverages the power of Solana blockchain and web3 technology to offer secure, transparent, and versatile payment solutions. This README provides an overview of the **StreamPayment** Medusa project, installation instructions, and usage guidelines.

## Features

- **StreamPayment**: Accept Solana (SOL) Stream Token (STRM), USDC, and EURC stablecoin payments.
- Merchant Fees: Customize merchant fees based on your preferences.
- Stream**POS** Integration: Seamlessly integrate with Stream**POS** - Point of Sale system.

## Installation

Follow these steps to install **StreamPayment**:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/stream-protocol/medusa-payment-streampay.git
   ```
   
2. Install dependencies:

   ```bash
   cd medusa-payment-streampay
   npm install
   ```

3. Configure **StreamPayment** by editing the `config.js` file with your Solana wallet and network details.

## Usage

### Integration with Medusa

To integrate **StreamPayment** with Medusa, follow these steps:

1. Install and configure Medusa.

2. Add **StreamPayment** as a payment provider in your Medusa configuration (medusa-config.js):

   ```javascript
       module.exports = {
  payment: {
    // Configure payment providers here
    providers: [
      {
        id: "streampay",
        name: "Stream Payments",
        enabled: true,
        // Add provider-specific configuration options here
        // Example: apiKey, secretKey, etc.
      },
      // Add other payment providers as needed
    ],
    // Set the default payment provider
    default_provider: "streampay",
  },
  shipping: {
    // Configure shipping methods and providers here
    methods: [
      {
        id: "standard",
        name: "Standard Shipping",
        enabled: true,
        // Add shipping method-specific configuration options here
        // Example: price, estimated_delivery_time, etc.
      },
      // Add other shipping methods as needed
    ],
    providers: [
      {
        id: "usps",
        name: "USPS",
        enabled: true,
        // Add shipping provider-specific configuration options here
        // Example: apiKey, accountNumber, etc.
      },
      // Add other shipping providers as needed
    ],
    // Set the default shipping method and provider
    default_method: "standard",
    default_provider: "usps",
  },
  taxes: {
    // Configure tax rates and providers here
    rates: [
      {
        id: "sales-tax",
        name: "Sales Tax",
        enabled: true,
        rate: 0.08, // Example: 8% sales tax rate
      },
      // Add other tax rates as needed
    ],
    providers: [
      {
        id: "StreamPayments",
        name: "StreamPayments",
        enabled: true,
        // Add tax provider-specific configuration options here
        // Example: apiKey, companyId, etc.
      },
      // Add other tax providers as needed
    ],
    // Set the default tax provider
    default_provider: "StreamPayments",
  },
  // Add other configuration options for StreamPayments Medusa project here
};

   ```

3. Customize the payment provider configuration based on your requirements.

4. Start your Medusa server and enjoy **StreamPayment** integration!

## Documentation

For detailed documentation, including API references and integration guides, visit [StreamPayment Documentation](https://app.gitbook.com/invite/9eBaoUspGpGsG968Qbyp/aB9DR79hOZHVtMTWC4Ei).

## Contributing

We welcome contributions from the community! If you're interested in contributing to **StreamPayment**, please review our [Contribution Guidelines](CONTRIBUTING.md) and get in touch with us.

## License

**StreamPayment** is open-source software licensed under the [MIT License](LICENSE).

---

Choose **StreamPayment** for secure and innovative payment solutions powered by Solana blockchain and web3 technology.

For inquiries and support, contact us at [contact@streamprotocol.org](mailto:contact@streamprotocol.org).
```
