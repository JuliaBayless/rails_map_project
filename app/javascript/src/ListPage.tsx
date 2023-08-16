import React, { useState, useEffect } from 'react';
import { fetchUserAddresses } from './api/distanceCalculations';
import { getCurrentUserId } from './api/users';


const ListPage = () => {
  const [addresses, setAddresses] = useState([]);
  const userId = getCurrentUserId();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await fetchUserAddresses(userId);
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [userId]);

  
  return (
    <div>
    <h1>List Page!</h1>
    {addresses.map((address, index) => (
      <div key={index}>
        {address.address_1} to {address.address_2} - Distance: {address.distance} miles
      </div>
    ))}
  </div>
  );
}

export default ListPage;