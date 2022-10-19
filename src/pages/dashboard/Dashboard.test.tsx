import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import { fetchEmployeeData, IEmployeeData } from "../../services/employee";
import { sampleEmployeesData } from '../../mocks/employees';

const mockEmployeesData = sampleEmployeesData;

jest.mock('../../services/employee', () => {
    const originalModule = jest.requireActual('../../services/employee');
    return {
        __esModule: true,
        ...originalModule,
        fetchEmployeeData: async () => {
            return Promise.resolve({ status: 'ok', data: mockEmployeesData });
        },
        editEmployeeData: async () => {
            return Promise.resolve({ status: 'ok', data: mockEmployeesData });
        },
        deleteEmployeeData: async () => {
            return Promise.resolve({ status: 'ok', data: mockEmployeesData });
        },
    };
});

test('test range filter', async () => {
    await act(async () => { render(<Dashboard />) });
    expect(screen.queryByText(sampleEmployeesData[0].full_name)).toBeVisible();
    await act(async () => {
        fireEvent.change(screen.getByTestId('min-range'), { target: { value: 8500 } });
        fireEvent.change(screen.getByTestId('max-range'), { target: { value: 9000 } });
    });
    const pageClass = document.body.querySelector('.page-container');
    expect(pageClass).toHaveTextContent('Total 19 records, showing51015 records per page. Go to112next2');
})

test('test sort col', async () => {
    await act(async () => { render(<Dashboard />) });
    expect(screen.queryByText(sampleEmployeesData[0].full_name)).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[99].full_name)).toBeNull();
    fireEvent.click(screen.getByTestId('table-sort-col-id'));
    expect(screen.queryByText(sampleEmployeesData[0].full_name)).toBeNull();
    expect(screen.queryByText(sampleEmployeesData[99].full_name)).toBeVisible();
    fireEvent.click(screen.getByTestId('table-sort-col-id'));
    expect(screen.queryByText(sampleEmployeesData[0].full_name)).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[99].full_name)).toBeNull();

    fireEvent.click(screen.getByTestId('table-sort-col-Salary'));
    expect(screen.queryByText('8008.74')).toBeVisible();
    expect(screen.queryByText('9942.42')).toBeNull();
    fireEvent.click(screen.getByTestId('table-sort-col-Salary'));
    expect(screen.queryByText('8008.74')).toBeNull();
    expect(screen.queryByText('9942.42')).toBeVisible();
});

test('test page size', async () => {
    await act(async () => { render(<Dashboard />) });
    fireEvent.click(screen.getAllByTestId('pagesize-10')[0]);
    expect(screen.queryByText(sampleEmployeesData[9].full_name)).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[14].full_name)).toBeNull();
    fireEvent.click(screen.getAllByTestId('pagesize-5')[0]);
    expect(screen.queryByText(sampleEmployeesData[9].full_name)).toBeNull();
    expect(screen.queryByText(sampleEmployeesData[14].full_name)).toBeNull();
    fireEvent.click(screen.getAllByTestId('pagesize-15')[0]);
    expect(screen.queryByText(sampleEmployeesData[9].full_name)).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[14].full_name)).toBeVisible();
})

test('test go to page', async () => {
    await act(async () => { render(<Dashboard />) });
    fireEvent.click(screen.getAllByTestId('pagesize-10')[0]);
    expect(screen.queryByText(sampleEmployeesData[0].full_name)).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[14].full_name)).toBeNull();
    fireEvent.click(screen.getAllByTestId('goto-page-last')[0]);
    expect(screen.queryByText(sampleEmployeesData[0].full_name)).toBeNull();
    expect(screen.queryByText(sampleEmployeesData[99].full_name)).toBeVisible();
    fireEvent.click(screen.getAllByTestId('goto-page-prev')[0]);
    expect(screen.queryByText(sampleEmployeesData[0].full_name)).toBeNull();
    expect(screen.queryByText(sampleEmployeesData[99].full_name)).toBeNull();
    expect(screen.queryByText(sampleEmployeesData[89].full_name)).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[79].full_name)).toBeNull();
    fireEvent.click(screen.getAllByTestId('goto-page-prev')[0]);
    expect(screen.queryByText(sampleEmployeesData[0].full_name)).toBeNull();
    expect(screen.queryByText(sampleEmployeesData[99].full_name)).toBeNull();
    expect(screen.queryByText(sampleEmployeesData[89].full_name)).toBeNull();
    expect(screen.queryByText(sampleEmployeesData[79].full_name)).toBeVisible();
    fireEvent.click(screen.getAllByTestId('goto-page-next')[0]);
    expect(screen.queryByText(sampleEmployeesData[0].full_name)).toBeNull();
    expect(screen.queryByText(sampleEmployeesData[99].full_name)).toBeNull();
    expect(screen.queryByText(sampleEmployeesData[89].full_name)).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[79].full_name)).toBeNull();
    fireEvent.click(screen.getAllByTestId('goto-page-first')[0]);
    expect(screen.queryByText(sampleEmployeesData[0].full_name)).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[14].full_name)).toBeNull();

    fireEvent.change(screen.queryAllByTestId('goto-page-number')[0], { target: { value: 2 } });
    expect(screen.queryByText(sampleEmployeesData[9].full_name)).toBeNull();
    expect(screen.queryByText(sampleEmployeesData[10].full_name)).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[19].full_name)).toBeVisible();
    expect(screen.queryByText(sampleEmployeesData[20].full_name)).toBeNull();

})

test('test edit modal', async () => {
    await act(async () => { render(<Dashboard />) });
    expect(document.querySelector('.modal-employee')).toBeNull();
    fireEvent.click(screen.getAllByTestId('employee-row-icon-edit')[0]);
    expect(document.querySelector('.modal-employee')).toBeVisible();
    await act(async () => { fireEvent.click(screen.getByText('Update')); });
})

test('test edit modal cancel', async () => {
    await act(async () => { render(<Dashboard />) });
    expect(document.querySelector('.modal-employee')).toBeNull();
    fireEvent.click(screen.getAllByTestId('employee-row-icon-edit')[0]);
    expect(document.querySelector('.modal-employee')).toBeVisible();
    fireEvent.click(screen.getByText('Cancel'));
})

test('test delete modal', async () => {
    await act(async () => { render(<Dashboard />) });
    expect(document.querySelector('.modal-employee')).toBeNull();
    fireEvent.click(screen.getAllByTestId('employee-row-icon-delete')[0]);
    expect(document.querySelector('.modal-employee')).toBeVisible();
    await act(async () => { fireEvent.click(screen.getByTestId('modal-button-delete')); });
})

test('test delete modal cancel fn', async () => {
    await act(async () => { render(<Dashboard />) });
    expect(document.querySelector('.modal-employee')).toBeNull();
    fireEvent.click(screen.getAllByTestId('employee-row-icon-delete')[0]);
    expect(document.querySelector('.modal-employee')).toBeVisible();
    fireEvent.click(screen.getByText('Cancel'));
})