import React from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MuiPhoneNumber from "material-ui-phone-number";

const Form = ({
  openModal,
  closeModal,
  edit,
  handleSubmit,
  contact,
  setContact,
}) => {
  const { name, number } = contact;
  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={edit ? () => handleSubmit(contact) : handleSubmit}
        className="form"
      >
        <TextField
          id="outlined-basic"
          label="Enter your name"
          variant="outlined"
          type="text"
          value={name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          required
          fullWidth
        />
        <br />
        <MuiPhoneNumber
          defaultCountry={"in"}
          label="Enter your number"
          value={number}
          onChange={(value) => setContact({ ...contact, number: value })}
          variant="outlined"
          required
          fullWidth
        />

        <br />
        <Button type="submit" variant="contained">
          {edit ? "Update" : "Add"}
        </Button>
      </form>
    </Modal>
  );
};

export default Form;
