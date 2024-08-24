import mongoose from 'mongoose';


const internshipSchema = new mongoose.Schema({
    role: { type: String, required: true },               
    companyName: { type: String, required: true },        
    stipend: { type: Number, required: false },           
    hours: { type: Number, required: true },              
    type: { type: String, required: true },              
    modeOfWork: { type: String, required: true },         
    location: { type: String, required: false },          
    startDate: { type: Date, required: true },            
    endDate: { type: Date, required: false },             
    skillsRequired: { type: [String], required: true },   
    responsibilities: { type: String, required: true },   
    qualifications: { type: String, required: true },    
    applicationDeadline: { type: Date, required: false }, 
    contactEmail: { type: String, required: false },     
    website: { type: String, required: false },           
    benefits: { type: [String], required: false },         
    postedAt: { type: Date, default: Date.now },          
    isActive: { type: Boolean, default: true },           
});


const Internship = mongoose.model('Internship', internshipSchema);

export const createInternship = async (data) => {
    const internship = new Internship(data);
    await internship.save();
};

export const findInternshipById = async (id) => {
    return await Internship.findById(id);
};

export const getAllInternships = async (query, page = 1, limit = 10) => {
    return await Internship.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
};

export const updateInternship = async (id, data) => {
    return await Internship.findByIdAndUpdate(id, data, { new: true });
};

export const deleteInternship = async (id) => {
    return await Internship.findByIdAndDelete(id);
};
