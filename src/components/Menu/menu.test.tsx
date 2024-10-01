import React from 'react';
import Menu, { IMenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';
import { render, fireEvent, RenderResult, waitFor } from '@testing-library/react';

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

const renderTestMenuWithSubmenu = (props: IMenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <SubMenu title='Dropdown'>
        <MenuItem>Dropdown item 1</MenuItem>
        <MenuItem>Dropdown Item 2</MenuItem>
      </SubMenu>
      <MenuItem>Menu Item 3</MenuItem>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .submenu { display: none; }
    .submenu.menu-opened { display: block }
  `

  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile

  return style
}

let wrapper: RenderResult
let menuElement: HTMLElement
let activeMenuItem: HTMLElement
let disabledMenuItem: HTMLElement
let subMenuElement: HTMLElement

describe('horizontal Menu', () => {
  describe('without Sub Menu', () => {
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
      expect(testMenuProps.onSelect).toHaveBeenCalledWith("2")
    })

    it('should not change active item when disabled menu item is clicked', () => {
      fireEvent.click(disabledMenuItem)
      expect(disabledMenuItem).not.toHaveClass('is-active')
      expect(activeMenuItem).toHaveClass('is-active')
      expect(testMenuProps.onSelect).not.toHaveBeenCalled()
    })
  })

  describe('with Sub Menu', () => {
    beforeEach(() => {
      wrapper = render(renderTestMenuWithSubmenu(testMenuProps))
      wrapper.container.append(createStyleFile())
      menuElement = wrapper.getByTestId('test-menu')
      activeMenuItem = wrapper.getByText('active')
      subMenuElement = wrapper.getByTestId('test-sub-menu')
    })

    it('should render the menu', () => {
      expect(menuElement).toBeInTheDocument()
    })

    it('should have 3 li in the top level menu', () => {
      const liCount = menuElement.querySelectorAll(':scope > li').length
      expect(liCount).toEqual(3)
    })

    it('should have 2 li in the sub menu', () => {
      const liCount = subMenuElement.querySelectorAll(':scope > li').length
      expect(liCount).toEqual(2)
    })

    it('should show the submenu when mouse is hover on the submenu', async() => {
      const dropDownMenu = wrapper.getByText('Dropdown')
      expect(subMenuElement).not.toBeVisible()
      fireEvent.mouseEnter(dropDownMenu)
      await waitFor(() => {
        expect(subMenuElement).toBeVisible()
      })

      fireEvent.mouseLeave(dropDownMenu)
      await waitFor(() => {
        expect(subMenuElement).not.toBeVisible()
      })

    })

    it('should call the correct callback when sub menu item is clicked', () => {
      const subMenuItem = subMenuElement.querySelectorAll(':scope > li')[0]
      fireEvent.click(subMenuItem)
      expect(subMenuItem).toHaveClass('menu-item is-active')
      expect(testMenuProps.onSelect).toHaveBeenCalledWith("1-0")
    })
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
