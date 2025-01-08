import express from "express";
import Application from "../models/application_model.js";

const application_router = express.Router();

application_router.post("/application", async (req, res) => {
  const { post_id, applier_id, role, motivation } = req.body;
  try {
    const application = { post_id, applier_id, role, motivation };
    const createdApplication = await Application.create(application);
    console.log("Application added");
    res.status(201).json(createdApplication);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating application");
  }
});

application_router.get("/application", async (req, res) => {
  try {
    const applications = await Application.find();
    if (!applications || applications.length === 0) {
      return res.status(404).send("No applications found");
    }
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching applications");
  }
});

application_router.get("/application/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).send("Application not found");
    }
    res.status(200).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching application");
  }
});

application_router.put("/application/:id", async (req, res) => {
  const { id } = req.params;
  const allowedFields = ["role", "motivation"];
  const updates = Object.keys(req.body).reduce((obj, key) => {
    if (allowedFields.includes(key)) {
      obj[key] = req.body[key];
    }
    return obj;
  }, {});

  try {
    const updatedApplication = await Application.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedApplication) {
      return res.status(404).send("Application not found");
    }
    res.status(200).json({
      message: "Application updated successfully",
      updatedApplication,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating application");
  }
});

application_router.delete("/application/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Application.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send("Application not found");
    }
    console.log("Application deleted");
    res.status(200).send("Deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting application");
  }
});

export default application_router;
