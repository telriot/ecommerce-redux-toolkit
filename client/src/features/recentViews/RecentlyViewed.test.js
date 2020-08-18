import React from "react";
import { render, cleanup, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../app/store";
import RecentlyViewed from "./RecentlyViewed";
import { server } from "../../mocks/server";
import { fetchAuthState } from "../auth/authSlice";
import { fetchUser } from "../dashboard/dashboardSlice";
import { fetchRecentViews } from "./recentViewsSlice";
import { testRecentlyViewed } from "../../mocks/data-models";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);

describe("RecentlyViewed tests", () => {
  let getByTestId, getAllByTestId, getAllByText;
  beforeEach(async () => {
    return ({ getByTestId, getAllByTestId, getAllByText } = render(
      <Provider store={store}>
        <RecentlyViewed maxItems={5} />
      </Provider>,
      { wrapper: MemoryRouter }
    ));
  });
  describe("Basic tests", () => {
    beforeEach(async () => {
      await store.dispatch(fetchAuthState());
      await store.dispatch(fetchUser());
      await store.dispatch(fetchRecentViews());
    });
    test("RecentlyViewed renders succesfully", () => {
      expect(getByTestId("component-recently-viewed")).toBeDefined();
    });
    test("The right number of items is rendered correctly", () => {
      expect(getAllByTestId("scroller-card").length).toBe(
        testRecentlyViewed.length
      );
    });
    test("Clicking on add to cart add the item to the user's cart", () => {
      expect(store.getState().cart.count).toBe(0);
      fireEvent.click(getAllByText(/add to cart/i)[0]);
      expect(store.getState().cart.count).toBe(1);
    });
  });
});
