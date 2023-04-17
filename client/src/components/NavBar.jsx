import React, { useContext } from 'react';
import { Context } from '..';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from '../utils/routeConstants';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };
  console.log(user);
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <NavLink
          style={{ color: 'white', textDecoration: 'none' }}
          to={SHOP_ROUTE}
        >
          PERN SHOP
        </NavLink>
        {user._isAuth ? (
          <Nav className='ml-auto' style={{ color: 'white' }}>
            <Button onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
            <Button onClick={() => logOut()} className='ms-2'>
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className='ml-auto' style={{ color: 'white' }}>
            <Button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
