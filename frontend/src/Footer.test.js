import { render, screen } from '@testing-library/react';
import Footer from './components/Footer';

test('renders the landing page', () => {
  render(<Footer />);
  expect(screen.getByText(/Jinming Xing, Krisha Patel, Shreyas Devaraj/i)).toBeInTheDocument();
});

test('renders copyright text', () => {
  render(<Footer />);
  expect(screen.getByText(/© 2023 Your Company Name/i)).toBeInTheDocument();
});

test('renders social media links', () => {
  render(<Footer />);
  expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
});

test('renders contact information', () => {
  render(<Footer />);
  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  expect(screen.getByText(/email: support@yourcompany.com/i)).toBeInTheDocument();
});

test('renders terms of service link', () => {
  render(<Footer />);
  expect(screen.getByRole('link', { name: /terms of service/i })).toBeInTheDocument();
});

test('renders privacy policy link', () => {
  render(<Footer />);
  expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
});

test('renders a back to top button', () => {
  render(<Footer />);
  expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument();
});

test('renders a newsletter subscription form', () => {
  render(<Footer />);
  expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
});