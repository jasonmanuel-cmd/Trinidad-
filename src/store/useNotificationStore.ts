import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order, OrderStatus } from "./useOrderStore";

export interface Notification {
  id: string;
  orderId: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  type: OrderStatus;
  message: string;
  sentAt: Date;
  status: "pending" | "sent" | "failed";
  error?: string;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "sentAt">) => void;
  updateNotificationStatus: (
    id: string,
    status: "pending" | "sent" | "failed",
    error?: string
  ) => void;
  getNotificationsByOrder: (orderId: string) => Notification[];
  getUnsentNotifications: () => Notification[];
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          sentAt: new Date(),
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));

        return newNotification;
      },

      updateNotificationStatus: (id, status, error) => {
        set((state) => ({
          notifications: state.notifications.map((notif) =>
            notif.id === id ? { ...notif, status, error } : notif
          ),
        }));
      },

      getNotificationsByOrder: (orderId) => {
        return get().notifications.filter((notif) => notif.orderId === orderId);
      },

      getUnsentNotifications: () => {
        return get().notifications.filter((notif) => notif.status === "pending");
      },

      clearNotifications: () => {
        set({ notifications: [] });
      },
    }),
    {
      name: "notification-store",
      version: 1,
    }
  )
);

/**
 * Send notification for order status change
 * This is called from the admin dashboard when updating order status
 */
export const sendOrderNotification = async (
  order: Order,
  newStatus: OrderStatus
): Promise<void> => {
  const statusMessages: Record<OrderStatus, string> = {
    pending: `Your order ${order.orderNumber} has been received and is being prepared.`,
    confirmed: `Great news! Order ${order.orderNumber} has been confirmed and will be dispatched soon.`,
    dispatched: `Your order ${order.orderNumber} is on the way! Track your delivery on our website.`,
    delivered: `Your order ${order.orderNumber} has been delivered. Thank you for your purchase!`,
    cancelled: `Order ${order.orderNumber} has been cancelled. ${
      order.vipCreditUsed > 0 ? `VIP credit of $${order.vipCreditUsed} has been refunded.` : ""
    }`,
  };

  const notificationStore = useNotificationStore.getState();

  const notification: Omit<Notification, "id" | "sentAt"> = {
    orderId: order.id,
    orderNumber: order.orderNumber,
    customerEmail: "", // Will be populated from delivery info or user account
    customerName: order.deliveryInfo.name,
    type: newStatus,
    message: statusMessages[newStatus],
    status: "pending",
  };

  notificationStore.addNotification(notification);

  // TODO: Integrate with email service (Resend, SendGrid, etc.)
  // For now, log to console
  console.log("Order notification queued:", notification);
};
