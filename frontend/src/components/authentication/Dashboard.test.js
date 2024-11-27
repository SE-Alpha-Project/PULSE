import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
    test('renders Dashboard component', () => {
        render(<Dashboard />);
    });
});
