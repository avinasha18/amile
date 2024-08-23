import {
  createInternship,
  findInternshipById,
  getAllInternships,
  updateInternship,
  deleteInternship,
} from "../models/intern.model.js";

export const getAllInternshipsController = async (req, res) => {
  console.log("in all intern");
  const { page = 1, limit = 10, ...query } = req.query;
  try {
    const internships = await getAllInternships(
      query,
      parseInt(page),
      parseInt(limit)
    );
    res.status(200).json(internships);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

export const getInternshipByIdController = async (req, res) => {
  try {
    const internship = await findInternshipById(req.params.id);
    if (!internship) return res.status(404).send("Internship not found");
    res.status(200).json(internship);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

export const createInternshipController = async (req, res) => {
  try {
    await createInternship(req.body);
    res.status(201).send("Internship created successfully");
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

export const updateInternshipController = async (req, res) => {
  try {
    const updatedInternship = await updateInternship(req.params.id, req.body);
    if (!updatedInternship) return res.status(404).send("Internship not found");
    res.status(200).send("Internship updated successfully");
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

export const deleteInternshipController = async (req, res) => {
  try {
    const result = await deleteInternship(req.params.id);
    if (!result) return res.status(404).send("Internship not found");
    res.status(200).send("Internship deleted successfully");
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
