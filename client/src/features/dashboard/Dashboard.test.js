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
});
