import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/store";
import { server } from "../../mocks/server";
import { MemoryRouter } from "react-router-dom";
import { fetchAuthState } from "../auth/authSlice";
import { fetchUser } from "../dashboard/dashboardSlice";
import { fetchWishlistItems } from "../wishlist/wishlistSlice";
import Wishlist from "./Wishlist";
import { testWishlist } from "../../mocks/data-models";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);

describe("Wishlist tests", () => {
  let getAllByText, getByTestId, getAllByTestId;

  describe("After fetch", () => {
    beforeEach(async () => {
      await store.dispatch(fetchAuthState());
      await store.dispatch(fetchUser());
      await store.dispatch(fetchWishlistItems());

      return ({ getAllByText, getAllByTestId, getByTestId } = render(
        <Provider store={store}>
          <Wishlist />
        </Provider>,
        { wrapper: MemoryRouter }
      ));
    });

    test("Wishlist component renders correctly", () => {
      expect(getByTestId("wishlist-component")).toBeDefined();
    });
    test("The right amount of items is displayed", async () => {
      expect(getAllByTestId("wishlist-item")).toHaveLength(testWishlist.length);
    });
    test("Clicking on remove removes the wishlist item completely", () => {
      fireEvent.click(getAllByText(/remove/i)[0]);
      expect(getAllByTestId("wishlist-item").length).toBe(
        testWishlist.length - 1
      );
    });
    test("Clicking on add to cart removes the wishlist item completely", () => {
      fireEvent.click(getAllByText(/add to cart/i)[0]);
      expect(getAllByTestId("wishlist-item").length).toBe(
        testWishlist.length - 1
      );
      expect(store.getState().cart.count).toBe(1);
    });
  });
});
