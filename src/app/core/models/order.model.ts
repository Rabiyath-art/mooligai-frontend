import { Address } from './address.model';
import { Product } from './product.model';

export interface OrderItem {
    product: Product;
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export interface Order {
    _id: string;
    user: string;
    items: OrderItem[];
    shippingAddress: Address;
    subtotal: number;
    shippingCharge: number;
    totalAmount: number;
    paymentStatus: | 'pending' | 'paid' | 'failed';
    orderStatus: | 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    createdAt: string;
}