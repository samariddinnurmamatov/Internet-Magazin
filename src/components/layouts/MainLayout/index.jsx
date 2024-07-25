import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import Mainheader from './components/mainheader';
import Mainfooter from './components/mainfooter';


const MainLayout = () => {
  const HeaderComponent = <Mainheader />;
  const FooterComponent = <Mainfooter />;
  // Bunaqa yozish sababi keyinchalik MainHeader Mobile bo'lsa ternary operator bilan tekshirib yozib ketsa bo'ladi

  return (
    <Fragment>
      {HeaderComponent}
      <main>
        <Outlet />
      </main>
      {FooterComponent}
    </Fragment>
  );
};

export default MainLayout;