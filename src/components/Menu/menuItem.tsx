import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  parentIndex?: string;
  children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({
  index,
  parentIndex,
  disabled=false,
  className,
  style,
  children
}) => {
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.activeIndex === index
  })

  const handleClick = () => {
    if(context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

export default MenuItem