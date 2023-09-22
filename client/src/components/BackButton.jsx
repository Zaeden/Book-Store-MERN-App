import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigation = useNavigate();

  return (
    <>
      <button
        className="border border-red-600 bg-red-600 text-white p-2 rounded-full"
        onClick={(e) => {
          navigation("/");
        }}
      >
        Back to Home
      </button>
    </>
  );
};

export default BackButton;
