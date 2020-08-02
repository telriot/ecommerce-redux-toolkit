import { rest } from "msw";
const testProducts = [
  {
    name: "testProduct1",
    price: "$100",
    description: "test product 1",
    quantity: 2,
    brand: "test brand 1",
    weight: 10,
    _id: "testid1",
  },
  {
    name: "testProduct2",
    price: "$200",
    description: "test product 2",
    quantity: 2,
    brand: "test brand 2",
    weight: 20,
    _id: "testid2",
  },
];

export const handlers = [
  rest.get("/api/products/", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        docs: testProducts,
      })
    );
  }),
  /*rest.get("/api/users/cart/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        products: {
          products: { testid1: testProducts[0], testid2: testProducts[1] },
          shipping: 0,
          total: 648,
          itemTotal: 600,
        },
      })
    );
  }),
    rest.get("/api/auth/login/success", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        user: { _id: "123456", username: "test", email: "test@test.com" },
        error: null,
      })
    );
  }),
  
  */
];
