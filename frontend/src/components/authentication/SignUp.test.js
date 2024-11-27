// src/components/authentication/SignUp.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';
import axios from 'axios';

jest.mock('axios');

describe('SignUp Component', () => {
    test('renders Sign-Up form', () => {
        render(<SignUp />);
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/age/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    test('submits form successfully', async () => {
        axios.post.mockResolvedValueOnce({ data: { success: true } });
        render(<SignUp />);
        
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: '30' } });
        
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
        
        expect(await screen.findByText(/profile created successfully/i)).toBeInTheDocument();
    });

    test('displays error message on sign-up failure', async () => {
        axios.post.mockRejectedValueOnce(new Error('User already exists'));
        render(<SignUp />);
        
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/age/i), { target: { value: '30' } });
        
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
        
        expect(await screen.findByText(/error creating profile/i)).toBeInTheDocument();
    });

    test('does not submit if required fields are empty', async () => {
        render(<SignUp />);
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
        expect(await screen.findByText(/please fill out this field/i)).toBeInTheDocument();
    });
});