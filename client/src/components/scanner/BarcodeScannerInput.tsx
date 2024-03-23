import React, { useState, useEffect } from "react";

interface Props {
  onScan: (value: string) => void;
}

function BarcodeScannerInput({ onScan }: Props) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleKeyPress = (e: any) => {
      // If Enter key is pressed
      if (e.key === "Enter") {
        // Prevent the form from being submitted
        e.preventDefault();
        // Call the onScan prop with the scanned value
        onScan(input);
        // Reset input for the next scan
        setInput("");
      } else {
        // Concatenate the pressed key to the input state
        setInput((prev) => `${prev}${e.key}`);
      }
    };

    // Attach the event listener to the window object
    window.addEventListener("keypress", handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [input, onScan]);

  return null;
}

export default BarcodeScannerInput;
