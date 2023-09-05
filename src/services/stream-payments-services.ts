import { AbstractPaymentService, Cart, Data, Payment, PaymentSession, PaymentSessionStatus } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import solanaWeb3 from "@solana/web3.js";
import { streamPayments } from "../models/stream-payments";
import { streamPaymentsRepository } from "../repositories/stream-payments";

class streamPaymentsService extends AbstractPaymentService {
    private readonly streamPaymentsRepository: streamPaymentsRepository;
    private readonly daemonProviderUrl: Record<"mainnet" | "testnet" | "devnet", string>;
    private readonly daemonProviderUser: string;
    private readonly daemonProviderPassword: string;
    private readonly networkType: "mainnet" | "testnet" | "devnet";
    private merchantPaymentAddress: string | null = null;
    private daemon: any | null = null;
    private wallet: any | null = null;

    constructor({ streamPaymentsRepository }: { streamPaymentsRepository: streamPaymentsRepository }, options: {
        daemonProviderUrl: Record<"mainnet" | "testnet" | "devnet", string>;
        daemonProviderUser: string;
        daemonProviderPassword: string;
        merchantPaymentAddress?: string;
        networkType: "mainnet" | "testnet" | "devnet";
    }) {
        super({ streamPaymentsRepository }, options);
        this.streamPaymentsRepository = streamPaymentsRepository;
        this.daemonProviderUrl = options.daemonProviderUrl;
        this.daemonProviderUser = options.daemonProviderUser;
        this.daemonProviderPassword = options.daemonProviderPassword;
        this.networkType = options.networkType;
        if (options.merchantPaymentAddress) {
            this.merchantPaymentAddress = options.merchantPaymentAddress;
        }
    }

    private async connect() {
        if (this.daemon == null) {
            try {
                const network = this.networkType === "mainnet" ? "mainnet-beta" : this.networkType;
                const endpoint = this.daemonProviderUrl[this.networkType];

                this.daemon = await solanaWeb3.connectToCluster(endpoint);

                this.wallet = await solanaWeb3.createWalletKeys({
                    networkType: this.networkType,
                });
            } catch (error) {
                console.error(`Failed to connect to Solana ${this.networkType}:`, error);
                throw error;
            }
        }
    }

    async initialize() {
        try {
            await this.connect();

            if (!this.merchantPaymentAddress) {
                this.merchantPaymentAddress = await this.importMerchantWallet();
            }
        } catch (error) {
            console.error("Failed to initialize streamPaymentsService:", error);
            throw error;
        }
    }

    private async importMerchantWallet() {
        try {
            const merchantWallet = await solanaWeb3.createWalletKeys({
                networkType: this.networkType,
            });

            this.merchantPaymentAddress = merchantWallet.getAddress(0, 0);

            return this.merchantPaymentAddress;
        } catch (error) {
            console.error("Failed to import merchant wallet:", error);
            throw error;
        }
    }

    async getPaymentData(paymentSession: PaymentSession): Promise<Data> {
        await this.connect();

        const streamPayments = new streamPayments();
        streamPayments.cart_id = paymentSession.cart_id;
        streamPayments.total_amount = paymentSession.cart.total!;
        streamPayments.user_email = paymentSession.cart.email;
        streamPayments.virtual_wallet_addr = this.wallet.getAddress(0, 0);
        streamPayments.virtual_wallet_pkey = this.wallet.getPrivateSpendKey();
        streamPayments.virtual_wallet_vkey = this.wallet.getPrivateViewKey();
        
        await this.streamPaymentsRepository.save(streamPayments);

        return {
            "paymentAddress": streamPayments.virtual_wallet_addr,
        };
    }

    // Implement other methods with error handling

    async deletePayment(paymentSession: PaymentSession): Promise<void> {
        try {
            await this.connect();
            // Implement deletePayment logic
        } catch (error) {
            console.error("Failed to delete payment:", error);
            throw error;
        }
    }

    // Add other methods with proper error handling

    async getStatus(data: Data): Promise<PaymentSessionStatus> {
        try {
            await this.connect();
            // Implement getStatus logic
        } catch (error) {
            console.error("Failed to get payment status:", error);
            throw error;
        }
    }
}

export default streamPaymentsService;
