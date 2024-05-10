import React from 'react';
import { render } from '@testing-library/react';
import UserDetails from './userDetails';

test('renders user details correctly', () => {
  const userDetails = {
    firstName: 'John',
    lastName: 'Doe',
    emailId: 'john.doe@example.com',
  };

  const { getByLabelText } = render(<UserDetails {...userDetails} />);

  const firstNameInput = getByLabelText('First Name');
  const lastNameInput = getByLabelText('Last Name');
  const emailInput = getByLabelText('Email address');

  expect(firstNameInput).toHaveValue('John');
  expect(lastNameInput).toHaveValue('Doe');
  expect(emailInput).toHaveValue('john.doe@example.com');
});
