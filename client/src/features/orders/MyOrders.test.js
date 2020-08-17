import React from "react";
import {
  render,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
  findByLabelText,
  screen,
  findByTestId,
  getByLabelText,
} from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/store";
import { server } from "../../mocks/server";
import { MemoryRouter } from "react-router-dom";
import { fetchAuthState } from "../auth/authSlice";
import { fetchUser } from "../dashboard/dashboardSlice";
import MyOrders from "./MyOrders";
import { fetchOrders } from "./ordersSlice";
jest.mock("./OrdersSelect.js");

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);

describe("MyOrders tests", () => {
  let getByText,
    getByTestId,
    getAllByTestId,
    queryByText,
    queryAllByText,
    getByRole;
  describe("After fetch", () => {
    beforeEach(async () => {
      await store.dispatch(fetchAuthState());
      await store.dispatch(fetchUser());
      await store.dispatch(fetchOrders(store.getState().auth.user._id));

      return ({
        getByText,
        getAllByTestId,
        getByTestId,
        queryByText,
        queryAllByText,
        getByRole,
      } = render(
        <Provider store={store}>
          <MyOrders />
        </Provider>,
        { wrapper: MemoryRouter }
      ));
    });

    test("My order form renders correctly", () => {
      expect(getByTestId("my-orders-component")).toBeDefined();
    });
    test("The right amount of items is displayed", async () => {
      expect(getAllByTestId("order-item")).toHaveLength(2);
    });
    test("The order text filter works", async () => {
      expect(queryAllByText(/test product 2/i)).toHaveLength(1);
      fireEvent.change(getByTestId("text-filter-input").firstChild, {
        target: { value: "NotATest" },
      });
      fireEvent.click(getByText(/search/i));
      await waitFor(() =>
        expect(queryAllByText(/test product 2/i)).toHaveLength(0)
      );
      fireEvent.change(getByTestId("text-filter-input").firstChild, {
        target: { value: "" },
      });
    });
    test("The order period filter works", async () => {
      expect(queryAllByText(/test product 2/i)).toHaveLength(1);
      fireEvent.change(getByTestId("period-select"), { target: { value: 4 } });
      await waitFor(() => fireEvent.click(getByText(/search/i)));
      await waitFor(() =>
        expect(queryAllByText(/test product 2/i)).toHaveLength(0)
      );
      fireEvent.change(getByTestId("period-select"), { target: { value: "" } });
      await waitFor(() => fireEvent.click(getByRole("button")));
    });
    test("The order status filter works", async () => {
      expect(queryAllByText(/test product 2/i)).toHaveLength(1);
      fireEvent.change(getByTestId("status-select"), {
        target: { value: "delivered" },
      });
      await waitFor(() => fireEvent.click(getByText(/search/i)));
      await waitFor(() =>
        expect(queryAllByText(/test product 2/i)).toHaveLength(0)
      );
    });
  });
});
