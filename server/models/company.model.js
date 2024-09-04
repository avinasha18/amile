import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  crnNumber: { type: String, required: true, unique: true },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  incorporationDate: { type: Date, required: true },
  linkedin: String,
  instagram: String,
  website: String,
  branches: [
    {
      branchName: String,
      location: String,
    },
  ],
  companySize: { type: String, enum: ['1-10', '10-100', '100-500', '500-5000', 'above 5000'] },
  companyLogo: String,
  companyTagline: String,
  companyDescription: String,
  companyType: { type: String, enum: ['startup', 'service-based', 'product-based'] },
  companyCategories: [String],
  contactPerson: {
    name: String,
    phone: String,
  },
  status: { type: String, enum: ['pending', 'active'], default: 'pending' },
  dateOfRegistration: { type: Date, default: Date.now },
  termsAccepted: { type: Boolean, required: true },

  verificationToken: String,

  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

// Password hashing before saving
companySchema.pre('save', async function (next) {
  const company = this;
  if (!company.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  company.password = await bcrypt.hash(company.password, salt);
  next();
});

// Static method to find by name using regex
companySchema.statics.findByName = function (name) {
  return this.find({ companyName: new RegExp(name, 'i') });
};

// Static method for login
companySchema.statics.login = async function (email, password) {
  const company = await this.findOne({ email });
  if (!company) throw Error('Incorrect email or password');
  const match = await bcrypt.compare(password, company.password);
  if (!match) throw Error('Incorrect email or password');

  if (company.status !== 'active') throw Error('Account is not verified. Please check your email.');

  return company;
};


// Static method to sign up
companySchema.statics.signup = async function (data) {
  const company = new this(data);
  await company.save();
  return company;
};

// Check if the model already exists before compiling it
const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

export default Company;
