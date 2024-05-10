import React from 'react';
import { render, screen } from '@testing-library/react';
import CalenderExpenseGraph from './CalenderExpenseGraph'; // Correct import without curly braces

// Mocking dependencies used in the component
jest.mock('../../services/expenseServices', () => ({
  getUserMonthlyExpService: jest.fn(),
  getUserDailyExpService: jest.fn(),
}));

describe('CalenderExpenseGraph Component', () => {
  beforeEach(() => {
    // Mock localStorage getItem method
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(
      JSON.stringify({ emailId: 'test@example.com' })
    );

    // Mock API responses for monthly and daily expenses
    const userMonthlyExpData = [
      { _id: { month: 1 }, amount: 100 },
      { _id: { month: 2 }, amount: 150 },
    ];
    const userDailyExpData = [
      { _id: { month: 1, date: 1 }, amount: 20 },
      { _id: { month: 1, date: 2 }, amount: 30 },
    ];
    global.fetch
      .mockResolvedValueOnce({ json: async () => ({ data: userMonthlyExpData }) })
      .mockResolvedValueOnce({ json: async () => ({ data: userDailyExpData }) });
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Use restoreAllMocks to reset all mocks
  });

  test('renders Expense Graph with Monthly View by default', async () => {
    render(<CalenderExpenseGraph />);
    
    // Expect loading indicator to be displayed initially
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for API calls to resolve
    await screen.findByText('Expense Graph - Monthly View');

    // Expect graph title and switch label to be rendered
    expect(screen.getByText('Expense Graph - Monthly View')).toBeInTheDocument();
    expect(screen.getByText('Monthly expense view')).toBeInTheDocument();
  });

  test('toggles to Daily View on switch click', async () => {
    render(<CalenderExpenseGraph />);
    
    // Wait for API calls to resolve
    await screen.findByText('Expense Graph - Monthly View');

    // Click on the switch to toggle to Daily View
    screen.getByLabelText('Monthly expense view').click();

    // Expect graph title and switch label to reflect Daily View
    expect(screen.getByText('Expense Graph - Daily View')).toBeInTheDocument();
    expect(screen.getByLabelText('Monthly expense view')).toHaveProperty('checked', true);
  });
});
