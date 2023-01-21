import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BusinessCard from './BusinessCard';
import { setSelectedBusiness } from '../features/businesses/businessSlice';

const mockStore = configureStore([]);

describe('BusinessCard', () => {
  let store;
  let component;
  let businessCard;
  let setShowCheckinModal;

  beforeEach(() => {
    store = mockStore({
      auth: { checkedIn: false },
    });
    businessCard = {
      businessname: 'Test Business',
      location: 'Test City',
      phonenumber: '555-555-5555',
      poppinscore: 80,
      incentive: '10% off',
      image: 'test-image-url',
    };
    setShowCheckinModal = jest.fn();
    component = render(
      <Provider store={store}>
        <BusinessCard
          businessCard={businessCard}
          setShowCheckinModal={setShowCheckinModal}
        />
      </Provider>
    );
  });

  it('displays the business name', () => {
    const { getByText } = component;
    const businessName = getByText('Test Business');
    expect(businessName).toBeInTheDocument();
  });

  it('displays the business location', () => {
    const { getByText } = component;
    const businessLocation = getByText('City: Test City');
    expect(businessLocation).toBeInTheDocument();
  });

  it('displays the business phone number', () => {
    const { getByText } = component;
    const businessPhoneNumber = getByText('555-555-5555');
    expect(businessPhoneNumber).toBeInTheDocument();
  });

  it('displays the business incentive', () => {
    const { getByText } = component;
    const businessIncentive = getByText('Deal: 10% off');
    expect(businessIncentive).toBeInTheDocument();
  });

  it('displays the correct number of champagne corks based on the poppinscore', () => {
    const { getAllByTestId } = component;
    const corks = getAllByTestId('cork');
    expect(corks.length).toBe(4);
  });

  it('displays the check in button when not checked in', () => {
    const { getByText } = component;
    const checkInButton = getByText('Check In');
    expect(checkInButton).toBeInTheDocument();
  });

  it('dispatches the setSelectedBusiness action and calls the setShowCheckinModal function when the check in button is clicked', () => {
    const { getByText } = component;
    const checkInButton = getByText('Check In');
    fireEvent.click(checkInButton);

    const actions = store.getActions();
    expect(actions[0]).toEqual(setSelectedBusiness(businessCard));
    expect(setShowCheckinModal).toHaveBeenCalled();
  });

  it('displays the "Already Checked In" button when checked in', () => {
    store.dispatch({ type: 'auth/setCheckedIn', payload: true });
    component.rerender(
      <Provider store={store}>
        <BusinessCard
          businessCard={businessCard}
          setShowCheckinModal={setShowCheckinModal}
        />
      </Provider>
    );
    const { getByText } = component;
    const checkedInButton = getByText('Already Checked In');
    expect(checkedInButton).toBeInTheDocument();
  });
});
