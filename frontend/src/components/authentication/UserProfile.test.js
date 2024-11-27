import React from 'react';
import { render } from '@testing-library/react';
import UserProfile from './UserProfile';

describe('UserProfile Component', () => {
    test('renders UserProfile component', () => {
        render(<UserProfile />);
    });
});
