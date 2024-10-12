import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button, { ButtonSize, ButtonType } from './button';


type ButtonPropsAndCustomArgs = React.ComponentProps<typeof Button>
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: 'Component/Button',
  component: Button,
  parameters: {

  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      options: ['default',ButtonSize.Large, ButtonSize.Small],
      control: { type: 'radio' },
    },
    disabled: {
      options: [false, true],
      control: { type: 'radio'}
    },
    btnType: {
      options: [ButtonType.Default, ButtonType.Primary, ButtonType.Danger, ButtonType.Link],
      control: { type: 'radio'}
    },
    href: {
      options: [null, 'https://www.google.com'],
      control: { type: 'radio'}
    }

  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  name: 'Button',
  args: {
    btnType: ButtonType.Primary,
    children: "Button"
  }
}
