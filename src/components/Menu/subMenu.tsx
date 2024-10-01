import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface ISubMenuProps {
  index?: string;
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

  useEffect(() => {
    if(context.mode === 'vertical') {
      setMenuOpened(true)
    }
  }, [])

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
    let parentIndex = index
    const childrenComponents = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if(childElement.type.name === "MenuItem") {
        return React.cloneElement(childElement, { parentIndex,  index: `${parentIndex}-${index}` })

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
