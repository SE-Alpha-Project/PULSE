import React from 'react';
import { render } from '@testing-library/react';
import PrivateRoute from './PrivateRoute';

describe('PrivateRoute Component', () => {
    test('renders PrivateRoute', () => {
        render(<PrivateRoute />);
    });
});
