import React, { useState, createContext, ReactNode } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void

export interface IMenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  children?: React.ReactNode;
}

interface IMenuContext {
  activeIndex: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({ activeIndex: 0 })

const Menu: React.FC<IMenuProps> = ({
  defaultIndex = 0,
  className,
  mode = 'horizontal',
  style,
  onSelect,
  children,
  ...restProps
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
  })

  const handleClick = (index: number) => {
    setActiveIndex(index)
    if(onSelect) {
      onSelect(index)
    }
  }

  const menuContext: IMenuContext = {
    activeIndex: activeIndex,
    onSelect: handleClick,
  }

  const renderChilren = (children: ReactNode) => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const displayName = childElement.type.name
      if(displayName === 'MenuItem') {
        //return child
        return React.cloneElement(childElement, { index })
      }
      console.error('Warning: Menu has a child which is not a MenuItem component')
    })
  }

  return (
    <ul className={classes} style={style} {...restProps} data-testid='test-menu'>
      <MenuContext.Provider value={menuContext}>
        {renderChilren(children)}
      </MenuContext.Provider>
    </ul>
  )
}

export default Menu