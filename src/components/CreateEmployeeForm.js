import React, { useState } from "react";
import {
  Button,
  FormControl,
  Container,
  Typography,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const CreateEmployeeForm = () => {
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  const [open, setOpen] = React.useState(false);
  const [snackbarState, setsnackbarState] = React.useState("success");

  const handleSnackbar = (state) => {
    setOpen(true);
    setsnackbarState(state);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const validateForm = (data) => {
    const errors = {
      firstName:
        !data.get("firstName") ||
        data.get("firstName").length < 4 ||
        data.get("firstName").length > 25,
      lastName:
        !data.get("lastName") ||
        data.get("lastName").length < 4 ||
        data.get("lastName").length > 25,
      email: !data.get("email"),
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = new FormData(e.target);

    console.log(
      employeeData.get("firstName"),
      employeeData.get("lastName"),
      employeeData.get("email")
    );

    if (validateForm(employeeData)) {
      axios
        .post(`${process.env.HOST_API}/employees/employeedetails`, {
          firstName: employeeData.get("firstName"),
          lastName: employeeData.get("lastName"),
          email: employeeData.get("email"),
        })
        .then((response) => {
          console.log(response);
          handleSnackbar("success");
        })
        .catch((error) => {
          console.error(error);
          handleSnackbar("error");
        });
    }
  };

  return (
    <Container sx={{ pt: 8 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
        }}
      >
        Create Employee
      </Typography>

      <FormControl
        onSubmit={handleSubmit}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
        }}
      >
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          variant="outlined"
          helperText={
            formErrors.firstName
              ? "First name is required and must be 4-25 characters long"
              : "Minimum 4, maximum of 25 letters"
          }
          type="name"
          inputProps={{ minLength: 4, maxLength: 25 }}
          error={formErrors.firstName}
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          variant="outlined"
          helperText={
            formErrors.lastName
              ? "Last name is required and must be 4-25 characters long"
              : "Minimum 4, maximum of 25 letters"
          }
          type="name"
          inputProps={{ minLength: 4, maxLength: 25 }}
          error={formErrors.lastName}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          helperText={
            formErrors.email
              ? "Email is required"
              : "Enter a valid email address"
          }
          type="email"
          error={formErrors.email}
        />
        <Button variant="contained" type="submit">
          Create Employee
        </Button>
      </FormControl>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbarState}
          sx={{ width: "100%" }}
        >
          {snackbarState === "success"
            ? "Employee created successfully"
            : "Error creating employee"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateEmployeeForm;
