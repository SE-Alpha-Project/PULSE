import React from 'react';

import { Container, Call, Image, Main } from './land';
import Navbar from './Navbar';

import landingImage from './assets/img/landing.jpg';
import Feature from './Features';

const LandingPage = () => {
  return (
    <Container>
    <Navbar />
      <Image>
        <img src={landingImage} alt='Loql' cover center />
        <section>
          <h1>Get fit with us!</h1>
          <p>
            PULSE is your daily health ion, designed to help users achieve their wellness goals
          </p>
        </section>
      </Image>
      <br /><br />
      <Feature />
      <Main>
        <Call>
          <h1>CSC 510 Software Engineering</h1>
          <p>
            Project 3 : Team 10<br/>
            Chaitralee Datar | Ananya Patankar | Yash Shah
          </p>
        </Call>
      </Main>

    </Container>
  );
};

export default LandingPage;
