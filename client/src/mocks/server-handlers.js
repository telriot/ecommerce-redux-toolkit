import { rest } from "msw";

export const handlers = [
  rest.get("/api/products/", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        docs: [
          {
            name: "testProduct1",
            price: "$100",
            description: "test product 1",
            quantity: 10,
            brand: "test brand 1",
            weight: 10,
            _id: "testid1",
          },
          {
            name: "testProduct2",
            price: "$200",
            description: "test product 2",
            quantity: 20,
            brand: "test brand 2",
            weight: 20,
            _id: "testid2",
          },
        ],
      })
    );
  }),
];
