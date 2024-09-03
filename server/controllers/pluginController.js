import { Student } from "../models/auth.model.js";

export const connectPlugin = async (req, res) => {
    try {
      const { username } = req.body;
      const {pluginName,pluginData} = req.body.pluginName;
      if (!pluginName || !username || !pluginData) {
        return res
          .json({ success: false, message: "Missing required fields" });
      }
  
      const updatedStudent = await Student.findOneAndUpdate(
        { username },
        { $set: { [pluginName]: pluginData } },
        { new: true, projection: "-password" }
      );
  
      if (!updatedStudent) {
        return res
          .json({ success: false, message: "Student not found" });
      }
  
      return res.json({
        success: true,
        message: `${pluginName} data updated successfully`,
        data: updatedStudent,
      });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  };
  
  export const disconnectPlugin = async (req, res) => {
    try {
      const { pluginName, username } = req.body;
  
      if (!pluginName || !username) {
        return res
          .status(400)
          .json({ success: false, message: "Missing required fields" });
      }
  
      const updatedStudent = await Student.findOneAndUpdate(
        { username },
        { $unset: { [pluginName]: "" } },
        { new: true, projection: "-password" }
      );
  
      if (!updatedStudent) {
        return res
          .status(404)
          .json({ success: false, message: "Student not found" });
      }
  
      return res.status(200).json({
        success: true,
        message: `${pluginName} data disconnected successfully`,
        data: updatedStudent,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  
  