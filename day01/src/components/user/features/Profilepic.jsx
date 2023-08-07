import React, { useState } from "react";
import { Button } from "react-bootstrap";

function Profilepic({ onProfilePicChange }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handlingSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      onProfilePicChange(selectedFile);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handlingSubmit}>
          <label htmlFor="profile"> Upload Profile Pic :</label>
          <input
            id="profile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </form>
      </div>
      <div>
        <Button type="submit" onClick={handlingSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}

export default Profilepic;

