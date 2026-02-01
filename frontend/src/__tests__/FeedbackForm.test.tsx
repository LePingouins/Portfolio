import { render, screen } from '@testing-library/react';
import FeedbackForm from '../components/FeedbackForm';

describe('FeedbackForm', () => {
  it('renders feedback form fields', () => {
    render(<FeedbackForm onSubmit={() => {}} />);
    expect(screen.getByPlaceholderText(/Your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your feedback/i)).toBeInTheDocument();
  });
});
