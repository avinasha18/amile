import {
  createInternship,
  findInternshipById,
  getAllInternships,
  updateInternship,
  deleteInternship,
  Internship
} from '../models/intern.model.js';
export const getAllInternshipsController = async (req, res) => {
  const { page = 1, limit = 10, search, ...query } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const limitNumber = parseInt(limit);

  // Construct filter query
  const filterQuery = {};
  if (query.type) filterQuery.type = query.type;
  if (query.modeOfWork) filterQuery.modeOfWork = query.modeOfWork;

  // Only set filter if a meaningful stipend value is provided
  if (query.stipend && parseInt(query.stipend) > 0) {
    filterQuery.stipend = { $gte: parseInt(query.stipend) };
  }

  // Only set filter if a meaningful hours value is provided
  if (query.hours && parseInt(query.hours) > 0) {
    filterQuery.hours = { $lte: parseInt(query.hours) };
  }

  if (query.startDate) filterQuery.startDate = { $gte: new Date(query.startDate) };
  
  if (query.skillsRequired && query.skillsRequired.length > 0) {
    const skillsArray = query.skillsRequired.split(',').map((skill) => skill.trim());
    filterQuery.skillsRequired = {
      $in: skillsArray.map((skill) => new RegExp(`^${skill}$`, 'i')),
    };
  }
  

  // Add search functionality
  if (search) {
    filterQuery.$or = [
      { role: { $regex: search, $options: 'i' } },           // Case-insensitive search for job role
      { companyName: { $regex: search, $options: 'i' } },    // Case-insensitive search for company name
      { responsibilities: { $regex: search, $options: 'i' } }, // Case-insensitive search for responsibilities
      { qualifications: { $regex: search, $options: 'i' } }  // Case-insensitive search for qualifications
    ];
  }
  
  try {
    console.log(filterQuery)
    const totalInternships = await Internship.countDocuments(filterQuery);
    const internships = await getAllInternships(filterQuery, skip, limitNumber);
    const totalPages = Math.ceil(totalInternships / limitNumber);
    console.log(totalInternships)
    res.status(200).json({ internships, totalPages });
  } catch (error) {
    console.error('Error fetching internships:', error.message);
    res.status(500).json({ error: `Error: ${error.message}` });
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
    res.status(200).json(updatedInternship);
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
