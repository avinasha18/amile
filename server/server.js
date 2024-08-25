import express from "express";
import bodyParser from "body-parser";
import cors from "cors";  // Import the cors middleware

import userRoutes from "./routes/userRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import referalRoutes from "./routes/referalRoutes.js";
import { connectToMongoDB } from "./db.js";

const app = express();
app.use(express.json());
app.use(bodyParser.json());

// Set up CORS
app.use(cors({
  origin: "http://localhost:5173",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Use routes
app.use("/", userRoutes);
app.use("/", mentorRoutes);
app.use("/", companyRoutes);
app.use("/", internshipRoutes);
app.use("/", referalRoutes);

const PORT = process.env.PORT || 3000;

connectToMongoDB(() =>
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
);
