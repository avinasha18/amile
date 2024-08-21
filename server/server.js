import express from "express";
import bodyParser from "body-parser";

import userRoutes from "./routes/userRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import internshipRoutes from "./routes/internshipRoutes.js";
import referalRoutes from "./routes/referalRoutes.js";
import { connectToMongoDB } from "./db.js";

const app = express();
app.use(express.json());
app.use(bodyParser.json());

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
