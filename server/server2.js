// import mongoose from 'mongoose';
// // import { Application } from './models/intern.model.js';
// import { ObjectId } from 'mongodb';
// import { Government } from './models/government.model.js';
// const dummyData = [
//   {
//     "jobId": "JOB1234",
//     "companyName": "Inspire & Initiate Technologies Pvt Ltd",
//     "jobTitle": "Banking Executive",
//     "jobDescription": "Handling customer transactions and KYC verification at branch locations.",
//     "salary": "210000 - 270000",
//     "numberOfOpenings": 10,
//     "location": ["All India"],
//     "skillsRequired": ["KYC Verification", "Banking", "HS", "Communication"],
//     "qualifications": "Higher Secondary or Graduation",
//     "jobType": "Full Time",
//     "agePreferences": { "min": 18, "max": 30 },
//     "applicationDeadline": "2024-09-24T00:00:00.000Z",
//     "contactDetails": {
//       "personName": "HR Afrin",
//       "mobileNumber": "8481847690",
//       "email": "hr.afrin@inspireinitiate.com"
//     },
//     "benefits": "Medical + P.F. + E.S.I.",
//     "postedAt": "2024-08-26T00:00:00.000Z"
//   },
//   {
//     "jobId": "JOB1235",
//     "companyName": "Baid Fashions Pvt Ltd",
//     "jobTitle": "CASA Officer",
//     "jobDescription": "Managing CASA account openings and customer service.",
//     "salary": "Not Specified",
//     "numberOfOpenings": 5,
//     "location": ["All India"],
//     "skillsRequired": ["CASA", "Banking", "Customer Service"],
//     "qualifications": "Higher Secondary or Graduation",
//     "jobType": "Full Time",
//     "agePreferences": { "min": 20, "max": 35 },
//     "applicationDeadline": "2024-09-30T00:00:00.000Z",
//     "contactDetails": {
//       "personName": "HR Ravi",
//       "mobileNumber": "9123303588",
//       "email": "hr.ravi@baidfashions.com"
//     },
//     "benefits": "Health Insurance",
//     "postedAt": "2024-08-26T00:00:00.000Z"
//   },
//   {
//     "jobId": "JOB1236",
//     "companyName": "Global Aviation Services Pvt Ltd",
//     "jobTitle": "Ground Staff",
//     "jobDescription": "Handling passenger services, ticketing, and luggage management at airports.",
//     "salary": "240000 - 456000",
//     "numberOfOpenings": 15,
//     "location": ["All India"],
//     "skillsRequired": ["Communication", "Customer Service", "Basic Computer Skills"],
//     "qualifications": "12th Pass, Graduation",
//     "jobType": "Full Time",
//     "agePreferences": { "min": 18, "max": 30 },
//     "applicationDeadline": "2024-09-15T00:00:00.000Z",
//     "contactDetails": {
//       "personName": "HR Meena",
//       "mobileNumber": "9147394365",
//       "email": "hr.meena@globalaviation.com"
//     },
//     "benefits": "Medical Insurance",
//     "postedAt": "2024-08-26T00:00:00.000Z"
//   },
//   {
//     "jobId": "JOB1237",
//     "companyName": "Durga Forge Pvt Ltd",
//     "jobTitle": "Data Entry Operator",
//     "jobDescription": "Data entry tasks for bank operations and customer record management.",
//     "salary": "18000 - 25000",
//     "numberOfOpenings": 8,
//     "location": ["All India"],
//     "skillsRequired": ["Data Entry", "Banking", "Basic Computer Knowledge"],
//     "qualifications": "Higher Secondary or Graduation",
//     "jobType": "Full Time",
//     "agePreferences": { "min": 18, "max": 30 },
//     "applicationDeadline": "2024-09-20T00:00:00.000Z",
//     "contactDetails": {
//       "personName": "HR Vishal",
//       "mobileNumber": "7044722339",
//       "email": "hr.vishal@durgaforge.com"
//     },
//     "benefits": "P.F., Health Insurance",
//     "postedAt": "2024-08-26T00:00:00.000Z"
//   },
//   {
//     "jobId": "JOB1238",
//     "companyName": "Manshya Marketing Pvt Ltd",
//     "jobTitle": "KYC Verification Officer",
//     "jobDescription": "Verification of KYC documents for bank customers.",
//     "salary": "Not Specified",
//     "numberOfOpenings": 12,
//     "location": ["Uttar Pradesh", "Bihar", "Jharkhand", "Odisha", "Madhya Pradesh"],
//     "skillsRequired": ["KYC Verification", "Banking", "Customer Interaction"],
//     "qualifications": "12th Pass, Graduation",
//     "jobType": "Full Time",
//     "agePreferences": { "min": 18, "max": 34 },
//     "applicationDeadline": "2024-09-10T00:00:00.000Z",
//     "contactDetails": {
//       "personName": "HR Afrin",
//       "mobileNumber": "8481847690",
//       "email": "hr.afrin@manshyamarketing.com"
//     },
//     "benefits": "Medical + P.F. + E.S.I.",
//     "postedAt": "2024-08-26T00:00:00.000Z"
//   },
//   {
//     "jobId": "JOB1239",
//     "companyName": "Inspire & Initiate Technologies Pvt Ltd",
//     "jobTitle": "Business Development Executive",
//     "jobDescription": "Developing new business opportunities and managing client relations.",
//     "salary": "216000 - 300000",
//     "numberOfOpenings": 6,
//     "location": ["Madhya Pradesh", "Odisha"],
//     "skillsRequired": ["Business Development", "Sales", "Marketing"],
//     "qualifications": "Graduation",
//     "jobType": "Full Time",
//     "agePreferences": { "min": 22, "max": 35 },
//     "applicationDeadline": "2024-09-30T00:00:00.000Z",
//     "contactDetails": {
//       "personName": "HR Komal",
//       "mobileNumber": "8847394360",
//       "email": "hr.komal@inspireinitiate.com"
//     },
//     "benefits": "Medical Insurance, Performance Bonus",
//     "postedAt": "2024-08-26T00:00:00.000Z"
//   },
//   {
//     "jobId": "JOB1240",
//     "companyName": "Axis Bank",
//     "jobTitle": "Relationship Manager",
//     "jobDescription": "Managing customer relationships and providing financial advisory.",
//     "salary": "192000 - 336000",
//     "numberOfOpenings": 10,
//     "location": ["All India"],
//     "skillsRequired": ["Banking", "Customer Service", "Financial Advisory"],
//     "qualifications": "Graduation",
//     "jobType": "Full Time",
//     "agePreferences": { "min": 22, "max": 32 },
//     "applicationDeadline": "2024-09-18T00:00:00.000Z",
//     "contactDetails": {
//       "personName": "HR Rajesh",
//       "mobileNumber": "7439045855",
//       "email": "hr.rajesh@axisbank.com"
//     },
//     "benefits": "P.F., Medical Insurance",
//     "postedAt": "2024-08-26T00:00:00.000Z"
//   },
//   {
//     "jobId": "JOB1241",
//     "companyName": "Grow Bright Academy Pvt Ltd",
//     "jobTitle": "Customer Service Executive",
//     "jobDescription": "Handling customer service tasks in the banking sector.",
//     "salary": "174000 - 294000",
//     "numberOfOpenings": 5,
//     "location": ["All India"],
//     "skillsRequired": ["Customer Service", "Banking", "Communication"],
//     "qualifications": "12th Pass, Graduation",
//     "jobType": "Full Time",
//     "agePreferences": { "min": 18, "max": 30 },
//     "applicationDeadline": "2024-09-22T00:00:00.000Z",
//     "contactDetails": {
//       "personName": "HR Ritesh",
//       "mobileNumber": "9875629753",
//       "email": "hr.ritesh@growbright.com"
//     },
//     "benefits": "Medical Insurance, P.F.",
//     "postedAt": "2024-08-26T00:00:00.000Z"
//   },
//   {
//     "jobId": "JOB1242",
//     "companyName": "Durga Forge Pvt Ltd",
//     "jobTitle": "Branch Executive",
//     "jobDescription": "Managing branch operations and customer handling.",
//     "salary": "192000 - 300000",
//     "numberOfOpenings": 7,
//     "location": ["West Bengal", "Jharkhand"],
//     "skillsRequired": ["Branch Management", "Banking", "Customer Service"],
//     "qualifications": "Graduation",
//     "jobType": "Full Time",
//     "agePreferences": { "min": 21, "max": 32 },
//     "applicationDeadline": "2024-09-15T00:00:00.000Z",
//     "contactDetails": {
//       "personName": "HR Meera",
//       "mobileNumber": "7989561234",
//       "email": "hr.meera@durgaforge.com"
//     },
//     "benefits": "Health Insurance, Performance Bonus",
//     "postedAt": "2024-08-26T00:00:00.000Z"
//   },
//   {
//     "jobId": "JOB1243",
//     "companyName": "Inspire & Initiate Technologies Pvt Ltd",
//     "jobTitle": "Sales Officer",
//     "jobDescription": "Promoting and selling banking products to customers.",
//     "salary": "216000 - 360000",
//     "numberOfOpenings": 10,
//     "location": ["Delhi", "Mumbai", "Bangalore"],
//     "skillsRequired": ["Sales", "Banking Products", "Customer Interaction"],
//     "qualifications": "Graduation",
//     "jobType": "Full Time",
//     "agePreferences": { "min": 20, "max": 30 },
//     "applicationDeadline": "2024-09-28T00:00:00.000Z",
//     "contactDetails": {
//       "personName": "HR Smriti",
//       "mobileNumber": "8809832145",
//       "email": "hr.smriti@inspireinitiate.com"
//     },
//     "benefits": "Incentives, Health Insurance",
//     "postedAt": "2024-08-26T00:00:00.000Z"
//   }
// ]

// async function insertDummyData() {
//   try {
//     await mongoose.connect('mongodb://127.0.0.1:27017/amile');
    
//     for (const data of dummyData) {
//       const application = new Government(data);
//       await application.save();
//     }

//     console.log('Dummy data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting dummy data:', error);
//   } finally {
//     mongoose.disconnect();
//   }
// }

// insertDummyData();