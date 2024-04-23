import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [modalVisible, setModalVisibility] = useState("");

  const [sliderValue, setSliderValue] = useState(25); // Initial slider value
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [checkboxState, setCheckboxState] = useState({
    uppercase: true,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const updateModalVisible = (modalVisible) => {
    setModalVisibility(modalVisible);
  };

  const updateSliderValue = (newValue) => {
    setSliderValue(newValue);
  };

  const updateGeneratedPassword = (password) => {
    setGeneratedPassword(password);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setCheckboxState({ ...checkboxState, [name]: checked });
  };

  return (
    <GlobalContext.Provider
      value={{
        updateModalVisible,
        modalVisible,
        setModalVisibility,
        sliderValue,
        updateSliderValue,
        generatedPassword,
        updateGeneratedPassword,
        checkboxState,
        setCheckboxState,
        handleCheckboxChange,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
