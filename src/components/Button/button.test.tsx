import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonSize, ButtonType } from './button';

const buttonProps = {
  onClick: jest.fn()
}

const disabledProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('default Button', () => {
  it('should render correct default button', () => {
    const wrapper = render(<Button>Default</Button>)
    const button = wrapper.getByText('Default') as HTMLButtonElement
    expect(button).toBeInTheDocument()
    expect(button.tagName).toEqual('BUTTON')
    expect(button).toHaveClass('btn btn-default')
    expect(button.disabled).toBeFalsy()
  })

  it('should handle onClick event correctly', () => {
    const wrapper = render(<Button {...buttonProps}>Default</Button>)
    const button = wrapper.getByText('Default')
    fireEvent.click(button)
    expect(buttonProps.onClick).toHaveBeenCalled()
  })
})

describe('different sizes for Button', () => {
  it('should render a large button with correct props', () => {
    const wrapper = render(<Button size={ButtonSize.Large}>Large</Button>)
    const button = wrapper.getByText('Large')
    expect(button).toHaveClass('btn btn-default btn-lg')
  })

  it('should render a small button with correct props', () => {
    const wrapper = render(<Button size={ButtonSize.Small}>Small</Button>)
    const button = wrapper.getByText('Small')
    expect(button).toHaveClass('btn btn-default btn-sm')
  })
})

describe('different types for Button', () => {
  it('should render a Primary button', () => {
    const wrapper = render(<Button btnType={ButtonType.Primary}>Primary</Button>)
    const button = wrapper.getByText('Primary')
    expect(button).toHaveClass('btn btn-primary')
  })
})

describe('disabled Button', () => {
  const wrapper = render(<Button {...disabledProps}>Disabled</Button>)
  const button = wrapper.getByText('Disabled') as HTMLButtonElement

  it('should render disabled button', () => {
    expect(button.disabled).toBeTruthy()
  })

  it('should not be able to be clicked', () => {
    fireEvent.click(button)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})

describe('link Button', () => {
  it('should render a link when button type is link and href is provided', () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href='www.google.com' >Link</Button>)
    const button = wrapper.getByText('Link')
    expect(button).toBeInTheDocument()
    expect(button.tagName).toEqual("A")
    expect(button).toHaveClass('btn btn-link')
  })
})
