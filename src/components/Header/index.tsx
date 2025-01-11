import React, { useState } from 'react';

import {
  StyledHeader,
  Nav,
  NavMenu,
  Logo,
  NavList,
  NavLink,
  BurgerMenu,
  NavListMobile,
} from './styles';

function Header() {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);

  const handleMenuToogle = () => {
    setBurgerMenuActive(!burgerMenuActive);
  };

  return (
    <StyledHeader>
      <Nav>
        <NavMenu>
          <Logo className="logo" />

          <NavList className="nav-list">
            <li>
              <NavLink>Home</NavLink>
            </li>
            <li>
              <NavLink>Event</NavLink>
            </li>
            <li>
              <NavLink>About us</NavLink>
            </li>
            <li>
              <NavLink className="force-red">GDG RBU</NavLink>
            </li>
          </NavList>
        </NavMenu>

        
        <BurgerMenu
          className={`${burgerMenuActive ? 'opened' : 'closed'} burger-menu`}
          onClick={handleMenuToogle}
        />

        <NavListMobile className={`${burgerMenuActive ? 'opened' : 'closed'}`}>
          <li>
            <NavLink>Home</NavLink>
          </li>
          <li>
            <NavLink>Event</NavLink>
          </li>
          <li>
            <NavLink>About Us</NavLink>
          </li>
        </NavListMobile>
      </Nav>
    </StyledHeader>
  );
}

export default Header;
