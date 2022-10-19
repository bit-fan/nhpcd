import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { EmployeeModalDelete } from './EmployeeModalDelete';

const sampleEmpData = {
    "id": 1, "full_name": "Corrianne Graffham",
    "login_id": "cgraffham0", "salary": 8214.74,
    "profile_pic": "http://dummyimage.com/156x100.png/cc0000/ffffff"
};
const mockOnDelete = jest.fn();
const mockOnCancel = jest.fn();
test('renders default screen', () => {
    render(<EmployeeModalDelete employeeInfo={sampleEmpData} onCancel={mockOnCancel} onDelete={mockOnDelete} />);
    expect(screen.queryByText('Corrianne Graffham')).toBeVisible();
    expect(screen.queryByText('cgraffham0')).toBeVisible();
    expect(screen.queryByText('Cancel')).toBeVisible();
    expect(screen.getByTestId('modal-button-delete')).toBeVisible();
});

test('renders with update', () => {
    render(<EmployeeModalDelete employeeInfo={sampleEmpData} onCancel={mockOnCancel} onDelete={mockOnDelete} />);
    expect(mockOnCancel).not.toBeCalled();
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnCancel).toBeCalled();

    fireEvent.click(screen.getByTestId('modal-button-delete'));
    expect(mockOnDelete).toHaveBeenCalledWith({
        "full_name": "Corrianne Graffham",
        "id": 1,
        "login_id": "cgraffham0",
        "salary": 8214.74,
        "profile_pic": "http://dummyimage.com/156x100.png/cc0000/ffffff",
    });
});

test('test close icon', () => {
    render(<EmployeeModalDelete employeeInfo={sampleEmpData} onCancel={mockOnCancel} onDelete={mockOnDelete} />);
    expect(mockOnCancel).not.toBeCalled();
    fireEvent.click(screen.getByTestId('close-icon'));
    expect(mockOnCancel).toBeCalled();
});
