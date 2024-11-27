import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from './Profile';
import axios from 'axios';

jest.mock('axios');

describe('Profile Component', () => {
    test('renders Profile component', () => {
        render(<Profile />);
        expect(screen.getByText(/user profile/i)).toBeInTheDocument();
    });

    test('fetches and displays user profile', async () => {
        axios.get.mockResolvedValueOnce({ data: { name: 'John Doe', age: 30 } });
        render(<Profile />);
        
        expect(await screen.findByDisplayValue(/john doe/i)).toBeInTheDocument();
        expect(await screen.findByDisplayValue(/30/i)).toBeInTheDocument();
    });

    test('updates user profile successfully', async () => {
        axios.get.mockResolvedValueOnce({ data: { name: 'John Doe', age: 30 } });
        axios.put.mockResolvedValueOnce({ data: { name: 'Jane Doe', age: 25 } });
        render(<Profile />);
        
        fireEvent.change(screen.getByDisplayValue(/john doe/i), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByDisplayValue(/30/i), { target: { value: '25' } });
        
        fireEvent.click(screen.getByRole('button', { name: /update profile/i }));
        
        expect(await screen.findByText(/profile updated successfully/i)).toBeInTheDocument();
    });

    test('displays error message on profile update failure', async () => {
        axios.get.mockResolvedValueOnce({ data: { name: 'John Doe', age: 30 } });
        axios.put.mockRejectedValueOnce(new Error('Update failed'));
        render(<Profile />);
        
        fireEvent.change(screen.getByDisplayValue(/john doe/i), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByDisplayValue(/30/i), { target: { value: '25' } });
        
        fireEvent.click(screen.getByRole('button', { name: /update profile/i }));
        
        expect(await screen.findByText(/error updating profile/i)).toBeInTheDocument();
    });
});
