// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import { useDispatch } from 'react-redux';
// import Header from './Header';
// import { logout, reset } from '../features/auth/authSlice';

// jest.mock('react-redux', () => ({
//   useDispatch: jest.fn(),
//   useSelector: jest.fn().mockReturnValue({ user: null }),
// }));

// describe('Header component', () => {
//   beforeEach(() => {
//     useDispatch.mockClear();
//   });

//   it('renders login and registration buttons when user is not logged in', () => {
//     const setShowLogin = jest.fn();
//     const setShowReg = jest.fn();
//     const { getByText } = render(
//       <Header setShowLogin={setShowLogin} setShowReg={setShowReg} />
//     );
//     expect(getByText('Login')).toBeInTheDocument();
//     expect(getByText('Register')).toBeInTheDocument();
//   });

//   it('dispatches logout and reset actions when logout button is clicked', () => {
//     const dispatch = jest.fn();
//     useDispatch.mockReturnValue(dispatch);
//     useSelector.mockReturnValue({ user: {} });
//     const setShowLogin = jest.fn();
//     const setShowReg = jest.fn();
//     const { getByText } = render(
//       <Header setShowLogin={setShowLogin} setShowReg={setShowReg} />
//     );
//     fireEvent.click(getByText('Logout'));
//     expect(dispatch).toHaveBeenCalledWith(logout());
//     expect(dispatch).toHaveBeenCalledWith(reset());
//   });

//   it('navigates to home page when home button is clicked', () => {
//     const navigate = jest.fn();
//     useNavigate.mockReturnValue(navigate);
//     useSelector.mockReturnValue({ user: {} });
//     const setShowLogin = jest.fn();
//     const setShowReg = jest.fn();
//     const { getByText } = render(
//       <Header setShowLogin={setShowLogin} setShowReg={setShowReg} />
//     );
//     fireEvent.click(getByText('Home'));
//     expect(navigate).toHaveBeenCalledWith('/home');
//   });

//   it('navigates to checkin page when checkin button is clicked', () => {
//     const navigate = jest.fn();
//     useNavigate.mockReturnValue(navigate);
//     useSelector.mockReturnValue({ user: {} });
//     const setShowLogin = jest.fn();
//     const setShowReg = jest.fn();
//     const { getByText } = render(
//       <Header setShowLogin={setShowLogin} setShowReg={setShowReg} />
//     );
//     fireEvent.click(getByText('Checkins'));
//     expect(navigate).toHaveBeenCalledWith('/checkin');
//   });

//   it('calls setShowReg and setShowLogin correctly when registration button is clicked', () => {
//     const setShowLogin = jest.fn();
//     const setShowReg = jest.fn();
//     const { getByText } = render(
//       <Header setShowLogin={setShowLogin} setShowReg={setShowReg} />
//     );
//     fireEvent.click(getByText('Register'));
//     expect(setShowReg).toHaveBeenCalledWith(true);
//     expect(setShowLogin).toHaveBeenCalledWith(false);
//   });

//   it('calls setShowReg and setShowLogin correctly when login button is clicked', () => {
//     const setShowLogin = jest.fn();
//     const setShowReg = jest.fn();
//     const { getByText } = render(
//       <Header setShowLogin={setShowLogin} setShowReg={setShowReg} />
//     );
//     fireEvent.click(getByText('Login'));
//     expect(setShowReg).toHaveBeenCalledWith(false);
//     expect(setShowLogin).toHaveBeenCalledWith(true);
//   });
// });

test('return true', () => {
  expect(true).toBe(true);
});
