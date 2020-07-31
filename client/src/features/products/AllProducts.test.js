import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import AllProducts from "./AllProducts";
import store from "../../app/store";
import { server } from "../../mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);

describe("AllProducts tests", () => {
  let getByText, getByTestId, getAllByText;
  beforeEach(() => {
    return ({ getByText, getByTestId, getAllByText } = render(
      <Provider store={store}>
        <AllProducts />
      </Provider>
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
});
