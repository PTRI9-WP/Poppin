import React, { useEffect } from 'react';
import Card from './Card';
import {
  getAllBusinesses,
  reset,
  resetSelectedBusiness,
} from '../features/businesses/businessSlice';
import { useDispatch, useSelector } from 'react-redux';
const CardContainer = () => {
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
        {businesses.map((business) => (
          <div>
            <Card key={business._id} card={business} />
          </div>
        ))}
        <Card />
      </ul>
    </>
  );
};

export default CardContainer;
