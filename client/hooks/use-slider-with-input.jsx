"use client";

import { useState, useCallback } from "react";

export function useSliderWithInput({ minValue, maxValue, initialValue }) {
  const [sliderValues, setSliderValues] = useState(initialValue);
  const [inputValues, setInputValues] = useState([
    initialValue[0].toString(),
    initialValue[1].toString(),
  ]);

  const handleSliderChange = useCallback((newValue) => {
    setSliderValues(newValue);
    setInputValues([newValue[0].toString(), newValue[1].toString()]);
  }, []);

  const handleInputChange = useCallback(
    (e, index) => {
      const newInputValues = [...inputValues];
      newInputValues[index] = e.target.value;
      setInputValues(newInputValues);
    },
    [inputValues]
  );

  const validateAndUpdateValue = useCallback(
    (value, index) => {
      let numValue = Number.parseFloat(value);
      if (isNaN(numValue)) {
        numValue = sliderValues[index];
      }
      numValue = Math.min(Math.max(numValue, minValue), maxValue);

      const newSliderValues = [...sliderValues];
      newSliderValues[index] = numValue;

      if (index === 0 && numValue > sliderValues[1]) {
        newSliderValues[1] = numValue;
      } else if (index === 1 && numValue < sliderValues[0]) {
        newSliderValues[0] = numValue;
      }

      setSliderValues(newSliderValues);
      setInputValues([
        newSliderValues[0].toString(),
        newSliderValues[1].toString(),
      ]);
    },
    [minValue, maxValue, sliderValues]
  );

  return {
    sliderValues,
    inputValues,
    handleSliderChange,
    handleInputChange,
    validateAndUpdateValue,
  };
}
