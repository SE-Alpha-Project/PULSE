import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Router from '../Router';
import useToken from '../authentication/useToken';

jest.mock('../authentication/useToken');

describe('Router Component', () => {
  beforeEach(() => {
    useToken.mockReturnValue({ getToken: jest.fn(), token: null });
  });

  test('renders SignUp route', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  test('renders SignIn route', () => {
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  test('renders Home route when logged in', () => {
    useToken.mockReturnValue({ getToken: jest.fn(), token: 'mockToken' });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test('renders LandingPage when not logged in', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText(/Landing Page/i)).toBeInTheDocument();
  });

  test('renders Profile route when logged in', () => {
    useToken.mockReturnValue({ getToken: jest.fn(), token: 'mockToken' });
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  });

  test('does not render Profile route when not logged in', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
  });

  test('renders FAQ route when logged in', () => {
    useToken.mockReturnValue({ getToken: jest.fn(), token: 'mockToken' });
    render(
      <MemoryRouter initialEntries={['/faq']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
  });

  test('does not render FAQ route when not logged in', () => {
    render(
      <MemoryRouter initialEntries={['/faq']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.queryByText(/FAQ/i)).not.toBeInTheDocument();
  });

  test('renders ContactUs route when logged in', () => {
    useToken.mockReturnValue({ getToken: jest.fn(), token: 'mockToken' });
    render(
      <MemoryRouter initialEntries={['/contactus']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
  });

  test('does not render ContactUs route when not logged in', () => {
    render(
      <MemoryRouter initialEntries={['/contactus']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.queryByText(/Contact Us/i)).not.toBeInTheDocument();
  });
});