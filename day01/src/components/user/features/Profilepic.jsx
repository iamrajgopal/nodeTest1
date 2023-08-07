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
      const reader = new FileReader();
      reader.onload = (e) => {
        // Save the selected file data as a data URL
        localStorage.setItem("profilePic", e.target.result);
        onProfilePicChange(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveProfile = () => {
    localStorage.removeItem("profilePic");
    setSelectedFile(null);
    onProfilePicChange(null);
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
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={handleRemoveProfile}>
            Remove Profile
          </Button>
        </form>
      </div>
    </>
  );
}

export default Profilepic;
