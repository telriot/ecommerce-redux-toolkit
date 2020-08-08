import { rest } from "msw";
const testProducts = [
  {
    name: "testProduct1",
    date: "2020-01-26T04:17:06.415Z",

    price: "$100",
    description: "test product 1",
    availability: 2,
    brand: "test brand 1",
    weight: 10,
    _id: "testid1",
  },
  {
    name: "testProduct2",
    date: "2020-02-26T04:17:06.415Z",
    price: "$200",
    description: "test product 2",
    availability: 2,
    brand: "test brand 2",
    weight: 20,
    _id: "testid2",
  },
  {
    name: "testProduct3",
    date: "2020-03-26T04:17:06.415Z",
    price: "$300",
    description: "test product 3",
    availability: 3,
    brand: "test brand 3",
    weight: 30,
    _id: "testid3",
  },
];

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
        docs: testProducts,
      })
    );
  }),
  rest.get("/api/users/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        address: "asdfblaslf",
        cart: {
          products: {},
          count: 0,
          shipping: 0,
          itemTotal: 0,
          taxPercent: 8,
          total: 0,
        },
        email: "beniamino@gmail.com",
        firstName: "Beniamino",
        lastName: "Tartarini",
        name: "Beniamino Tartarini",
        orders: ["5f2831b0c32e65336d3f0bfd", "5f2953b042729163191c198b"],
        phone: "5456564564564",
        profileImageUrl:
          "http://pbs.twimg.com/profile_images/1274906565967966208/jbQouO38_normal.jpg",
        _id: "5f282b89754c312c3da2dcaa",
      })
    );
  }),
  rest.get("/api/users/orders/:id", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          date: "2020-08-03T15:48:00.923Z",
          itemTotal: 4958,
          products: {
            testProduct1: testProducts[0],
            testProduct2: testProducts[1],
          },
          shipping: 0,
          taxPercent: 8,
          total: 648,
          user: "5f282b89754c312c3da2dcaa",
          _id: "5f2831b0c32e65336d3f0bf1",
        },
        {
          date: "2020-08-03T15:48:00.923Z",
          itemTotal: 4958,
          products: {
            testProduct3: testProducts[2],
          },
          shipping: 0,
          taxPercent: 8,
          total: 1062,
          user: "5f282b89754c312c3da2dcaa",
          _id: "5f2831b0c32e65336d3f0bfd",
        },
      ])
    );
  }),
];
