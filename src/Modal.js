import React from "react";

const Modal = ({ details, onClose }) => (
  <div
    style={{
      display: "flex",
      position: "fixed",
      zIndex: 1,
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      overflow: "auto",
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        margin: "15% auto",
        padding: "20px",
        border: "solid",
        width: 500,
        height: 200,
      }}
    >
      <div
        style={{
          display: "block",
          textAlign: "right",
          marginBottom: "10px",
        }}
      >
        <button onClick={onClose}> X </button>
      </div>
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 20,
          fontWeight: 500,
        }}
      >
        {details.first_name} {details.last_name}
      </p>
      <p> {details.address1} </p>
      <p>
        {details.city}, {""} {details.state} {details.zip_code}
      </p>
      <p> {details.email} </p> <p> {details.phone} </p>
    </div>
  </div>
);

export default Modal;
