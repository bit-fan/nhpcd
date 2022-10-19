import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';
import reportWebVitals, { } from './reportWebVitals';
test('renders learn react link', async () => {
  await act(async () => { render(<App />) });
  reportWebVitals();
});
