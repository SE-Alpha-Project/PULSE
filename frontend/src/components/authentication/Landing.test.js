import React from 'react';
import { render } from '@testing-library/react';
import Landing from './Landing';

describe('Landing Component', () => {
    test('renders Landing page', () => {
        render(<Landing />);
    });
});
