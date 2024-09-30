import React from 'react';
import Menu, { IMenuProps } from './menu';
import MenuItem from './menuItem';
import { render, fireEvent, RenderResult } from '@testing-library/react';

const testMenuProps: IMenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test-class'
}

const testVerticalMenuProps: IMenuProps = {
  ...testMenuProps,
  mode: 'vertical'
}

const renderTestMenu = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem> MenuItem3</MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult
let menuElement: HTMLElement
let activeMenuItem: HTMLElement
let disabledMenuItem: HTMLElement

describe('horizontal Menu', () => {
  beforeEach(() => {
    wrapper = render(renderTestMenu(testMenuProps))
    menuElement = wrapper.getByTestId('test-menu')
    activeMenuItem = wrapper.getByText('active')
    disabledMenuItem = wrapper.getByText('disabled')
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test-class')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeMenuItem).toHaveClass('menu-item is-active')
    expect(disabledMenuItem).toHaveClass('menu-item is-disabled')
  })

  it('should call the correct callback and change active MenuItem when MenuItem is clicked', () => {
    const menuItem = wrapper.getByText('MenuItem3')
    fireEvent.click(menuItem)
    expect(menuItem).toHaveClass('is-active')
    expect(activeMenuItem).not.toHaveClass('is-active')
    expect(testMenuProps.onSelect).toHaveBeenCalledWith(2)
  })

  it('should not change active item when disabled menu item is clicked', () => {
    fireEvent.click(disabledMenuItem)
    expect(disabledMenuItem).not.toHaveClass('is-active')
    expect(activeMenuItem).toHaveClass('is-active')
    expect(testMenuProps.onSelect).not.toHaveBeenCalled()
  })
})

describe('vertical Menu', () => {
  beforeEach(() => {
    wrapper = render(renderTestMenu(testVerticalMenuProps))
    menuElement = wrapper.getByTestId('test-menu')
  })
  it('should render correct vertial Menu', () => {
    expect(menuElement).toHaveClass('menu menu-vertical')
  })
})
