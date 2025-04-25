import { render, screen, fireEvent } from '@testing-library/react';
import BasicForm from './BasicForm';

test('renders the form title', () => {
  render(<BasicForm />);
  const heading = screen.getByText(/sign up sheet/i);
  expect(heading).toBeInTheDocument();
});

test('shows validation error when fields are empty', () => {
  render(<BasicForm />);
  fireEvent.click(screen.getByText(/add/i));
  expect(screen.getByText(/please fill out all fields/i)).toBeInTheDocument();
});

test('accepts valid inputs and displays user', () => {
  render(<BasicForm />);

  fireEvent.input(screen.getByPlaceholderText(/enter name/i), {
    target: { value: 'Alice' },
  });

  fireEvent.input(screen.getByPlaceholderText(/enter email/i), {
    target: { value: 'alice@example.com' },
  });

  fireEvent.input(screen.getByPlaceholderText(/enter phone/i), {
    target: { value: '1234567890' },
  });

  fireEvent.click(screen.getByText(/add/i));
  expect(screen.getByText(/alice - alice@example.com - 1234567890/i)).toBeInTheDocument();
});
