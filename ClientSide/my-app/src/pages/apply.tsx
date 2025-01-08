import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ApplicationClient } from "../managers/application_manager";

export const ApplyPage = () => {
  const applicationClient = new ApplicationClient()

  const [formData, setFormData] = useState({
    post_id: "",
    applier_id: "",
    role: "",
    motivation: "",
  });
  const location = useLocation(); // Access location object
  const { postId } = location.state || {}; // Get the postId from state

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newApplication = {
      post_id: postId,
      applier_id: formData.applier_id,
      role: formData.role,
      motivation: formData.motivation
    };
    try {
      const createdApplication = await applicationClient.PostApplication(newApplication);
      console.log("Created application:", createdApplication);
      alert("Application created successfully!");
  } catch (error) {
      console.error("Failed to create application:", error);
      alert("Failed to create application.");
  }
    
  };
  return (
    <div>
      <h2>Apply for a post</h2>
      <p>
        ___________________________________________________________________________________________
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Applier id</label>
          <input
            type="text"
            name="applier_id"
            value={formData.applier_id}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Motivation for a role:</label>
          <input
            type="text"
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Apply</button>
        <p>
          ___________________________________________________________________________________________
        </p>
        {}
        <p>
          ___________________________________________________________________________________________
        </p>
      </form>
    </div>
  );
};
