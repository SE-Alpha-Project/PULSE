import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignIn from './SignIn';
import axios from 'axios';

jest.mock('axios');

describe('SignIn Component', () => {
    test('renders Sign-In form', () => {
        render(<SignIn />);
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    test('submits form successfully', async () => {
        axios.post.mockResolvedValueOnce({ data: { success: true } });
        render(<SignIn />);
        
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
        
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
        
        expect(await screen.findByText(/sign in successful/i)).toBeInTheDocument();
    });

    test('displays error message on sign-in failure', async () => {
        axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));
        render(<SignIn />);
        
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrongpassword' } });
        
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
        
        expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
    });

    test('does not submit if required fields are empty', async () => {
        render(<SignIn />);
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
        expect(await screen.findByText(/please fill out this field/i)).toBeInTheDocument();
    });
});
