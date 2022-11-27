import { FC } from 'react';

import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';
import HowItWork from '../components/HowItWork';
import Promo from '../components/Promo';

const MainPage: FC = () => {
  return (
    <>
      <Promo />
      <HowItWork />
      <AboutUs />
      <Footer />
    </>
  );
};

export default MainPage;
