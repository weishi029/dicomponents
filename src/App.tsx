import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

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
          <h3>Menu</h3>
          <Menu defaultIndex={0}>
            <MenuItem index={0}>Menu Item 1</MenuItem>
            <MenuItem index={1}>Menu Item 2</MenuItem>
            <MenuItem index={2}>Menu Item 3</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default App;
