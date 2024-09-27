import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

const Button: React.FC<BaseButtonProps> = ({
  className = 'btn',
  disabled = false,
  size,
  btnType = ButtonType.Default,
  children,
  href
}) => {
  // has default 'btn' class
  // add extra classes based on button type (btn-primary), size (btn-lg)
  const classes = classNames(className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': btnType === ButtonType.Link && disabled
  })

  if(btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled}>
        {children}
      </button>
    )
  }
}

export default Button
