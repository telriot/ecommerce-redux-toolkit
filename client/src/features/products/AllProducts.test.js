import React from "react";
import { render, cleanup, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import AllProducts from "./AllProducts";
import store from "../../app/store";
import { server } from "../../mocks/server";
import CartIcon from "../cart/CartIcon";
import { MemoryRouter } from "react-router-dom";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);

describe("AllProducts tests", () => {
  let getByText, getByTestId, getAllByText;
  beforeEach(() => {
    return ({ getByText, getByTestId, getAllByText } = render(
      <Provider store={store}>
        <CartIcon />
        <AllProducts />
      </Provider>,
      { wrapper: MemoryRouter }
    ));
  });
  test("AllProducts renders succesfully", () => {
    expect(getByTestId("component-allproducts")).toBeDefined();
  });
  test("The right number of products is rendered", async () => {
    await waitFor(() => {
      expect(getAllByText(/testProduct/)).toHaveLength(2);
    });
  });
  test("Clicking on Add to Cart updates CartIcon", async () => {
    expect(getByText(/Items in cart/gi)).toHaveTextContent("Items in Cart: 0");
    let button;
    await waitFor(() => {
      button = getAllByText(/add to cart/gi)[0];
    });
    fireEvent.click(button);
    expect(getByText(/Items in cart/gi)).toHaveTextContent("Items in Cart: 1");
  });
});
