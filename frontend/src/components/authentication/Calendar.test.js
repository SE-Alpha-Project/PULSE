import React from 'react';
import { render } from '@testing-library/react';
import Calendar from './Calendar';

describe('Calendar Component', () => {
    test('renders Calendar component', () => {
        const mockState = { token: 'mockToken' };
        render(<Calendar state={mockState} dispatch={() => {}} />);
    });
});
