import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { hover } from '@testing-library/user-event/dist/hover';

export interface ISubMenuProps {
  index?: number;
  title: string;
  className?: string;
  children: React.ReactNode
}

const SubMenu: React.FC<ISubMenuProps> =({
  index,
  title,
  className,
  children
}) => {
  const context = useContext(MenuContext)
  const [menuOpened, setMenuOpened] = useState(false)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.activeIndex === index
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpened(!menuOpened)
  }

  let timer: any

  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault()
    clearTimeout(timer)
    timer = setTimeout(() => {
      setMenuOpened(toggle)
    }, 300)
  }

  const clickEvent = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvent = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouse(e, true)
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouse(e, false)
    }
  } : {}

  const renderchildren = () => {
    const childrenComponents = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<ISubMenuProps>
      if(childElement.type.name === "MenuItem") {
        return childElement
      }
      console.error('Warning: SubMenu has a child which is not a MenuItem component')
    })

    return(
      <ul className={ `submenu ${menuOpened ? 'menu-opened' : ''}` }>
        { childrenComponents }
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvent}>
      <div className="submenu-title" {...clickEvent}>
        {title}
      </div>
      { renderchildren() }
    </li>
  )
}

export default SubMenu
