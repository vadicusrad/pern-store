import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Context } from '../index';
import { authRoutes, publicRoutes } from '../routes';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  console.log(user);

  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => {
        return <Route key={path} path={path} element={element} />;
      })}
      {user.isAuth &&
        authRoutes.map(({ path, element }) => {
          return <Route key={path} path={path} element={element} />;
        })}
      ,
    </Routes>
  );
});
export default AppRouter;
