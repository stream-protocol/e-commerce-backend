import StreamPaymentService from "../path-to-stream-payments-service"; // Replace with the correct path

// Initialize your repository instance here
// import StreamPaymentRepository from "../path-to-stream-payment-repository"; // Replace with the correct path
// const streamPaymentRepository = new StreamPaymentRepository(/* parameters */);

const daemonProviderUrl = {
    mainnet: "https://api.mainnet-beta.solana.com",
    testnet: "https://api.testnet.solana.com",
    devnet: "https://api.devnet.solana.com",
};

const daemonProviderUser = "your-daemon-username";
const daemonProviderPassword = "your-daemon-password";

// Create an instance of StreamPaymentService
const streamPaymentService = new StreamPaymentService(
    {
        streamPaymentRepository, // Replace with your repository instance
    },
    {
        daemonProviderUrl,
        daemonProviderUser,
        daemonProviderPassword,
        networkType: "mainnet", // Specify "mainnet", "testnet", or "devnet" here
    }
);

export default streamPaymentService;
