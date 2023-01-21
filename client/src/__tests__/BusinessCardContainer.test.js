import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import BusinessCardContainer from './BusinessCardContainer';

const mockStore = configureMockStore();

test('renders a list of business cards', () => {
  const businesses = [
    { id: 1, name: 'Business 1' },
    { id: 2, name: 'Business 2' },
    { id: 3, name: 'Business 3' },
  ];
  const store = mockStore({ businesses });
  const { getByText } = render(
    <Provider store={store}>
      <BusinessCardContainer />
    </Provider>
  );
  businesses.forEach((business) => {
    expect(getByText(business.name)).toBeInTheDocument();
  });
});

test('dispatches getAllBusinesses action when component is rendered', () => {
  const store = mockStore({ businesses: [] });
  render(
    <Provider store={store}>
      <BusinessCardContainer />
    </Provider>
  );
  expect(store.getActions()).toEqual([{ type: 'businesses/getAllBusinesses' }]);
});

test('calls setShowCheckinModal when a business card is clicked', () => {
  const businesses = [{ id: 1, name: 'Business 1' }];
  const store = mockStore({ businesses });
  const setShowCheckinModal = jest.fn();
  const { getByText } = render(
    <Provider store={store}>
      <BusinessCardContainer setShowCheckinModal={setShowCheckinModal} />
    </Provider>
  );
  fireEvent.click(getByText('Business 1'));
  expect(setShowCheckinModal).toHaveBeenCalledWith(true);
});
