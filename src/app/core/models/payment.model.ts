export interface RazorpayOrderResponse {
    success: boolean;

    data: {
        orderId: string;

        amount: number;

        currency: string;

        key: string;
    };
}