import React, { useState, useEffect } from 'react';
import { fetchUserAddresses } from './api/distanceCalculations';
import { getCurrentUserId } from './api/users';
import { formatDistanceFromDecimal } from './utilities';


const ListPage = () => {
  const [addresses, setAddresses] = useState([]);
  

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const userId = await getCurrentUserId();
        const data = await fetchUserAddresses(userId);
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  
  return (
    <div>
    <h1>List Page!</h1>
    {addresses.map((address, index) => (
      <div key={index}>
        {address.address_1} to {address.address_2} - Distance: {formatDistanceFromDecimal(address.distance)} miles
      </div>
    ))}
  </div>
  );
}

export default ListPage;