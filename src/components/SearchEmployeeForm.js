import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Box,
  TextField,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CommentsDisabledOutlined } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  gap: 2,
  display: "flex",
  flexDirection: "column",
};

const SearchEmployeeForm = () => {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchFirstName, setSearchFirstName] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState({});

  useEffect(() => {
    setEmployees([
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "asdfa@dsfsad",
      },
    ]);
    // axios
    //   .get(`${process.env.HOST_API}/employees`)
    //   .then((response) => {
    //     setEmployees(response.data);
    //   })
    //   .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleSearchById = () => {
    axios
      .get(`${process.env.HOST_API}/employees/employee/${searchId}`)
      .then((response) => {
        setEmployees([response.data]);
        alert("Search by ID successful");
      })
      .catch((error) => {
        alert("Search by ID failed");
        console.error("Error fetching data: ", error);
      });
  };

  const handleSearchByFirstName = () => {
    axios
      .get(`${process.env.HOST_API}/employees`, {
        params: { firstName: searchFirstName },
      })
      .then((response) => {
        setEmployees(response.data); // Assuming the response returns an array of employees
      })
      .catch((error) => console.error("Error fetching data: ", error));
  };

  const handleModify = (employee) => {
    setEditingEmployee(employee);
    setEditModalOpen(true);
  };

  const handleSubmitEdit = () => {
    axios
      .put(`${process.env.HOST_API}/employees/employeeinfo`, editingEmployee)
      .then(() => {
        setEditModalOpen(false);
        alert("Edit successful");
      })
      .catch((error) => {
        alert("Error submitting edit PUT request");
        console.error("Error updating data: ", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.HOST_API}/employees/employee/${id}`)
      .then(() => {
        alert("Delete successful");
      })
      .catch((error) => {
        alert("Error submitting delete DELETE request");
        console.error("Error deleting data: ", error);
      });
  };

  const renderEditModal = () => (
    <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
      <Box sx={style}>
        <Typography variant="h6">Edit Employee</Typography>
        <TextField
          label="First Name"
          value={editingEmployee.firstName || ""}
          onChange={(e) =>
            setEditingEmployee({
              ...editingEmployee,
              firstName: e.target.value,
            })
          }
        />
        <TextField
          label="Last Name"
          value={editingEmployee.lastName || ""}
          onChange={(e) =>
            setEditingEmployee({ ...editingEmployee, lastName: e.target.value })
          }
        />
        <TextField
          label="Email"
          value={editingEmployee.email || ""}
          onChange={(e) =>
            setEditingEmployee({ ...editingEmployee, email: e.target.value })
          }
        />
        <Button onClick={handleSubmitEdit} variant="contained">
          Submit
        </Button>
      </Box>
    </Modal>
  );

  return (
    <Container>
      {/* Search form */}
      <Box>
        <Typography variant="h4" sx={{ my: 4 }}>
          Search Employee
        </Typography>

        {/* Search by ID */}
        <Box sx={{ my: 2 }}>
          <TextField
            id="id"
            name="id"
            label="ID"
            variant="outlined"
            helperText={"Enter Employee ID here"}
            type="number"
            inputProps={{ min: "0", max: "9999", step: "1" }}
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button onClick={handleSearchById} variant="contained">
            Search
          </Button>
        </Box>

        {/* Search by First Name */}
        <Box sx={{ my: 2 }}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            helperText={"Minimum 4, maximum of 25 letters"}
            type="name"
            inputProps={{ minLength: 4, maxLength: 25 }}
            value={searchFirstName}
            onChange={(e) => setSearchFirstName(e.target.value)}
          />
          <Button onClick={handleSearchByFirstName} variant="contained">
            Search
          </Button>
        </Box>

        {/* Table for displaying employee data */}
        <TableContainer component={Paper} sx={{ my: 4 }}>
          <Table aria-label="employee table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Modify</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleModify(employee);
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleDelete(employee.id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {renderEditModal()}
    </Container>
  );
};

export default SearchEmployeeForm;
