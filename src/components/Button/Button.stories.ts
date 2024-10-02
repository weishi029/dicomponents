import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button, { ButtonSize, ButtonType } from './button';


type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button>
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {

  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {

  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  name: 'Default Button',
  args: {
    children: "Default"
  }
}

export const DefaultDisabled: Story = {
  name: 'Default Button Disabled',
  args: {
    disabled: true,
    children: "Default"
  }
}

export const Large: Story = {
  name: 'Default Button Large',
  args: {
    size: ButtonSize.Large,
    children: "Large"
  }
}

export const Small: Story = {
  name: 'Default Button Small',
  args: {
    size: ButtonSize.Small,
    children: "Small"
  }
}

export const Primary: Story = {
  name: 'Primary Button',
  args: {
    btnType: ButtonType.Primary,
    children: "Primary"
  }
}

export const Danger: Story = {
  name: 'Button Danger',
  args: {
    btnType: ButtonType.Danger,
    children: "Danger"
  }
}

export const Link: Story = {
  name: 'Button Link',
  args: {
    btnType: ButtonType.Link,
    children: "Link"
  }
}

export const LinkDisabled: Story = {
  name: 'Button Link Disabled',
  args: {
    btnType: ButtonType.Link,
    disabled: true,
    children: "Link"
  }
}
