import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <h1>DiComponents</h1>
        {/** Button Component */}
        <div>
          <h3>Buttons</h3>
          <Button>Hello Button</Button>
          <Button disabled>Disabled Button</Button>
          <Button size={ButtonSize.Large}>Large Button</Button>
          <Button size={ButtonSize.Small}>Small Button</Button>
          <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Primary Button</Button>
          <Button btnType={ButtonType.Danger}>Danger Button</Button>
          <Button btnType={ButtonType.Link} href="https://www.google.com" target='_blank'>Link Button</Button>
          <Button btnType={ButtonType.Link} href="https://www.google.com" disabled>Disabled Link Button</Button>
        </div>

        {/** Menu component */}
        <div>
          <h2>Menu</h2>
          <div>
            <h3>Horizontal Menu</h3>
            <div>
              <h4>Simple Horizontal Menu (click MenuItem to see its index)</h4>
              <Menu defaultIndex='0' onSelect={(index)=> {alert(index)}}>
                <MenuItem>Menu Item 1</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
                <MenuItem>Menu Item 3</MenuItem>
              </Menu>
            </div>
            <div>
              <h4>Horizontal Menu with Sub Menu (click MenuItem to see its index)</h4>
              <Menu defaultIndex='0' onSelect={(index)=> {alert(index)}}>
                <MenuItem>Menu Item 1</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
                <SubMenu title='Dropdown'>
                  <MenuItem>Dropdown item 1</MenuItem>
                  <MenuItem>Dropdown Item 2</MenuItem>
                </SubMenu>
                <MenuItem>Menu Item 3</MenuItem>
              </Menu>
            </div>
          </div>
          <div>
            <h3>Vertical Menu</h3>
            <div>
              <h4>Simple Vertical Menu (click MenuItem to see its index)</h4>
              <Menu defaultIndex='0' mode='vertical' onSelect={(index)=> {alert(index)}}>
                <MenuItem index='0'>Menu Item 1</MenuItem>
                <MenuItem index='0'>Menu Item 2</MenuItem>
                <MenuItem index='2'>Menu Item 3</MenuItem>
              </Menu>
            </div>
            <div>
              <h4>Vertical Menu with Sub Menu (click MenuItem to see its index)</h4>
              <Menu defaultIndex='0' mode='vertical' onSelect={(index)=> {alert(index)}}>
                <MenuItem>Menu Item 1</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
                <SubMenu title='Dropdown'>
                  <MenuItem>Dropdown item 1</MenuItem>
                  <MenuItem>Dropdown Item 2</MenuItem>
                </SubMenu>
                <SubMenu title='Another Dropdown'>
                  <MenuItem>Another Dropdown item 1</MenuItem>
                  <MenuItem>Another Dropdown Item 2</MenuItem>
                  <MenuItem>Another Dropdown Item 3</MenuItem>
                </SubMenu>
                <MenuItem>Menu Item 3</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
