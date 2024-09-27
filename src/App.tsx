import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DiComponents</h1>
        <div>
          <h3>Buttons</h3>
          <Button>Hello Button</Button>
          <Button disabled>Disabled Button</Button>
          <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Primary Button</Button>
          <Button btnType={ButtonType.Link} href="https://www.google.com">Link Button</Button>
          <Button btnType={ButtonType.Link} href="https://www.google.com" disabled>Disabled Link Button</Button>
        </div>

      </header>
    </div>
  );
}

export default App;
