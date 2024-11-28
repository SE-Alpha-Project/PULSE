import React from 'react';
import { render } from '@testing-library/react';
import Help from './Help';

describe('Help Component', () => {
    test('renders Help component', () => {
        render(<Help />);
    });
});
