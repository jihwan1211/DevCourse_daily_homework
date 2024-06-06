import { Order, OrderSheet } from "../models/order.model";
import { httpClient } from "./http";
import { OrderDetailItem } from "../models/order.model";

export const order = async (orderData: OrderSheet) => {
  const response = await httpClient.post("/orders", orderData);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await httpClient.get<Order[]>("/orders");
  return response.data;
};

export const fetchOrder = async (id: number) => {
  const response = await httpClient.get<OrderDetailItem[]>(`/orders/${id}`);
  return response.data;
};
