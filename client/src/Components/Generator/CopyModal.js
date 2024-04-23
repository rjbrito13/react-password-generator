import React, { useContext, useEffect } from "react";
import "./CopyModal.css";
import { GlobalContext } from "../../GlobalContext.js"; // Assuming your GlobalContext is imported

const CopyModal = ({ showModal, copyText }) => {
  const { setModalVisibility } = useContext(GlobalContext);

  const closeModal = () => {
    setModalVisibility(false);
  };

  // Add event listener to detect clicks outside modal content
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const modalContent = document.querySelector(".modal-content");
      if (modalContent && !modalContent.contains(event.target)) {
        // Clicked outside modal content, close modal
        setModalVisibility(false);
      }
    };

    if (showModal) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showModal, setModalVisibility]);

  return (
    showModal && (
      <div className="modal">
        <div className="modal-content">
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
          <img src="/password.png" className="pass-icon" alt="" />
          <p>{copyText}</p>
          <img src="/accept.png" className="checkmark" alt="" />
        </div>
      </div>
    )
  );
};

export default CopyModal;
