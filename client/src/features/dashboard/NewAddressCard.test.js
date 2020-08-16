import React from "react";
import {
  render,
  cleanup,
  waitFor,
  act,
  waitForElementToBeRemoved,
  fireEvent,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../app/store";
import { server } from "../../mocks/server";
import { MemoryRouter } from "react-router-dom";
import { fetchAuthState } from "../auth/authSlice";
import { fetchUser } from "./dashboardSlice";
import NewAddressCard from "./NewAddressCard";
import ShippingAddressList from "./ShippingAddressList";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);

describe("MyProfile tests", () => {
  let getByText, getByTestId, getByLabelText, getByRole, queryByText;

  describe("Content loaded", () => {
    describe("New address interface", () => {
      beforeEach(async () => {
        await store.dispatch(fetchAuthState());
        await store.dispatch(fetchUser());
        return ({
          getByText,
          getByTestId,
          getByLabelText,
          getByRole,
          queryByText,
        } = render(
          <Provider store={store}>
            <NewAddressCard />
            <ShippingAddressList />
          </Provider>,
          { wrapper: MemoryRouter }
        ));
      });
      test("Form is hidden on first render", () => {
        expect(getByTestId("user-info-form")).not.toBeVisible();
      });
      test("Form is visible after checkbox click", () => {
        fireEvent.click(getByRole("checkbox"));
        expect(getByTestId("user-info-form")).toBeVisible();
      });
      test("Clicking submit on a correctly filled up form creates a new address card", async () => {
        userEvent.type(
          getByLabelText("First Name").firstChild,
          "TestFirstName"
        );
        userEvent.type(getByLabelText("Last Name").firstChild, "TestLastName");
        userEvent.type(
          getByLabelText("Email").firstChild,
          "testEmail@gmail.com"
        );
        userEvent.type(getByLabelText("Phone Number").firstChild, "123456789");
        userEvent.type(getByLabelText("Street").firstChild, "TestStreet");
        userEvent.type(getByLabelText("City").firstChild, "TestCity");

        userEvent.type(
          getByLabelText("State / Province").firstChild,
          "TestState"
        );
        userEvent.type(getByLabelText("Postcode").firstChild, "59100");
        await waitFor(() =>
          fireEvent.change(getByTestId("testid-country"), {
            target: { value: "IT" },
          })
        );
        expect(queryByText(/newTestCity/i)).toBe(null);
        fireEvent.click(getByText(/submit/i));
        await waitFor(() => expect(getByText(/newTestCity/i)).toBeDefined());
      });
      test("Clicking delete on an address card removes it from the viewport", async () => {
        expect(getByText(/testcity/i)).toBeDefined();
        fireEvent.click(getByText(/delete/i));
        await waitForElementToBeRemoved(() => getByText(/testcity/i));
      });
      test("Clicking reset resets the form contents", () => {
        const firstNameInput = getByLabelText("First Name").firstChild;
        userEvent.type(firstNameInput, "TestFirstName");
        expect(firstNameInput.value).toBe("TestFirstName");
        fireEvent.click(getByText(/reset/i));
        expect(firstNameInput.value).toBe("");
      });
    });
  });
});
