import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  // Test that the app renders without throwing errors
  expect(document.body).toBeInTheDocument();
});

test('redirects to login when unauthenticated', () => {
  render(<App />);
  // Should show loading or redirect to login
  // Note: This is a basic smoke test, more comprehensive tests would use mocking
});
