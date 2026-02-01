import { render, screen } from '@testing-library/react';
import Projects from '../pages/Projects';

describe('Projects', () => {
  it('renders Projects heading', () => {
    render(<Projects />);
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  });
});
