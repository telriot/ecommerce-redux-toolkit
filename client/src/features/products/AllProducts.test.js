import React from "react";
import { render, cleanup, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../app/store";
import AllProducts from "./AllProducts";
import CartIcon from "../cart/CartIcon";
import { server } from "../../mocks/server";
import { fetchAuthState } from "../auth/authSlice";
import { fetchUser } from "../dashboard/dashboardSlice";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);

describe("AllProducts tests", () => {
  let getByTestId, getAllByTestId;
  beforeEach(() => {
    return ({ getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <CartIcon />
        <AllProducts />
      </Provider>,
      { wrapper: MemoryRouter }
    ));
  });
  describe("Basic tests", () => {
    test("AllProducts renders succesfully", () => {
      expect(getByTestId("component-allproducts")).toBeDefined();
    });
    test("The right number of products is rendered", async () => {
      await waitFor(() => {
        expect(getAllByTestId("product-card")).toHaveLength(8);
      });
    });

    test("Clicking on Add to Cart updates CartIcon", async () => {
      await waitFor(() => {
        expect(getAllByTestId("product-card")).toHaveLength(8);
      });
      fireEvent.click(getAllByTestId("add-to-cart-button")[0]);
      expect(getByTestId("cart-badge").lastChild.innerHTML).toBe("1");
      fireEvent.click(getAllByTestId("add-to-cart-button")[1]);
      expect(getByTestId("cart-badge").lastChild.innerHTML).toBe("2");
    });
  });

  describe("Tests for logged users", () => {
    beforeEach(async () => {
      await store.dispatch(fetchAuthState());
      await store.dispatch(fetchUser());
    });
    test("Clicking on the wishlist button adds item to the wishlist", () => {
      expect(store.getState().wishlist.wishlistItems.length).toBe(0);
      fireEvent.click(getAllByTestId("add-to-wishlist-button")[0]);
      expect(store.getState().wishlist.wishlistItems.length).toBe(1);
    });
    test("Clicking on the wishlist button adds item to the wishlist", () => {
      expect(store.getState().wishlist.wishlistItems.length).toBe(1);
      fireEvent.click(getAllByTestId("remove-from-wishlist-button")[0]);
      expect(store.getState().wishlist.wishlistItems.length).toBe(0);
    });
  });
  describe("Test product sorting", () => {
    test("The filter selects applies state changes correctly", async () => {
      await waitFor(() =>
        fireEvent.change(getByTestId("sort-selector"), {
          target: { value: "price" },
        })
      );
      expect(store.getState().products.sortOrder).toBe("price");
    });
  });
});
