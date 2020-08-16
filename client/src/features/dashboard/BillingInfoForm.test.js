import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/store";
import { server } from "../../mocks/server";
import { MemoryRouter } from "react-router-dom";
import { fetchAuthState } from "../auth/authSlice";
import { fetchUser } from "./dashboardSlice";
import BillingInfoForm from "./BillingInfoForm";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);

describe("BillingInfoForm tests", () => {
  let getByText, getByTestId, getByLabelText;

  beforeEach(async () => {
    await store.dispatch(fetchAuthState());
    await store.dispatch(fetchUser());
  });
  describe("Content loaded", () => {
    beforeEach(() => {
      return ({ getByText, getByTestId, getByLabelText } = render(
        <Provider store={store}>
          <BillingInfoForm />
        </Provider>,
        { wrapper: MemoryRouter }
      ));
    });
    describe("Billing data form", () => {
      test("Component shows billing form after successful fetch", () => {
        expect(getByLabelText("billing-info-form")).toBeDefined();
      });
      test("Billing data form is disabled on first render", () => {
        expect(getByTestId(/testid-firstName/gi).firstChild).toBeDisabled();
      });
      test("Billing data form is enabled after clicking edit", async () => {
        await fireEvent.click(getByText(/edit/gi));
        expect(getByTestId(/testid-firstName/gi).firstChild).not.toBeDisabled();
      });
      test("Billing data form is disabled after canceling edit", async () => {
        await fireEvent.click(getByText(/edit/gi));
        await fireEvent.click(getByText(/cancel/gi));
        expect(getByTestId(/testid-firstName/gi).firstChild).toBeDisabled();
      });
      test("Billing data form gets updated after modifying data and clicking update", async () => {
        await fireEvent.click(getByText(/edit/gi));
        const input = getByTestId(/testid-firstName/gi).firstChild;
        await fireEvent.change(input, { target: { value: "Testchange" } });
        expect(input.value).toBe("Testchange");
      });
    });
  });
});
