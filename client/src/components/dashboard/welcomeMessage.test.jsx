import React from 'react';
import { render, screen } from '@testing-library/react';
import { WelcomeMessage } from './welcomeMessage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('WelcomeMessage Component', () => {
  test('renders welcome message and button correctly', () => {
    render(
      <Router>
        <WelcomeMessage />
      </Router>
    );

    // Expect "Hello there, Welcome back!" text to be rendered
    expect(screen.getByText('Hello there, Welcome back!')).toBeInTheDocument();

    // Expect descriptive text to be rendered
    expect(
      screen.getByText(
        'Keep track of shared expenses and settle your corresponding balances in a convenient and personalized way.'
      )
    ).toBeInTheDocument();

    // Expect "View Groups" button to be rendered with correct link
    const viewGroupsButton = screen.getByRole('button', { name: 'View Groups' });
    expect(viewGroupsButton).toBeInTheDocument();
    expect(viewGroupsButton).toHaveAttribute('href', '/user/groups');
  });

  test('renders dashboard image correctly', () => {
    render(
      <Router>
        <WelcomeMessage />
      </Router>
    );

    // Expect dashboard image to be rendered with alt text
    const dashboardImage = screen.getByAltText('dashboard');
    expect(dashboardImage).toBeInTheDocument();
    expect(dashboardImage).toHaveAttribute('src', '/static/illustrations/dashboard-card.png');
  });
});
