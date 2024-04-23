import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalContext } from "../../GlobalContext.js";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import "./Gencontainer.css";
import { generateRandomPassword } from "../Utils/PasswordGenerator.js";
import CopyModal from "./CopyModal.js";

const Gencontainer = () => {
  const copyText = "Password Successfully Copied!!";
  const isInitialMount = useRef(true);
  const [clicked, setClicked] = useState(false);
  const { sliderValue } = useContext(GlobalContext);
  const { checkboxState } = useContext(GlobalContext);
  const { generatedPassword, updateGeneratedPassword } =
    useContext(GlobalContext);

  const { modalVisible, updateModalVisible } = useContext(GlobalContext);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const newPass = generateRandomPassword(sliderValue, checkboxState);
      updateGeneratedPassword(newPass);
    }
  }, [sliderValue, updateGeneratedPassword, checkboxState]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generatedPassword)
      .then(() => {
        console.log("Copied to clipboard");
        setClicked(true);
        updateModalVisible(true);

        setTimeout(() => {
          setClicked(false);
        }, 150);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };

  const closeModal = () => {
    updateModalVisible(false);
  };

  useEffect(() => {
    // Cleanup function to clear the timeout when component unmounts
    return () => {
      clearTimeout();
    };
  }, []);

  return (
    <>
      <div className="gen-container">
        <h2 className="gen-pass-output">{generatedPassword}</h2>
        <Tooltip title="Copy" onClick={() => copyToClipboard()}>
          <ContentCopyOutlinedIcon
            sx={{
              marginLeft: "10px",
              marginRight: "20px",
              color: clicked ? "blue" : null,
            }}
          />
        </Tooltip>

        <CopyModal
          showModal={modalVisible}
          copyText={copyText}
          onClick={closeModal}
        ></CopyModal>
      </div>
    </>
  );
};

export default Gencontainer;
