import React from 'react';
import { render } from '@testing-library/react';
import Meals from './Meals';

describe('Meals Component', () => {
    test('renders Meals component', () => {
        const mockState = { token: 'mockToken' };
        render(<Meals state={mockState} dispatch={() => {}} />);
    });
});
