import React, { useContext, useState, useEffect } from "react";
import "./PasswordSlideContainer.css";
import PassLengthAdjuster from "./PassLengthAdjuster.js";
import Slider from "./Slider.js";
import { GlobalContext } from "../../GlobalContext.js";
import { generateRandomPassword } from "../Utils/PasswordGenerator.js";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

const PasswordSlideContainer = () => {
  const { checkboxState, setCheckboxState } = useContext(GlobalContext);
  const [checkedCount, setCheckedCount] = useState(0);
  const { sliderValue, updateSliderValue } = useContext(GlobalContext);
  const { updateGeneratedPassword } = useContext(GlobalContext);
  const [checkboxUpdate, setCheckboxUpdate] = useState(false);

  const handleSliderChange = (event, newValue) => {
    const newPass = generateRandomPassword(newValue, checkboxState);

    // Update the slider
    updateSliderValue(newValue);

    // update generated password in global state
    updateGeneratedPassword(newPass);
  };

  const handleInputChange = (newValue) => {
    // Convert newValue to a number using parseFloat or parseInt
    const numericValue = parseFloat(newValue);
    updateSliderValue(numericValue); // Update slider value
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedCheckboxState = { ...checkboxState, [name]: checked };

    if (Object.values(updatedCheckboxState).some((value) => value)) {
      // At least one checkbox is checked, update state
      setCheckboxState(updatedCheckboxState);
    }

    // Update checkbox state
    setCheckboxState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    console.log(checkedCount);

    if (checkedCount === 1) {
      console.log();

      setCheckboxState((prevState) => ({
        ...prevState,
        [name]: true,
      }));

      setCheckboxUpdate(true);
    }

    // Set checkboxUpdate flag to true to trigger password update
    setCheckboxUpdate(true);

    console.log("Checkbox state update for checkbox: ", name);
  };

  useEffect(() => {
    let initialCheckedCount = 0;

    Object.values(checkboxState).forEach((isChecked) => {
      if (isChecked) initialCheckedCount++;
    });
    setCheckedCount(initialCheckedCount);

    // Generate password only if the update is due to checkbox change
    if (checkboxUpdate) {
      const newPass = generateRandomPassword(sliderValue, checkboxState);
      updateGeneratedPassword(newPass);
      // Reset checkboxUpdate flag after generating password
      setCheckboxUpdate(false);
    }
  }, [checkboxState, sliderValue, updateGeneratedPassword, checkboxUpdate]);

  return (
    <>
      <div className="main-container">
        <div className="main-length-slider-container">
          <div className="length-container">
            <PassLengthAdjuster
              value={sliderValue.toString()} // Pass string value to match input type
              onInputChange={handleInputChange} // Pass handler to update slider value
            />
          </div>
          <div className="slider-container">
            <Slider
              value={sliderValue}
              onChange={handleSliderChange}
              defaultValue={sliderValue}
              min={0}
              max={50}
              aria-labelledby="continuous-slider"
            />
          </div>
        </div>

        <div className="main-checkbox-container">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="uppercase"
                  checked={checkboxState.uppercase}
                  onChange={handleCheckboxChange}
                />
              }
              label="Uppercase"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="lowercase"
                  checked={checkboxState.lowercase}
                  onChange={handleCheckboxChange}
                />
              }
              label="Lowercase"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="numbers"
                  checked={checkboxState.numbers}
                  onChange={handleCheckboxChange}
                />
              }
              label="Numbers"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="symbols"
                  checked={checkboxState.symbols}
                  onChange={handleCheckboxChange}
                />
              }
              label="Symbols"
            />
          </FormGroup>
        </div>
      </div>
    </>
  );
};

export default PasswordSlideContainer;
