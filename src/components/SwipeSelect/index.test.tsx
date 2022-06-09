/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SwipeSelect from ".";
 
describe("SwipeSelect component", () => {
    beforeEach(() => jest.clearAllMocks());
    afterEach(() => jest.clearAllMocks());
 
    it("show/hide swiper when clicking on the component", () => {
        const mockUpdateValue = jest.fn();
        render(
            <SwipeSelect initialIndex={0} updateValue={mockUpdateValue} />,
        );
 
        const selectComponent = screen.getByTestId("swipe-select");
        const hiddenSwiper = screen.queryAllByTestId("swiper");
        expect(hiddenSwiper).toHaveLength(0);
        fireEvent.click(selectComponent);
        const visibleSwiper = screen.queryAllByTestId("swiper");
        expect(visibleSwiper).toHaveLength(1);
        expect(mockUpdateValue).toHaveBeenCalledTimes(1);
    });
});