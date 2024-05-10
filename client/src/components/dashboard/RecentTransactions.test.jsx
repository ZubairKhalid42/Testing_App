import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecentTransactions from './RecentTransactions';
import { getRecentUserExpService } from '../../services/__mocks__/expenseServices';

// Mocked localStorage data
const mockProfile = {
  emailId: 'test@example.com'
};
jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(JSON.stringify(mockProfile));

// Mocked recent expense data
const mockRecentExpenses = [
  {
    _id: '1',
    expenseName: 'Groceries',
    expenseAmount: 50,
    expensePerMember: 25,
    expenseOwner: 'John Doe',
    expenseDate: '2024-05-01',
    expenseCurrency: 'USD'
  },
  {
    _id: '2',
    expenseName: 'Utilities',
    expenseAmount: 100,
    expensePerMember: 50,
    expenseOwner: 'Jane Smith',
    expenseDate: '2024-04-28',
    expenseCurrency: 'EUR'
  }
];

describe('RecentTransactions Component', () => {
  beforeEach(() => {
    // Mock the getRecentUserExpService to return mock recent expenses
    getRecentUserExpService.mockResolvedValue({ data: { expense: mockRecentExpenses } });
  });

  test('renders recent transactions correctly', async () => {
    render(<RecentTransactions />);

    // Expect loading indicator to be displayed initially
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for API call to resolve and loading to complete
    await waitFor(() => {
      expect(getRecentUserExpService).toHaveBeenCalledTimes(1);
    });

    // Expect loading indicator to disappear and recent transactions to be rendered
    expect(screen.queryByTestId('loading-indicator')).toBeNull();

    // Expect each expense card to be rendered with the correct data
    expect(screen.getByText('Your Recent transactions')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('Utilities')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('May 1, 2024')).toBeInTheDocument();
    expect(screen.getByText('April 28, 2024')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText('€100.00')).toBeInTheDocument();
  });

  // Add more test cases to cover edge cases, error handling, etc.
});
