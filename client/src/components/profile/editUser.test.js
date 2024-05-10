import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditForm from './edituser'; // Import the component to be tested

// Mock editUser function
jest.mock('../../services/auth', () => ({
  editUser: jest.fn().mockResolvedValue(true) // Mock the editUser function to resolve successfully
}));

describe('EditForm', () => {
  const mockedProps = {
    hideEditUser: jest.fn(),
    emailId: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    showHomeAlert: false,
    homeAlertMessage: ''
  };

  beforeEach(() => {
    render(<EditForm {...mockedProps} />);
  });

  it('renders all form fields correctly', () => {
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    // Trigger form submission without filling required field
    fireEvent.click(screen.getByRole('button', { name: /Update/i }));

    await waitFor(() => {
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    // Fill in the first name and submit the form
    userEvent.type(screen.getByLabelText(/First Name/i), 'Jane');
    fireEvent.click(screen.getByRole('button', { name: /Update/i }));

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(mockedProps.hideEditUser).toHaveBeenCalledTimes(1); // Ensure hideEditUser was called
    });
  });

  it('cancels edit form', async () => {
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockedProps.hideEditUser).toHaveBeenCalledTimes(1); // Ensure hideEditUser was called
  });
});
