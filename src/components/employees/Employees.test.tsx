import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Employees from './Employees';
import { defaultTableProp } from '../../pages/dashboard/Dashboard';
import { sampleEmployeesData } from '../../mocks/employees';

const mockUpdate = jest.fn();
const mockOnEmployeeChange = jest.fn();

test('renders default screen', () => {
    render(<Employees employees={sampleEmployeesData} tableProp={defaultTableProp} update={mockUpdate} onEmployeeDataChange={mockOnEmployeeChange} />);
    expect(screen.queryByText('Employees')).toBeVisible();
    expect(screen.queryByText('id')).toBeVisible();
    expect(screen.queryByText('Name')).toBeVisible();
    expect(screen.queryByText('Action')).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[0].id)).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[0].full_name)).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[0].salary)).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[0].login_id)).toBeVisible();
});
