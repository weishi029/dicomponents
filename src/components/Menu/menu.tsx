import React, { useState, createContext } from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void

interface IMenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  children: React.ReactNode;
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

  return (
    <ul className={classes} style={style} {...restProps}>
      <MenuContext.Provider value={menuContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

export default Menu