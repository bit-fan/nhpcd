import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { EmployeeModalEdit } from './EmployeeModalEdit';

const sampleEmpData = {
    "id": 1, "full_name": "Corrianne Graffham",
    "login_id": "cgraffham0", "salary": 8214.74,
    "profile_pic": "http://dummyimage.com/156x100.png/cc0000/ffffff"
};
const mockOnUpdate = jest.fn();
const mockOnCancel = jest.fn();
test('renders default screen', () => {
    render(<EmployeeModalEdit employeeInfo={sampleEmpData} onCancel={mockOnCancel} onUpdate={mockOnUpdate} />);
    expect(screen.getByDisplayValue('Corrianne Graffham')).toBeVisible();
    expect(screen.getByDisplayValue('cgraffham0')).toBeVisible();
    expect(screen.queryByText('Cancel')).toBeVisible();
    expect(screen.queryByText('Update')).toBeVisible();
});

test('renders with update', () => {
    render(<EmployeeModalEdit employeeInfo={sampleEmpData} onCancel={mockOnCancel} onUpdate={mockOnUpdate} />);
    expect(mockOnCancel).not.toBeCalled();
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toBeCalled();

    fireEvent.change(screen.getByTestId('employee-name'), { target: { value: 'new name' } });
    fireEvent.change(screen.getByTestId('employee-login'), { target: { value: 'new login' } })
    fireEvent.change(screen.getByTestId('employee-salary'), { target: { value: 1234 } });
    fireEvent.click(screen.getByText('Update'));
    expect(mockOnUpdate).toHaveBeenCalledWith({
        "full_name": "new name",
        "id": 1,
        "login_id": "new login",
        "salary": 1234,
    });
});

test('test close icon', () => {
    render(<EmployeeModalEdit employeeInfo={sampleEmpData} onCancel={mockOnCancel} onUpdate={mockOnUpdate} />);
    expect(mockOnCancel).not.toBeCalled();
    fireEvent.click(screen.getByTestId('close-icon'));
    expect(mockOnCancel).toBeCalled();
});
