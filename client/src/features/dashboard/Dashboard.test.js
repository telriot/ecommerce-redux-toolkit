import React from "react";
import {
  render,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
  screen,
  getByLabelText,
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
  let getByText, getByTestId, getAllByText, getByLabelText, queryByText;

  beforeEach(async () => {
    store.dispatch(fetchAuthState());
    return ({
      getByText,
      getByTestId,
      getAllByText,
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
  test("Component shows billing form after successful fetch", async () => {
    await waitForElementToBeRemoved(() => queryByText(/loading/gi));
    expect(getByLabelText("billing-info-form")).toBeDefined();
  });
  test("Address form is disabled on first render", () => {});
  test("Address form is enabled after clicking edit", () => {});
  test("Address form is disabled after canceling edit", () => {});
  test("Address form gets updated after modifying data and clicking update", () => {});
  describe("My orders tests", () => {
    test("My order form renders correctly", () => {});
  });
});
