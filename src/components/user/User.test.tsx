import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import User from './User';
import { fetchEmployeeData, IEmployeeData } from "../../services/employee";
import { sampleEmployeesData } from '../../mocks/employees';

const mockEmployeesData = sampleEmployeesData;

test('test fedault', () => {
    render(<User />);
    expect(document.querySelector('.upload-modal-container')).toBeNull();
    fireEvent.click(screen.getByTestId('user-button-upload'));
    expect(document.querySelector('.upload-modal-container')).toBeVisible();
    fireEvent.click(screen.getByTestId('upload-modal-close-button'));
    expect(document.querySelector('.upload-modal-container')).toBeNull();
})

test('simulate file upload valid', async () => {
    render(<User />);
    fireEvent.click(screen.getByTestId('user-button-upload'));

    const blob = new Blob(['asdasfasdf']);
    const file = new File([blob], 'a.csv', {
        type: 'text/csv',
    });
    Object.defineProperty(file, 'size', { value: 1024 * 1024 + 1, configurable: true })
    const input = screen.getByTestId('file-upload-input');
    user.upload(input, file);
    expect(document.querySelector('.file-valid-block')).toBeVisible();
    expect(document.querySelector('.file-error-block')).toBeNull();

    fireEvent.click(screen.getByTestId('upload-modal-upload-button'));
    // await waitFor(() => expect(queryByTestId('handler')).toBeTruthy());
})

test('simulate file upload invalid', async () => {
    render(<User />);
    fireEvent.click(screen.getByTestId('user-button-upload'));

    const blob = new Blob(['asdasfasdf']);
    const file = new File([blob], 'a.csv', {
        type: 'text/csv',
    });
    Object.defineProperty(file, 'size', { value: 1024 * 1024 * 3, configurable: true })
    const input = screen.getByTestId('file-upload-input');
    user.upload(input, file);
    expect(document.querySelector('.file-valid-block')).toBeNull();
    expect(document.querySelector('.file-error-block')).toBeVisible();

    fireEvent.click(screen.getByTestId('upload-modal-upload-button'));
    // await waitFor(() => expect(queryByTestId('handler')).toBeTruthy());
})