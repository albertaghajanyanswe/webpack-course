import React, { useState } from 'react';
import classes from './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import avatarPng from '@/assets/img.png';
import avatarJpg from '@/assets/img.jpg';
import AvatarSvg from '@/assets/img.svg';

function App() {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(prev => ++prev);

  return (
    <div className="App" data-testid='app'>
      App
      <h1 data-testid='platform'>{__PLATFORM__} - {__ENV__}</h1>
      <div>
        <h1>{counter}</h1>
        <button className={classes.button} onClick={increment}><span>Add</span></button>
      </div>
      <div>
        <img src={avatarPng} />
        <img src={avatarJpg} />
        <AvatarSvg />
      </div>
      <div className={classes.nav}>
        <Link to={'/about'}>About</Link>
        <Link to={'/shop'}>Shop</Link>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
