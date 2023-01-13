import React, { useEffect } from 'react';
import BusinessCard from './BusinessCard';
import {
  getAllBusinesses,
  reset,
  resetSelectedBusiness,
} from '../features/businesses/businessSlice';
import { useDispatch, useSelector } from 'react-redux';

const BusinessCardContainer = ({ setShowCheckinModal }) => {
  const dispatch = useDispatch();
  const { businesses } = useSelector((state) => state.businesses);

  useEffect(() => {
    //fetching all businesses from backend
    dispatch(getAllBusinesses());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]); //If you remove the dispatch from the dependency array, the useEffect hook will run on every render of BusinessCardContainer, bad for performance

  //unselects the selected business when component mounts. So after we go to another page and come back to the dashboard, the business is no longer selected
  useEffect(() => {
    dispatch(resetSelectedBusiness());
  }, []);

  return (
    <>
      <ul>
        {/* mapping through array of businesses and passing it through prop to be used in BusinessCard*/}
        {businesses.map((businessCard) => (
          <BusinessCard
            key={businessCard.id}
            businessCard={businessCard}
            setShowCheckinModal={setShowCheckinModal}
          />
        ))}
      </ul>
    </>
  );
};

export default BusinessCardContainer;
