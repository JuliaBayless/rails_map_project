import React, { useState, useEffect } from 'react';
import { fetchUserAddresses, deleteUserAddress, updateUserAddress } from './api/distanceCalculations';
import { getCurrentUserId } from './api/users';
import { formatDistanceFromDecimal } from './utilities';
import { useNavigate } from 'react-router-dom';

const ListPage = () => {
  const navigate = useNavigate();
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

  const handleDelete = async (id: number) => {
    try {
      await deleteUserAddress(id);
      setAddresses(prevAddresses => prevAddresses.filter(address => address.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Error deleting address, please try again later.");
    }
  };


  const handleEdit = async (id: number) => {
    console.log("Edit address with id:", id)
    navigate(`/MapPage/${id}`);
  };

  return (
    <div>
      <h1>List Page!</h1>
      <table>
        <thead>
          <tr>
            <th>Address 1</th>
            <th>Address 2</th>
            <th>Distance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address) => (
            <tr key={address.id}>
              <td>{address.address_1}</td>
              <td>{address.address_2}</td>
              <td>{formatDistanceFromDecimal(address.distance)} miles</td>
              <td>
                <button onClick={() => handleEdit(address.id)}>Edit</button>
                <button onClick={() => handleDelete(address.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPage;
