import { Order } from "@/store/useOrderStore";

export const exportOrdersToCSV = (orders: Order[], filename = "orders.csv"): void => {
  const headers = [
    "Order Number",
    "Type",
    "Status",
    "Customer Name",
    "Phone",
    "Address",
    "Items",
    "Subtotal",
    "Delivery Fee",
    "Total",
    "Payment Method",
    "VIP Order",
    "VIP Credit Used",
    "Created At",
    "Est. Delivery Date",
    "Cancellation Reason",
  ];

  const rows = orders.map((order) => [
    order.orderNumber,
    order.type.toUpperCase(),
    order.status.charAt(0).toUpperCase() + order.status.slice(1),
    order.deliveryInfo.name,
    order.deliveryInfo.phone,
    order.deliveryInfo.address,
    order.items.map((item) => `${item.name} x${item.quantity}`).join("; "),
    `$${order.subtotal.toFixed(2)}`,
    `$${order.deliveryFee.toFixed(2)}`,
    `$${order.total.toFixed(2)}`,
    order.paymentMethod === "cod" ? "Cash on Delivery" : "Cash App",
    order.isVIPOrder ? "Yes" : "No",
    order.vipCreditUsed > 0 ? `$${order.vipCreditUsed.toFixed(2)}` : "-",
    new Date(order.createdAt).toLocaleString(),
    order.estimatedDeliveryDate
      ? new Date(order.estimatedDeliveryDate).toLocaleDateString()
      : "-",
    order.cancellationReason || "-",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => (typeof cell === "string" && cell.includes(",") ? `"${cell}"` : cell)).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportOrdersToJSON = (orders: Order[], filename = "orders.json"): void => {
  const jsonContent = JSON.stringify(orders, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const filterOrdersByDateRange = (
  orders: Order[],
  startDate: Date,
  endDate: Date
): Order[] => {
  return orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startDate && orderDate <= endDate;
  });
};
