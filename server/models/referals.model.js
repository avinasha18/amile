import mongoose from "mongoose";

const referralSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    referees: { type: [String], default: [] },
    total: { type: Number, default: 0 }
});

referralSchema.pre('save', function (next) {
    this.total = this.referees.length;
    next();
});

const Referral = mongoose.model("Referral", referralSchema);

export default Referral;
