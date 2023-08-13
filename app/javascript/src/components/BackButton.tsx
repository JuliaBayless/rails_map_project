// BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createUseStyles } from 'react-jss';

const BackButton = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <div className={classes.btnContainer}>
    <button type="button" onClick={() => navigate(-1)}>
      <ArrowBackIosIcon />
    </button>
  </div>
  );
}

export default BackButton;

const useStyles = createUseStyles({
    btnContainer: {
      backgroundColor: 'white',
      border: '1px solid black',
      color: 'white',
      cursor: 'pointer',
      justifyContent: 'center',
    //   padding: '.4rem .8rem',
      borderRadius: '4px',
    },
  });
  