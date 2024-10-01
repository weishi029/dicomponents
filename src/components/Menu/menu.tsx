import React, { useState, createContext } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface IMenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  children?: React.ReactNode;
}

interface IMenuContext {
  activeIndex: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
}

export const MenuContext = createContext<IMenuContext>({
  activeIndex: '0',
})

const Menu: React.FC<IMenuProps> = ({
  defaultIndex = '0',
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
    'menu-horizontal': mode !== 'vertical',
  })

  const handleClick = (index: string) => {
    setActiveIndex(index)
    if(onSelect) {
      onSelect(index)
    }
  }

  const menuContext: IMenuContext = {
    activeIndex: activeIndex,
    onSelect: handleClick,
    mode: mode,
  }

  const renderChilren = (children: React.ReactNode) => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const displayName = childElement.type.name
      if(displayName === 'MenuItem' || displayName === "SubMenu") {
        return React.cloneElement(childElement, { index: index.toString() })
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