import { render, screen, cleanup } from '@testing-library/react';
import Header from '../Header';

test('should render header component', () => {
  render(<Header />);
});
