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

test('change range', () => {
    render(<Filter values={{ lower: 0, upper: 0 }} updateValue={mockUpdateValue} />);

    expect(mockUpdateValue).toHaveBeenCalledWith({ "lower": undefined, "upper": undefined });
    fireEvent.change(screen.getByTestId('min-range'), { target: { value: 1000 } });
    expect(mockUpdateValue).toHaveBeenCalledWith({ "lower": 1000, "upper": undefined });
    fireEvent.change(screen.getByTestId('max-range'), { target: { value: 10000 } });
    expect(mockUpdateValue).toHaveBeenCalledWith({ "lower": 1000, "upper": 10000 });
});