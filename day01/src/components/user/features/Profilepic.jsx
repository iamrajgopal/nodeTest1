import React, { useState } from "react";
import { Button } from "react-bootstrap";

function Profilepic() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handlingSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      const imagePath = URL.createObjectURL(selectedFile);
      localStorage.setItem("profilePicUrl", imagePath); 
    }
  };

  const handleRemoveProfile = () => {
    localStorage.removeItem("profilePicUrl");
    setSelectedFile(null);
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
