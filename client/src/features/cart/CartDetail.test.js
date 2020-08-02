import React from "react";
import { render, cleanup, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/store";
import { server } from "../../mocks/server";
import { MemoryRouter } from "react-router-dom";
import CartDetail from "./CartDetail";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);

describe("AllProducts tests", () => {
  let getByText, getByTestId, getAllByText;
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
