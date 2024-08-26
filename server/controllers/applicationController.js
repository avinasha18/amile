import { Government, GovernmentApplication } from "../models/government.model.js";
import { Application, Internship } from "../models/intern.model.js";
import { ObjectId } from 'mongodb';

export const createApplicationController = async (req, res) => {
  const { internshipId, studentId, companyId } = req.body;

  try {
    const existingApplication = await Application.findOne({
      internshipId: new ObjectId(internshipId),
      studentId: new ObjectId(studentId)
    });

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this internship" });
    }

    const newApplication = new Application({
      internshipId: new ObjectId(internshipId),
      studentId: new ObjectId(studentId),
      companyId: new ObjectId(companyId),
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};


export const getStudentApplicationsController = async (req, res) => {
  const { studentId } = req.params;

  try {
    const applications = await Application.find({
      $or: [
        { studentId: studentId },
        { studentId: new ObjectId(studentId) }
      ]
    }).lean();

    const appliedInternshipsWithDetails = await Promise.all(applications.map(async (application) => {
      const internship = await Internship.findById(application.internshipId).lean();
      return {
        ...internship,
        applicationStatus: application.status,
        appliedAt: application.appliedAt
      };
    }));

    const govtApplications = await GovernmentApplication.find({
      $or: [
        { studentId: studentId },
        { studentId: new ObjectId(studentId) }
      ]
    }).lean();
    const govtAppliedInternshipsWithDetails = await Promise.all(govtApplications.map(async (application) => {
      const job = await Government.find({_id : application.internshipId}).lean();
      return {
        ...job,
        applicationStatus: application.status,
        appliedAt: application.appliedAt
      };
    }));

    res.status(200).json({ appliedInternshipsWithDetails, govtAppliedInternshipsWithDetails });
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

export const getCompanyApplicantsController = async (req, res) => {
  const { companyId } = req.params;

  try {
    const applications = await Application.find({
      $or: [
        { companyId: companyId },
        { companyId: new ObjectId(companyId) }
      ]
    })
      .populate('studentId')
      .populate('internshipId');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

export const updateApplicationStatusController = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
