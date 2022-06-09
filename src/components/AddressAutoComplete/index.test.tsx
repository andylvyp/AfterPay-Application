/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddressAutoComplete, { FormInfoProps } from ".";
  
describe("AddressAutoComplete Component", () => {
    afterEach(() => jest.clearAllMocks());
  
    it("show/hide form when clicking the button", () => {
        const mockUpdateValue = jest.fn();
        render(
            <AddressAutoComplete updateValue={mockUpdateValue} />,
        );
  
        const editButton = screen.getByTestId("autocomplete-edit-button");
        const hiddenForm = screen.queryAllByTestId("autocomplete-form");
        expect(hiddenForm).toHaveLength(0);

        fireEvent.click(editButton);
        const visibleForm = screen.queryAllByTestId("autocomplete-form");
        expect(visibleForm).toHaveLength(1);

        const backButton = screen.getByTestId("autocomplete-back-button");
        fireEvent.click(backButton);
        const hiddenFormAgain = screen.queryAllByTestId("autocomplete-form");
        expect(hiddenFormAgain).toHaveLength(0);
    });

    it("the value is changed when filling in the form", async () => {
        const mockUpdateValue = jest.fn();
        
        render(
            <AddressAutoComplete updateValue={mockUpdateValue} />,
        );
  
        const editButton = screen.getByTestId("autocomplete-edit-button");
        fireEvent.click(editButton);
        const inputStreet = screen.getByTestId("autocomplete-input-street");
        fireEvent.input(inputStreet, { target: { value: "target" } });
        const inputZip = screen.getByTestId("autocomplete-input-zip");
        fireEvent.input(inputZip, { target: { value: "11111" } });
        const inputCity = screen.getByTestId("autocomplete-input-city");
        fireEvent.input(inputCity, { target: { value: "test" } });
        const inputCountry = screen.getByTestId("autocomplete-input-country");
        fireEvent.input(inputCountry, { target: { value: "mock" } });
        const submitButton = screen.getByTestId("autocomplete-form-submit");

        fireEvent.submit(submitButton);
        const dataTemp : FormInfoProps = {"address-autocomplete": "", street: "target", zip: "11111", city: "test", country: "mock"};
        await waitFor(() => {
            expect(mockUpdateValue).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(mockUpdateValue).toHaveBeenCalledWith(dataTemp);
        });
        
    });
});