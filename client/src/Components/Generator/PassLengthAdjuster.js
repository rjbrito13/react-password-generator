import React, { useEffect, useState, useContext } from "react";
import { unstable_useNumberInput as useNumberInput } from "@mui/base/unstable_useNumberInput";
import { styled } from "@mui/system";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import { GlobalContext } from "../../GlobalContext.js";
import { generateRandomPassword } from "../Utils/PasswordGenerator.js";

const CustomNumberInput = React.forwardRef(function CustomNumberInput(
  props,
  ref
) {
  const {
    getRootProps,
    getInputProps,

    focused,
  } = useNumberInput(props);

  const { updateSliderValue } = useContext(GlobalContext);
  const { updateGeneratedPassword } = useContext(GlobalContext);
  const { checkboxState } = useContext(GlobalContext);
  const inputProps = getInputProps();
  const handleRef = useForkRef(inputProps.ref, ref);

  inputProps.ref = useForkRef(inputProps.ref, ref);

  const handleIncrement = () => {
    var newValue = parseFloat(inputProps.value || 0) + 1;

    if (newValue > 50) {
      newValue = 50;
    }

    const newPass = generateRandomPassword(newValue, checkboxState);
    updateSliderValue(newValue);
    updateGeneratedPassword(newPass);

    props.onInputChange(newValue);
    console.log(newValue);
  };

  

  const handleDecrement = () => {
    var newValue = parseFloat(inputProps.value || 0) - 1;
    if(newValue > 50) {
      newValue = 50;
    }
    if (newValue < 0) {
      newValue = 0;
    }

    const newPass = generateRandomPassword(newValue, checkboxState);
    updateSliderValue(newValue);
    updateGeneratedPassword(newPass);

    props.onInputChange(newValue);
    console.log(newValue);
  };

  const handleInputClick = () => {
    const newValue = parseFloat(props.value || 0);
    console.log(newValue);
    props.onInputChange(newValue);
  };

  const handleInputChange = (e) => {
    var newValue = parseFloat(e.target.value);

    if(newValue > 50) {
      newValue = 50;
    }

    const newPass = generateRandomPassword(newValue, checkboxState);

    updateSliderValue(newValue);
    updateGeneratedPassword(newPass);

    props.onInputChange(newValue);
  };

  return (
    <StyledInputRoot {...getRootProps()} className={focused ? "focused" : null}>
      <StyledStepperButton onClick={handleIncrement} className="increment">
        ▴
      </StyledStepperButton>
      <StyledStepperButton onClick={handleDecrement} className="decrement">
        ▾
      </StyledStepperButton>
      <StyledInputElement
        {...inputProps}
        ref={handleRef}
        onClick={handleInputClick}
        onChange={handleInputChange}
      />
    </StyledInputRoot>
  );
});

export default function PassLengthAdjuster({ value, onInputChange }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value); // Sync initial value with prop value
  }, [value]);

  const handleChange = (newValue) => {
    if (newValue < 0) {
      newValue = 1;
    }
    if (newValue > 100) {
      newValue = 85;
    }

    setInputValue(newValue);
    onInputChange(newValue); // Notify parent component of the change
  };

  return (
    <CustomNumberInput
      aria-label="Demo number input"
      placeholder="Type a number…"
      value={inputValue}
      onInputChange={handleChange}
    />
  );
}

const blue = {
  100: "#DAECFF",
  200: "#B6DAFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 1px;
  padding: 4px;
  

    &.focused {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[700] : blue[200]
      };

      & button:hover {
        background: ${blue[400]};
      }
      // firefox
      &:focus-visible {
        outline: 0;
    }
  `
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
  font-size: 1.3rem;
  font-family: inherit;
  font-weight: 600;
  
  width: 60px;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`
);

const StyledStepperButton = styled("button")(
  ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 19px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 0;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  visibility: hidden;
  

    &.increment {
      grid-column: 2/3;
      grid-row: 1/2;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border: 1px solid;
      border-bottom: 0;
      border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
      background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
      color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    

      &:hover {
        cursor: pointer;
        color: #FFF;
        background: ${theme.palette.mode === "dark" ? blue[600] : blue[500]};
        border-color: ${theme.palette.mode === "dark" ? blue[400] : blue[600]};
      }
    }

    &.decrement {
      grid-column: 2/3;
      grid-row: 2/3;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border: 1px solid;
      border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
      background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
      color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};

      &:hover {
        cursor: pointer;
        color: #FFF;
        background: ${theme.palette.mode === "dark" ? blue[600] : blue[500]};
        border-color: ${theme.palette.mode === "dark" ? blue[400] : blue[600]};
      }
  }


  `
);
