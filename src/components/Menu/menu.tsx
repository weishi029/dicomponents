import React from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical'

interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void;
  children: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({
  defaultIndex = 0,
  className,
  mode = 'horizontal',
  style,
  onSelect,
  children,
  ...restProps
}) => {

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
  })

  return (
    <ul className={classes} style={style} {...restProps}>
      {children}
    </ul>
  )
}

export default Menu