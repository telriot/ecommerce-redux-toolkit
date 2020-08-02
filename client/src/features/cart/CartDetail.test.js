import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/store";
import { server } from "../../mocks/server";
import { MemoryRouter } from "react-router-dom";
import CartDetail from "./CartDetail";
import { productAdded, productsReset } from "./cartSlice";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);

describe("AllProducts tests", () => {
  let getByText, getByTestId, getAllByText, queryByText, getAllByLabelText;
  describe("Cart is empty", () => {
    beforeEach(() => {
      return ({ getByText, getByTestId, getAllByText } = render(
        <Provider store={store}>
          <CartDetail />
        </Provider>,
        { wrapper: MemoryRouter }
      ));
    });
    test("Cart renders succesfully", () => {
      expect(getByTestId("component-cart-detail")).toBeDefined();
    });
    test("Get notification on empty cart", () => {
      expect(getByText(/cart is empty/gi)).toBeDefined();
    });
  });
  describe("Cart is not empty", () => {
    beforeEach(() => {
      store.dispatch(productsReset());
      store.dispatch(
        productAdded({
          name: "testProduct1",
          price: "$100",
          description: "test product 1",
          quantity: 1,
          brand: "test brand 1",
          weight: 10,
          _id: "testid1",
        })
      );
      store.dispatch(
        productAdded({
          name: "testProduct2",
          price: "$200",
          description: "test product 2",
          quantity: 1,
          brand: "test brand 2",
          weight: 10,
          _id: "testid2",
        })
      );
      return ({
        getByText,
        getByTestId,
        getAllByText,
        queryByText,
        getAllByLabelText,
      } = render(
        <Provider store={store}>
          <CartDetail />
        </Provider>,
        { wrapper: MemoryRouter }
      ));
    });

    test("Cart items render correctly", () => {
      expect(getAllByText(/testproduct/gi)).toHaveLength(2);
    });
    test("Clicking on the add symbol increases the quantity by 1", () => {
      fireEvent.click(getAllByLabelText("increase")[0]);
      expect(getAllByLabelText("quantity")[0]).toHaveTextContent(2);
    });
    test("Clicking on the minus symbol decreases the quantity by 1", () => {
      fireEvent.click(getAllByLabelText("decrease")[0]);
      expect(getAllByLabelText("quantity")[0]).toHaveTextContent(0);
    });
    test("Remove button removes product", async () => {
      const removeBtn = getAllByText(/remove/gi)[0];
      fireEvent.click(removeBtn);
      expect(getAllByText(/testproduct/gi)).toHaveLength(1);
    });
    test("Reset Button resets products", () => {
      const resetBtn = getByText(/reset/gi);
      fireEvent.click(resetBtn);
      expect(queryByText(/testproduct/gi)).toBeNull();
    });
  });
});
