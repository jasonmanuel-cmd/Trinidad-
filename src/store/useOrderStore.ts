import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string | "Flower" | "Edibles" | "Concentrates" | "Vapes" | "Pre-Rolls";
}

export interface DeliveryInfo {
  name: string;
  phone: string;
  address: string;
  instructions?: string;
}

export type OrderStatus = "pending" | "confirmed" | "dispatched" | "delivered" | "cancelled";
export type PaymentMethod = "cod" | "cashapp";
export type OrderType = "regular" | "preorder";

export interface Order {
  id: string;
  orderNumber: string;
  type: OrderType;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  deliveryInfo: DeliveryInfo;
  isVIPOrder: boolean;
  vipCreditUsed: number;
  createdAt: Date;
  estimatedDeliveryDate?: Date;
  notes?: string;
  cancellationReason?: string;
  cancelledAt?: Date;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt" | "orderNumber">) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string, reason: string) => void;
  getOrder: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: OrderStatus) => Order[];
  getVIPOrders: () => Order[];
  getRecentOrders: (limit?: number) => Order[];
  deleteOrder: (orderId: string) => void;
}

const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `ORD-${timestamp}-${random}`;
};

const generatePreorderNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `PRE-${timestamp}-${random}`;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `order-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          createdAt: new Date(),
          orderNumber: orderData.type === "preorder" ? generatePreorderNumber() : generateOrderNumber(),
          estimatedDeliveryDate: orderData.type === "preorder" 
            ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days for preorder
            : new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day for regular
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

       updateOrderStatus: (orderId, status) => {
         set((state) => ({
           orders: state.orders.map((order) =>
             order.id === orderId ? { ...order, status } : order
           ),
         }));
       },

       cancelOrder: (orderId, reason) => {
         set((state) => ({
           orders: state.orders.map((order) =>
             order.id === orderId
               ? {
                   ...order,
                   status: "cancelled" as OrderStatus,
                   cancellationReason: reason,
                   cancelledAt: new Date(),
                 }
               : order
           ),
         }));
       },

      getOrder: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },

      getOrdersByStatus: (status) => {
        return get().orders.filter((order) => order.status === status);
      },

      getVIPOrders: () => {
        return get().orders.filter((order) => order.isVIPOrder);
      },

      getRecentOrders: (limit = 10) => {
        return get().orders.slice(0, limit);
      },

      deleteOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== orderId),
        }));
      },
    }),
    {
      name: "order-store",
      version: 1,
    }
  )
);
