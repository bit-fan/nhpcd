import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Filter from './Filter';

const sampleEmpData = {
    "id": 1, "full_name": "Corrianne Graffham",
    "login_id": "cgraffham0", "salary": 8214.74,
    "profile_pic": "http://dummyimage.com/156x100.png/cc0000/ffffff"
};
const mockUpdateValue = jest.fn();
const mockOnCancel = jest.fn();
test('renders default screen', () => {
    render(<Filter values={{ lower: 0, upper: 0 }} updateValue={mockUpdateValue} />);
    expect(screen.queryByText('Minimum Salary')).toBeVisible();
    expect(screen.queryByText('Maximum Salary')).toBeVisible();
});

