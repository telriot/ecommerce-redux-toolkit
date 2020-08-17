import { rest } from "msw";
import {
  testProducts,
  testUser,
  testOrder,
  testAddressList,
  testProductsBig,
} from "./data-models";
export const handlers = [
  rest.get("/api/auth/login/success", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "user has successfully authenticated",
        success: true,
        user: { _id: "5f282b89754c312c3da2dcaa" },
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
    return res(ctx.status(200), ctx.json(testOrder));
  }),
  rest.put("/api/users/:id/new-address", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testAddressList));
  }),
  rest.delete("/api/users/:id/remove-address", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];
