declare module '@paystack/inline-js' {
  interface PaystackTransactionConfig {
    key: string;
    email: string;
    amount: number;
    firstname?: string;
    lastname?: string;
    onSuccess: (response: { reference: string; [key: string]: any }) => void;
    onCancel?: () => void;
    onError?: (error: any) => void;
  }

  class PaystackPop {
    newTransaction(config: PaystackTransactionConfig): void;
  }

  export default PaystackPop;
}
