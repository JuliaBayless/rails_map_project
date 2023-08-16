// DirectionsForm.tsx
import React, { ChangeEvent, FormEvent } from "react";
import AddressForm from "./AddressForm";
import { createUseStyles } from "react-jss";

const DirectionsForm: React.FC<{
  onStartAddressChange: (value: string) => void;
  onEndAddressChange: (value: string) => void;
  onValidSubmit: (startAddress: string, endAddress: string) => void;
  handleTitleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSaveToAddressBook: (e: FormEvent) => void;
  startAddress: string;
  endAddress: string;
  title: string;
  routeId?: string;
  showSaveOption: boolean;
}> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <AddressForm
        onValidSubmit={props.onValidSubmit}
        startAddress={props.startAddress}
        endAddress={props.endAddress}
        onStartAddressChange={props.onStartAddressChange}
        onEndAddressChange={props.onEndAddressChange}
      />
      {props.showSaveOption && (
        <div className={classes.saveContainer}>
          <input
            className={classes.input}
            type="text"
            value={props.title}
            onChange={props.handleTitleChange}
            placeholder="Title for this route"
          />
          <button
            className={classes.btn}
            onClick={props.handleSaveToAddressBook}
          >
            {props.routeId ? "Update Address" : "Save to Address Book"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DirectionsForm;

const useStyles = createUseStyles({
  container: {
    padding: "20px",
    display: "flex",
    flexDirection: "row",
  },
  saveContainer: {
    marginBottom: "20px",
    marginLeft: "20px",
    display: "flex",
    flexDirection: "column",
    width: "40%",
  },
  input: {
    marginBottom: "10px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  btn: {
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
});
