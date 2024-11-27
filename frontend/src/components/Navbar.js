import React, { Component } from 'react';
import { Container, Fill } from './nav';
import dumbbell from "./assets/img/dumbbell.png";

export default class Navbar extends Component {
  render() {
    return (
      <>
        <Container>
          
            <div className="brand">
              <a href='/'>
                <img 
                  src={dumbbell}
                  alt="Custom Icon" 
                  style={{ width: '50px', height: '50px' }} // Adjust size as needed
                  className="fire-icon" // Keep your existing class if needed
                />
                <span>PULSE</span>
              </a>
            </div>
            <div className="auth-links">
              <a href='/signin'>Sign In</a>
              <a href='/signup'>Sign Up</a>
            </div>
          
        </Container>
        <Fill />
      </>
    );
  }
}
