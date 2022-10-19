import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { deleteEmployeeData, editEmployeeData, uploadEmployeeData } from './employee';

const unmockedFetch = global.fetch

beforeAll(() => {
    global.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve({ data: 'mock resp data' }),
        })
})

afterAll(() => {
    global.fetch = unmockedFetch
})


test('test edit API', async () => {
    const result = await editEmployeeData({ id: 10 });
    expect(result).toEqual({
        "data": {
            "data": "mock resp data",
        },
        "status": "ok"
    });
})

test('test delete API', async () => {
    const result = await deleteEmployeeData({ id: 10 });
    expect(result).toEqual({
        "data": {
            "data": "mock resp data",
        },
        "status": "ok"
    });
})

test('test upload API', async () => {
    const result = await uploadEmployeeData({ id: 10 });
    expect(result).toEqual({
        "data": 'dummy data',
        "status": "ok"
    });
})
