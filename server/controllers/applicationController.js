import { Government, GovernmentApplication } from "../models/government.model.js";
import { Application, Internship } from "../models/intern.model.js";
import { ObjectId } from 'mongodb';
import { sendEmail } from "../services/mailServices.js";
import { Student } from "../models/auth.model.js";
import { HtmlTemplates } from "../services/htmlTemplates.js";

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

    const {name, email} = await  Student.findById(studentId,"name email");
    const {companyName, role} = await Internship.findById(internshipId);
    const subject = "Application submitted successfully";
    await newApplication.save();
    await  sendEmail(email,subject, HtmlTemplates.appliedInternship(name,role,companyName))




    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.log(error);
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
  const { companyId } = req;
  try {
    const applications = await Application.find({
      $or: [
        { companyId: companyId },
        { companyId: new ObjectId(companyId) }
      ]
    })
      .populate('studentId')
      .populate('internshipId');
    res.json({success:true,data:applications});
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


export const getApplicationStatistics = async (req, res) => {
  try {
    const userId = req.params.userId;
    const totalApplications = await Application.countDocuments({ studentId: userId });
    const acceptedApplications = await Application.countDocuments({ studentId: userId, status: 'selected' });
    const rejectedApplications = await Application.countDocuments({ studentId: userId, status: 'rejected' });
    const pendingApplications = await Application.countDocuments({ studentId: userId, status: 'pending' });

    res.json({
      totalApplications,
      acceptedApplications,
      rejectedApplications,
      pendingApplications,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch application statistics' });
  }
};
