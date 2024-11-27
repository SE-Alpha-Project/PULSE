import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactUs from './ContactUs';

describe('ContactUs Component', () => {
    test('renders Contact Us page', () => {
        render(<ContactUs />);
        expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
});
