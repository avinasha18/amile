import {
  createInternship,
  findInternshipById,
  getAllInternships,
  updateInternship,
  deleteInternship,
  Internship,
  Application,
  findInternshipByUserName
} from '../models/intern.model.js';

export const getAllInternshipsController = async (req, res) => {
  const { page = 1, limit = 10, search, userId, ...query } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const limitNumber = parseInt(limit);

  // Construct filter query
  const filterQuery = {};
  if (query.type) filterQuery.type = query.type;
  if (query.modeOfWork) filterQuery.modeOfWork = query.modeOfWork;
  if (query.stipend && parseInt(query.stipend) > 0) {
    filterQuery.stipend = { $gte: parseInt(query.stipend) };
  }
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
      { role: { $regex: search, $options: 'i' } },
      { companyName: { $regex: search, $options: 'i' } },
      { responsibilities: { $regex: search, $options: 'i' } },
      { qualifications: { $regex: search, $options: 'i' } },
    ];
  }

  // Exclude internships that the current user has already applied for
  if (userId) {
    try {
      const appliedInternships = await Application.find({ studentId: userId }).select('internshipId');
      const appliedInternshipIds = appliedInternships.map(app => app.internshipId);
      filterQuery._id = { $nin: appliedInternshipIds };
    } catch (error) {
      console.error('Error fetching user applications:', error.message);
      return res.status(500).json({ error: `Error: ${error.message}` });
    }
  }

  try {
    const totalInternships = await Internship.countDocuments(filterQuery);
    const internships = await Internship.find(filterQuery).skip(skip).limit(limitNumber);
    const totalPages = Math.ceil(totalInternships / limitNumber);
    res.status(200).json({ internships, totalPages });
  } catch (error) {
    console.error('Error fetching internships:', error.message);
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};

export const getInternshipByIdController = async (req, res) => {
  try {
    console.log(req.params.id)
    const internship = await findInternshipByUserName(req.params.id);
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
