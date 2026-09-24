export type OrderStatus =
  | "Pending approval"
  | "Approved"
  | "Processing"
  | "Delivered"
  | "Cancelled";

export type PaymentStatus =
  | "Paid"
  | "Pending"
  | "Verification pending"
  | "Refunded";

export type RefundStatus = "None" | "Requested" | "Approved" | "Completed";

export type OrderItem = {
  bookId: string;
  title: string;
  quantity: number;
  price: number;
};

export type StoreOrder = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  placedAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  refundStatus: RefundStatus;
  paymentMethod?: "UPI QR";
  paymentReference?: string;
  total: number;
  items: OrderItem[];
};

export type NewStoreOrder = Omit<StoreOrder, "placedAt" | "status" | "paymentStatus" | "refundStatus">;

export const seedOrders: StoreOrder[] = [
  {
    id: "ORD-1048",
    userId: "usr_demo_001",
    userName: "Demo Reader",
    userEmail: "user@writoshop.com",
    placedAt: "2026-08-19",
    status: "Delivered",
    paymentStatus: "Paid",
    refundStatus: "None",
    paymentMethod: "UPI QR",
    paymentReference: "628194201847",
    total: 748,
    items: [
      { bookId: "p2", title: "The Curious Atlas of Animals", quantity: 1, price: 449 },
      { bookId: "p1", title: "Whispers of the Quiet Forest", quantity: 1, price: 299 },
    ],
  },
  {
    id: "ORD-1094",
    userId: "usr_demo_001",
    userName: "Demo Reader",
    userEmail: "user@writoshop.com",
    placedAt: "2026-09-21",
    status: "Pending approval",
    paymentStatus: "Paid",
    refundStatus: "None",
    paymentMethod: "UPI QR",
    paymentReference: "629837112045",
    total: 349,
    items: [{ bookId: "p5", title: "The Moonlight Post Office", quantity: 1, price: 349 }],
  },
  {
    id: "ORD-1102",
    userId: "usr_demo_001",
    userName: "Demo Reader",
    userEmail: "user@writoshop.com",
    placedAt: "2026-09-22",
    status: "Cancelled",
    paymentStatus: "Refunded",
    refundStatus: "Completed",
    paymentMethod: "UPI QR",
    paymentReference: "629947003812",
    total: 199,
    items: [{ bookId: "p3", title: "Colours of the Festival", quantity: 1, price: 199 }],
  },
  {
    id: "ORD-1108",
    userId: "usr_002",
    userName: "Aarav Mehta",
    userEmail: "aarav@example.com",
    placedAt: "2026-09-23",
    status: "Pending approval",
    paymentStatus: "Pending",
    refundStatus: "None",
    total: 578,
    items: [
      { bookId: "p6", title: "Little Inventors Lab", quantity: 1, price: 399 },
      { bookId: "p8", title: "Focus Without the Fuss", quantity: 1, price: 179 },
    ],
  },
  {
    id: "ORD-1111",
    userId: "usr_003",
    userName: "Meera Joshi",
    userEmail: "meera@example.com",
    placedAt: "2026-09-24",
    status: "Processing",
    paymentStatus: "Paid",
    refundStatus: "Requested",
    paymentMethod: "UPI QR",
    paymentReference: "630112408799",
    total: 329,
    items: [{ bookId: "p9", title: "The River That Remembered", quantity: 1, price: 329 }],
  },
];
