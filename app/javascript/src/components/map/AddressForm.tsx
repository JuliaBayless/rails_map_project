// AddressForm.tsx
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

interface IProps {
    onValidSubmit: (startAddress: string, endAddress: string) => void;
}

const AddressForm: React.FC<IProps> = ({ onValidSubmit }) => {
    const classes = useStyles();

    const [startAddress, setStartAddress] = useState<string>('');
    const [endAddress, setEndAddress] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!startAddress.trim() || !endAddress.trim()) {
            alert('Please enter valid addresses!');
            return;
        }

        // Advanced validation can go here...

        onValidSubmit(startAddress, endAddress);
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <input
                className={classes.input}
                type="text"
                value={startAddress}
                onChange={e => setStartAddress(e.target.value)}
                placeholder="Starting Address"
            />
            <input
                className={classes.input}
                type="text"
                value={endAddress}
                onChange={e => setEndAddress(e.target.value)}
                placeholder="Ending Address"
            />
            <input  className={classes.input} type="submit" value="Get Directions" />
        </form>
    );
};

export default AddressForm;

const useStyles = createUseStyles({
    form: {
        marginBottom: '20px'
    },
    input: {
        marginRight: '10px',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        '&[type="submit"]': {
            padding: '8px 15px',
            backgroundColor: '#007BFF',
            color: '#FFF',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            '&:hover': {
                backgroundColor: '#0056b3'
            }
        }
    }
  });