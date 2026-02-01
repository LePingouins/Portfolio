import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

describe('Home', () => {
  it('renders name and degree', () => {
    render(<Home />);
    expect(screen.getByText(/Olivier Goudreault/i)).toBeInTheDocument();
    expect(screen.getByText(/Computer Science Technology/i)).toBeInTheDocument();
  });
});
