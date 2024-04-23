import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Paper,
  Fade,
  Button,
  Box,
  Snackbar,
} from "@mui/material";

import "./PasswordVault.css";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddEntryModal from "../Components/Vault/AddEntryModal";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const PasswordVault = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backendData, setbackendData] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Simulate waiting for 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const response = await fetch("/api");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setbackendData(data.apps);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const [entries, setEntries] = useState([
    { number: 1, application: "facebook", password: "jskdlfjsd" },
    { number: 2, application: "twitter", password: "gdfgh3234sf" },
    { number: 3, application: "tiktok", password: "dsfkg@#34jk" },
  ]);
  const [passwordVisibility, setPasswordVisibility] = useState(
    Array(entries.length).fill(false)
  ); // Array to track password visibility for each entry
  const handleDelete = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
    setPasswordVisibility(passwordVisibility.filter((_, i) => i !== index)); // Remove corresponding entry from passwordVisibility array
  };

  const handleTogglePassword = (index) => {
    setPasswordVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility]; // Create a copy of the visibility array
      updatedVisibility[index] = !updatedVisibility[index]; // Toggle the visibility of the password at the specified index
      return updatedVisibility;
    });
  };

  const filteredEntries = entries.filter((entry) =>
    entry.application.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewEntry = (newEntry) => {
    setEntries([...entries, newEntry]);
    setPasswordVisibility([...passwordVisibility, false]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchTerm("");
  };
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCopyPassword = (password) => {
    navigator.clipboard.writeText(password);
    //  setSnackbarMessage("Password copied to clipboard");
    setSnackbarMessage("I love you Trisha");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Fade in={true} timeout={1000}>
      <div>
        <h1 className="vault-title">Password Vault</h1>
        <Box display="flex">
          <TextField
            label="Search Application"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchTermChange}
            style={{
              display: isModalOpen ? "none" : "flex",
              marginTop: "20px",
              marginBottom: "20px",
              marginLeft: "70px",
              width: "20%",
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleOpenModal}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />

          <Button
            onClick={handleOpenModal}
            style={{
              display: isModalOpen ? "none" : "block",
              marginLeft: "15px",
              marginTop: "25px",
              width: "200px",
              height: "45px",
            }}
            variant="contained"
          >
            Add Entry
          </Button>
        </Box>
        <AddEntryModal
          isOpen={isModalOpen}
          closeModal={handleCloseModal}
          onAddNewEntry={handleAddNewEntry}
          entries={entries}
        />

        <div>
          {loading ? (
            <div className="loading-container">
              <div className="loading">Loading...</div>
            </div>
          ) : (
            <TableContainer
              component={Paper}
              style={{
                marginTop: "20px",
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Number</TableCell>
                    <TableCell>Application</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Manage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {backendData.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.number}</TableCell>
                      <TableCell>{entry.application}</TableCell>
                      <TableCell>
                        {passwordVisibility[index]
                          ? entry.password
                          : "********"}
                        <IconButton onClick={() => handleTogglePassword(index)}>
                          {" "}
                          {/* Pass index to handleTogglePassword */}
                          {passwordVisibility[index] ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                        <IconButton
                          onClick={() => handleCopyPassword(entry.password)}
                        >
                          <FileCopyIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleDelete(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        <AddEntryModal
          isOpen={isModalOpen}
          closeModal={handleCloseModal}
          onAddNewEntry={handleAddNewEntry}
          entries={entries}
        />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          style={{
            bottom: "50%",
            left: "50%",
            transform: "translate(110%, -500%)",
          }}
        />
      </div>
    </Fade>
  );
};

export default PasswordVault;
