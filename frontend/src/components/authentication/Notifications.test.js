import React from 'react';
import { render } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications Component', () => {
    test('renders Notifications component', () => {
        render(<Notifications />);
    });
});
