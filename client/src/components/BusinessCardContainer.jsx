import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBusinesses } from '../features/businesses/businessSlice';
import BusinessCard from './BusinessCard';

const BusinessCardContainer = ({ showCheckinModal, setShowCheckinModal }) => {
  const dispatch = useDispatch();
  const { businesses } = useSelector((state) => state.businesses);

  useEffect(() => {
    //fetching all businesses from backend
    dispatch(getAllBusinesses());
  }, [dispatch]); //If you remove the dispatch from the dependency array, the useEffect hook will run on every render of BusinessCardContainer, bad for performance

  return (
    <>
      <ul className='businessCardContainer'>
        {/* mapping through array of businesses and passing it through prop to be used in BusinessCard*/}
        {businesses.map((businessCard) => (
          <BusinessCard
            key={businessCard.id}
            businessCard={businessCard}
            setShowCheckinModal={setShowCheckinModal}
            showCheckinModal={showCheckinModal}
          />
        ))}
      </ul>
    </>
  );
};

export default BusinessCardContainer;
