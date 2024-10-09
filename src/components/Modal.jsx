import React, { useState } from "react";

function Modal({ closeModal, addGroup }) {
  const [groupName, setGroupName] = useState("");
  const [color, setColor] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName && color) {
      addGroup({ groupName, color });
      closeModal();
    } else {
      alert("Please fill in all fields");
    }
  };

  // CLose Modal On clicking outside Modal
  const handleBackGrounClick = (e) => {
    if(e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  return (
    <>
    <div className="modal" onClick={handleBackGrounClick}>
      <div className="modal-content">
        <h2>Create New Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="grp-name">
          <label>
            <p>Group Name</p>
            <input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </label>
          </div>
          <div className="choose-color">
            <label>
              <p>Choose Colour</p>
              <div className="color-options">
                {["rgba(179, 139, 250, 1)", "rgba(255, 121, 242, 1)", "rgba(67, 230, 252, 1)", "rgba(241, 149, 118, 1)", "rgba(0, 71, 255, 1)", "rgba(102, 145, 255, 1)"].map((col) => (
                  <button
                    key={col}
                    type="button"
                    style={{ 
                      backgroundColor: col,
                    }}
                    className={color === col ? "selected" : ""}
                    onClick={() => setColor(col)}
                  />
                ))}
              </div>
            </label>
          </div>
          <button type="submit" >Create</button>
        </form>
      </div>
    </div>
    
  </>
  );
}

export default Modal;
