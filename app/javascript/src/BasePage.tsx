import React from 'react';
import BackButton from './components/BackButton';
import { createUseStyles } from 'react-jss';

interface PageProps {
  children: React.ReactNode;
  backBtn?: boolean;
}

export default function BasePage({ children, backBtn }: PageProps) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <header className={classes.pageHeader}>
        <h1 className={classes.title}>Distance Calculator</h1>
        {backBtn && <BackButton />}
      </header>
      <div className={classes.content}>
        {children}
      </div>
    </div>
  );
}

BasePage.defaultProps = {
  backBtn: true,
};

const useStyles = createUseStyles({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000080',
    padding: '10px 40px',
    height: '60px',
  },
  title: {
    margin: 0,
    color: 'white',
    fontSize: '36px',
    fontFamily: 'Poppins, sans-serif',
  },
  content: {
    padding: '20px',
  },
});