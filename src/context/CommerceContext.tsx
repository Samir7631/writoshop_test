import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  seedOrders,
  type NewStoreOrder,
  type RefundStatus,
  type StoreOrder,
} from "@/data/mockCommerce";

type CommerceContextValue = {
  orders: StoreOrder[];
  createOrder: (order: NewStoreOrder) => StoreOrder;
  approveOrder: (orderId: string) => void;
  advanceOrder: (orderId: string) => void;
  setRefundStatus: (orderId: string, status: RefundStatus) => void;
  markPaymentPaid: (orderId: string) => void;
  resetOrders: () => void;
};

const STORAGE_KEY = "writoshop-orders-v1";
const CommerceContext = createContext<CommerceContextValue | undefined>(undefined);

function loadOrders() {
  if (typeof window === "undefined") return seedOrders;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoreOrder[]) : seedOrders;
  } catch {
    return seedOrders;
  }
}

export function CommerceProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<StoreOrder[]>(() => loadOrders());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const value = useMemo<CommerceContextValue>(() => {
    const updateOrder = (
      orderId: string,
      updater: (order: StoreOrder) => StoreOrder,
    ) =>
      setOrders((current) =>
        current.map((order) => (order.id === orderId ? updater(order) : order)),
      );

    const createOrder = (order: NewStoreOrder) => {
      const created: StoreOrder = {
        ...order,
        placedAt: new Date().toISOString().slice(0, 10),
        status: "Pending approval",
        paymentStatus: "Verification pending",
        refundStatus: "None",
      };
      setOrders((current) => [created, ...current]);
      return created;
    };

    const approveOrder = (orderId: string) =>
      updateOrder(orderId, (order) => ({
        ...order,
        status: order.status === "Pending approval" ? "Approved" : order.status,
      }));

    const advanceOrder = (orderId: string) =>
      updateOrder(orderId, (order) => ({
        ...order,
        status:
          order.status === "Approved"
            ? "Processing"
            : order.status === "Processing"
              ? "Delivered"
              : order.status,
      }));

    const setRefundStatus = (orderId: string, status: RefundStatus) =>
      updateOrder(orderId, (order) => ({
        ...order,
        refundStatus: status,
        paymentStatus: status === "Completed" ? "Refunded" : order.paymentStatus,
        status: status === "Completed" ? "Cancelled" : order.status,
      }));

    const markPaymentPaid = (orderId: string) =>
      updateOrder(orderId, (order) => ({ ...order, paymentStatus: "Paid" }));

    return {
      orders,
      createOrder,
      approveOrder,
      advanceOrder,
      setRefundStatus,
      markPaymentPaid,
      resetOrders: () => setOrders(seedOrders),
    };
  }, [orders]);

  return (
    <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>
  );
}

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error("useCommerce must be used within a CommerceProvider");
  }
  return context;
}
