import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

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
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.activeIndex === index
  })

  const renderchildren = () => {
    const childrenComponents = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<ISubMenuProps>
      if(childElement.type.name === "MenuItem") {
        return childElement
      }
      console.error('Warning: SubMenu has a child which is not a MenuItem component')
    })

    return(
      <ul className="submenu">
        { childrenComponents }
      </ul>
    )
  }

  return (
    <li key={index} className={classes}>
      <div className="submenu-title">
        {title}
      </div>
      { renderchildren() }
    </li>
  )
}

export default SubMenu
