import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Events from './Events';

describe('Events Component', () => {
    test('renders Events component', () => {
        const mockState = { token: 'mockToken' };
        render(
            <MemoryRouter>
                <Events state={mockState} dispatch={() => {}} />
            </MemoryRouter>
        );
    });
});
