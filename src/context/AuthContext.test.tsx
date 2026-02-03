import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from './AuthContext';

function TestConsumer() {
  const auth = useAuth();
  return (
    <div>
      <span data-testid="auth">{String(auth.isAuthenticated)}</span>
      <button type="button" onClick={() => auth.login('a@b.com', 'pass')}>Login</button>
      <button type="button" onClick={() => auth.logout()}>Logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => localStorage.clear());

  it('starts unauthenticated', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    expect(screen.getByTestId('auth')).toHaveTextContent('false');
  });

  it('login sets authenticated', async () => {
    const user = userEvent.setup();
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    const loginButtons = screen.getAllByRole('button', { name: 'Login' });
    await user.click(loginButtons[0]);
    const authSpans = screen.getAllByTestId('auth');
    expect(authSpans[0]).toHaveTextContent('true');
  });

  it('logout clears state', async () => {
    const user = userEvent.setup();
    render(<AuthProvider><TestConsumer /></AuthProvider>);
    const loginButtons = screen.getAllByRole('button', { name: 'Login' });
    await user.click(loginButtons[0]);
    const logoutButtons = screen.getAllByRole('button', { name: 'Logout' });
    await user.click(logoutButtons[0]);
    const authSpans = screen.getAllByTestId('auth');
    expect(authSpans[0]).toHaveTextContent('false');
  });
});
