import { ComponentMeta, ComponentStory } from "@storybook/react";
import SeqViz from "../SeqViz/SeqViz";
import React = require("react");

export default {
  title: "SeqViz Story",
  component: SeqViz,
} as ComponentMeta<typeof SeqViz>;

const Template: ComponentStory<typeof SeqViz> = args => <SeqViz {...args} />;

export const Demo = Template.bind({});
Demo.args = {
  primary: true,
  label: "SeqViz",
};
