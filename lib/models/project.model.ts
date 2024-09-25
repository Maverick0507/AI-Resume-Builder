import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: String },  // Optional
  endDate: { type: String },    // Optional
  technologiesUsed: { type: [String] },  // Array of technologies (optional)
  projectLink: { type: String },         // Optional project link or GitHub repo
});

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
