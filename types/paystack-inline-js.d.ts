declare module '@paystack/inline-js' {
  interface PaystackTransactionConfig {
    key?: string;
    email?: string;
    amount?: number;
    accessCode?: string;
    firstname?: string;
    lastname?: string;
    onSuccess: (response: { reference: string; [key: string]: unknown }) => void;
    onCancel?: () => void;
    onError?: (error: unknown) => void;
  }

  class PaystackPop {
    newTransaction(config: PaystackTransactionConfig): void;
  }

  export default PaystackPop;
}
