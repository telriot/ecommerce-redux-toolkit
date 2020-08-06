import React from "react";
import {
  render,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
  screen,
  getByLabelText,
  findByText,
} from "@testing-library/react";
import { Provider } from "react-redux";
import Dashboard from "./Dashboard";
import store from "../../app/store";
import { server } from "../../mocks/server";
import { MemoryRouter } from "react-router-dom";
import { fetchAuthState } from "../auth/authSlice";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);

describe("Dashboard tests", () => {
  let getByText, getByTestId, getAllByTestId, getByLabelText, queryByText;

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
        <Dashboard />
      </Provider>,
      { wrapper: MemoryRouter }
    ));
  });
  test("Dashboard component renders correctly", () => {
    expect(getByTestId("component-dashboard")).toBeDefined();
  });
  test("Component shows billing information card on start", () => {
    expect(getByText(/billing information/gi)).toBeDefined();
  });
  test("Component shows loading message while fetching billing information", () => {
    expect(getByText(/loading/gi)).toBeDefined();
  });
  describe("Content loaded", () => {
    beforeEach(async () => {
      await waitForElementToBeRemoved(() => queryByText(/loading/gi));
    });
    test("Component shows billing form after successful fetch", () => {
      expect(getByLabelText("billing-info-form")).toBeDefined();
    });
    test("Address form is disabled on first render", () => {
      expect(getByTestId(/testid-firstName/gi).firstChild).toBeDisabled();
    });
    test("Address form is enabled after clicking edit", async () => {
      await fireEvent.click(getByText(/edit/gi));
      expect(getByTestId(/testid-firstName/gi).firstChild).not.toBeDisabled();
    });
    test("Address form is disabled after canceling edit", async () => {
      await fireEvent.click(getByText(/edit/gi));
      await fireEvent.click(getByText(/cancel/gi));
      expect(getByTestId(/testid-firstName/gi).firstChild).toBeDisabled();
    });
    test("Address form gets updated after modifying data and clicking update", async () => {
      await fireEvent.click(getByText(/edit/gi));
      const input = getByTestId(/testid-firstName/gi).firstChild;
      await fireEvent.change(input, { target: { value: "Testchange" } });
      expect(input.value).toBe("Testchange");
    });
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
