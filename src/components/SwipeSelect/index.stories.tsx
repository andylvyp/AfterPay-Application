import React from "react";
import SwipeSelect from ".";
import { ComponentStory } from "@storybook/react";

export default {
    title: "SwipeSelect",
    component: SwipeSelect,
    argTypes: {
        updateValue: {
            action: "value changed"
        }
    }
};

const Template: ComponentStory<typeof SwipeSelect> = (args) => {
    return (
        <SwipeSelect {...args}/>
    );};

export const Primary = Template.bind({});

Primary.args = { initialIndex: 3, theme: "green", fontSize: "lg"};