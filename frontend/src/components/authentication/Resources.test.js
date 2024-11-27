import React from 'react';
import { render } from '@testing-library/react';
import Resources from './Resources';

describe('Resources Component', () => {
    test('renders Resources component', () => {
        const mockState = { token: 'mockToken' };
        render(<Resources state={mockState} dispatch={() => {}} />);
    });
});
