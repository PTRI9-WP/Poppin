import React, { useEffect } from 'react';
import BusinessCard from './BusinessCard';
import {
  getAllBusinesses,
  reset,
  resetSelectedBusiness,
} from '../features/businesses/businessSlice';
import { useDispatch, useSelector } from 'react-redux';
const BusinessCardContainer = () => {
  const dispatch = useDispatch();
  const { businesses } = useSelector((state) => state.businesses);

  useEffect(() => {
    dispatch(getAllBusinesses());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  //unselects the selected business when component mounts. So after we finish updating the business and go back to the dashboard, the business is no longer selected
  useEffect(() => {
    dispatch(resetSelectedBusiness());
  }, []);

  return (
    <>
      <ul>
        {/* conditionally render cards here */}
        {businesses.map((businessCard) => (
          <div>
            <BusinessCard key={businessCard.id} businessCard={businessCard} />
          </div>
        ))}
      </ul>
    </>
  );
};

export default BusinessCardContainer;
