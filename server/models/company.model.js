import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true }
}, { _id: false }); // Prevents creating an _id field for this subdocument

const contactPersonSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String }
}, { _id: false });

const branchSchema = new mongoose.Schema({
  branchName: { type: String },
  location: { type: String }
}, { _id: false });

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  crnNumber: { type: String, required: true, unique: true },
  incorporationDate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: addressSchema, required: true },
  contactPerson: { type: contactPersonSchema },
  website: { type: String },
  linkedin: { type: String },
  instagram: { type: String },
  companySize: { type: String, enum: ['1-10', '10-100', '100-500', '500-5000', 'above 5000'] },
  companyLogo: { type: String },
  companyTagline: { type: String },
  companyDescription: { type: String },
  companyType: { type: String, enum: ['startup', 'service-based', 'product-based'] },
  companyCategories: [String],
  branches: [branchSchema],
  termsAccepted: { type: Boolean, required: true },
  status: { type: String, enum: ['pending', 'active'], default: 'pending' },
  dateOfRegistration: { type: Date, default: Date.now },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
});

// Password hashing before saving
companySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to check password validity
companySchema.methods.isPasswordValid = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Avoid overwriting existing models
const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

export default Company;
