import React from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
  container: {
    textAlign: 'center',
    margin: '50px',
  },
  header: {
    color: '#333',
  },
  description: {
    color: '#666',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#FFF',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    margin: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#0056b3',
    }
  },
});

const WelcomePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Welcome to the App!</h1>
      <p className={classes.description}>You've successfully signed in.</p>
      <Link to="/MapPage" className={classes.button}>Go to Map Page</Link>
      <Link to="/list" className={classes.button}>Go to List Page</Link>
    </div>
  );
}

export default WelcomePage;

