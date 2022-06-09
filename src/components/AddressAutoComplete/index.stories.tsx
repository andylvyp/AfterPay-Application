import React from "react";
import AddressAutoComplete from ".";
import { ComponentStory } from "@storybook/react";

export default {
    title: "AddressAutoComplete",
    component: AddressAutoComplete,
    argTypes: {
        updateValue: {
            action: "value changed"
        }
    }
};

const Template: ComponentStory<typeof AddressAutoComplete> = (args) => <AddressAutoComplete {...args} />;

export const Primary = Template.bind({});
Primary.args = { fontSize: "lg" };