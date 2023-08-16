import React, { useState, useEffect } from "react";
import {
  fetchUserAddresses,
  deleteUserAddress,
} from "./api/distanceCalculations";
import { getCurrentUserId } from "./api/users";
import { formatDistanceFromDecimal } from "./utilities";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";

const ListPage = () => {
  const navigate = useNavigate();
  const classes = useStyles();
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
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== id),
      );
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Error deleting address, please try again later.");
    }
  };

  const handleEdit = async (id: number) => {
    navigate(`/MapPage/${id}`);
  };

  return (
    <div className={classes.container}>
      <h1>List Page!</h1>
      <table className={classes.table}>
        <thead className={classes.header}>
          <tr>
            <th className={classes.cell}>Title</th>
            <th className={classes.cell}>Address 1</th>
            <th className={classes.cell}>Address 2</th>
            <th className={classes.cell}>Distance</th>
            <th className={classes.cell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address) => (
            <tr key={address.id} className={classes.row}>
              <td className={classes.cell}>{address.title}</td>
              <td className={classes.cell}>{address.address_1}</td>
              <td className={classes.cell}>{address.address_2}</td>
              <td className={classes.cell}>
                {formatDistanceFromDecimal(address.distance)} miles
              </td>
              <td className={`${classes.cell} ${classes.actions}`}>
                <button
                  className={`${classes.actionButton} ${classes.editButton}`}
                  onClick={() => handleEdit(address.id)}
                >
                  Edit
                </button>
                <button
                  className={`${classes.actionButton} ${classes.editButton} ${classes.deleteButton}`}
                  onClick={() => handleDelete(address.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPage;

const useStyles = createUseStyles({
  container: {
    margin: "20px auto",
    maxWidth: "90%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  header: {
    backgroundColor: "#3f51b5", 
  },
  row: {
    "&:nth-child(odd)": {
      backgroundColor: "#f5f5f5",
    },
  },
  cell: {
    padding: "12px 20px",
    border: "1px solid #e0e0e0",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    margin: "0 5px",
  },
  editButton: {
    padding: "8px 15px",
    backgroundColor: "#009a00",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontFamily: "outfit, sans-serif",
    "&:hover": {
      backgroundColor: "#008100",
    },
    alignSelf: "center",
    width: "80%",
  },
  deleteButton: {
    backgroundColor: "#d11a2a",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#962a1a",
    },
  },
});
