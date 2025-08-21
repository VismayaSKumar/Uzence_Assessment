
import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";
import type { InputFieldProps } from "./InputField";

const meta: Meta<InputFieldProps> = {
  title: "Components/InputField",
  component: InputField,
  args: {
    label: "Input Label",
    placeholder: "Enter text",
    variant: "outlined",
    size: "md",
    clearable: false,
    showPasswordToggle: false,
    disabled: false,
    loading: false,
    invalid: false,
  },
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["filled", "outlined", "ghost"],
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    type: {
      control: { type: "radio" },
      options: ["text", "password"],
    },
  },
};

export default meta;

type Story = StoryObj<InputFieldProps>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    helperText: "This is some helper text",
  },
};

export const WithError: Story = {
  args: {
    invalid: true,
    errorMessage: "This field is required",
  },
};

export const Clearable: Story = {
  args: {
    value: "Clear me",
    clearable: true,
  },
};

export const PasswordField: Story = {
  args: {
    label: "Password",
    type: "password",
    showPasswordToggle: true,
  },
};

export const Loading: Story = {
  args: {
    label: "Loading Input",
    loading: true,
    value: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    disabled: true,
    value: "You can't edit me",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <InputField label="Outlined" variant="outlined" placeholder="Outlined input" />
      <InputField label="Filled" variant="filled" placeholder="Filled input" />
      <InputField label="Ghost" variant="ghost" placeholder="Ghost input" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <InputField label="Small" size="sm" placeholder="Small input" />
      <InputField label="Medium" size="md" placeholder="Medium input" />
      <InputField label="Large" size="lg" placeholder="Large input" />
    </div>
  ),
};
