import { rest } from "msw";
import {
  testProducts,
  testUser,
  testOrder,
  testAddressList,
  testProductsBig,
  timeOptions,
} from "./data-models";
export const handlers = [
  rest.get("/api/auth/login/success", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "user has successfully authenticated",
        success: true,
        user: testUser,
      })
    );
  }),
  rest.get("/api/products/", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        docs: testProductsBig,
      })
    );
  }),
  rest.get("/api/users/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testUser));
  }),
  rest.get("/api/users/orders/:id", (req, res, ctx) => {
    let filteredOrders = testOrder;
    const page = req.url.searchParams.get("page");
    const text = req.url.searchParams.get("text");
    const status = req.url.searchParams.get("status");
    const time = req.url.searchParams.get("time");
    const ordersPerPage = req.url.searchParams.get("ordersPerPage");
    const isTextMatch = (name, text) => {
      if (!text) return true;
      const regex = RegExp(text, "i");
      return regex.test(name);
    };
    const isTimeMatch = (date, time) => {
      if (!time) return true;
      let { start, end } = timeOptions[time];
      return Date.parse(date) > Date.parse(start) && date < Date.parse(end);
    };
    const isStatusMatch = (orderStatus, status) => {
      if (!status) return true;
      return orderStatus === status;
    };

    const filterOrders = (orders) => {
      let filteredArr = [];
      for (let order of orders) {
        if (!isTimeMatch(order.date, time)) continue;
        if (!isStatusMatch(order.status, status)) continue;
        for (let product of Object.keys(order.products)) {
          if (isTextMatch(order.products[product].name, text))
            filteredArr.push(order);
          break;
        }
      }
      return filteredArr;
    };
    filteredOrders = filterOrders(filteredOrders);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    return res(
      ctx.status(200),
      ctx.json({
        orders: filteredOrders
          .sort((a, b) => b.date - a.date)
          .slice(Math.floor((page - 1) * ordersPerPage), page * ordersPerPage),
        totalPages,
      })
    );
  }),

  rest.put("/api/users/:id/new-address", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testAddressList));
  }),
  rest.delete("/api/users/:id/remove-address", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];
