import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./AddEntryModal.css";
import { Button } from "@mui/material";

const AddEntryModal = ({ isOpen, closeModal, onAddNewEntry, entries }) => {
  const [application, setApplication] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      number: Math.max(...entries.map((entry) => entry.number)) + 1,
      application,
      password,
    };
    onAddNewEntry(newEntry);
    setApplication("");
    setPassword("");
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add New Entry Modal"
      overlayClassName="modal-overlay" // Add a class to style the overlay
      style={{
        overlay: { zIndex: 9999 },
        content: {
          width: "50%", // Set the width of the modal
          height: "40%", // Set the height of the modal
          margin: "auto", // Center the modal horizontally
        },
      }}
    >
      <div className="modal-content">
        <h2>Add New Entry</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={application}
            onChange={(e) => setApplication(e.target.value)}
            placeholder="Application"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button type="submit" variant="contained">
            Add New Entry
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddEntryModal;
