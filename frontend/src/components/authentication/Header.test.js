import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
    test('renders Header', () => {
        render(<Header />);
    });
});
