import React from 'react';
import classNames from 'classnames';

interface MenuItemProps {
  index: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({
  index,
  disabled=false,
  className,
  style,
  children
}) => {
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
  })

  return (
    <li className={classes} style={style}>
      {children}
    </li>
  )
}

export default MenuItem