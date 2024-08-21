import { Student } from "../models/auth.model.js";
import Referral from "../models/referals.model.js";

export const handleReferral = async (referrerUsername, newUser) => {
    try {
        const referrer = await Referral.findOne({ username: referrerUsername });

        if (referrer) {
            if (referrer.referees.includes(newUser)) {
                throw new Error('User already referred by this friend');
            }

            const existingUser = await Referral.findOne({ username: newUser });

            if (existingUser) {
                return { success: false, message: 'User not eligible for referral' };
            } else {
                referrer.referees.push(newUser);
                await referrer.save();
            }
        }

        const newUserRecord = new Referral({ username: newUser });
        await newUserRecord.save();

        return { success: true, message: 'Referral handled successfully', newUser: newUserRecord };
    } catch (error) {
        return { success: false, message: error.message };
    }
};




export const getMyReferrals = async (req, res) => {
    try {
        const { username } = req.query;
        const { page = 1, limit = 10 } = req.query;

        const skip = (page - 1) * limit;

        // Find the user by username
        const user = await Referral.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Fetch referees' details with pagination
        const refereesDetails = await Student.find({ username: { $in: user.referees } }, '-password')
            .skip(skip) 
            .limit(Number(limit)); 

        const totalReferees = await Student.countDocuments({ username: { $in: user.referees } });

        return res.status(200).json({
            success: true,
            message: "Your referees' details are:",
            data: refereesDetails,
            totalPages: Math.ceil(totalReferees / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};




export const getTopReferrers = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const skip = (page - 1) * limit;

        const topReferrers = await Referral.find({})
            .sort({ total: -1 }) 
            .skip(skip) 
            .limit(Number(limit)); 

        const topReferrersWithNames = await Promise.all(topReferrers.map(async user => {
            const student = await Student.findOne({ username: user.username }).select('name');
            return {
                username: user.username,
                total: user.total,
                name: student ? student.name : 'Name not found'
            };
        }));

        const totalReferrers = await Referral.countDocuments();

        return res.status(200).json({
            success: true,
            message: "Top referrers retrieved successfully",
            data: topReferrersWithNames,
            totalPages: Math.ceil(totalReferrers / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

