import React from "react";
import {
  render,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/store";
import { server } from "../../mocks/server";
import { MemoryRouter } from "react-router-dom";
import { fetchAuthState } from "../auth/authSlice";
import MyOrders from "./MyOrders";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);

describe("MyOrders tests", () => {
  let getByText, getByTestId, getAllByTestId, queryByText;

  beforeEach(async () => {
    store.dispatch(fetchAuthState());
    return ({
      getByText,
      getAllByTestId,
      getByTestId,
      queryByText,
      getByLabelText,
    } = render(
      <Provider store={store}>
        <MyOrders />
      </Provider>,
      { wrapper: MemoryRouter }
    ));
  });
  describe("My orders tests", () => {
    beforeEach(async () => {
      fireEvent.click(getByText(/my orders/gi));
      await waitForElementToBeRemoved(() => queryByText(/loading/gi));
    });
    test("My order form renders correctly", () => {
      expect(getByTestId("my-orders-component")).toBeDefined();
    });
    test("The right amount of items is displayed", async () => {
      await waitFor(() => expect(getAllByTestId("order-item")).toHaveLength(2));
    });
    test("Display extra information on expand button click", () => {
      fireEvent.click(getAllByTestId("order-expand-button")[0]);
      expect(getByText(/testproduct2/gi)).toBeDefined();
    });
  });
});
